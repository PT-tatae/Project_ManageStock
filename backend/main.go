package main

import (
	"net/http"
	"github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/controller"
	"github.com/PT-tatae/Project_ManageStock/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
   // open connection database
   config.ConnectionDB()

   // Generate databases
   config.SetupDatabase()

   r := gin.Default()
   r.Use(CORSMiddleware())

   // Auth Route
   r.POST("/signIn", controller.SignIn)

   router := r.Group("/")
   {
       router.Use(middlewares.Authorizes())

       // Employee Route
       router.POST("/employee", controller.CreateEmployee)
       router.GET("/employees", controller.GetEmployees)
       router.GET("/employee/:id", controller.GetEmployeeByID)
       router.PATCH("/employee/:id", controller.UpdateEmployee)
       router.DELETE("/employee/:id", controller.DeleteEmployee)

       // Member Routes
       router.POST("/member", controller.CreateMember)
       router.GET("/members", controller.GetMembers)
       router.GET("/member/:id", controller.GetMemberByID)
       router.PATCH("/member/:id", controller.UpdateMember)
       router.DELETE("/member/:id", controller.DeleteMember)

       // Gender Routes
       router.GET("/genders", controller.GetGenders)

       // Position Routes
       router.GET("/positions", controller.GetPositions)

       // Rank Routes
       r.GET("/ranks", controller.GetRanks)

       // MemberCount Routes
       r.GET("/memberCountToday", controller.GetMemberCountToday)

       // Receipt Routes
       r.GET("/receipt", controller.GetReceipts)

       // Add point route
       r.PATCH("/member/:id/addPoints", controller.AddPointsToMember)

       r.GET("/Stock/:category_id", controller.GetStock)
	   r.GET("/SupplierName", controller.GetNameSupplier)
		r.GET("/Supplier", controller.GetdataAllSupplier)
		r.POST("/AddStock", controller.AddStockHandler)
		r.PUT("/UpdateStock", controller.UpdateStock)

   }

   r.GET("/", func(c *gin.Context) {
       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
   })

   // Run the server
   r.Run("localhost:" + PORT)
}

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