import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IncidentsPage from './pages/incidents/incidentsPage';
import {withId} from './HOC'
import TimeLinePage from './pages/timeLine/timeLinePage';
import HeatmapChar from './components/heatmapChar/heatmapChar';
import LiveStatus from './pages/liveStatus/liveStatus';


export default function Router() {
  return (
       <Routes>
            <Route path="/incident" element={<IncidentsPage />} />
            <Route path="/timeline/:id" Component={withId(TimeLinePage)} />
            <Route path="/" element={<Navigate to="/incident" />} />
            <Route path="*" element={<h1>404 Page not found 🤔</h1>} />
            <Route path="/liveStatus" element={<HeatmapChar />} />
            <Route path="/liveStatusPage" element={<LiveStatus />} />
        </Routes>
  );
}

//פיצר מתקשם בריאקט שמאפשר שימוש בקומפוננטות רגילות