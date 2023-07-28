import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import cart1 from '../assets/cart1.png'
import leftimage from '../assets/leftimage.jpg'
import profilelogo from '../assets/profilelogo.png'
import { auth, db } from "../../FirebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";


const Navbar = () => {
  const[cartdata,setcartdata]=useState([]);
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
  const navigate=useNavigate();
  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate("/login");
    })
  }

  
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
      <div className='navbar'>
   <div className='leftContainer'>
      <img src={leftimage}/>
   </div>
   <div className='rightContainer'>
   {!loggeduser && <nav>
        <Link to="/" ><button>Home</button></Link>
        <Link to="/signup" ><button>Register</button></Link>
        <Link to="/login" ><button>Login</button></Link>
        <div className='cart-btn'>
         <img src={cart1} alt="no img"/>
          <span className='cart-icon-css'>0</span>
        </div>
        <Link to="/userprofile">
          <img src={profilelogo} className='profile-icon'/>
        </Link>
   </nav>}

   {loggeduser && <nav>
    <Link to="/"><button>Home</button></Link>
    <Link to="/sellproduct"><button>Sell</button></Link>
    <div className='cart-btn'>
      <Link to='/cartdata'><img src={cart1} alt="no img" /></Link>
      <button className='cart-icon-css'>{cartdata.length}</button>
    </div>
    <Link to="/userprofile">
          <img src={profilelogo} className='profile-icon'/>
        </Link>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
   </nav>}

   </div>

   
   
   </div>

   <div className='product-types'>
      <a href="/product-type/Shirts"><button>Shirts</button></a>
      <a href="/product-type/dresses"><button>Dresses</button></a>
      <a href="/product-type/saree"><button>Saree</button></a>
      <a href="/product-type/mobiles"><button>Mobiles</button></a>
   </div>
   
   
   </div>
  
  )
}

export default Navbar