package controller

import (
   "net/http"
   "github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/entity"
   "github.com/gin-gonic/gin"
)

func GetRanks(c *gin.Context) {
   var ranks []entity.Rank

   db := config.DB()
   db.Find(&ranks)
   c.JSON(http.StatusOK, &ranks)
}