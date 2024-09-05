import { useState, useEffect } from "react";
import { Layout, Input, Button, Form, Select, DatePicker, Table, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

export default function StockCategory({ categoryTitle, initialData }) {
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    console.log("ข้อมูล initialData ฝั่ง StockCategory:", data); // ตรวจสอบข้อมูลที่ถูกส่งไปแสดงในตาราง
  }, [data]);


  useEffect(() => {
    setData(initialData); // ตั้งค่าข้อมูลที่รับมาจาก props
  }, [initialData]);

  const handleBackClick = () =>{
      navigate("/ManageStock");
  }

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

  const handleFinish = (values) => {
    const newItem = {
      key: data.length + 1,
      ...values,
      importDate: values.importDate.format("YYYY-MM-DD HH:mm"),
      expiryDate: values.expiryDate.format("YYYY-MM-DD HH:mm"),
    };

    setData([...data, newItem]);
    setIsAdding(false);
    form.resetFields();
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
        <h1 style={{ margin: 0 ,fontSize:'24px'}}>สินค้าประเภท {categoryTitle}</h1>
        <Search
          placeholder="ค้นหาชื่อสินค้า"
          style={{ width: 300 }}
          onSearch={(value) => console.log(value)}
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

            <Table dataSource={data} columns={columns} />
          </>
        ) : (
          <Row gutter={16}>
            <Col span={18}>
              <Table dataSource={data} columns={columns} />
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
