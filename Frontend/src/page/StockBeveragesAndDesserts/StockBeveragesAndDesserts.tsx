// pages/StockBeveragesAndDesserts.tsx

import StockCategory from "../../Compornent/StockCategory/StockCategory";
import useStockData from "../../Hook/useStockData";
//import useSupplierData from '../../Hook/useSupplierData';

export default function StockBeveragesAndDesserts() {
  const beveragesAndDessertsData = useStockData(6); // ดึงข้อมูล Stock ด้วย categoryID = 6
  //const SupplierData = useSupplierData(); // ดึงข้อมูล Supplier

  return (
    <StockCategory
      categoryTitle="เครื่องดื่มและขนมหวาน (Beverages and Desserts)"
      initialData={beveragesAndDessertsData}
    />
  );
}
