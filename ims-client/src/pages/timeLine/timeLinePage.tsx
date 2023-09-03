import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { WithIdProps } from "../../HOC";
import DisplaySummary from "../../components/timelineEvents/summary/displaySummary";
import { ISummary } from "../../interfaces/ISummary";
import { ITimeLineEvent } from "../../interfaces/ITimeLineEvent";
import { CustomScrollbar, StyledPaper } from "./timeLinePage.style";
import Search from "../../components/base/search/search";
import { receivedIncident } from "../../components/timelineEvents/addTimelineEvent.ts/addTimelineEventForm/addTimelineEventForm";
import TimeLine from "../../components/timelineEvents/timeline/timeLine";
import { filterTimeLineBySearch } from "../../services/functions/timeline/filterTimeLineBySearch";
import backendServices from "../../services/backendServices/backendServices";
import AddTimelineEvent from "../../components/timelineEvents/addTimelineEvent.ts/addTimelineEvent";
import Logger from "../../loggers/logger";
import IIncident from "../../interfaces/IIncident";


const TimeLinePage = ({ id }: WithIdProps) => {
  const [timelineObjects, setTimelineObjects] = useState<ITimeLineEvent[]>([]);
  const [incident, setIncident] = useState<receivedIncident>();
  //gets incident id
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const getTimeLineEventsById: ITimeLineEvent[] = await backendServices.timelineEventByIncidentId(id)
        Logger.info({ source: "Time line page", message: "Getting timeline events by Incident id success!" });
        setTimelineObjects(getTimeLineEventsById);
      }
      catch (err: any) {
        Logger.error({ source: "Time line page", message: "Error getting timeline events by Incident id.\t IncidentId:" + id });
      }
    };
    fetchTimeline();
    const fetchIncident = async () => {
      try {
        const getIncidentById: receivedIncident = await backendServices.getIncidentById(id);
        Logger.info({ source: "Time line page", message: `Getting incident by id=${id} success!` });
        setIncident(getIncidentById);
      } catch (error: any) {
        Logger.error({ source: "Time line page", message: `Error getting incident by id\tId:${id}` });
      }
    };
    fetchIncident();
  }, [id]);

  let filter: ITimeLineEvent[] = [];
  const [myValue, setMyValue] = useState<string>("");

  filter = filterTimeLineBySearch(timelineObjects, myValue);

  const addNewTimeline = (newTimeline: ITimeLineEvent) => {
    setTimelineObjects([...timelineObjects, newTimeline]);
  }
  const updateIncidentFunction = (newIncident: receivedIncident) => {
    setIncident(newIncident);
  }
  return (
    <>
      <Search setValue={setMyValue}></Search>
      <DisplaySummary id={id}></DisplaySummary>
      <StyledPaper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="nowrap">
          <Typography variant='bold'>Consectetur massa</Typography>
          {incident && <AddTimelineEvent updateIncidentFunction={updateIncidentFunction} addNewTimelineFunction={addNewTimeline} incident={incident} />}
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