package controller

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/PT-tatae/Project_ManageStock/config"
	"github.com/PT-tatae/Project_ManageStock/entity"
)

func CreateMember(c *gin.Context) {
    var member entity.Member

    // bind เข้าตัวแปร member
    if err := c.ShouldBindJSON(&member); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    // ค้นหา rank ด้วย id
	var rank entity.Rank
	db.First(&rank, member.RankID)
	if rank.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "rank not found"})
		return
	}

    // ค้นหา employee ด้วย id
	var employee entity.Employee
	db.First(&employee, member.EmployeeID)
	if employee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "employee not found"})
		return
	}

    // สร้าง Member
    m := entity.Member {
        FirstName:  member.FirstName,					
	    LastName:   member.LastName,				
	    PhoneNumber:member.PhoneNumber,					
	    RankID:     member.RankID,		
	    Rank:       rank,					
	    EmployeeID: member.EmployeeID,				
	    Employee:   employee,		
    }

    if err := db.Create(&m).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, gin.H{"message": "สมัครสมาชิกสำเร็จ"})
}

func GetMembers(c *gin.Context) {
    var members []entity.Member

    db := config.DB()
    results := db.Preload("Rank").Preload("Employee").Find(&members)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, members)
}

func GetMemberByID(c *gin.Context) {
    ID := c.Param("id")
	var user entity.Member

	db := config.DB()
	results := db.Preload("Rank").Preload("Employee").First(&user, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if user.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}



func UpdateMember(c *gin.Context) {
    var member entity.Member
	memberID := c.Param("id")

	db := config.DB()
	result := db.First(&member, memberID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&member)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "แก้ไขข้อมูลสำเร็จ"})
}

func DeleteMember(c *gin.Context) {
    id := c.Param("id")

	db := config.DB()
	if tx := db.Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ลบข้อมูลสำเร็จ"})
}

func GetMemberCountToday(c *gin.Context) {
    var count int64

    db := config.DB()
    // Select members created in the last 24 hours using the `created_at` column
    result := db.Raw("SELECT COUNT(id) FROM members WHERE created_at >= DATETIME(SUBSTR(created_at, 1, 19), '-1 day')").Scan(&count)
    
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"memberCount": count})
}

func AddPointsToMember(c *gin.Context) {
    var pointsToAdd struct {
        Points int 
    }
    memberID := c.Param("id")

    // Bind JSON payload (points)
    if err := c.ShouldBindJSON(&pointsToAdd); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
        return
    }

    // Check if points are valid (positive)
    if pointsToAdd.Points <= 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Points must be greater than 0"})
        return
    }

    db := config.DB()
    var member entity.Member

    // Find the member by ID
    if err := db.First(&member, memberID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
        return
    }

    // Add points to the member's existing points
    member.Point += pointsToAdd.Points

    // Save the updated member
    if err := db.Save(&member).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update member"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Points added successfully", "updatedPoints": member.Point})
}