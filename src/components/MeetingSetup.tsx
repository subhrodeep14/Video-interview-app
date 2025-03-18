"use client"

import { useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

function MeetingSetup({onSetupComplete}:{onSetupComplete:()=>void}) {

  const [isCameraDisabled,setIsCameraDisabled]=useState(false)
  const [isMicDisabled,setIsMicDisabled]=useState(false)
  const call=useCall()

  if(!call) return null

  useEffect(()=>{
      if(isCameraDisabled) call.camera.disable();
      else call.camera.enable();

  },[isCameraDisabled,call.camera])

  useEffect(()=>{
    if(isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  },[isMicDisabled,call.microphone])  
  

  const handleJoin=async()=>{
    await call.join();
    onSetupComplete();
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-background/95'>

      <div className='w-full max-w-md bg-background/95 rounded-lg shadow-lg p-6'>

      </div>
    </div>
  )
}

export default MeetingSetup