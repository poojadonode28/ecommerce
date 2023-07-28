import React from 'react'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import { auth,db } from '../../FirebaseConfig/firebaseConfig'
import { collection,getDocs,query,where } from 'firebase/firestore'
import CartCard from './CartCard'
import '../styles/Cart.css'


const Cart = () => {
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

  const[cartdata,setcartdata]=useState([]);

  if(loggeduser){
    const getcartdata = async()=>{
      const cartArray=[];
      const path=`cart-${loggeduser[0].uid}`
      getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),id:doc.id})
        });
        setcartdata(cartArray);
      }).catch('Error error error')
    }
    getcartdata();
  }

  return (
    <div>
    <Navbar/>
    {cartdata?<div>
      <div className='cart-head'>Your cart items</div>
      <div className='allcartitems'>
        {
          cartdata.map((item)=>(
            <CartCard key={item.id} itemdata={item} userid={loggeduser[0].uid}/>
          ))
        }
      </div>

    </div>:<p>Your cart is empty</p>}
  

    <div className='proceed'>
      <button>Proceed</button>
    </div>
    
    </div>
  )
}

export default Cart