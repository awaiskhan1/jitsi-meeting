"use client";
import React, { useRef, useState } from "react";

import { JaaSMeeting, JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import NotAvailableModal from "@/component/NotAvailableModal/NotAvailableModal";
import notifyPerson from "@/app/serverActions/mailSenderActions";
import { CloseButton } from "@chakra-ui/react";

const Meeting = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const userName = searchParams.get("q");
  const navigate = useRouter();
  const apiRef = useRef<any>(null);
  const DomainName = "meet.jit.si";
  const roomName = (Array.isArray(id) ? id.join(' ') : id)?.replace(/\s/g, "") ?? "";
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const [stopInternval, setStopInternval] = useState(false);


  const handleRoomClose = () => {
    console.log("Room Closed");
    navigate.push("/");
  };

  const handleApiReady = async (api: any) => {
    console.log("API is ready =======>" , api);
    const url = api._url
    apiRef.current = api

    

    await notifyPerson({ meetingUrl: url,
        userName: userName ?? '',
        roomName
    });

    apiRef?.current?.on('pa')

    apiRef?.current?.on('participantJoined', (participant: any) => {
      alert("Participant joined =======>");
      console.log("Participant joined =======>", participant);
    });
  };

  return (
    <html>
      <head>
        <script src='https://meet.jit.si/external_api.js' async></script>
      </head>
    <body>

      <div style={{ position: 'relative', zIndex: 1}}>
        <CloseButton  onClick={handleRoomClose} position="absolute" top="10px" right="10px" zIndex={999999} />
      <iframe 
          src={`https://meet.jit.si/${roomName}`}
          style={{ height: '92vh' }}
        />
        <NotAvailableModal isOpen={isNotAvailableModalOpen} />
      </div>
    </body>
    </html>
  );
};

export default Meeting;
