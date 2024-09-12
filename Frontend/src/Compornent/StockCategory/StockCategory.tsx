import { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
  Table,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { IStock} from "../../interfaces/IStock.tsx";
import { Update} from "../../interfaces/Update.tsx";
import { AddStock, GetSupplierName ,UpdateStock} from "../../services/https/index.tsx";
import moment from "moment";

const { Header, Content } = Layout;
const { Option } = Select;

export default function StockCategory({
  categoryTitle,
  initialData,
  categoryID,
}) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false); // แสดง/ไม่แสดง ของ form หลัก
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false); //ลูกเล่นปิด/เปิด form Disabled
  const [form] = Form.useForm();
  const [data] = useState(initialData); //รับข้อมูลมา
  const [query, setQuery] = useState(""); // การค้นหา
  const [filteredData, setFilteredData] = useState(initialData);  // ข้อมูลที่ฟิวเตอร์แล้ว
  const [editingRecord, setEditingRecord] = useState(null); // ข้อมูลที่กำลังแก้ไข
  const [suppliers, setSuppliers] = useState([]); // รายชื่อผู้จัดจำหน่าย
  const [products, setProducts] = useState([]); // รายชื่อสินค้า
  const [formDisabled, setFormDisabled] = useState(false); //
  const [open, setOpen] = useState(false); //  42 and 43 เป็นลูกเล่นเปิดปิด form

  useEffect(() => {
    setFilteredData(initialData);
  }, [initialData]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await GetSupplierName();
      if (data && data.data) {
        setSuppliers(
          data.data.map((supplier) => ({
            id: supplier.SupplierID,
            name: supplier.supplier_name,
          }))
        );
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (filteredData.length > 0) {  // กรองสินค้าที่ไม่ซ้ำจากข้อมูลที่กรองแล้ว
      const uniqueCodes = new Set();
      const mappedProducts = filteredData.reduce((acc, item) => {
        if (!uniqueCodes.has(item.code)) {
          uniqueCodes.add(item.code);
          acc.push({ code: item.code, name: item.name });
        }
        return acc;
      }, []);
      setProducts(mappedProducts);
    }
  }, [filteredData]);

  const handleQueryChange = useCallback(
    debounce((value) => { // ฟังก์ชันค้นหาข้อมูลแบบดีเลย์
      const lowercasedQuery = value.toLowerCase();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }, 300),
    [data]
  );

  const handleInputChange = (e) => {
    const value = e.target.value; // จัดการการเปลี่ยนแปลงของ input ค้นหา
    setQuery(value);
    handleQueryChange(value);
  };

  const handleBackClick = () => {
    navigate("/ManageStock");
  };

  const handleProductSelect = (value) => {
    const selectedProduct = products.find((product) => product.code === value); // ฟังก์ชันจัดการเมื่อเลือกสินค้า
    if (selectedProduct) {
      form.setFieldsValue({
        code: selectedProduct.code,
        name: selectedProduct.name,
      });
      setFormDisabled(true);
    }
  };

  const handleEditClick = (record) => { // ฟังก์ชันเริ่มการแก้ไขข้อมูล
    const importDateMoment = moment(record.importDate, "M/D/YYYY hh:mm:ss");
    const expiryDateMoment = moment(record.expiryDate, "M/D/YYYY hh:mm:ss");
    setEditingRecord({
      ...record,
      stock_id: record.code_stock,  // เพิ่ม stock_id (รหัสรายการ)
    });
    form.setFieldsValue({
      code: record.code,
      name: record.name,
      quantity: record.quantity,
      price: record.price,
      importDate: importDateMoment.isValid() ? importDateMoment : null,
      expiryDate: expiryDateMoment.isValid() ? expiryDateMoment : null,
      supplier: record.supplier,
    });
    setIsDatePickerDisabled(true);
    setFormDisabled(false);
    setOpen(true);
    setIsAdding(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setOpen(false);
    setIsDatePickerDisabled(false);
    setIsAdding(true);
  };

  const handleFinish = async (values) => {
    const newItem: IStock = {
      category_id: categoryID,
      product_code_id: values.code,
      product_name: values.name,
      quantity: Number(values.quantity),
      price: Number(values.price),
      date_in: values.importDate.format("YYYY-MM-DDTHH:mm:ssZ"),
      expiration_date: values.expiryDate.format("YYYY-MM-DDTHH:mm:ssZ"),
      supplier_id: Number(values.supplier), // แปลงเป็น number
      employee_id: 1, //ยังไม่ได้เชื่อมกับเพื่อน
    };
  
    try {
      let result;
  
      if (editingRecord) {
        // แก้ไขข้อมูลเดิม
        const updatedItem: Update = {
          ...newItem,
          stock_id: Number(editingRecord.stock_id), // แปลงเป็น number
        };
        //result = await UpdateStock(updatedItem); // เรียกฟังก์ชัน API สำหรับการแก้ไข
        //console.log("updatedItem",updatedItem);
        result = await UpdateStock(updatedItem);
        
      } else {
        // เพิ่มข้อมูลใหม่
        result = await AddStock(newItem); 
      }
  
      if (result) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error in submitting stock:", error);
    }
  };
  

  const openForm = () => {
    setIsAdding(true);
    setFormDisabled(false);
    form.resetFields();
    setOpen(true);
    form.setFieldsValue({ code: "เพิ่มสินค้าใหม่" });
  };

  const columns = [
    { title: "รหัสรายการ", dataIndex: "code_stock", key: "code_stock" },
    { title: "รหัสสินค้า", dataIndex: "code", key: "code" },
    { title: "ชื่อสินค้า", dataIndex: "name", key: "name" },
    { title: "จำนวน", dataIndex: "quantity", key: "quantity" },
    { title: "ราคา (บาท)", dataIndex: "price", key: "price" },
    { title: "ผู้จัดจำหน่าย", dataIndex: "supplier", key: "supplier" },
    { title: "วันที่นำเข้า", dataIndex: "importDate", key: "importDate" },
    { title: "วันหมดอายุ", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "แก้ไขข้อมูล",
      key: "activity",
      render: (record) => (
        <Button onClick={() => handleEditClick(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header
        className="header"
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>
          สินค้าประเภท {categoryTitle}
        </h1>
        <Input
          placeholder="ค้นหาชื่อสินค้า"
          style={{ width: 300 }}
          value={query}
          onChange={handleInputChange}
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
            <Col
              span={6}
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
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
                  <Row>
                    <Col span={isAdding && editingRecord === null ? 12 : 24}>
                      <Select
                        placeholder="เลือกรหัสสินค้า"
                        onChange={handleProductSelect}
                        disabled={open}
                        value={form.getFieldValue('code')}
                      >
                        {products.map((product) => (
                          <Option key={product.code} value={product.code}>
                            {product.code} - {product.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>

                    {isAdding && editingRecord === null && (
                      <Col span={12}>
                        <Button
                          onClick={openForm}
                          type="primary"
                          style={{ marginLeft: 10 }}
                        >
                          <PlusSquareOutlined />
                          ไม่มีรหัส ? คลิกเพื่อเพิ่ม
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Form.Item>

                <Form.Item
                  label="ชื่อสินค้า"
                  name="name"
                  rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
                >
                  <Input placeholder="กรอกชื่อสินค้า" disabled={formDisabled} />
                </Form.Item>

                <Form.Item
                  label="จำนวน"
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
                  rules={[
                    { required: true, message: "กรุณาเลือกผู้จัดจำหน่าย" },
                  ]}
                >
                  <Select placeholder="เลือกผู้จัดจำหน่าย">
                    {suppliers.map((supplier) => (
                      <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="วันที่นำเข้า"
                  name="importDate"
                  rules={[
                    { required: true, message: "กรุณาเลือกวันที่นำเข้า" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    showTime={{ format: "HH:mm" }}
                    format="M/D/YYYY HH:mm:ss"
                    disabled={isDatePickerDisabled}
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
                    format="M/D/YYYY HH:mm:ss"
                    disabled={isDatePickerDisabled}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {editingRecord ? "บันทึก" : "เพิ่ม"}
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
