import React from "react";
import { Routes, Route} from "react-router-dom";
import "../../App.css";
import { Breadcrumb, Layout,  theme, message } from "antd";
import Dashboard from "../Pages/dashboard";
import Member from "../Pages/member/member";
import MemberCreate from "../Pages/member/create";
import MemberEdit from "../Pages/member/edit";
import Employee from "../Pages/Employee/employee";
import EmployeeCreate from "../Pages/Employee/create";
import EmployeeEdit from "../Pages/Employee/edit";
import Sider from "../Sider/sider";
import ProfileEdit from "../Pages/ProfileEdit/profileEdit";
import Payment from "../Pages/Payment/payment";
import ChangePassword from "../Pages/ProfileEdit/changePassword";
import ManageStock from "../Pages/Managestock/Managestock";
import StockBeveragesAndDesserts from "../Pages/stock-data/StockBeveragesAndDesserts";
import StockCondimentsAndSauce from "../Pages/stock-data/StockCondimentsAndSauce";
import StockMeat from "../Pages/stock-data/StockMeat";
import StockNoodlesAndDough from "../Pages/stock-data/StockNoodlesAndDough";
import StockSeafood from "../Pages/stock-data/StockSeafood";
import StockVegetable from "../Pages/stock-data/StockVegetable";



const {Content} = Layout;


const FullLayout: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <>
    {contextHolder}
    <Layout style={{ minHeight: "100vh", maxHeight:"100vh"}}>
      <Sider />

      <Layout style={{backgroundColor:"#FEFFD2", minHeight: "100vh", maxHeight:"100vh"}}> 
        <Content style={{ margin: "0 30px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              //maxHeight: "90%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/member" element={<Member />} />
              <Route path="/member/create" element={<MemberCreate />} />
              <Route path="/member/edit/:id" element={<MemberEdit />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/create" element={<EmployeeCreate />} />
              <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="/profileEdit" element={<ProfileEdit />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/ManageStock" element={<ManageStock />} />
              <Route path="/ManageStock/Meat" element={<StockMeat />} />
              <Route path="/ManageStock/Vegetable" element={<StockVegetable />} />
              <Route path="/ManageStock/CondimentsAndSauce" element={<StockCondimentsAndSauce />} />
              <Route path="/ManageStock/Seafood" element={<StockSeafood />} />
              <Route path="/ManageStock/NoodlesAndDough" element={<StockNoodlesAndDough />} />
              <Route path="/ManageStock/BeveragesAndDesserts" element={<StockBeveragesAndDesserts />} />

            </Routes>
          </div>
        </Content>
      </Layout>

    </Layout>
  </>
  );
};

export default FullLayout;