"use client"

import React from 'react'

import Navbar from './Navbar'
import { Button } from './ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import Image from 'next/image'


const LandingPage = () => {


    return (
        <div className='container w-full h-screen mx-auto '>
            <div>
                <Navbar />
            </div>
            <div className='flex sm:flex-row flex-col items-center justify-center '>
                <div className='flex flex-col items-center justify-center mx-auto mb-10 mt-10 gap-3'>
                    <h1 className='text-5xl font-bold mx-auto text-center'>Welcome to <span className='text-green-400'>Codemeet</span> </h1>
                    <p className='text-lg'>Join or start a meeting with ease.</p>
                    <p className='text-xs text-green-800' >All the best for your best resultes</p>
                    <div className='flex gap-3 mt-5'>

                        <Button size={'lg'} ><SignInButton mode='modal' /></Button>
                        <Button size={'lg'} variant="outline"><SignUpButton mode='modal' /></Button>
                    </div>

                </div>
                <div className=' '>
                    <Image src='/Landing.jpg' width={630} height={630} alt='landing pic'
                    className='rounded-lg shadow-lg '
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingPage