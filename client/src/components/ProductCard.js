import React, { useEffect, useState } from "react";

import "../styles/ProductCard.css";

import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToFavAsyncThunk,
  deleteFromFavAsyncThunk,
  getItemsFromcart,
  getMovieAsyncThunk
} from "../features/products/productSlice";
import { Navigate , redirect, useNavigate} from "react-router-dom";

function searchFromcart() {}

function addToCart() {}

function deleteFromCart() {}

function addOrDelteFromCart() {
  // check if the product is on cart
  // if not then add to cart
  // then delte from cart
  //create 3 funtion
  // search from cart
  //add to cart
  //delet from cart
}

function ProductCard({ product   }) {

  const dispatch = useDispatch();
  const navigate=useNavigate();

  // dispatch(getMovieAsyncThunk(product))

  function getProductDetails(product){

    navigate(`/detail/${product.id}`)
    
     return;
  }
  const cartItmes = useSelector(getItemsFromcart);

  let result = false;

  function checkFav(id) {
    if(cartItmes !=undefined){
      cartItmes.map((item) => {
        if (item.id === id) {
          result = true;
        }
      });
    }
    
    return result;
  }

  checkFav();

  const [fav, setFav] = useState(result);

  return (
    <div className="productCard" onClick={()=>{
      console.log("testing")
      getProductDetails(product);
    }}>
      <div className="imageContainer">
        <img src={product.url} />
      </div>
      <div className="infoContaienr">
        <div>
          <h3>{product.name}</h3>
        </div>
        <div className="priceRatingContainer">
          <div>{product.price}</div>
          <div>
            <button className="favButton"
              onClick={() => {
                if (checkFav(product.id)) {
                  console.log("delet from fav");

                  const deletFromFavourites = async () => {
                    const result = await dispatch(
                      deleteFromFavAsyncThunk(product)
                    );
                    if (result.meta.requestStatus === "fulfilled") {
                      setFav(false);
                    }
                  };

                  deletFromFavourites();

                } else {
                  console.log("false  add to fav");

                  const addtofav = async () => {
                    const result = await dispatch(addToFavAsyncThunk({...product , quantity:1}));
                    if (result.meta.requestStatus === "fulfilled") {
                      setFav(true);
                    }
                  };
                  addtofav();
                }
              }}
            >
              { checkFav(product.id)? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
