import { Registrar } from './Registrar';
import { Dns } from './Dns';
import { Hosting } from './Hosting';
import { Waf } from './Waf';

export interface Domain {
  id: number;
  name: string;
  registrar?: Registrar;
  dns?: Dns;
  hosting?: Hosting;
  waf?: Waf;
}

export interface DomainUpdateParams {
  name: string;
  registrar?: number;
  dns?: number;
  hosting?: number;
  waf?: number;
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
