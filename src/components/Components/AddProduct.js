import React from 'react'
import '../styles/AddProduct.css'
import Navbar from './Navbar'
import {useState,useEffect} from 'react'
import { updateProfile } from 'firebase/auth'
import { auth, db, storage } from "../../FirebaseConfig/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const AddProduct = () => {
    const [producttitle,setProductTitle]=useState("");
    const[producttype,setProductType]=useState("");
    const[description,setDescription]=useState("");
    const[brand,setBrand]=useState("");
    const[customersupport,setCustomersupport]=useState("");
    const[price,setPrice]=useState("");
    const[warranty,setWarranty]=useState("");
    const[productimage,setProductImage]=useState("");

    const[imageError,setImageError]=useState('');
    const[successMsg,setSuccessMsg]=useState('');
    const[uploadError,setUploadError]=useState('');

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
      const types=['img/jpg','img/jpeg','image/png','image/PNG'];
      const handleProductImg=(e)=>{
        e.preventDefault();
        let selectedFile=e.target.files[0];
        if(selectedFile){
            if(selectedFile){
                setProductImage(selectedFile);
                setImageError(" ");
            }
            else{
                setProductImage(null)
                //setImageError('please select a valid image file()');

            }

        }
        else{
            setImageError("please select your file");
        }


      }
      const loggeduser = GetCurrentUser();
      const handleAddProduct=(e)=>{
        e.preventDefault();
        const storageRef = ref(storage,`product-images${producttype.toUpperCase()}/${Date.now()}`)
        uploadBytes(storageRef,productimage).then(()=>{
            getDownloadURL(storageRef).then(url=>{
                addDoc(collection(db,`products-${producttype.toUpperCase()}`),{
                    producttitle,
                producttype,
                description,
                brand,
                customersupport,
                price,
                warranty,
                productimage:url
                })
            })
        })

      }
  return (
    <div>
        <Navbar/>
        {loggeduser && loggeduser[0].email=="pooja@gmail.com"?
        <div className='addprod-container'>
            <form className='addprod-form' onSubmit={handleAddProduct}>
                <p>Add Data</p>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {uploadError && <div className='error-msg'>{uploadError}</div>}
                <label>Product Title</label>
                <input type="text" onChange={(e)=>{setProductTitle(e.target.value)}} placeholder='product Title'/>
                <label>Product Type</label>
                <input type="text" onChange={(e)=>{setProductType(e.target.value)}} placeholder='product Type'/>
                <label> Brand Name</label>
                <input type="text" onChange={(e)=>{setBrand(e.target.value)}} placeholder='Brand name'/>
                <label>warranty</label>
                <input type="text" onChange={(e)=>{setWarranty(e.target.value)}} placeholder='warranty'/>
                <label>Image</label>
                <input type="file" onChange={handleProductImg}/>
                {
                    imageError && <>
                        <div className='error-msg'>{imageError}</div>
                    </>
                }
                <label>Description</label>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Describe your product in brief'/>
                <label>Price Without Tax-</label>
                <input type="text" onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter price without tax'/>
                <label>Customer Support</label>
                <input type="text" onChange={(e)=>{setCustomersupport(e.target.value)}} placeholder='Customer support email'/>
                <button type="submit">Add</button>

            </form>
        </div>:<div>You don't have access to add products</div>}
        </div>
    
  )
}

export default AddProduct