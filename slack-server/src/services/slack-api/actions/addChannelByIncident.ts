

// const axios = require('axios');
// const createNewChannel = require('./createChannel.js');


// async function getIncidentFromImsServer(incidentId) {
//   try {
//     const imsServerUrl = 'http://localhost:7000/incident';
//     const response = await axios.get(`${imsServerUrl}/${incidentId}`);
//     const incidentData = response.data;
//     console.log('Incident data:', incidentData);
//     return incidentData;
//   } catch (error) {
//     console.error('Error calling IMS server:', error);
//     return null;
//   }
// }
// async function getIncidentAndCreateChannel(incidentId) {
//   try {
//     const incidentData = await getIncidentFromImsServer(incidentId);

//     if (incidentData) {
//       // const slackName = incidentData.slackLink;
//       const channelName='tamar';
//       const userIds = ['U05HXKPD259'];
//       await createNewChannel(channelName, userIds);
//     } else {
//       console.log('Incident data not found or error occurred. Channel not created.');
//     }
//   } catch (error) {
//     console.error('Error in getIncidentAndCreateChannel:', error);
//   }
// }

// const incidentId = '649cbeda942a5d4d8bcf3044';
// getIncidentAndCreateChannel(incidentId);












// import axios from 'axios';
// import {createNewChannel} from './createChannel';



// async function getIncidentFromImsServer(incidentId:string) {
//   try {
//     const imsServerUrl = 'http://localhost:7000/incident';
//     const response = await axios.get(`${imsServerUrl}/${incidentId}`);
//     const incidentData = response.data;
//     console.log('Incident data:', incidentData);
//     return incidentData;
//   } catch (error) {
//     console.error('Error calling IMS server:', error);
//     return null;
//   }
// }
// async function getIncidentAndCreateChannel(incidentId:string) {
//   try {
//     const incidentData = await getIncidentFromImsServer(incidentId);

//     if (incidentData) {
//       // const slackName = incidentData.slackLink;
//       const channelName='tamar3';
//       const userIds = ['U05HXKPD259'];
//       await createNewChannel(channelName, userIds);
//     } else {
//       console.log('Incident data not found or error occurred. Channel not created.');
//     }
//   } catch (error) {
//     console.error('Error in getIncidentAndCreateChannel:', error);
//   }
// }

// const incidentId = '649cbeda942a5d4d8bcf3044';
// getIncidentAndCreateChannel(incidentId);