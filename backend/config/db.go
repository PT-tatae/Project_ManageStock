package config

import (
	"fmt"

	"time"

	"github.com/Jarntae/Sa_StockOrder/entity"

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func ConnectionDB() {

	database, err := gorm.Open(sqlite.Open("stock.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	fmt.Println("connected database")

	db = database

}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Category{},
		&entity.Employee{},
		&entity.Product{},
		&entity.Stock{},
		&entity.Supplier{},
	)

	// Insert default Employee
	employee := &entity.Employee{
		FirstName: "Poramet",
		LastName:  "Withaisong",
		Email:     "tae@shabubu.ac.th",
		Password:  "1234",
		Gender:    "male",
		Position:  "managestock",
	}
	db.FirstOrCreate(employee, &entity.Employee{Email: employee.Email})

	// Insert default Categories
	categories := []entity.Category{
		{Category_Code_id: "M", CategoryName: "เนื้อสัตว์ (Meats)"},
		{Category_Code_id: "V", CategoryName: "ผัก (Vegetables)"},
		{Category_Code_id: "S", CategoryName: "อาหารทะเล (Seafood)"},
		{Category_Code_id: "N", CategoryName: "เส้นและแป้ง (Noodles and Dough)"},
		{Category_Code_id: "C", CategoryName: "เครื่องปรุงรสและน้ำจิ้ม (Condiments and sauce)"},
		{Category_Code_id: "B", CategoryName: "เครื่องดื่มและขนมหวาน (Beverages and Desserts)"},
	}
	for _, category := range categories {
		db.FirstOrCreate(&category, &entity.Category{Category_Code_id: category.Category_Code_id})
	}

	// Insert default Suppliers
	suppliers := []entity.Supplier{
		{SupplierName: "Supplier A", Phone: "012-345-6789", Email: "contact@suppliera.com", Address: "มทส"},
		{SupplierName: "Supplier B", Phone: "987-654-3210", Email: "contact@supplierb.com", Address: "มทส"},
		{SupplierName: "Supplier C", Phone: "000-111-2222", Email: "contact@supplierc.com", Address: "มทส"},
		{SupplierName: "Supplier D", Phone: "333-444-5555", Email: "contact@supplierd.com", Address: "มทส"},
		{SupplierName: "Supplier E", Phone: "666-777-8888", Email: "contact@suppliere.com", Address: "มทส"},
		{SupplierName: "Supplier F", Phone: "999-000-1111", Email: "contact@supplierf.com", Address: "มทส"},
	}
	for _, supplier := range suppliers {
		db.FirstOrCreate(&supplier, &entity.Supplier{SupplierName: supplier.SupplierName})
	}

	// Insert default Products and Stocks
	productsAndStocks := []struct {
		Product entity.Product
		Stocks  []entity.Stock
	}{
		{
			Product: entity.Product{
				Product_Code_ID: "B001",
				ProductName:     "น้ำอัดลม",
				CategoryID:      getCategoryIDByName(db, "เครื่องดื่มและขนมหวาน (Beverages and Desserts)"),
				EmployeeID: getEmployeeId(db,1),
			},
			Stocks: []entity.Stock{
				{
					Quantity:       30,
					Price:          25,
					DateIn:         parseDate("2024-08-20 09:00"),
					ExpirationDate: parseDate("2025-08-20 09:00"),
					SupplierID:     getSupplierIDByName(db, "Supplier E"),
					EmployeeID: getEmployeeId(db,1),
					
				},
			},
		},
		{
			Product: entity.Product{
				Product_Code_ID: "B002",
				ProductName:     "ไอศครีม",
				CategoryID:      getCategoryIDByName(db, "เครื่องดื่มและขนมหวาน (Beverages and Desserts)"),
				EmployeeID: getEmployeeId(db,1),
			},
			Stocks: []entity.Stock{
				{
					Quantity:       20,
					Price:          150,
					DateIn:         parseDate("2024-08-22 14:00"),
					ExpirationDate: parseDate("2025-08-22 14:00"),
					SupplierID:     getSupplierIDByName(db, "Supplier F"),
					EmployeeID: getEmployeeId(db,1),
				},
			},
		},
	}

	for _, ps := range productsAndStocks {
		db.FirstOrCreate(&ps.Product, &entity.Product{Product_Code_ID: ps.Product.Product_Code_ID})
		for _, stock := range ps.Stocks {
			stock.ProductID = &ps.Product.ID
			db.FirstOrCreate(&stock, &entity.Stock{})
		}
	}
}

// Helper functions
func getCategoryIDByName(db *gorm.DB, categoryName string) *uint {
	var category entity.Category
	db.Where("category_name = ?", categoryName).First(&category)
	return &category.ID
}

func getEmployeeId(db *gorm.DB, EmployeeID int) *uint{
	var employee entity.Employee

	db.Where("ID = ?", EmployeeID).First(&employee)
	return &employee.ID
}


func getSupplierIDByName(db *gorm.DB, supplierName string) *uint {
	var supplier entity.Supplier
	db.Where("supplier_name = ?", supplierName).First(&supplier)
	return &supplier.ID
}

func parseDate(dateStr string) time.Time {
	t, _ := time.Parse("2006-01-02 15:04", dateStr)
	return t
}
