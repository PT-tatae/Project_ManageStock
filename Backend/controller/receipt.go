package controller

import (
	"net/http"
	"github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/entity"
	"github.com/gin-gonic/gin"
)

func GetReceipts(c *gin.Context){
	var receipts []entity.Receipt
	db := config.DB()
	
	results := db.Preload("Member").
	Preload("Employee").
	Find(&receipts)
	if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &receipts)
}