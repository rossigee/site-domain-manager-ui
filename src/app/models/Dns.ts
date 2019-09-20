export interface Dns {
  id: string;
  label: string;
}

export interface DnsResponse {
  dns_providers: Dns[];
}
