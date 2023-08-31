import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { WithIdProps } from "../../HOC";
import Search from "../../components/base/search/search";
import AddTimelineEvent from "../../components/timelineEvents/addTimelineEvent.ts/addTimelineEvent";
import { receivedIncident } from "../../components/timelineEvents/addTimelineEvent.ts/addTimelineEventForm/addTimelineEventForm";
import DisplaySummary from "../../components/timelineEvents/summary/displaySummary";
import TimeLine from "../../components/timelineEvents/timeline/timeLine";
import { ISummary } from "../../interfaces/ISummary";
import { ITimeLineEvent } from "../../interfaces/ITimeLineEvent";
import backendServices from "../../services/backendServices/backendServices";
import { filterTimeLineBySearch } from "../../services/functions/timeline/filterTimeLineBySearch";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";


const TimeLinePage = ({ id }: WithIdProps) => {
  const [timelineObjects, setTimelineObjects] = useState<ITimeLineEvent[]>([]);
  const [summaryIncident, setSummaryIncident] = useState<ISummary>();
  const [incident, setIncident] = useState<receivedIncident>();
  //gets incident id
  useEffect(() => {

    const fetchTimeline = async () => {
      const getTimeLineEventsById = await backendServices.timelineEventByIncidentId(id)
      setTimelineObjects(getTimeLineEventsById);
    };
    fetchTimeline();
    const fetchSummaryIncident = async () => {
      const summary = await backendServices.getSummaryIncident(id);
      setSummaryIncident(summary)
    }
    fetchSummaryIncident();
    const fetchIncident = async () => {
      const getIncidentById = await backendServices.getIncidentById(id);
      setIncident(getIncidentById);
    };
    fetchIncident();
  }, [id]);

  let filter: ITimeLineEvent[] = [];
  const [myValue, setMyValue] = useState<string>("");

  filter = filterTimeLineBySearch(timelineObjects, myValue);

  const addNewTimeline = (newTimeline: ITimeLineEvent) => {
    setTimelineObjects([...timelineObjects, newTimeline]);
    //The summary should be updated
    window.location.reload()
  }
  return (
    <>
      <Search setValue={setMyValue}></Search>
      {summaryIncident && <DisplaySummary summaryIncident={{ ...summaryIncident }} ></DisplaySummary>}
      <StyledPaper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="nowrap">
          <Typography variant='bold'>Consectetur massa</Typography>
          {incident && <AddTimelineEvent addNewTimelineFunction={addNewTimeline} incident={{ ...incident }} />}
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