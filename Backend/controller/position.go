package controller

import (
   "net/http"
   "github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/entity"
   "github.com/gin-gonic/gin"
)

func GetPositions(c *gin.Context) {
   var positions []entity.Position
   
   db := config.DB()
   db.Find(&positions)
   c.JSON(http.StatusOK, &positions)
}