'use server'

import { nodeMailerTransport } from "../utils/nodeMailer";



//  meetingUrl, userName, roomName

interface MeetingConfig { meetingUrl: string, userName: string, roomName: string}

const generateEmailContent = (meetingConfig: MeetingConfig) => {
    console.log("meetingConfig===>", meetingConfig)
    return `
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); max-width: 500px; width: 100%;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #007bff; margin: 0; font-size: 28px;">Meeting has started</h1>
                    <p style="color: #333333; font-size: 18px; margin: 8px 0;">Meeting has started with URL:</p>
                    <h4 style="color: #333333; font-size: 18px; margin: 8px 0;"><a href="${meetingConfig.meetingUrl}" target="_blank" style="color: #007bff; text-decoration: none;">${meetingConfig.meetingUrl}</a></h4>
                    <p style="color: #333333; font-size: 18px; margin: 8px 0;">Room Name: ${meetingConfig.roomName}</p>
                    <p style="color: #333333; font-size: 18px; margin: 8px 0;">User Name: ${meetingConfig.userName}</p>
                </div>
            </div>
        </body>
    `;
}
const notifyPerson = (meetingConfig: MeetingConfig, mail: string = "a.khan@nexum-ai.com") => {
    try {
        const transporter = nodeMailerTransport()
        
        const mailOptions = {
            from: mail,
            to:  mail, // "stefano.novelli@innovisionlab.it", //?? process.env.NEXT_PRIVATE_EMAIL,
            subject: `${meetingConfig.userName} is in a meeting`,
            text: `Meeting has started with URL: ${meetingConfig.meetingUrl}`,
            html: generateEmailContent(meetingConfig) 
        }
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return false
            } else {
                console.log(`Email sent: ${info.response}`)
                return true
            }
        })

    } catch (error) {

        return false
    }
}


export default notifyPerson