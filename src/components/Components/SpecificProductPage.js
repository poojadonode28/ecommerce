import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { auth, db } from "../../FirebaseConfig/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import "../styles/SpecificProductPage.css";
import ProductSlider from "./ProductSlider";

const SpecificProductPage = () => {
  const { id, producttype } = useParams();
  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  function GetCurrentUser() {
    const [user, setCurrentUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );

            //console.log(q);
            const data = await getDocs(q);
            setCurrentUser(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          };
          getUsers();
        } else {
          setCurrentUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();

  function GetCurrentProduct() {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products-${producttype.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  }
  GetCurrentProduct();

  const addtocart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product added to cart");
        })
        .catch((error) => setErrorMsg(error.message));
    } else {
      setErrorMsg("You need to login");
    }
  };
  return (
    <div>
      <Navbar />
      {product ? (
        <div className="myprod-container1">
          <div className="prod-img-cont1">
            <img src={product.productimage} />
          </div>
          <div className="prod-data1">
            <p className="prod-head1">{product.producttitle}</p>
            <div className="specific-price-container1">
              <p className="mrp1">
                MRP:<p>₹{product.price}</p>
              </p>
              <p className="saleprice1">
                Discount Price:<p className="rate1">₹{product.price}</p>
              </p>
              <p className="yousave1">You save:₹{product.price}</p>
            </div>
            <p className="prod-details-head1">Details</p>
            <p className="prod-description1">{product.description}</p>
            <div className="row-cont1">
            <div className="warranty-replacement1">
              <div className="cod1">
                <div className="img-circle1">
                  <img src="https://cdn-icons-png.flaticon.com/512/5278/5278605.png" />
                </div>
                <p>Cash On Delivery</p>
              </div>
              <div className="warranty1">
                <div className="img-circle1">
                  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/warranty-logo-design-template-d39ee198ed6ae25d24588e839df6f6bd_screen.jpg?ts=1609016113" />
                </div>
                <p>{product.warranty} year warranty</p>
              </div>
              <div className="replacement1">
                <div className="img-circle1">
                  <img src="https://images.carriercms.com/image/upload/w_400,c_lfill,q_auto,f_auto/v1614351159/weathermaker/icons/replace-icon.png" />
                </div>
                <p>10 Days replacement</p>
              </div>
            
            </div>
            <div className="buy-cart">
              <button className="btn">Buy Now</button>
              <button className="btn" onClick={addtocart}>Add to Cart</button>
            </div>
        </div>
        {successMsg && 
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          }
          {errorMsg && <><div className="error-msg">{errorMsg}</div>
          </>}
        </div>
    </div>)
       :   (<div>Loading...</div>)}
       <p className="prod-details-head21">Similar Items</p>
       <ProductSlider type={producttype}></ProductSlider>
</div>
  );
};

export default SpecificProductPage;
