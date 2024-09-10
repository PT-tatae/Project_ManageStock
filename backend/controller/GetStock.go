package controller

import (
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/config"
	"github.com/Jarntae/Sa_StockOrder/entity"
)

func GetStock(c *gin.Context) {
	categoryID := c.Param("category_id")

	var products []entity.Product
	var stocks []entity.Stock
	var suppliers []entity.Supplier

	// ดึงข้อมูลสินค้าใน category ที่ระบุ
	if err := config.DB().Where("category_id = ?", categoryID).Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving products"})
		return
	}

	// ดึงข้อมูล stock ที่เกี่ยวข้องกับ products ที่ดึงมา
	productIDs := []uint{}
	for _, product := range products {
		if product.ID != 0 {
			productIDs = append(productIDs, product.ID)
		}
	}

	if err := config.DB().Where("product_id IN ?", productIDs).Find(&stocks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving stock"})
		return
	}

	// ดึงข้อมูล suppliers ที่เกี่ยวข้องกับ stock
	supplierIDs := []uint{}
	for _, stock := range stocks {
		if stock.SupplierID != nil {
			supplierIDs = append(supplierIDs, *stock.SupplierID)
		}
	}

	if err := config.DB().Where("id IN ?", supplierIDs).Find(&suppliers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving suppliers"})
		return
	}

	// สร้าง map สำหรับเก็บข้อมูล supplier
	supplierByID := make(map[uint]entity.Supplier)
	for _, supplier := range suppliers {
		supplierByID[supplier.ID] = supplier
	}

	// สร้างข้อมูลผลลัพธ์
	result := []gin.H{}
	for _, product := range products {
		stockList := []gin.H{}
		for _, stock := range stocks {
			if stock.ProductID != nil && *stock.ProductID == product.ID {
				supplierName := ""
				if stock.SupplierID != nil {
					if supplier, ok := supplierByID[*stock.SupplierID]; ok {
						supplierName = supplier.SupplierName
					}
				}
				stockList = append(stockList, gin.H{
					"quantity":        stock.Quantity,
					"price":           stock.Price,
					"date_in":         stock.DateIn.Format(time.RFC3339),
					"expiration_date": stock.ExpirationDate.Format(time.RFC3339),
					"Supplier": gin.H{
						"supplier_name": supplierName,
					},
				})
			}
		}
		result = append(result, gin.H{
			"product": gin.H{
				"ID":              product.ID,
				"product_code_id": product.Product_Code_ID,
				"product_name":    product.ProductName,
			},
			"stocks": stockList,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

