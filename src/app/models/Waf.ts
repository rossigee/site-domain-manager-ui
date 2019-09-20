export interface Waf {
  id: number;
  label: string;
}

export interface WafResponse {
  waf_providers: Waf[];
}
