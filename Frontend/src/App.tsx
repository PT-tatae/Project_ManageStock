import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login/Login";
import ManageStock from "./page/Managestock/Managestock";
import Sidebar from "./Compornent/Sidebar/Sidebar";
import StockMeat from "./page/StockMeat/StockMeat";
import Supplier from "./page/Supplier/Suppliper";
import StockVegetable from "./page/StockVegetable/StockVegetable";
import StockCondimentsAndSauce from './page/StockCondimentsAndSauce/StockCondimentsAndSauce';
import StockSeafood from './page/StockSeafood/StockSeafood';
import StockNoodlesAndDough from './page/StockNoodlesAndDough/StockNoodlesAndDough';
import StockBeveragesAndDesserts from './page/StockBeveragesAndDesserts/StockBeveragesAndDesserts';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/ManageStock" element={<Sidebar />}>
          <Route index element={<ManageStock />} />
          <Route path="Meat" element={<StockMeat />} />
          <Route path="Vegetable" element={<StockVegetable />} />
          <Route path="CondimentsAndSauce" element={<StockCondimentsAndSauce />} />
          <Route path="Supplier" element={<Supplier />} />
          <Route path="Seafood" element={<StockSeafood />} />
          <Route path="NoodlesAndDough" element={<StockNoodlesAndDough />} />
          <Route path="BeveragesAndDesserts" element={<StockBeveragesAndDesserts />} />

        </Route>
      </Routes>
    </Router>
  );
}