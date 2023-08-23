import React, { useEffect, useState } from "react";
import IncidentTable from "../../components/incidents/incidentTable/incidentTable";
import IIncident from "../../interfaces/IIncident";
import WidgetsStack from "../../components/incidents/widget/widgetsStack";
import backendServices from "../../services/backendServices/backendServices";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState<Array<IIncident>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const getIncidents = await backendServices.getIncidents();
      setIncidents(getIncidents);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ marginBottom: '10px' }}>
        <WidgetsStack />
      </div>
      <div style={{ margin: '20px', flex: 1, overflow: 'auto' }}>
        <IncidentTable rows={incidents} isLoading={isLoading} incident={incidents} setIncident={setIncidents} />
      </div>
    </div>
  );
};

export default IncidentsPage;
