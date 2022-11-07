import "../styles/App.css";
import { useEffect } from "react";

import { Cart, Create, Detail, Home, NoPage } from "../pages/index";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components/index";


import { ToastContainer, toast } from 'react-toastify';

import {
  cartAsyncThunk,
} from "../features/products/productSlice";


import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch } from "react-redux";

function App() {
  const dispatch=useDispatch();
 useEffect(()=>{
   dispatch(cartAsyncThunk());
 })
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="detail/:id" element={<Detail/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="create" element={<Create/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>

        <Footer />

        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;


// From validation (simple)
// redux toolkit thunk api post (simple)
// thunk api get (simple)
// toastify (simple)
// more data  (simple)
// iterate from state men vs women (simple)


// favourite scheme 
//create cart
// add or remove from favourite
// iterate from the cart
// details page to go through  the details page
// final touch 
// comments
// refactoy
// git 
// hosting
