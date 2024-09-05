// hooks/useStockData.tsx
import { useEffect, useState } from "react";
import { GetStock } from "../services/https/index";

export default function useStockData(categoryID: number) {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล Stock ตาม categoryID ที่ส่งมา
    GetStock(categoryID).then((res) => {
      if (res) {
        const transformedData = transformStockData(res.data);
        setStockData(transformedData);
      }
    });
  }, [categoryID]); // ดึงข้อมูลใหม่เมื่อ categoryID เปลี่ยน

  return stockData;
}

function transformStockData(data: any) {
  return data.map((item: any, index: number) => {
    const stocks = item.stocks[0] || {}; // ดึงสต็อกแรก หากไม่มีให้ใช้ค่าว่าง
    return {
      key: String(index + 1),
      codelist: String(index + 1),
      code: item.product.product_code_id || '', // รหัสสินค้า
      name: item.product.product_name || '', // ชื่อสินค้า
      quantity: stocks.quantity ? String(stocks.quantity) : 'N/A', // จำนวนในสต็อก
      price: stocks.price ? String(stocks.price) : 'N/A', // ราคา
      supplier: stocks.Supplier?.supplier_name || 'N/A', // ชื่อผู้จัดส่ง
      importDate: stocks.date_in ? new Date(stocks.date_in).toLocaleString() : 'N/A', // วันที่นำเข้า
      expiryDate: stocks.expiration_date ? new Date(stocks.expiration_date).toLocaleString() : 'N/A', // วันหมดอายุ
    };
  });
}
