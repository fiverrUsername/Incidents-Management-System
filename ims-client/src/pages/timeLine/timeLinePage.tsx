import React, { useEffect, useState } from "react";
import TimeLine from "./timeLine";
import Search from "../../components/search/search";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";
import { WithIdProps } from "../../HOC";
import AddUpdateComp from "../../components/AddUpdate/AddUpdateComp"
import DisplaySummary from "../../components/summary/displaySummary";
import apiCalls from "../../service/apiCalls";
import { Incident, TimelineEvent } from "./modules/interface";
import { ISummary } from "../../interface/ISummary";
import IIncident from "../../interface/incidentInterface";
import { Grid, Typography } from "@mui/material";

const TimeLinePage = ({ _id }: WithIdProps) => {
  const [timelineObjects, setTimelineObjects] = useState<TimelineEvent[]>([]);
  const [summaryIncident, setSummaryIncident] = useState<ISummary>();
  const [incident, setIncident] = useState<IIncident>();
  //const [user,setUser]=useState();
  //const user = users.find((t) => t.userId === _id);
  //when the functions in server are done
  useEffect(() => {
    const FetchTimeline = async () => {
      const getTimeLineEventsById = await apiCalls.getTimeLineEventsById(_id)
      console.log(getTimeLineEventsById, "getTimeLineEventsById");
      setTimelineObjects(getTimeLineEventsById);
    };
    FetchTimeline();
    const FetchSummaryIncident = async () => {
      const summary = await apiCalls.getSummaryIncident(_id);
      console.log(summary, "summery")
      setSummaryIncident(summary)
    }
    FetchSummaryIncident();
    const FetchIncident = async () => {
      const getIncidentById = await apiCalls.getIncidentById(_id);
      console.log(getIncidentById);
      setIncident(getIncidentById);
    };
    FetchIncident();
    //   const FetchUser = async () => {
    //     const getUserById = await apiCalls.getUserById(_id);
    //     console.log(getUserById,"getUserById");
    //     setUser(getUserById);
    //   };
    //   FetchUser();
  }, [_id]);

  const filterTimeLineBySearch=(array: TimelineEvent[], filterString: string):TimelineEvent[]=>{
    return array.filter((item) => {
 
      for (const key in item) {
    
          if ((key!='createdAt')&&(String(item[key as keyof TimelineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
              console.log(key)
              return true;
          }
          if ((key=='userId')&&(String(item[key as keyof TimelineEvent]).toLowerCase()).includes(filterString.toLowerCase())) {
            console.log(key)
            return true;
        }
      }        
      return false;
  });
}


 

  const someFunction = () => {
    filter = filterTimeLineBySearch(timelineObjects, myValue);
    console.log("The event was triggered!");
  };

  const [myValue, setMyValue] = useState<string>("");
  let filter:TimelineEvent[] = []
   someFunction()

  return (
    <>
     
      <Search onEvent={someFunction} setValue={setMyValue}></Search>
      {summaryIncident && <DisplaySummary summaryIncident={{ ...summaryIncident }} ></DisplaySummary>}
      <StyledPaper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="nowrap">
          <Typography variant='bold'>Consectetur massa</Typography>
          {incident && <AddUpdateComp incident={{...incident }} />}
        </Grid>
        {timelineObjects && (
          <CustomScrollbar>
            <TimeLine timelineList={filter} />
          </CustomScrollbar>
        )}
      </StyledPaper>
    </>
  );
};
export default TimeLinePage;