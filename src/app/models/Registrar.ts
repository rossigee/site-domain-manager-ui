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

export interface RegistrarModel {
  label: string;
  agent_module: string;
  config_id: string;
  state: string;
  active: boolean;
}
