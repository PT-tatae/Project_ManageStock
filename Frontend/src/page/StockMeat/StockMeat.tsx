// StockMeat.js
import useStockData from "../../Hook/useStockData";
import StockCategory from "../../Compornent/StockCategory/StockCategory";



export default function StockMeat() {
  const meatData = useStockData(1);
  return (
    <StockCategory
      categoryTitle="เนื้อสัตว์ (Meats)"
      initialData={meatData}
      categoryID = {1}
    />
  );
}
