// hooks/useStockData.tsx
import { useEffect, useState } from "react";
import { GetStock } from "../services/https/index";

export default function useStockData(categoryID: number) {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล Stock ตาม categoryID ที่ส่งมา
    GetStock(categoryID).then((res) => {
      if (res) {
        console.log("ข้อมูลที่รับมา", res.data);
        const transformedData = transformStockData(res.data);
        setStockData(transformedData);
      }
    });
  }, [categoryID]); // ดึงข้อมูลใหม่เมื่อ categoryID เปลี่ยน

  return stockData;
}

function transformStockData(data: any) {
  return data.map((item: any, index: number) => {
    return {
      key: String(index + 1),
      codelist: String(index + 1),
      code: item.product_code_id || "", // รหัสสินค้า
      name: item.product_name || "", // ชื่อสินค้า
      quantity: item.quantity ? String(item.quantity) : "N/A", // จำนวนในสต็อก
      price: item.price ? String(item.price) : "N/A", // ราคา
      supplier: item.supplier_name || "N/A", // ชื่อผู้จัดส่ง
      importDate: item.date_in ? new Date(item.date_in).toLocaleString() : "N/A", // วันที่นำเข้า
      expiryDate: item.expiration_date
        ? new Date(item.expiration_date).toLocaleString()
        : "N/A", // วันหมดอายุ
    };
  });
}
