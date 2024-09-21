package controller

import (
   "net/http"
   "github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/entity"
   "github.com/gin-gonic/gin"
)

func GetGenders(c *gin.Context) {
   var genders []entity.Gender

   db := config.DB()
   db.Find(&genders)
   c.JSON(http.StatusOK, &genders)
}