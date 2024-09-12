package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/controller"
	"github.com/Jarntae/Sa_StockOrder/config"
)

const PORT = "8000"

func main() {
	// เปิดการเชื่อมต่อฐานข้อมูล
	config.ConnectionDB()

	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		router.GET("/Stock/:category_id", controller.GetStock)
		router.GET("/SupplierName", controller.GetNameSupplier)
		router.GET("/Supplier", controller.GetdataAllSupplier)
		router.POST("/AddStock", controller.AddStockHandler)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server
	r.Run("localhost:" + PORT)
}

// กำหนด Middleware สำหรับ CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
