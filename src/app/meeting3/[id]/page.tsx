"use client";
import React, { useRef, useState, useEffect } from "react";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import NotAvailableModal from "@/component/NotAvailableModal/NotAvailableModal";
import { generateJitsiToken } from "@/app/serverActions/generateToken";
import notifyPerson from "@/app/serverActions/mailSenderActions";
interface MeetingConfig { meetingUrl: string, userName: string, roomName: string}
const Meeting = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const apiRef = useRef<any>(null);
  const roomName = (Array.isArray(id) ? id.join(' ') : id)?.replace(/\s/g, "") ?? "";
  const userName = searchParams.get("q");
  const [participants, setParticipants] = useState<any[]>([]);
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    generateJitsiToken(roomName, 'a.khan', 'a.khan@nexum-ai.com').then((token) => {
      console.log("got the toekn =======>", token);
      setJwtToken(token);
    });
  }, [roomName]);

  const updateParticipantsList = () => {
    if (apiRef.current) {
      const participantsInfo = apiRef.current.getParticipantsInfo();
      const users = participantsInfo.filter((participant: any) => participant.participantId !== "local");
      console.log("users ========>", { users, participantsInfo });
      setParticipants(users);
    }
  };

  const onCloseMeeting = () => {
    navigate.push("/");
  }

  const handleApiReady = (api: any) => {
    console.log("API is ready =======>", api);
    apiRef.current = api;
    setIsApiReady(true);
  };

  useEffect(() => {
    if (isApiReady && apiRef.current) {
      updateParticipantsList();

      apiRef.current.on("participantJoined", updateParticipantsList);
      apiRef.current.on("participantLeft", updateParticipantsList);
      apiRef.current.on("videoConferenceJoined", updateParticipantsList);
      apiRef.current.on("videoConferenceLeft", onCloseMeeting);
      const meetingConfig: MeetingConfig = {
        meetingUrl: apiRef.current?._url?.split("?jwt=")[0],
        userName: userName ?? '',
        roomName: roomName
      }
      
      // add dotor email
      notifyPerson(meetingConfig)


      return () => {
        apiRef.current?.removeListener("participantJoined", updateParticipantsList);
        apiRef.current?.removeListener("participantLeft", updateParticipantsList);
        apiRef.current?.removeListener("videoConferenceJoined", updateParticipantsList);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiReady]);

  const handleModalChange = () => {
    const currentParticipants = participants.filter((participant) => !participant.formattedDisplayName.includes(" (me)"));
    if (currentParticipants.length < 1) setIsNotAvailableModalOpen(true);
  }

  useEffect(() => {
    const currentParticipants = participants.filter((participant) => !participant.formattedDisplayName.includes(" (me)"));
    let timer: NodeJS.Timeout;

    if (currentParticipants.length < 1) {
      console.log("in if condition =======>", currentParticipants);
      timer = setTimeout(() => {
        handleModalChange();
      }, 180000);
    }

    return () => clearTimeout(timer);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]);

  return (
    <>
      <Head>
        <script
          src="https://8x8.vc/vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb/external_api.js"
          async
        ></script>
      </Head>
      
      {jwtToken && (
        <div style={{ position: "relative", zIndex: 1000 }}>
          <JaaSMeeting
          // @ts-ignore
            domain="8x8.vc"
            roomName={`vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb/${roomName}`}
            jwt={jwtToken}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              prejoinPageEnabled: false,
            }}
            onApiReady={handleApiReady}
            onReadyToClose={onCloseMeeting}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "94vh";
            }}
          />
          
          <div>
            <h3>Participants List:</h3>
            <ul style={{ display: "inline-block", listStyle: "none" }}>
              {participants?.map((participant, i) => (
                <li key={participant.participantId} style={{color: participant.participantId === "local" ? "red" : "white", marginRight: "10px"}}>
                  <strong>Name:</strong> {participant.displayName || "Unknown"}
                  { participants.length - 1 !== i && <span style={{marginLeft: "10px"}}>, </span> }
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
      )}
    </>
  );
};

export default Meeting;