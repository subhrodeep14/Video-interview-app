import { useEffect,useState } from "react";

import {Call,useStreamVideoClient} from "@stream-io/video-react-sdk"

const useGetCallById=(callId:string)=>{
    const [call,setCall]=useState<Call|null>(null)
    const [isCallLoading,setIsCallLoading]=useState(true)
    const client=useStreamVideoClient()
    
}

