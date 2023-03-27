import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/client';


const footerBanner = ({ footerBanner:{ discount, largeText1, largeText2, saleTime, smallText, desc, buttonText, midText, product, image} }) => {
  return (
    <div className='footer-banner-container'> 
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img
         className='footer-banner-image' 
         src={urlFor(image[0])} 
         alt="footer-banner-img" />

      </div>
    </div>
  )
}

export default footerBanner
footerBanner