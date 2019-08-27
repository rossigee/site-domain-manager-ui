export interface Domain {
  id: number;
  name: string;
  registrar;
}

export interface DomainRegistrarStatus {
  name: string;
  summary: string;
  expiry_date: string;
  auto_renew: string;
}
