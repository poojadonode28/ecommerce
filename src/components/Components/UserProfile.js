import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { auth, db } from "../../FirebaseConfig/firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../styles/UserProfile.css";
const UserProfile = () => {
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
  if (loggeduser) {
    console.log(loggeduser[0].email);
  }
  return (
    <div>
      <Navbar />
      <div className="userprofile-outercontainer">
        {loggeduser? <div className="user-profile">
          <p>Your Account Details</p>
          <div className="data-row">
            <span>Your name</span>
            <span>{loggeduser[0].username}</span>
          </div>
          <div className="data-row">
            <span>Your email</span>
            <span>{loggeduser[0].email}</span>
          </div>
          <div className="data-row">
            <span>Your Phone</span>
            <span>{loggeduser[0].mobile}</span>
          </div>
          <div className="data-row">
            <span>Your Address</span>
            <span>{loggeduser[0].address}</span>
          </div>
        </div>:<div> You are not logged In</div>}
      </div>
    </div>
  );
};

export default UserProfile;
