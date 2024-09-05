// StockCondimentsAndSauce.js

import StockCategory from "../../Compornent/StockCategory/StockCategory";

const condimentsAndSauceData = [
  {
    key: '1',
    codelist: '1',
    code: 'C001',
    name: 'น้ำจิ้มสุกกี้',
    quantity: '12',
    price: '100',
    supplier: 'Supplier C',
    importDate: '2024-08-15 11:00',
    expiryDate: '2025-08-15 11:00',
  },
  {
    key: '2',
    codelist: '2',
    code: 'C002',
    name: 'น้ำมันงา',
    quantity: '8',
    price: '120',
    supplier: 'Supplier D',
    importDate: '2024-08-18 16:00',
    expiryDate: '2025-08-18 16:00',
  }
];

export default function StockCondimentsAndSauce() {
  return (
    <StockCategory
      categoryTitle="เครื่องปรุงรสและน้ำจิ้ม (Condiments and Sauce)"
      initialData={condimentsAndSauceData}
    />
  );
}
