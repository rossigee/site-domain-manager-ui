import { Hosting } from './Hosting';

export interface Site {
  id: number;
  label: string;
  active: boolean;
  hosting: Hosting;
}

export interface SitesResponse {
  sites: Site[];
}

export interface SiteResponse {
  [sites: string]: Site;
}
