import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import IncidentTable from "../../components/incidentTable/incidentTable";
import WidgetsStack from "../../components/Widget/WidgetsStack";
// import WidgetsStack from "../../components/Widget/WidgetsStack";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    const FetchData = async () => {
      const getIncidents = await apiCalls.getIncidents();
      setIncidents(getIncidents);
    }
    FetchData();
    setIsLoading(false)

  }, []);


  useEffect(() => {
    console.log("incident", incidents);
  }, [incidents]);

  return (
    <>
      <WidgetsStack />
      <IncidentTable rows={incidents} isLoading={isLoading} />
    </>
  );
};

export default IncidentsPage;
