
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import './App.css'
import LeftDrawer from './components/drawer/Drawer'
import theme from './theme'
import React from 'react'

function App() {
  const rows= [
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    {
      id: '1',
      name: 'Incident 1',
      status: 'Active',
      description: 'This is incident 1',
      priority: 'High',
      type: 'Bug',
      durationHours: 2,
      slackLink: 'https://slack.com/incident-1',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ],
      date: new Date(2022, 0, 1),
      createdAt: new Date(2022, 0, 1, 10, 0),
      updatedAt: new Date(2022, 0, 1, 12, 0),
      cost: 100,
    },
    // Add more entries here...
    {
      id: '20',
      name: 'Incident 20',
      status: 'Resolved',
      description: 'This is incident 20',
      priority: 'Low',
      type: 'Feature',
      durationHours: 4,
      slackLink: 'https://slack.com/incident-20',
      tags: [
        { id: '1', name: 'tag1' },
        { id: '3', name: 'tag3' },
      ],
      date: new Date(2022, 0, 20),
      createdAt: new Date(2022, 0, 20, 10, 0),
      updatedAt: new Date(2022, 0, 20, 14, 0),
      cost: 200,
    },
    
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <LeftDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <Here put all the components /> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
