/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const JistMeet = ({ userName, roomName, domainName, setIsRoom, onOneMinuteCallback, onMeetingStartCallback }: any) => {
  useEffect(() => {
    let timer: any;
    if (userName && roomName) {
      timer = setTimeout(() => {
        onOneMinuteCallback();
      }, 60000); // Call the function after 1 minute
    }
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [userName, roomName, onOneMinuteCallback]);

  const handleApiReady = (externalApi: any) => {
    // Generate a unique meeting URL
    const meetingUrl = `https://${domainName}/${roomName.replace(/\s/g, '')}`;

    // Call the API to share the meeting link
     
    

    // Notify other participants that the meeting has started
    onMeetingStartCallback(meetingUrl);

    // Set the user as the organizer with a custom ID
    externalApi.executeCommand('setDisplayName', userName);
    externalApi.executeCommand('setEmail', 'a.khan@nexum-ai.com'); // Replace with the actual organizer email if needed
  };

  return (
    <div style={{ flex: 1, width: '98vw', height: '97vh' }}>
      {userName && roomName && (
        <JitsiMeeting
          domain={domainName}
          roomName={roomName.replace(/\s/g, '')}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
            enableClosePage: true,
            disableThirdPartyRequests: true, // Disable Google and Facebook login
            prejoinPageEnabled: false, // Disable prejoin page
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            email: '',
            displayName: userName,
          }}
          onReadyToClose={() => {
            setIsRoom(false);
          }}
          onApiReady={handleApiReady}
          getIFrameRef={(iframeRef) => { iframeRef.style.height = '92vh'; }}
        />
      )}
    </div>
  );
};

export default JistMeet;
