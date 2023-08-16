export interface CreateTestResult {
  testOrder: {
    testOrderId: number;
    patient: {
      patientUserName: String;
    };
  };
  technician: {
    username: string;
  };
  resultText: String;
}
