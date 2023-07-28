import React from 'react'
import '../styles/ProductContainer.css'
import { Link } from 'react-router-dom'
const ProductContainer = (product) => {
  let p=product.product
  return (
    <div className='product-container'>
        <img src={p.productimage} alt="no img"/>
        <div className='product-details'>
            <a href={`/product/${p.producttype}/${p.id}`}>
              <button className='producttitle'> {p.producttitle}</button>
            </a>
            
            <div className='price-container'>
                <p className='mrp'>MRP:<p className='rate'>{p.price}</p></p>
                <p className='saleprice'>Discount Price:<p className='rate'>{p.price}</p></p>
                <p className='yousave'>You save:{p.price}</p>
            </div>
            <a href={`/product/${p.producttype}/${p.id}`}>
              <button className='showmore-btn' >More Details &gt;</button>
            </a>
        </div>

    </div>
  )
}

export default ProductContainer;