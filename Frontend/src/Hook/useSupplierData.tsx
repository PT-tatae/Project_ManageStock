// hooks/useSupplierData.tsx
import { useEffect, useState } from "react";
import { GetDataSupplier } from "../services/https/index";

export default function useSupplierData() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล Supplier
    GetDataSupplier().then((res) => {
      if (res) {
        const supplierData = transformSupplierData(res.data);
        setSuppliers(supplierData);
      }
    });
  }, []);

  return suppliers;
}

function transformSupplierData(data: any) {
  return data.map((item: any) => ({
    id: item.id,
    name: item.supplier_name || '',
    phone: item.phone || '',
    email: item.email || '',
    address: item.address || '',
  }));
}
