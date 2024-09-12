import useStockData from "../../Hook/useStockData";
import StockCategory from "../../Compornent/StockCategory/StockCategory";



export default function StockVegetable() {
  const VegetableData = useStockData(2);
  return (
    <StockCategory
      categoryTitle="ผัก (Vegetables)"
      initialData={VegetableData}
      categoryID = {2}
    />
  );
}
