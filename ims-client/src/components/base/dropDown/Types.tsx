
import { Status, Types } from "../../../interfaces/enums";

export interface option {
   value: string;
   label: string;
}
 
export const TypesIncident: option[] = [
   { value: Types.securing, label: 'Securing' },
   { value: Types.technical, label: 'Technical' },
   { value: Types.comment, label: 'Comment' },
];
export const StatusIncident: option[] = [
   { value: Status.Active, label: 'Active' },
   { value: Status.Resolved, label: 'Resolved' },
 ];
 

