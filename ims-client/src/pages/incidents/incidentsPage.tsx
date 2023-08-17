import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import IncidentTable from "../../components/incidentTable/incidentTable";
import WidgetsStack from "../../components/widget/widgetsStack";

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const getIncidents = await apiCalls.getIncidents();
      setIncidents(getIncidents);
      setIsLoading(false);
    };
    fetchData(); 
  }, [refreshCount]); // Depend on the refreshCount state

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ marginBottom: '10px' }}>
        <WidgetsStack />
      </div>
      <div style={{ margin: '20px', flex: 1, overflow: 'auto' }}>
        <IncidentTable rows={incidents} isLoading={isLoading} handleRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default IncidentsPage;
