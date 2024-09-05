package entity

import (

	"gorm.io/gorm"
)

type Employee struct {

	gorm.Model

    FirstName    string    `json:"first_name"`

    LastName     string    `json:"last_name"`

    Email     string    `json:"email"`

    Password     string    `json:"password"`
	
	Gender     string   `json:"gender"`

	Position   string   `json:"position"`

	//Employee 1 to 1..* Product

	Product		[]Product	 `gorm:"foreignKey:EmployeeID"`

	//Employee 1 to 1..* Stock

	Stock []Stock `gorm:"foreignKey:EmployeeID"`

}
