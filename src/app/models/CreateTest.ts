import { Patient } from './Patient';

export interface CreateTest {
  patient: Patient;
  medical_user: {
    username: string;
  };
  test: { testId: number };
  orderDateTime: Date;
  status: string;
}
