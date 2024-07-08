import { useState, useEffect } from 'react';
import { AgentStateChangedEventData } from "../events/agentStateChangedEventData";
import { AgentStateChangedHandler } from "@amazon-connect/contact";
import { AgentClient } from "@amazon-connect/contact";

const agentClient = new AgentClient();

interface Props {
    currentTime: string;
    addLog: (log: string) => void;
  }
  
const AgentStatus: React.FC<Props> = ({ currentTime, addLog }) => {
  const [agentEvent, setAgentEvent] = useState<string | undefined>();
  const [agentPreviousEvent, setAgentPreviousEvent] = useState<string | undefined>();
  useEffect(() => {
    let agenthandler: AgentStateChangedHandler = async (data: AgentStateChangedEventData) => {
      setAgentEvent(data.state);
      setAgentPreviousEvent(data.previous.state);
      addLog(`[${currentTime}] -> [AgentEvent] : Agent 상태: ${data.state}, Agent 이전 상태: ${data.previous.state}`);
    };

    agentClient.onStateChanged(agenthandler);

    return () => {
      agentClient.offStateChanged(agenthandler);
    };
  }, [currentTime]);

  return (
    <div className="agent_events">
      <div className="state">Agent 상태표기: {agentEvent}</div>
      <div className="previousState">Agent 이전상태 표기: {agentPreviousEvent}</div>
    </div>
  );
};

export default AgentStatus;