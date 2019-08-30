import { Registrar } from './Registrar';
import { Dns } from './Dns';

export interface Domain {
  id: number;
  name: string;
  registrar: Registrar;
  dns: Dns;
}

export interface DomainsResponse {
  [domains: string]: Domain[];
}

export interface DomainResponse {
  [domains: string]: Domain;
}

export interface DomainRegistrarStatus {
  name: string;
  summary: string;
  expiry_date: string;
  auto_renew: string;
}
export interface DomainRegistrarStatusResponse {
  status: DomainRegistrarStatus;
}

export interface DomainDNSStatus {
  name: string;
  summary: string;
  nameservers: string;
}

export interface DomainDNSStatusResponse {
  status: DomainDNSStatus;
}
