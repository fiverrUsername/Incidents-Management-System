import React, { useEffect, useState } from "react";
import TimeLine from "./timeLine";
import Search from "../../components/search/search";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";
import { WithIdProps } from "../../HOC";
import data from '../../mockAPI/timeLineEvent.json';
import incidentData from '../../mockAPI/incident.json';
import AddUpdateComp from "../../components/AddUpdate/AddUpdateComp"
import DisplaySummary from "../../components/summary/displaySummary";

const TimeLinePage = ({ _id }: WithIdProps) => {
  //const [timelineObjects, setTimelineObjects] = useState<ITimeLineEventprops[]>([]);
  //const [incident,setIncident]=useState<Incident>();
  //const [user,setUser]=useState();
  const timeLineEvents = data.filter((timeLine) => timeLine.incidentId === _id).sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  const incidenta= incidentData.find((i) => i._id === _id);
  //const user = users.find((t) => t.userId === _id);
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

  const [myValue, setMyValue] = useState<string>("");
  const someFunction = () => {
    console.log("The event was triggered!");
  };
  return (
    <>
      {/* <StyledSearch onEvent={someFunction} setValue={setMyValue}></StyledSearch> */}
      <Search onEvent={someFunction} setValue={setMyValue}></Search>
      <DisplaySummary incident={incidenta} ></DisplaySummary>
      <StyledPaper>
        <AddUpdateComp />
        {timeLineEvents && (
          <CustomScrollbar>
            <TimeLine timeLineEvents={timeLineEvents} />
          </CustomScrollbar>
        )}
      </StyledPaper>
      
    </>
  );
};

export default TimeLinePage;
