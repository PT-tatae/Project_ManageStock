import './Sidebar.css';
import React, { useState, useCallback, useMemo } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const Sidebar: React.FC = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const handleMenuClick = useCallback((key: string) => {
    switch(key) {
      case 'home':
        navigate('/');
        break;
      case 'manage_stock':
        navigate('/ManageStock');
        break;
      // Add more cases as needed
    }
  }, [navigate]);

  const menuItems = useMemo(() => [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'manage_stock', icon: <PieChartOutlined />, label: 'Manage Stock' },
  ], []);

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
          selectedKeys={[location.pathname === '/' ? 'home' : 'manage_stock']}
          onClick={({key}) => handleMenuClick(key)}
          className="menu-bar"
          items={menuItems}
        />
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
});

export default Sidebar;