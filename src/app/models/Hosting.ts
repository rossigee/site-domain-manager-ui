export interface Hosting {
  id: number;
  label: string;
}

export interface HostingResponse {
  hosting_providers: Hosting[];
}
