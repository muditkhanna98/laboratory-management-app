import { Patient } from './Patient';

export interface Appointment {
  appointmentDatetime: string;
  patient: Patient;
  status: string;
}
