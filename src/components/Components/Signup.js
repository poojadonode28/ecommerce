import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth,db} from "../../FirebaseConfig/firebaseConfig"
import { collection,addDoc } from 'firebase/firestore'
import '../styles/Signup.css'


const Signup = () => {
    const[username,setUserName]=useState("");
    const[mobile,setPhoneNumber]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[address,setAddress]=useState("");

    const navigate=useNavigate();

    const[errorMsg,setErrorMsg]=useState("");
    const[successMsg,setSuccessMsg]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user= userCredential.user;
            const initialcartvalue=0;
            console.log(user);
            addDoc(collection(db,"users"),{
                username:username,email:email,mobile:mobile,
                password:password,cart:initialcartvalue,
                address:address,uid:user.uid
            }).then(()=>{
                setSuccessMsg("New user added successfully,You will now be automatically redirected to login page")
                setUserName('')
                setPhoneNumber('')
                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login')
                },4000);

            }).catch((error)=>{setErrorMsg(error.message)});
        }).catch((error)=>{
            if(error.message == 'Firebase: Error (auth/invalid-email).'){
                setErrorMsg("Please fill all required fields");
            }
            if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                setErrorMsg("User already exists");
            }

        })
    }
  return (
    <div>
        <Navbar/>
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <p>Create Account</p>
                {successMsg && <div className='success-msg'>
                    {successMsg}
                </div>}
                {errorMsg && <div className='error-msg'>
                    {errorMsg}
                </div>}
                <label>Your name</label>
                <input onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='first and last name'/>

                <label>Mobile Number</label>
                <input onChange={(e)=>setPhoneNumber(e.target.value)} type='tel' placeholder='Enter your mobile'/>

                <label>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter your email'/>

                <label>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter your password'/>

                <label>Address</label>
                <textarea onChange={(e)=>setAddress(e.target.value)} type='text' placeholder='Enter your Address'></textarea>
                <button type='submit'>Sign up</button>
                <div>
                    <span>Already have an account?</span>
                    <Link to="/login">Sign In</Link>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Signup