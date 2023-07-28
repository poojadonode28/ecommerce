import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../assets/bannerimages/lengha_choli.jpg"
import image2 from "../assets/bannerimages/women_dress1.jpg"
import image3 from "../assets/bannerimages/women_dress2.jpg"
import image4 from "../assets/bannerimages/women_saree.jpg"
import 'bootstrap/dist/css/bootstrap.min.css'



const Banner = () => {
    
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Indian Wear</h3>
        <p>Upto 60% off on dresses</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image2}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Indian Wear</h3>
        <p>Upto 60% off on dresses</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image3}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Indian Wear</h3>
        <p>
        Upto 60% off on dresses
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={image4}
        alt="First slide"
      />
      <Carousel.Caption>
        
        <p>Upto 60% off on Sarees</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
  }

 

export default Banner