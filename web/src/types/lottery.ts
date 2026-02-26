export type Status = 'running' | 'finalized';

export type Lottery = {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
};
