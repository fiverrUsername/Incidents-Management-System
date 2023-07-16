import { IIncident } from "../interfaces/IncidentInterface";

export default function validate(model: IIncident) {
  const errors:Array<string> = [];

  // // Validate _id
  // if (!model.id || typeof model.id !== 'string') {
  //   errors.push('Invalid id');
  // }

  // // Validate name
  // if (!model.name || typeof model.name !== 'string') {
  //   errors.push('Invalid name');
  // }

  // // Validate status
  // if (!model.status || typeof model.status !== 'string') {
  //   errors.push('Invalid status');
  // }

  // // Validate description
  // if (!model.description || typeof model.description !== 'string') {
  //   errors.push('Invalid description');
  // }

  // // Validate priority
  // if (!model.priority || typeof model.priority !== 'string') {
  //   errors.push('Invalid priority');
  // }

  // // Validate type
  // if (!model.type || typeof model.type !== 'string') {
  //   errors.push('Invalid type');
  // }

  // // Validate durationHours
  // if (!model.durationHours || typeof model.durationHours !== 'string') {
  //   errors.push('Invalid durationHours');
  // }

  // // Validate slackLink
  // if (model.slackLink && typeof model.slackLink !== 'string') {
  //   errors.push('Invalid slackLink');
  // }

  // // Validate tags
  // if (!model.tags || !Array.isArray(model.tags)) {
  //   errors.push('Invalid tags');
  // } else {
  //   for (const tag of model.tags) {
  //     if (!tag.id || typeof tag.id !== 'string') {
  //       errors.push('Invalid tag id');
  //     }
  //     if (!tag.name || typeof tag.name !== 'string') {
  //       errors.push('Invalid tag name');
  //     }
  //   }
  // }

  // // Validate date
  // if (!model.date || !(model.date instanceof Date)) {
  //   errors.push('Invalid date');
  // }

  // // Validate createdAt
  // if (!model.createdAt || !(model.createdAt instanceof Date)) {
  //   errors.push('Invalid createdAt');
  // }

  // // Validate updatedAt
  // if (!model.updatedAt || !(model.updatedAt instanceof Date)) {
  //   errors.push('Invalid updatedAt');
  // }

  // // Validate cost
  // if (model.cost === undefined || typeof model.cost !== 'number') {
  //   errors.push('Invalid cost');
  // }

  return errors;
}