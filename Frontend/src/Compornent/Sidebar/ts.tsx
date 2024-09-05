// Sidebar.tsx
import './Sidebar.css';
import React, { useState, useCallback } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar"
        style={{ backgroundColor: "#fff" }}
      >
        <Menu
          selectedKeys={[location.pathname]}
          className="menu-bar"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/ManageStock" icon={<PieChartOutlined />}>
            <Link to="/ManageStock">Manage Stock</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            className="toggle"
            onClick={handleCollapse}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: 3, background: '#fff' }}>
          <div>G16-สุดหล่อ</div>
        </Footer>
      </Layout>
    </Layout>
  );
};

/*
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login/Login";
import ManageStock from "./page/Managestock/Managestock";
import Sidebar from "./Compornent/Sidebar/Sidebar";
import StockMeat from "./page/StockMeat/StockMeat";
import Supplier from "./page/Supplier/Suppliper";
import StockVegetable from "./page/StockVegetable/StockVegetable";
import StockFlour from "./page/StockFlour/StockFlour";
import StockCondiment from "./page/StockCondiment/StockCondiment";
import StockCategory from "./Compornent/StockCategory/StockCategory";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<StockCategory />} />
        <Route path="/ManageStock" element={<Sidebar />}>
          <Route index element={<ManageStock />} />
          <Route path="Meat" element={<StockMeat />} />
          <Route path="Vegetable" element={<StockVegetable />} />
          <Route path="Flour" element={<StockFlour />} />
          <Route path="Condiment" element={<StockCondiment />} />
          <Route path="Supplier" element={<Supplier />} />
        </Route>
      </Routes>
    </Router>
  );
}*/