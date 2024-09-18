"use client";
import React, { useCallback, useEffect, useState } from "react";

import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import NotAvailableModal from "@/component/NotAvailableModal/NotAvailableModal";
import notifyPerson from "@/app/serverActions/mailSenderActions";
import { CloseButton } from "@chakra-ui/react";

const Meeting = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const userName = searchParams.get("q");
  const navigate = useRouter();
  const DomainName = "meet.jit.si";
  const roomName = id?.replace(/\s/g, "") ?? "";
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const [stopInternval, setStopInternval] = useState(false);



  const handleOneMinuteCallback = (api: any) => {
    console.log("One minute has passed awais =======>", api.getParticipantsInfo());
    
    setTimeout(() => {
    if (api.getParticipantsInfo().length === 1) {
      setIsNotAvailableModalOpen(true);
      setStopInternval(true);
    }
    }, 58000);
  
  };

  const handleRoomClose = () => {
    console.log("Room Closed");
    navigate.push("/");
  };

  const handleApiReady = async (api) => {
    console.log("API is ready =======>" , api);
    const url = api._url
    

    

    await notifyPerson({ meetingUrl: url,
        userName: userName ?? '',
        roomName
    });

    handleOneMinuteCallback(api);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1}}>
      <CloseButton  onClick={handleRoomClose} position="absolute" top="10px" right="10px" zIndex={999999} />
      <JitsiMeeting
        domain={DomainName}
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: false,
          enableEmailInStats: false,
          enableClosePage: true,
          disableThirdPartyRequests: true, // Disable Google and Facebook login
          prejoinPageEnabled: false, // Disable prejoin page
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: userName ?? "",
        }}
        onReadyToClose={handleRoomClose}
        onApiReady={handleApiReady}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "92vh";
        }}
      />
      <NotAvailableModal isOpen={isNotAvailableModalOpen} />
    </div>
  );
};

export default Meeting;
