"use client"

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

const Meeting = () => {
  const {id}=useParams();
  const {isLoaded}=useUser()
  const {call,isCallLoading}=useGetCallById(id)
  const [isSetupComplete,setIsSetupComplete]=useState(false)

 

  if(!call) {return (
    <div className="flex items-center justify-center h-screen">  
      <h1 className="text-2xl font-bold">Meeting not found</h1>
    </div>
  )}

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={()=>setIsSetupComplete(true)}/>
        ):(
          <MeetingRoom/>
        )}
      </StreamTheme>
    </StreamCall>
  )
}

export default Meeting
