import { httpRouter } from "convex/server";
import {httpAction} from "./_generated/server"
import {WebhookEvent} from "@clerk/nextjs/server"
import {Webhook} from "svix"
import {api} from "./_generated/api"
import { syncUser } from "./users";


const http= httpRouter();

http.route({
    path:"/clerk-webhook",
    method:"POST",
    handler: httpAction(async (ctx,reqest)=>{
        const webhookSrcret =process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookSrcret){
            throw new Error ("Missing Clerk-webhook-secret env var");
        }

        const svix_id =reqest.headers.get("svix-id");
        const svix_signature= reqest.headers.get("svix-signature");
        const svix_timestamp =reqest.headers.get("svix-timestamp");

        if (!svix_id||!svix_signature||!svix_timestamp){
            return new Response("No svix headers found",{
                status:400,
            });
        }

        const payload =await reqest.json();
        const body =JSON.stringify(payload);

        const wh=new Webhook(webhookSrcret);
        let evt: WebhookEvent;

        try {
            evt =wh.verify(body,{
                "svix-id":svix_id,
                "svix-signature":svix_signature,
                "svix-timestamp":svix_timestamp})as WebhookEvent;
        } catch (error) {
            console.error("Error verifying webhook:",error);
            return new Response("Error occurred",{status:400});
        }

        const eventType =evt.type;

        if(eventType==="user.created"){
            const {id,email_addresses,first_name,last_name,image_url}=evt.data;
            const email=email_addresses[0].email_address;
            const name=`${first_name|| ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser,{
                    clerkId:id,
                    email,
                    name,
                    image:image_url,
                })
            } catch (error) {
               console.log("Error creating user:",error) ;
               return new Response("Error creating user",{status:500});
            }
        }
        return new Response("webhook processed successfully",{status:200});
    })
})

export default http;