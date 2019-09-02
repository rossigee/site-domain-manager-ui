export interface Registrar {
  id: number;
  label: string;
  updated_time: Date;
}

export interface RegistrarsResponse {
  registrars: Registrar[];
}

export interface PostResponse {
  status: string;
  records_read: number;
}
