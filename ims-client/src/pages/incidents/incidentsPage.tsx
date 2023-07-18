import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import IncidentTable from "../../components/incidentTable/incidentTable";
import WidgetsStack from "../../components/widget/widgetsStack";


const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    const FetchData = async () => {
      const getIncidents = await apiCalls.getIncidents();
      setIncidents(getIncidents);
    };
    FetchData();
    setIsLoading(false)

  }, []);


  useEffect(() => {
    console.log("incident", incidents);
  }, [incidents]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{marginBottom:'10px'}}>
      <WidgetsStack />
      </div>
      <div style={{ margin: '20px' ,flex: 1, overflow: 'auto'}}>
        <IncidentTable rows={incidents} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default IncidentsPage;
