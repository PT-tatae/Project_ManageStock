package controller

import (
	"net/http"
	"strconv"
	"time"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/entity"
	"github.com/Jarntae/Sa_StockOrder/config"
)

// Struct สำหรับรับข้อมูล Input
type Input struct {
	CategoryID     uint      `json:"category_id"`
	Product_Code_ID string   `json:"product_code_id"`
	ProductName     string   `json:"product_name"`
	Quantity        uint     `json:"quantity"`
	Price           float64  `json:"price"`
	DateIn          time.Time `json:"date_in"`
	ExpirationDate  time.Time `json:"expiration_date"`
	SupplierID      uint     `json:"supplier_id"`
	EmployeeID      uint     `json:"employee_id"`
}

func AddStockHandler(c *gin.Context) {
	var data Input
	var product entity.Product
	var category entity.Category

	// ผูกข้อมูล JSON เข้ากับโครงสร้าง Input
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า Product_Code_ID มีอยู่แล้วหรือไม่
	if err := config.DB().Where("product_code_id = ?", data.Product_Code_ID).First(&product).Error; err != nil {
		// ถ้าไม่มี product_code_id ให้สร้างใหม่

		// ดึงข้อมูล Category เพื่อหา Category_Code_ID
		if err := config.DB().Where("id = ?", data.CategoryID).First(&category).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found"})
			return
		}

		// หาเลขสูงสุดของ Product_Code_ID ที่มีอยู่ใน category นี้
		var lastProduct entity.Product
		// ดึง product_code_id ที่เป็นเลขสูงสุดจากหมวดหมู่นี้
		if err := config.DB().Where("product_code_id LIKE ?", category.Category_Code_id+"%").
			Order("product_code_id DESC").First(&lastProduct).Error; err != nil {
			// ถ้าไม่มีรายการใน category นี้ ให้เริ่มจาก 001
			data.Product_Code_ID = category.Category_Code_id + "001"
		} else {
			// ถ้ามีรายการอยู่แล้ว ให้เพิ่มลำดับตัวเลขของ product_code_id
			lastCodeNum := lastProduct.Product_Code_ID[len(category.Category_Code_id):] // ตัด Category_Code_ID ออก เช่น M001 -> 001
			codeNum, _ := strconv.Atoi(lastCodeNum)      // แปลงเป็น integer
			newCodeNum := fmt.Sprintf("%03d", codeNum+1) // เพิ่มลำดับและแปลงกลับเป็น string เช่น 001 -> 002
			data.Product_Code_ID = category.Category_Code_id + newCodeNum
		}

		// สร้าง Product ใหม่
		newProduct := entity.Product{
			Product_Code_ID: data.Product_Code_ID,
			ProductName:     data.ProductName,
			CategoryID:      &data.CategoryID,
		}
		if err := config.DB().Create(&newProduct).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new product"})
			return
		}

		// เพิ่ม Stock ใหม่สำหรับสินค้า
		newStock := entity.Stock{
			Quantity:        data.Quantity,
			Price:           data.Price,
			DateIn:          data.DateIn,
			ExpirationDate:  data.ExpirationDate,
			ProductID:       &newProduct.ID,
			SupplierID:      &data.SupplierID,
			EmployeeID:      &data.EmployeeID,
		}
		if err := config.DB().Create(&newStock).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new stock"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Product and Stock added successfully", "product_code_id": newProduct.Product_Code_ID})
	} else {
		// ถ้า Product_Code_ID มีอยู่แล้ว ให้เพิ่ม Stock ใหม่สำหรับสินค้านี้
		newStock := entity.Stock{
			Quantity:        data.Quantity,
			Price:           data.Price,
			DateIn:          data.DateIn,
			ExpirationDate:  data.ExpirationDate,
			ProductID:       &product.ID,
			SupplierID:      &data.SupplierID,
			EmployeeID:      &data.EmployeeID,
		}
		if err := config.DB().Create(&newStock).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new stock"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Stock added successfully for existing product", "product_code_id": product.Product_Code_ID})
	}
}
