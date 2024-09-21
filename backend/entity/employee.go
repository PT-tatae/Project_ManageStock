package entity

import(
	"gorm.io/gorm"
) 

type Employee struct{
	gorm.Model
	FirstName		string		
	LastName		string	
	Email			string	
	Password		string		
	Profile   		string 		`gorm:"type:longtext"`

	// FK from Gender
	GenderID		uint
	Gender			Gender 		`gorm:"foreignKey: gender_id"`
	// FK from Position
	PositionID		uint
	Position		Position 	`gorm:"foreignKey: position_id"`

	Members			[]Member	`gorm:"foreignKey: employee_id"`

	//Employee 1 to 1..* Product

	Product		[]Product	 `gorm:"foreignKey:EmployeeID"`

	//Employee 1 to 1..* Stock

	Stock []Stock `gorm:"foreignKey:EmployeeID"`
}