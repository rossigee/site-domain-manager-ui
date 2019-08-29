export interface Domain {
  id: number;
  name: string;
  registrar;
  dns;
}

export interface DomainRegistrarStatus {
  name: string;
  summary: string;
  expiry_date: string;
  auto_renew: string;
}

export interface DomainDNSStatus {
  name: string;
  summary: string;
  nameservers: string;
}
