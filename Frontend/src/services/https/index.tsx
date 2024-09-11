import { IStock } from "../../interfaces/IStock.tsx";

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



export { GetStock,
  GetDataSupplier,
  AddStock,
 };
