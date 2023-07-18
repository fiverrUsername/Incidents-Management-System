import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import TimeLine from "./timeLine";
import { ITimeLineEventprops, Incident } from "./modules/interface";
import Search from "../../components/search/search";
import { CustomScrollbar, StyledBox, StyledPaper } from "./timeLinePage.style";
import { WithIdProps } from "../../HOC";
import data from '../../mockAPI/timeLineEvent.json';
import users from '../../mockAPI/users.json';
import incident from '../../mockAPI/incident.json';
import { Box } from "@mui/system";
import { UserInfo } from "os";
import { Typography } from "@mui/material";

const TimeLinePage = ({ _id }: WithIdProps) => {
  //const [timelineObjects, setTimelineObjects] = useState<ITimeLineEventprops[]>([]);
  //const [incident,setIncident]=useState<Incident>();
  //const [user,setUser]=useState();
  const timeLineEvents = data.filter((timeLine) => timeLine.incidentId === _id).sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  const incidenta = incident.find((i) => i._id === _id);
  const user = timeLineEvents.find((t) => t.userId === _id);
  //when the functions in server are done
  // useEffect(() => {
  //   const FetchTimeline = async () => {
  //     const getTimeLineEvents = await apiCalls.getTimeLineEvents(_id);
  //     console.log(getTimeLineEvents);
  //     setTimeLineEvents(getTimeLineEvents);
  //   };
  //   FetchTimeline();
  //////////////////////////
  // const FetchInsident = async () => {
  //   const getIncidentById = await apiCalls.getIncidentById(_id);
  //   console.log(getIncidentById);
  //   setIncident(getIncidentById);
  // };
  // FetchInsident();
  //////////////////////////
  //   const FetchUser = async () => {
  //     const getUserById = await apiCalls.getUserById(_id);
  //     console.log(getUserById,"getUserById");
  //     setUser(getUserById);
  //   };
  //   FetchUser();

  // }, [_id]);

  // const [myValue, setMyValue] = useState<string>("");
  // const someFunction = () => {
  //   console.log("The event was triggered!");
  // };
  //const formattedDate = date.toLocaleDateString('en-GB');
  // <p>Formatted Date: {formattedDate}</p>
  return (
    <>
      {/* <StyledSearch onEvent={someFunction} setValue={setMyValue}></StyledSearch> */}
      {/* <Search onEvent={someFunction} setValue={setMyValue}></Search> */}
      <StyledPaper>
      {/* ask tamar */}
        <StyledBox>Created by:</StyledBox>
        <StyledBox>Created at: {incidenta?.date}</StyledBox>
        <StyledBox>Current priority: {incidenta?.priority}</StyledBox>
        <StyledBox>Affected services: {/* tags */} </StyledBox>
      </StyledPaper>
      <StyledPaper>
        {timeLineEvents && (
          <CustomScrollbar>
            <TimeLine timeLineEvents={timeLineEvents} />
          </CustomScrollbar>
        )}
        {/* button updade incident */}
      </StyledPaper>
    </>
  );
};

export default TimeLinePage;
