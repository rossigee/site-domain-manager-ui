interface AgentSetting {
  key: string;
  description: string;
}

export interface Agent {
  class: string;
  label: string;
  settings: Array<AgentSetting> | [];
}

export interface AgentResponse {
  registrar: Agent[] | [];
  dns: Agent[] | [];
  waf: Agent[] | [];
  hosting: Agent[] | [];
}
