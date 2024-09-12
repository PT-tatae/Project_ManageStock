// StockNoodlesAndDough.js

import StockCategory from "../../Compornent/StockCategory/StockCategory";
import useStockData from "../../Hook/useStockData";

export default function StockNoodlesAndDough() {
  const noodlesAndDoughData = useStockData(4);
  return (
    <StockCategory
      categoryTitle="เส้นและแป้ง (Noodles and Dough)"
      initialData={noodlesAndDoughData}
      categoryID = {4}
    />
  );
}
