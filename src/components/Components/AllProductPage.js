import React from "react";
import { useState, useEffect } from "react";
import "../styles/AllProductPage.css";
import ProductContainer from "./ProductContainer";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig/firebaseConfig";
import Navbar from "./Navbar";

const AllProductPage = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${props.type.toUpperCase()}`;
      //console.log(path);
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            //console.log(doc.id, "=>", doc.data());
          });
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);

  return (
    <div className="allproductpage">
      <Navbar />
      <div className="heading">
        <p>Top Results for {props.type}</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => (
          <ProductContainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductPage;
