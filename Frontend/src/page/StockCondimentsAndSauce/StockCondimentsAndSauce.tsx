// StockCondimentsAndSauce.js
import useStockData from "../../Hook/useStockData";
import StockCategory from "../../Compornent/StockCategory/StockCategory";



export default function StockCondimentsAndSauce() {
  const condimentsAndSauceData = useStockData(5);
  return (
    <StockCategory
      categoryTitle="เครื่องปรุงรสและน้ำจิ้ม (Condiments and Sauce)"
      initialData={condimentsAndSauceData}
      categoryID = {5}
    />
  );
}
