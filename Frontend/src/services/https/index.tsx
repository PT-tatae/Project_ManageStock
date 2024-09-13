import { IStock } from "../../interfaces/IStock.tsx";
import { Update} from "../../interfaces/Update.tsx";
import {LoginInterface} from "../../interfaces/Login.tsx"

import axios from "axios";

const apiUrl = "http://localhost:8000";

async function GetStock(categoryId: number) {
  try {
    const response = await fetch(`${apiUrl}/Stock/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // ตรวจสอบสถานะการตอบกลับ หากไม่ใช่ 200 ให้โยน error
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return null; // คืนค่า null หากมีข้อผิดพลาด
  }
}

// ฟังก์ชันสำหรับดึงข้อมูล Supplier
async function GetDataSupplier() {
  try {
    const response = await fetch(`${apiUrl}/Supplier`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // ตรวจสอบสถานะการตอบกลับ
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return null;
  }
}

async function AddStock(newStock: IStock) {
  try {
    const response = await fetch(`${apiUrl}/AddStock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStock), // แปลงข้อมูลที่ต้องการส่งเป็น JSON

    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding stock:", error);
    return null;
  }
}

async function UpdateStock(updateStock: Update) {
  console.log("เตรียมข้อมูล",updateStock);
  
  try {
    const response = await fetch(`${apiUrl}/UpdateStock`, {
      method: "PUT", // ใช้ PUT สำหรับการอัปเดตข้อมูล
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateStock), // ส่งข้อมูลที่จะแก้ไขไปยัง backend
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // ส่งข้อมูลที่ตอบกลับจาก backend กลับมา
  } catch (error) {
    console.error("Error updating stock:", error);
    return null;
  }
  
}

async function GetSupplierName() {
  try {
    const response = await fetch(`${apiUrl}/SupplierName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // ตรวจสอบสถานะการตอบกลับ
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return null;
  }
}

async function SignIn(data: LoginInterface) {
  try {
    const response = await fetch(`${apiUrl}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Authorization}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Check response status and handle errors
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
}


export { GetStock,
  GetDataSupplier,
  AddStock,
  UpdateStock,
  GetSupplierName,
  SignIn,
 };
