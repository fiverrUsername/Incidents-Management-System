import React, { useEffect, useState } from "react";
import IncidentTable from "../../components/incidents/incidentTable/incidentTable";
import IIncident from "../../interfaces/IIncident";
import WidgetsStack from "../../components/incidents/widget/widgetsStack";
import backendServices from "../../services/backendServices/backendServices";
import Logger from "../../loggers/logger";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState<Array<IIncident>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const getIncidents: IIncident[] = await backendServices.getIncidents();
        Logger.info({ source: "Incidents page", message: "Getting incidents success!" });
        setIncidents(getIncidents);
        setIsLoading(false);
      }
      catch (err: any) {
        Logger.error({ source: "Incidents page", message: "Error getting incidents:(" });
      }
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
