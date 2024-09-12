package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Jarntae/Sa_StockOrder/entity"
	"github.com/Jarntae/Sa_StockOrder/config"
	
)

type SupplierResponseName struct {
	SupplierID	uint `json:"SupplierID"`
	SupplierName string `json:"supplier_name"`
}


func GetNameSupplier(c *gin.Context) {
    var suppliers []entity.Supplier
    result := config.DB().Find(&suppliers)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }
	// แปลงข้อมูล Supplier เป็น SupplierResponse
	var response []SupplierResponseName
	for _, supplier := range suppliers {
		response = append(response, SupplierResponseName{
			SupplierID: supplier.ID,
			SupplierName: supplier.SupplierName,
		})
	}


    c.JSON(http.StatusOK, gin.H{"data": response}) // ส่ง suppliers กลับไป
}

