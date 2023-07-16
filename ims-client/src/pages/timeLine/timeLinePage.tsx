import React,{ useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import TimeLine from "./timeLine";
import { Incident } from "./modules/interface";
import Search from "../../components/Search/Search";
import { EventProps } from "../../components/IncidentTable/IncidentTable";
import { Paper, makeStyles } from "@mui/material";
 

interface TimeLinePageProps{
  id:string
}

const TimeLinePage = ({id}:TimeLinePageProps) => {
 

  const [incident, setIncident] = useState<Incident>();
  useEffect(() => {
    const FetchData = async () => {
      const getIncidentById = await apiCalls.getTimeLine(id);
      console.log(getIncidentById);
      setIncident(getIncidentById);
    };
    FetchData();
  }, [id]);
   const [myValue,setMyValue]=useState<string>("");
   const someFunction = () => {
    console.log("The event was triggered!");
  };
   
  return (
   <>
   <Search onEvent={someFunction} setValue={setMyValue} ></Search>
   <Paper   >
   {incident && <TimeLine incident={incident} />}
   </Paper>
 

   </>
  );
};

export default TimeLinePage;
