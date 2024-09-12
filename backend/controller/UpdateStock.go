package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/config"
	"github.com/Jarntae/Sa_StockOrder/entity"
)

// Struct สำหรับรับข้อมูล Input
type InputUpdateStock struct {
	StockID         uint      `json:"stock_id"`
	CategoryID      uint      `json:"category_id"`
	Product_Code_ID string    `json:"product_code_id"`
	ProductName     string    `json:"product_name"`
	Quantity        uint      `json:"quantity"`
	Price           float64   `json:"price"`
	DateIn          time.Time `json:"date_in"`
	ExpirationDate  time.Time `json:"expiration_date"`
	SupplierID      uint      `json:"supplier_id"`
	EmployeeID      uint      `json:"employee_id"`
}

func UpdateStock(c *gin.Context) {
	var data InputUpdateStock
	var stock entity.Stock
	var product entity.Product

	// ผูกข้อมูล JSON เข้ากับโครงสร้าง Input
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า stock_id มีอยู่หรือไม่
	if err := config.DB().Where("id = ?", data.StockID).First(&stock).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stock not found"})
		return
	}

	// ตรวจสอบว่า Product_Code_ID มีอยู่หรือไม่
	if err := config.DB().Where("product_code_id = ?", data.Product_Code_ID).First(&product).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	// ตรวจสอบว่า ProductName ที่รับเข้ามาตรงกับฐานข้อมูลหรือไม่
	if product.ProductName != data.ProductName {
		// ถ้า ProductName ไม่ตรงกันให้ทำการอัปเดตชื่อในฐานข้อมูล
		product.ProductName = data.ProductName
		if err := config.DB().Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update product name"})
			return
		}
	}

	// อัปเดตข้อมูล stock ที่มีอยู่
	stock.Quantity = data.Quantity
	stock.Price = data.Price
	stock.DateIn = data.DateIn
	stock.ExpirationDate = data.ExpirationDate
	stock.SupplierID = &data.SupplierID
	stock.EmployeeID = &data.EmployeeID

	// บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
	if err := config.DB().Save(&stock).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Stock updated successfully", "stock_id": stock.ID})
}
