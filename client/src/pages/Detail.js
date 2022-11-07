import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


import { Navbar } from "../components/index";
import productSlice ,{ getMovieAsyncThunk ,addToFavAsyncThunk, getItemsFromcart , deleteProductAsyncThunk ,deleteFromFavAsyncThunk}from "../features/products/productSlice";

import styles from "../styles/Detail.module.css";
function Detail() {
  let { id } = useParams();
  const dispatch=useDispatch();
  
  const [product , setProduct]=useState({});
  const navigate=useNavigate();
  const cartItmes = useSelector(getItemsFromcart);

 let result=false;
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

  useEffect(()=>{
    const getdatas=async ()=>{
      const response=await dispatch(getMovieAsyncThunk(id));
       if(response.type==='products/getMovieAsyncThunk/fulfilled'){
        //  product=response.payload;
         setProduct(response.payload)
        }
       console.log(product)
    }
    getdatas();
  },[])
  
  return (
    <>
      <Navbar />
      <div className={styles.detailsWrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.mainImgContainer}>
            <img src={product.url} />
          </div>

          <div className={styles.secondaryImgContainer}>
            <div className={styles.secondaryImages}>
              <img
                className={styles.images}
                src={product.url}
              />
              <img
                className={styles.images}
                src={product.url}
              />
            </div>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h3>{product.name}</h3>
          <h3>{product.price}$</h3>
          <h3>Color: {product.color}</h3>
          <div className={styles.sizes}>
          <h3>Size  </h3>
          <h3>{product.sizeS?<button>S</button> :""} </h3>
          <h3>{product.sizeM ?<button>M</button>:""} </h3>
          <h3>{product.sizeL?<button>L</button>:""} </h3>
          </div>
          <button   
              onClick={() => {
                if (checkFav(product.id)) {
                  console.log("delet from fav");

                  const deletFromFavourites = async () => {
                    const result = await dispatch(
                      deleteFromFavAsyncThunk(product)
                    );
                    if (result.meta.requestStatus === "fulfilled") {
                      
                    }
                  };

                  deletFromFavourites();

                } else {
                  console.log("false  add to fav");

                  const addtofav = async () => {
                    const result = await dispatch(addToFavAsyncThunk({...product , quantity:1}));
                    if (result.meta.requestStatus === "fulfilled") {
                    }
                  };
                  addtofav();
                }
              }}
            >
              { checkFav(product.id)? (
                
                "Remove from cart"
              ) : (
               "Add to cart"
              )}
            </button>
          <button onClick={()=>{
            const delteAProduct=async(id)=>{
              const response=await  dispatch(deleteProductAsyncThunk(id));
              console.log(response);
              if(response.type==="products/deleteProductAsyncThunk/fulfilled"){
                navigate(`/`);
              }
            }
           delteAProduct(product.id);

          }}>Delet product</button>
        </div>
      </div>
    </>
  );
}

export default Detail;
