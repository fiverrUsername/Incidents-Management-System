import { Grid, Typography } from "@mui/material";
import React,{ useEffect, useState } from "react";
import { WithIdProps } from "../../HOC";
import { GetIncident } from "../../components/AddUpdate/AddUpdate";
import AddUpdateComp from "../../components/AddUpdate/AddUpdateComp";
import Search from "../../components/search/search";
import DisplaySummary from "../../components/summary/displaySummary";
import { ISummary } from "../../interface/ISummary";
import { ITimeLineEvent } from "../../interface/timeLineInterface";
import apiCalls from "../../service/apiCalls";
import filterTimeLineBySearch from "../../service/timeLineService";
import TimeLine from "./timeLine";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";
 

const TimeLinePage = ({ id }: WithIdProps) => {
  const [timelineObjects, setTimelineObjects] = useState<ITimeLineEvent[]>([]);
  const [summaryIncident, setSummaryIncident] = useState<ISummary>();
  const [incident, setIncident] = useState<GetIncident>();
  useEffect(() => {

    const fetchTimeline = async () => {
      // eslint-disable-next-line no-debugger
      const getTimeLineEventsById = await apiCalls.timelineEventByIncidentId(id)
      setTimelineObjects(getTimeLineEventsById);
      // eslint-disable-next-line no-debugger
    };
    fetchTimeline();
    const fetchSummaryIncident = async () => {
      const summary = await apiCalls.getSummaryIncident(id);
      setSummaryIncident(summary)
    }
    fetchSummaryIncident();
    const fetchIncident = async () => {
      const getIncidentById = await apiCalls.getIncidentById(id);
      setIncident(getIncidentById);
    };
    fetchIncident();

  }, [id]);



  const someFunction = () => {
    filter = filterTimeLineBySearch(timelineObjects, myValue);
  };

  const [myValue, setMyValue] = useState<string>("");
  let filter: ITimeLineEvent[] = []
  someFunction()

  return (
    <>
      <Search onEvent={someFunction} setValue={setMyValue}></Search>
      {summaryIncident && <DisplaySummary summaryIncident={{ ...summaryIncident }} ></DisplaySummary>}
      <StyledPaper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="nowrap">
          <Typography variant='bold'>Consectetur massa</Typography>
          {incident && <AddUpdateComp incident={{ ...incident }} />}
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