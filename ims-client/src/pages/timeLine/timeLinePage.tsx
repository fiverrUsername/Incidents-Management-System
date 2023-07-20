import React, { useEffect, useState } from "react";
import TimeLine from "./timeLine";
import Search from "../../components/search/search";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";
import { WithIdProps } from "../../HOC";
import AddUpdateComp from "../../components/AddUpdate/AddUpdateComp"
import DisplaySummary from "../../components/summary/displaySummary";
import apiCalls from "../../service/apiCalls";
import {  Incident, TimelineEvent } from "./modules/interface";
import { ISummary } from "../../interface/ISummary";
import IIncident from "../../interface/incidentInterface";
import { Box, Grid } from "@mui/material";
const TimeLinePage = ({ _id }: WithIdProps) => {
  const [timelineObjects, setTimelineObjects] = useState<TimelineEvent[]>([]);
  const [summaryIncident , setSummaryIncident] = useState<ISummary>( );
  const [incident,setIncident]=useState<IIncident>();
  //const [user,setUser]=useState();
  //const user = users.find((t) => t.userId === _id);
  //when the functions in server are done
  useEffect(() => {
    const FetchTimeline = async () => {
      const getTimeLineEvents = await apiCalls.getTimeLineEvents()
      console.log(getTimeLineEvents,"getTimeLineEvents");
       setTimelineObjects(getTimeLineEvents);
    };
    FetchTimeline();
  const FetchSummaryIncident= async()=>{
       const summary =await apiCalls.getSummaryIncident(_id);
       console.log(summary,"summery")
       setSummaryIncident(summary)
   }
   FetchSummaryIncident();
  const FetchInsident = async () => {
    const getIncidentById = await apiCalls.getIncidentById(_id);
    console.log(getIncidentById);
    setIncident(getIncidentById);
  };
  FetchInsident();
  //   const FetchUser = async () => {
  //     const getUserById = await apiCalls.getUserById(_id);
  //     console.log(getUserById,"getUserById");
  //     setUser(getUserById);
  //   };
  //   FetchUser();
  }, [_id]);
  const [myValue, setMyValue] = useState<string>("");
  const someFunction = () => {
    console.log("The event was triggered!");
  };
  return (
    <>
      {/* <StyledSearch onEvent={someFunction} setValue={setMyValue}></StyledSearch> */}
      <Search onEvent={someFunction} setValue={setMyValue}></Search>
     {summaryIncident && <DisplaySummary summaryIncident={{...summaryIncident}} ></DisplaySummary>}
      <StyledPaper>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" flexWrap="nowrap">
        <Box>gggggggg</Box>
        {incident && <AddUpdateComp incident={{...incident}} />}
        </Grid>
        {timelineObjects && (
          <CustomScrollbar>
            <TimeLine timelineList={timelineObjects} />
          </CustomScrollbar>
        )}
      </StyledPaper>
    </>
  );
};
export default TimeLinePage;