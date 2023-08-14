import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IncidentsPage from './pages/incidents/incidentsPage';
import {withId} from './HOC'
import TimeLinePage from './pages/timeLine/timeLinePage';
import HeatmapChar from './components/heatmapChar/heatmapChar';


export default function Router() {
  return (
       <Routes>
            <Route path="/incident" element={<IncidentsPage />} />
            <Route path="/timeline/:id" Component={withId(TimeLinePage)} />
            <Route path="/" element={<Navigate to="/incident" />} />
            <Route path="*" element={<h1>404 Page not found 🤔</h1>} />
        </Routes>
  );
}