import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const initialState = {
  products: [],
  cart: [],
};



export const fetchAsyncThunk = createAsyncThunk(
  "products/fetchAsyncThunk",
  async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const addAsyncThunk = createAsyncThunk(
  "products/addAsyncThunk",
  async (requestOptions) => {
    const response = await fetch(
      "http://localhost:3001/products",
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

export const cartAsyncThunk = createAsyncThunk(
  "products/checkAsyncThunk",
  async () => {
    const response = await fetch("http://localhost:3001/cart");
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const addToFavAsyncThunk = createAsyncThunk(
  "products/addToFavAsyncThunk",
  async (product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    const response = await fetch("http://localhost:3001/cart", requestOptions);
    const data = await response.json();
    return data;
  }
);

export const deleteFromFavAsyncThunk = createAsyncThunk(
  "products/deleteFromFavAsyncThunk",
  async (product) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    let id = product.id;
    const response = await fetch(
      `http://localhost:3001/cart/${id}`,
      requestOptions
    );
    const data = await response.json();
    return id;
  }
);

export const getMovieAsyncThunk=createAsyncThunk("products/getMovieAsyncThunk",
   async(id)=>{
    const requestOptions={
      method:"GET",
      headers:{"Content-Type":"application/json"},
    }

    
    const response=await fetch(`http://localhost:3001/products/${id}` , requestOptions);
    const data=await response.json();
    return data;
   }
)
export const deleteProductAsyncThunk=createAsyncThunk("products/deleteProductAsyncThunk",
    async(id)=>{
      const requestOptions={
        method:"DELETE",
      }
      const response=await fetch(`http://localhost:3001/products/${id}`, requestOptions);
      const data=await response.json();
      return data;
    }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {

    [deleteProductAsyncThunk.fulfilled]:(state , {payload})=>{
      toast("deleted");
      // navigate to home
      return state;
    },

    [fetchAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("got all products", { theme: "dark", autoClose: 600 });
      return { ...state, products: payload };
    },

    [addAsyncThunk.fulfilled]: (state, { payload }) => {
      state.products.push(payload);
      toast.success("product created", { theme: "dark", autoClose: 600 });
      return state;
    },

    [addAsyncThunk.rejected]: (state, { payload }) => {
      console.log("rejected in adding a new products");
      return state;
    },
    [cartAsyncThunk.fulfilled]: (state, { payload }) => {
      return { ...state, cart: payload };

    },
    [addToFavAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("added to fav", { theme: "dark", autoClose: 600 });
      state.cart.push(payload);
      console.log(state);
      return state;
    },
    [deleteFromFavAsyncThunk.fulfilled]: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
      toast.success("removed from fav", { theme: "dark", autoClose: 600 });
      return state;
    }
    ,
    [getMovieAsyncThunk.fulfilled]:(state,{payload})=>{
      // console.log(payload);
      return state
    }
  },  
});

//expo  rt the state;

//export the actions for disptaching anywhere from the app

//defautl eport for the reducers

export const getAllProducts = (state) => {
  const products = {
    men: [],
    women: [],
  };

  const allproducts = state.products.products;
    if(allproducts!=undefined){
      allproducts.map((product) => {
        if (product.men === "true") {
          products.men.push(product);
        } else {
          products.women.push(product);
        }
      });
    }
   
  return products;
};

export const getItemsFromcart = (state) => {
  const cartItems = state.products.cart;
  return cartItems;
};

export default productSlice.reducer;
