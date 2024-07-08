export type AgentStateType = "init" | "routable" | "not_routable" | "offline";
export type AgentState = {
    agentStateARN: string | null;
    name: string;
    startTimestamp: Date;
    type: AgentStateType;
  };