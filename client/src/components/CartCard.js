import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/CartCard.module.css";

import {deleteFromFavAsyncThunk} from '../features/products/productSlice'
import { useNavigate } from "react-router-dom";
function CartCard({product}) {

  const [isHover , setIsHover]=useState(false);

  const navigate=useNavigate();


  const dispatch=useDispatch();

  function getProductDetails(product){

    navigate(`/detail/${product.id}`)
     return;
  }

  return (
    <>
    <div className={styles.cartCardWrapper}  onMouseLeave={()=>{setIsHover(false)}} onMouseEnter={()=>setIsHover(true)}>
      <div className={styles.imageContainer} >
        <img src={product.url} onClick={()=>getProductDetails(product)}/>
      </div>
      <div className={styles.detailsContainer}>
        <div className="nameContainer">
          <h3>{product.name}</h3>
        </div>
        <div className="quantityWrapper">
          <div className="sizepriceWrapper">
            <div className="priceContainer">
              <h3>{product.price}</h3>
            </div>
          </div>
            
        

        </div>
        {
        isHover?<button className={styles.delButton} onClick={()=>{
          dispatch(deleteFromFavAsyncThunk(product));
        }

        }><i class="fa-solid fa-x"></i></button> :null}
      </div>
    </div>
    </>
  );
}

export default CartCard;
