import React, { useState } from "react";

import { Tabs, ProductCard, Header } from "../components/index";
import styles from "../styles/Home.module.css";

import { useSelector } from "react-redux";

import {
  fetchAsyncThunk,
  cartAsyncThunk,
  getAllProducts,
  getItemsFromcart,
} from "../features/products/productSlice";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncThunk());
  }, []);

  const products = useSelector(getAllProducts);

  
  const cartItmes = useSelector(getItemsFromcart);


  const [showMensT, setShowMensT] = useState(true);

  

  // function checkFav(id){
  //   let result=false;
  //      result=  cartItmes.map((item)=>{
  //       // console.log(item , id);
  //       if(item.id===id){
  //         // console.log("found")
  //         return true;
  //       }
  //      })

  //      return result;
  // }

  function renderCards(products) {

    if(products!=undefined){
      const renderedProducts = products.map((product) => {
         let result=false;
         if(cartItmes!=undefined){
          result=cartItmes.map(item=>{
            if(item.id===product.id){
              result= true;
            }
          })
         }
          
        return <ProductCard product={product} isFav={result}  />;
      });
  
      return renderedProducts;
    }
    
  }

  function showMenOrWomen() {
    if (showMensT) {
      return renderCards(products.men);
    } else {
      return renderCards(products.women);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.homeWrapper}>
        <Tabs setShowMensT={setShowMensT} showMensT={showMensT} />     
        <div className={styles.cardsContainer}>{showMenOrWomen()}</div>
      </div>
    </>
  );
}

export default Home;
