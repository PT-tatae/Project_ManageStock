package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/config"
	"github.com/Jarntae/Sa_StockOrder/entity"
)

func LoadStockByProduct(c *gin.Context) {
	productID := c.Param("product_id")
	var product entity.Product
	var stocks []entity.Stock

	// ดึงข้อมูลสินค้า
	if err := config.DB().Where("product_code_id = ?", productID).First(&product).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	// ดึงข้อมูลสต็อกสำหรับสินค้านั้น
	if err := config.DB().Where("product_id = ?", product.ID).Find(&stocks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving stock"})
		return
	}

	// แสดงผลข้อมูลสินค้าและสต็อก
	c.JSON(http.StatusOK, gin.H{
		"product": product,
		"stocks":  stocks,
	})
}
