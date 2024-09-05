import React, { useState } from "react";
import { Layout, Button, Row, Col, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Supplier from "../../assets/ImgStock/phone.png";
import Pngicon from "../../assets/png.png";
import CategoryCard from "../../Compornent/Category/CategoryCard"; 
import './Mangestock.css';

const { Header, Content } = Layout;

export default function ManageStock() {
  const navigate = useNavigate();
  
  const categories = [
    // ... (ข้อมูล categories คงเดิม)
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCategoryClick = (link) => {
    navigate(link);
  };

  const options = filteredCategories.map((category) => ({
    value: category.title,
    label: category.title,
    onClick: () => handleCategoryClick(category.link)
  }));

  return (
    <Layout>
      <Header className="header">
        <h1 className="header-title">จัดการข้อมูลสินค้า</h1>
        <AutoComplete
          className="autocomplete"
          options={options}
          onSearch={handleSearch}
          onSelect={(value, option) => option.onClick()}
          placeholder="ค้นหาชื่อหมวดหมู่สินค้า"
          suffixIcon={<SearchOutlined />}
        />
      </Header>
      <Content className="content">
        <Row className="content-row">
          <Col span={18} className="left-column">
            <Row justify="center" className="category-title">
              <h1>หมวดหมู่ประเภทคลังสินค้า</h1>
            </Row>

            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={index}
                imgSrc={category.imgSrc}
                title={category.title}
                description={category.description}
                onClick={() => handleCategoryClick(category.link)}
              />
            ))}
          </Col>

          <Col span={6} className="right-column">
            <Row justify="center" className="supplier-title">
              <h1>ข้อมูลผู้จัดหา (Supplier)</h1>
            </Row>

            <Row justify="center" align="middle" className="supplier-content">
              <div>
                <div className="supplier">
                  <img
                    src={Supplier}
                    alt="Supplier"
                    className="supplier-img"
                  />
                  <Button type="primary" onClick={() => navigate("/ManageStock/Supplier")}>
                    จัดการข้อมูลผู้จัดหา
                  </Button>
                </div>
                <div className="supplier-info">
                  <h1>คำแนะนำ</h1>
                  <h1 className="supplier-info-text">
                    กรุณาเพิ่มข้อมูลผู้จัดหา (Supplier) ก่อนเพิ่มข้อมูลสินค้า
                  </h1>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}