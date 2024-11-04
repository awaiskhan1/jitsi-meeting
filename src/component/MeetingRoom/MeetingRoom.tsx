import { JaaSMeeting } from '@jitsi/react-sdk';
import React, { useState } from 'react'
import NotAvailableModal from '../NotAvailableModal/NotAvailableModal';

const MeetingRoom = ({participants, handleApiReady}:{participants:any, handleApiReady:any}) => {
    const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState
    (false);
  return (
    <div style={{ position: "relative", zIndex: 1000 }}>
    <JaaSMeeting
      appId='vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb'
      roomName="vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb/SampleAppGreatPridesCounterPartly"
      jwt="eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMDZjZTk3MTgyYjBiNDY3YWI1NWExMTkyZmE5NjhkZGIvZGExMDhjLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3Mjg4MTkxMjAsImV4cCI6MTcyODgyNjMyMCwibmJmIjoxNzI4ODE5MTE1LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMDZjZTk3MTgyYjBiNDY3YWI1NWExMTkyZmE5NjhkZGIiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwic2lwLW91dGJvdW5kLWNhbGwiOmZhbHNlLCJ0cmFuc2NyaXB0aW9uIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZX0sInVzZXIiOnsiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlLCJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJhLmtoYW4iLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTExMzI4MjcxOTMxODQ5MjEwODc3IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJhLmtoYW5AbmV4dW0tYWkuY29tIn19LCJyb29tIjoiKiJ9.d3gloMnQfyKxlCDeIU6Pb-aC4KcLgwH60aeom9h-6dfD7cEqdnayYpF7jUgP-DMYX9fRGZIJIid0aX28ZEPCpQSPzzDkBeiyVIOkm0dteVUlZPPz7x2dtt_c3UqtZUZsT5ogtSVPi6bQv5aT-jTS4dUTBXsEGk8qSTsBxuLTCa7HCduNkcOYBW1eIR8IkSC5yoXnBdBn7PjiwTjz_TqllAGuLV0XSoL5wHc6ukQHCatKdmLJWM8atblsTaPQKP77mf0oMCrHkbovgf65SGHybhIKKkc2ArD_Kn3md_zxTYrp4liI-jaH3F9_anU0cU2oJWwwlAYHPyXm0fhjY8UTJg" // Replace with your actual JWT token
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        prejoinPageEnabled: false,
      }}
      // userInfo={{ displayName: "Organizer" , email: "a.khan@nexum-ai.com" }}
      onApiReady={handleApiReady}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "95vh";
      }}
    />
    
    {/* Participants List */}
    <div>
      <h3>Participants List:</h3>
      <ul>
        {participants?.map((participant:any) => (
          <li key={participant.participantId} style={{color:  "white"}}>
            <strong>Name:</strong> {participant.displayName || "Unknown"}
            <br />
            <strong>Role:</strong> {participant.isModerator ? "Moderator" : "Participant"}
          </li>
        ))}
      </ul>
    </div>

    {isNotAvailableModalOpen && (
      <NotAvailableModal
        isOpen={isNotAvailableModalOpen}
        onClose={() => setIsNotAvailableModalOpen(false)}
      />
    )}
  </div>
  )
}

export default MeetingRoom
