import React, { useState } from "react";

import styles from "../styles/Create.module.css";
import { Navbar } from "../components/index";

import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

import {addAsyncThunk} from '../features/products/productSlice';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  color: "",
  men: "",
  name: "",
  price: "",
  sizeL: "",
  sizeM: "",
  sizeS: "true",
  url: "",
};

function Create() {
  const dispatch=useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const [product, setProduct] = useState(null);
  const navigate=useNavigate();

  const createAproduct=async(data)=> {
    
    const uniqueid = uuidv4();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: uniqueid, ...data }),
    };

    // console.log(requestOptions);

    // fetch("http://localhost:3001/products", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    const response=await dispatch(addAsyncThunk(requestOptions));
    

    reset({
      color: "",
      men: "",
      name: "",
      price: "",
      sizeL: "",
      sizeM: "",
      sizeS: "true",
      url: "",
    });
    if(response.type==="products/addAsyncThunk/fulfilled"){
      navigate('/');
    }
  }

  function alert() {
    window.alert("Enter all fields");
  }
  return (
    <>
      <Navbar />
      <div className={styles.detailsWrapper}>
        <div className={styles.detailForms}>
          <form
            onSubmit={handleSubmit((product) => {
              setProduct(product);
              createAproduct(product);
            })}
          >
            <fieldset>
              {/* <Controller> */}
              <div className={styles.inputGroup}>
                <label for="pname">Product name:</label>
                <input
                  id="pname"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  {...register("name", { required: true , maxLength:200 })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label for="pprice">Product Price:</label>
                <input
                  id="pprice"
                  placeholder="Product Price"
                  type="number"
                  name="price"
                  {...register("price", { required: true, maxLength: 10000 })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label for="s">Product size:</label>

                <input
                  type="checkbox"
                  id="s"
                  name="sizeS"
                  value={true}
                  {...register("sizeS")}
                />
                <label for="s">S</label>
                <input
                  type="checkbox"
                  id="m"
                  name="sizeM"
                  value={true}
                  {...register("sizeM")}
                />
                <label for="m">M</label>
                <input
                  type="checkbox"
                  id="l"
                  name="sizeL"
                  value={true}
                  {...register("sizeL")}
                />
                <label for="l">L</label>
              </div>

              <div className={styles.inputGroup}>
                <label for="pcolor">Product color:</label>
                <input
                  id="pcolor"
                  name="color"
                  placeholder="Product color"
                  {...register("color", { required: true })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label for="men">Gender:</label>
                <input
                  id="men"
                  type="radio"
                  name="menOrWomen"
                  value="true"
                  {...register("men", { required: true })}
                />
                <label for="men">Men</label>
                <input
                  id="women"
                  type="radio"
                  name="menOrWomen"
                  value="false"
                  {...register("men", { required: true })}
                />
                <label for="women">Women</label>
              </div>

              <div className={styles.inputGroup}>
                <label for="pUrl">Product image url:</label>
                <input
                  id="pUrl"
                  placeholder="Product image url"
                  name="url"
                  {...register("url", { required: true })}
                />
              </div>

              <br />

              <button
                type="submit"
                onClick={() => {
                  if (
                    errors.url ||
                    errors.color ||
                    errors.name ||
                    errors.men ||
                    errors.price
                  ) {
                    toast.warn("fill all feald", {
                      autoClose: 600,
                      theme: "colored",
                    });
                  }
                }}
              >
                submit
              </button>
            </fieldset>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Create;
