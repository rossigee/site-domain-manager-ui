export interface Notifier {
  id: number;
  label: string;
  updated_time: string;
}

export interface NotifierResponse {
  notifiers: Notifier[];
}
