import { Registrar } from './Registrar';
import { Dns } from './Dns';
import { Site } from './Site';
import { Waf } from './Waf';

export interface Domain {
  id: number;
  name: string;
  registrar?: Registrar;
  dns?: Dns;
  site?: Site;
  waf?: Waf;
  update_apex: boolean;
  // update_a_records: string; //array
  google_site_verification: string;
  active: boolean;
}

export interface DomainUpdateParams {
  name: string;
  registrar?: number;
  dns?: number;
  site?: number;
  waf?: number;
  update_apex: boolean;
  // update_a_records: string; //array
  google_site_verification: string;
  active: boolean;
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

export interface DomainStatusCheck {
  _check_id: string;
  startTime: string;
  endTime: string;
  success: boolean;
  output: string;
}
export interface DomainStatusChecksResponse {
  [checks: string]: DomainStatusCheck[];
}
