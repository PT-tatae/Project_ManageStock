// StockNoodlesAndDough.js

import StockCategory from "../../Compornent/StockCategory/StockCategory";

const noodlesAndDoughData = [
  {
    key: '1',
    codelist: '1',
    code: 'N001',
    name: 'มาม่า',
    quantity: '20',
    price: '30',
    supplier: 'Supplier A',
    importDate: '2024-08-10 10:00',
    expiryDate: '2025-08-10 10:00',
  },
  {
    key: '2',
    codelist: '2',
    code: 'N002',
    name: 'เส้นหมี่',
    quantity: '15',
    price: '50',
    supplier: 'Supplier B',
    importDate: '2024-08-12 15:00',
    expiryDate: '2025-08-12 15:00',
  }
];

export default function StockNoodlesAndDough() {
  return (
    <StockCategory
      categoryTitle="เส้นและแป้ง (Noodles and Dough)"
      initialData={noodlesAndDoughData}
    />
  );
}
