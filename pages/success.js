import React from 'react';
import { useEffect,useState } from "react";
import {BsBagCheckFill} from 'react-icons/bs';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { runFirework } from '@/lib/utils';



const Success = () => {
    const {setCartItems,setTotalPrice,setTotalQuantities}=useStateContext();
    
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFirework();

    },[])
    //this means that this useEffect run as soon as this success page loaded!
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for your receipt.</p>
            <p className='description'>
                If you have any question, please email
                <a className='email' href='mailto:order.example.com'>
                    order.example.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>
                    Continue Shopping
                </button>
            </Link>
        </div>

    </div>
  )
}

export default Success
