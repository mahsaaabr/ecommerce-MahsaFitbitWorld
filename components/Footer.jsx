import React from 'react'
import { AiFillInstagram, AiOutlineTwitter  } from 'react-icons/ai'



const footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 MahsaFitbitWorld  :)</p>
      <p>All content on this website is protected by copyright 2023 MahsaFitbitWorld </p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>

      </p>
    </div>
  )
}

export default footer
