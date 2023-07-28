import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import { auth, db } from "../../FirebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductSlider from "./ProductSlider";
import '../styles/Home.css';

const Home = () => {
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
  if(loggeduser){
    console.log(loggeduser);
  }
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="slider-head">Limited Time Deals</div>

      <ProductSlider type={'Dresses'}/>
      <ProductSlider type={'Shirts'}/>
      <ProductSlider type={'Sarees'}/>
      <ProductSlider type={'Mobile'}/>
      
    </div>
  );
};

export default Home;
