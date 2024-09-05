// StockMeat.js

import StockCategory from "../../Compornent/StockCategory/StockCategory";

const meatData = [
  {
    key: '1',
    codelist: '1',
    code: 'M001',
    name: 'เนื้อหมู',
    quantity: '10',
    price: '150',
    supplier: 'Supplier A',
    importDate: '2024-08-01 14:00',
    expiryDate: '2024-08-15 20:00',
  },
  {
    key: '2',
    codelist: '2',
    code: 'M002',
    name: 'เนื้อวัว',
    quantity: '5',
    price: '300',
    supplier: 'Supplier B',
    importDate: '2024-08-05 00:00',
    expiryDate: '2024-08-20 23:59',
  }
];

export default function StockMeat() {
  return (
    <StockCategory
      categoryTitle="เนื้อสัตว์ (Meats)"
      initialData={meatData}
    />
  );
}
