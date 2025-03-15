import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import UseMeeting from "@/hooks/useMeeting";


interface MeetingModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    isJoinMeeting:boolean;

}

function MeetingModal  ({isOpen,onClose,title,isJoinMeeting}:MeetingModalProps) {
const [meetingUrl,setMeetingUrl]=useState("");

 const {createInstantMeeting,joinMeeting }= UseMeeting();

const handleStart=()=>{
    if(isJoinMeeting){
        const meetingId
=meetingUrl.split("/").pop();
    if(meetingId) joinMeeting(meetingId)
    }else{
        createInstantMeeting();
    }
    setMeetingUrl("")
    onClose();
}


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className=" sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div>
                {
                    isJoinMeeting && (
                        <Input
                            placeholder="Paste meeting link here... "
                            value={meetingUrl}
                            onChange={(e)=> setMeetingUrl(e.target.value)}
                        
                        />
                    )
                }

                <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>
                    {isJoinMeeting ? "Join Meeting" :"Start Meeting"}
                </Button>

                </div>
            </div>


        </DialogContent>

    </Dialog>
  )
}

export default MeetingModal
