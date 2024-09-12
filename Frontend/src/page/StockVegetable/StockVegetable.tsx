
import StockCategory from "../../Compornent/StockCategory/StockCategory";

const meatData = [
    {
        key: '1',
        codelist: '1',
        code: 'V001',
        name: 'คะน้า',
        quantity: '20',
        price: '50',
        supplier: 'Supplier C',
        importDate: '2024-08-01 08:00',
        expiryDate: '2024-08-10 23:59',
    },
    {
        key: '2',
        codelist: '2',
        code: 'V002',
        name: 'ผักบุ้ง',
        quantity: '15',
        price: '30',
        supplier: 'Supplier D',
        importDate: '2024-08-07 09:00',
        expiryDate: '2024-08-14 23:59',
    }
];

export default function StockMeat() {
  return (
    <StockCategory
      categoryTitle="ผัก (Vegetables)"
      initialData={meatData}
    />
  );
}
