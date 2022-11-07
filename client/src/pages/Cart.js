import React, { useEffect, useState } from "react";
import { CartCard, Navbar } from "../components/index";

import { getItemsFromcart } from "../features/products/productSlice";

import { useSelector } from "react-redux";

import "../styles/Cart.css";

function Cart() {
  let cartItems=[];
  cartItems = useSelector(getItemsFromcart); 

  
  function GetCartItmes(){
    cartItems = useSelector(getItemsFromcart);  
  }

  // const [eligibleDiscoud , setEligibleDiscound] =useState(0);

  const [useDiscound, setUseDiscound] = useState(false);
  let total = 0;
  let eligibleDisound = 0;

  function renderCartItems(cartItems) {
    if(cartItems!=undefined){

      const renderedItems = cartItems.map((product) => {
        total += parseInt(product.price);
        return <CartCard product={product} />;
      });
      return renderedItems;
    }
    else{
       console.log(cartItems)
    }
  }

  function eligibleDidcounds() {
    let disounds = "";
    if (total > 1000) {
      if (total > 2000) {
        disounds = (
          <p>
            Get <strong>{"20%"}</strong> offer of <strong>{total / 5}</strong>$
            on top of your <strong>{total}$</strong>
          </p>
        );
        eligibleDisound = total / 5;
        return disounds;
      }
      disounds = <p>Get 10%</p>;
      disounds = (
        <p>
          Get <strong>{"10%"}</strong> offer of <strong>{total / 10}</strong>$
          on top of your <strong>{total}$</strong>
        </p>
      );
      eligibleDisound = total / 10;
      return disounds;
    }
    disounds = <p>Shop more for {1000 - total}$ to get 10% discound </p>;
    return disounds;
  }

  return (
    <>
    
      <Navbar />
      <div className="cartContainerWrapper">
      {GetCartItmes()}
        <div className="cartCardList">
          {renderCartItems(cartItems)}

          {/* render cards */}
          {/* small staate for each  */}
        </div>

        <div className="cartTotalContainer">
          {/* big staet to add total*/}

          <div className="offersContainer">
            <h3>Offers and Cashback</h3>

            <p>on purchase above 2000 get 20% Cashback</p>
            <p>on purchase above 1000 get 10% Cashback</p>
            <p>
              * on purchasing with XXX debit or credit card get flat 10%
              additional discound valid till December 1 2022
            </p>
          </div>
          <div className="deliveryContiaer">
            <span>
              <h3>Shiping address:</h3>
              <p> 28 sai ram nagar, zamin uttukuli, pollachi </p>
            </span>
            <button>change address</button>
          </div>

          <div className="applyDiscounds">
            <div className="eligibleDiscounds">
              <h3>Eligible discounds</h3>
              <p>{eligibleDidcounds()}</p>
              {total > 1000 ? (
                <button
                  onClick={() => {
                    setUseDiscound(!useDiscound);
                  }}
                  className={useDiscound? "removeDiscound" :"addDiscound"}
                >
                  {useDiscound ? " Discound Applied" : " Get Disound"}
                </button>
              ) : null}
            </div>
          </div>


          {/* details pagee*/}
          {/* add or remofe from cart */}
          {/* edit product */}
          {/* delet product */}

          <div className="productDetailsContainer">
            <h3>Order details:</h3>
            <p>Cart items: {cartItems && cartItems.length}</p>

            <p> Dicsound: {useDiscound ? eligibleDisound : 0}$</p>
            <p> Total: {total}$</p>
            {useDiscound ? (
              <h3>Buy now at {total - eligibleDisound}$</h3>
            ) : (
              <h3>Buy now at {total}$</h3>
            )}
          </div>
          <div className="princeContainer"></div>
          <div className="placeOrderContainer">
            <button>Place order</button>
          </div>

          {/* <div className="buyNowButtonContainer">
            <button><h2> BUY NOW </h2></button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Cart;
