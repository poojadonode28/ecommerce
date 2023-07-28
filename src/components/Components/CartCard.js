import React, { useState } from 'react'
import image from '../assets/delete.jpg'
import { doc,deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig/firebaseConfig'
import '../styles/CartCard.css'


const CartCard = (props) => {
    const[prodquantity,setProdQuantity]=useState(props.itemdata.quantity);
    const increasequantity=async()=>{
        setProdQuantity(prodquantity+1)
        const itemref=doc(db,`cart-${props.userid}`,`${props.itemdata.id}`)
        await updateDoc(itemref,{
            quantity:prodquantity+1
        }).then(()=>{console.log("chnaged quantity")})
    }
    const decreasequantity=async()=>{
        if(prodquantity>=1){
        setProdQuantity(prodquantity-1);
        const itemref=doc(db,`cart-${props.userid}`,`${props.itemdata.id}`)
        await updateDoc(itemref,{
            quantity:prodquantity+1
        }).then(()=>{console.log("chnaged quantity")})
        }
    }
    const deletecartitem= async()=>{

            await deleteDoc(doc(db,`cart-${props.userid}`,`${props.itemdata.id}`))
            .then(()=>{
                console.log("doc deleted");
            })
    }
  return (
    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={props.itemdata.product.productimage}/></div>
            <div className='prod-title'>{props.itemdata.product.producttitle}</div>
        </div>
        <div className='prodquantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantity}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prodprice'>₹{props.itemdata.product.price * prodquantity}</div>
        <button className='deletebtn' onClick={deletecartitem}>
            <img src={image}/>
        </button>

    </div>
  )
}

export default CartCard