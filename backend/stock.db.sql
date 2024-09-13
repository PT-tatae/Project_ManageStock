BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"category_code_id"	text,
	"category_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "positions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "employees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"email"	text,
	"password"	text,
	"profile"	longtext,
	"gender_id"	integer,
	"position_id"	integer,
	CONSTRAINT "fk_genders_employees" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	CONSTRAINT "fk_positions_employees" FOREIGN KEY("position_id") REFERENCES "positions"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"product_code_id"	text,
	"product_name"	text,
	"category_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_categories_product" FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	CONSTRAINT "fk_employees_product" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"supplier_name"	text,
	"phone"	text,
	"email"	text,
	"address"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "stocks" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"quantity"	integer,
	"price"	real,
	"date_in"	datetime,
	"expiration_date"	datetime,
	"product_id"	integer,
	"supplier_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_products_stock" FOREIGN KEY("product_id") REFERENCES "products"("id"),
	CONSTRAINT "fk_suppliers_stock" FOREIGN KEY("supplier_id") REFERENCES "suppliers"("id"),
	CONSTRAINT "fk_employees_stock" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_categories_deleted_at" ON "categories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_positions_deleted_at" ON "positions" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_employees_deleted_at" ON "employees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_deleted_at" ON "products" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_suppliers_deleted_at" ON "suppliers" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_stocks_deleted_at" ON "stocks" (
	"deleted_at"
);
COMMIT;
