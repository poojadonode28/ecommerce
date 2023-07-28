import React from 'react'
import '../styles/SliderProductCard.css'
import { Link } from 'react-router-dom'

const SliderProductCard = (product) => {
  let p=product.product;
  return (
    <div className='mini-product-container'>
        <div className='mini-img-container'>
            <img src={p.productimage} alt='no-img'/>
        </div>
        <div className='mini-product-details'>
            <p className='mini-producttitle'>{p.producttitle}</p>
            <div className='mini-price-container'>
                <p className='mrp'>MRP:<p className='rate'>{p.price}</p></p>
                <p className='saleprice'>Discount Price:<p className='rate'>{p.price}</p></p>
                <p className='yousave'>You save:{p.price}</p>
            </div>
            <a href={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details</button></a>
        </div>
    </div>
  )
}

export default SliderProductCard