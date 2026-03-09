import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { withId } from './HOC';
import IncidentsPage from './pages/incidents/incidentsPage';
import LiveStatus from './pages/liveStatus/liveStatusPage';
import TimeLinePage from './pages/timeLine/timeLinePage';


export default function Router() {
  return (
    <Routes>
      <Route path="/incident" element={<IncidentsPage />} />
      <Route path="/timeline/:id" Component={withId(TimeLinePage)} />
      <Route path="/" element={<Navigate to="/incident" />} />
      <Route path="*" element={<h1>404 Page not found 🤔</h1>} />
      <Route path="/liveStatus" element={<LiveStatus />} />
    </Routes>
  );
}

//פיצר מתקשם בריאקט שמאפשר שימוש בקומפוננטות רגילות