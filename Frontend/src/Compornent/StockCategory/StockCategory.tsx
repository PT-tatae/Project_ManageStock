import { useState, useEffect, useCallback } from "react";
import { Layout, Input, Button, Form, Select, DatePicker, Table, Row, Col } from "antd";
import {SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import {IStock } from "../../interfaces/IStock.tsx";
import { AddStock } from "../../services/https/index.tsx";

const { Header, Content } = Layout;
const { Option } = Select;

export default function StockCategory({ categoryTitle, initialData }) {
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    setFilteredData(initialData); // ตั้งค่าข้อมูลที่รับมาจาก props
  }, [initialData]);

  const handleQueryChange = useCallback(
    debounce((value) => {
      const lowercasedQuery = value.toLowerCase();
      const filtered = data.filter(item => 
        item.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }, 300), // ใส่ดีเลย์ 300 มิลลิวินาที (ปรับค่าได้ตามต้องการ)
    [data]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleQueryChange(value); // เรียกใช้ debounce function
  };

  const handleBackClick = () => {
    navigate("/ManageStock");
  };

  const columns = [
    { title: "รหัสรายการ", dataIndex: "codelist", key: "codelist" },
    { title: "รหัสสินค้า", dataIndex: "code", key: "code" },
    { title: "ชื่อสินค้า", dataIndex: "name", key: "name" },
    { title: "จำนวน ", dataIndex: "quantity", key: "quantity" },
    { title: "ราคา (บาท)", dataIndex: "price", key: "price" },
    { title: "ผู้จัดจำหน่าย", dataIndex: "supplier", key: "supplier" },
    { title: "วันที่นำเข้า", dataIndex: "importDate", key: "importDate" },
    { title: "วันหมดอายุ", dataIndex: "expiryDate", key: "expiryDate" },
  ];

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleFinish = async (values) => {
    const newItem: IStock = {
      category_id: 6, // เปลี่ยนเป็น category_id
      product_code_id: values.code, // เปลี่ยนเป็น product_code_id
      product_name: values.name, // เปลี่ยนเป็น product_name
      quantity: Number(values.quantity),
      price: Number(values.price),
      date_in: values.importDate.format("YYYY-MM-DDTHH:mm:ssZ"), // เปลี่ยนเป็น date_in
      expiration_date: values.expiryDate.format("YYYY-MM-DDTHH:mm:ssZ"), // เปลี่ยนเป็น expiration_date
      supplier_id: 2, // เปลี่ยนเป็น supplier_id
      employee_id: 1  // เปลี่ยนเป็น employee_id
    };
    console.log("add_naw", newItem);
    try {
      const result = await AddStock(newItem);
      if (result) {
        window.location.reload();
        // setData([...data, newItem]);
        // setFilteredData([...filteredData, newItem]);
        // setIsAdding(false);
        // form.resetFields();
      }
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };
  

  return (
    <Layout>
      <Header className="header"
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize:'24px' }}>สินค้าประเภท {categoryTitle}</h1>
        <Input
          placeholder="ค้นหาชื่อสินค้า"
          style={{ width: 300 }}
          value={query}
          onChange={handleInputChange} // อัปเดต query พร้อมดีเลย์
          suffix={<SearchOutlined />}
        />
      </Header>
      <Content style={{ padding: "20px" }}>
        {!isAdding ? (
          <>
            <Row style={{ marginBottom: "20px" }} justify="space-between">
              <Col>
                <Button type="primary" onClick={handleBackClick}>
                  ย้อนกลับ
                </Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleAdd}>
                  เพิ่ม
                </Button>
              </Col>
            </Row>

            <Table dataSource={filteredData} columns={columns} />
          </>
        ) : (
          <Row gutter={16}>
            <Col span={18}>
              <Table dataSource={filteredData} columns={columns} />
            </Col>
            <Col span={6} style={{background: '#ffffff',borderRadius: '8px', padding: '20px' ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ maxWidth: 600, margin: "auto" }}
              >
                <Form.Item
                  label="รหัสสินค้า"
                  name="code"
                  rules={[{ required: true, message: "กรุณากรอกรหัสสินค้า" }]}
                >
                  <Input placeholder="กรอกรหัสสินค้า" />
                </Form.Item>

                <Form.Item
                  label="ชื่อสินค้า"
                  name="name"
                  rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
                >
                  <Input placeholder="กรอกชื่อสินค้า" />
                </Form.Item>

                <Form.Item
                  label="จำนวน "
                  name="quantity"
                  rules={[{ required: true, message: "กรุณากรอกจำนวน" }]}
                >
                  <Input type="number" placeholder="กรอกจำนวน" />
                </Form.Item>

                <Form.Item
                  label="ราคา (บาท)"
                  name="price"
                  rules={[{ required: true, message: "กรุณากรอกราคา" }]}
                >
                  <Input type="number" placeholder="กรอกราคา (บาท)" />
                </Form.Item>

                <Form.Item
                  label="ผู้จัดจำหน่าย"
                  name="supplier"
                  rules={[{ required: true, message: "กรุณาเลือกผู้จัดจำหน่าย" }]}
                >
                  <Select placeholder="เลือกผู้จัดจำหน่าย">
                    <Option value="Supplier A">Supplier A</Option>
                    <Option value="Supplier B">Supplier B</Option>
                    <Option value="Supplier C">Supplier C</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="วันที่นำเข้า"
                  name="importDate"
                  rules={[{ required: true, message: "กรุณาเลือกวันที่นำเข้า" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>

                <Form.Item
                  label="วันหมดอายุ"
                  name="expiryDate"
                  rules={[{ required: true, message: "กรุณาเลือกวันหมดอายุ" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    บันทึก
                  </Button>
                  <Button
                    type="default"
                    onClick={() => setIsAdding(false)}
                    style={{ marginLeft: "10px" }}
                  >
                    ยกเลิก
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
}
