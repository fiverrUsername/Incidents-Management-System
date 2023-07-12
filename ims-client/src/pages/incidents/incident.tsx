import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import IncidentTable from "../../components/IncidentTable/IncidentTable";
// import WidgetsStack from "../../components/Widget/WidgetsStack";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const getIncidents = await apiCalls.getIncidents();
      setIncidents(getIncidents);
    };
    FetchData();
  }, []);

  useEffect(() => {
    console.log("incident", incidents);
  }, [incidents]);

  return (
    <>
      {/* <WidgetsStack /> */}
      <IncidentTable rows={incidents} />
    </>
  );
};

export default IncidentsPage;
