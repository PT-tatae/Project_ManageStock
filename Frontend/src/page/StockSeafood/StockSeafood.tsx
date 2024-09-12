import useStockData from "../../Hook/useStockData";
import StockCategory from "../../Compornent/StockCategory/StockCategory";


export default function StockSeafood() {
  const SeafoodData = useStockData(3);
  return (
    <StockCategory
      categoryTitle="อาหารทะเล (Seafood)"
      initialData={SeafoodData}
      categoryID = {3}
    />
  );
}
