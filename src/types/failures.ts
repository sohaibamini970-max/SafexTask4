export type FailureType = 
  | 'offline' 
  | 'timeout' 
  | 'server-error' 
  | 'invalid-data' 
  | 'expired-session';

export interface FailureScenario {
  id: FailureType;
  title: string;
  triggerContext: string;
  userImpact: string;
  technicalCode: string;
  recoveryMechanism: string;
}
