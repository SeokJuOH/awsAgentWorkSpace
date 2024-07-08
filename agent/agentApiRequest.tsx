import { useState } from 'react';
import { AgentClient } from "@amazon-connect/contact";

const agentClient = new AgentClient();

interface Props {
  currentTime: string;
  addLog: (log: string) => void;
}

const AgentApiRequest: React.FC<Props> = ({ currentTime, addLog }) => {
  const [agentRequest, setAgentRequest] = useState<any>(null);

  const handleButtonClick = async (apiName: string) => {
    try {
      let requestResult: any;
      switch(apiName) {
        case 'getARN':
          requestResult = await agentClient.getARN();
        break;
        case 'getName':
          requestResult = await agentClient.getName();
        break;
        case 'getState':
          requestResult = await agentClient.getState();
        break;
        case 'getRoutingProfile':
          requestResult = await agentClient.getRoutingProfile();
        break;
        // case 'getChannelConcurrency':
        // requestResult = await agentClient.getChannelConcurrency();
        // break;
        case 'getExtension':
          requestResult = await agentClient.getExtension();
        break;
        case 'getDialableCountries':
          requestResult = await agentClient.getDialableCountries();
        break;
        default:
        break;
      }
      setAgentRequest(requestResult);
      addLog(`[${currentTime}] -> [AgentRequest] - ${apiName}(): ${JSON.stringify(requestResult)}`);
    } catch (error) {
      console.error("Error fetching agent API:", error);
    }
  };

  return (
    <div className="agent_request">
      <h1>Agent API request</h1>
      <div className="agent_api_list">
        <button onClick={() => handleButtonClick('getARN')} className="getARN api">getARN</button>
        <button onClick={() => handleButtonClick('getName')} name = "getName" className="getName api">getName</button>
        <button onClick={() => handleButtonClick('getState')} name = "getState" className="getState api">getState</button>
        <button onClick={() => handleButtonClick('getRoutingProfile')} name = "getRoutingProfile" className="getRoutingProfile api">getRoutingProfile</button>
        <button onClick={() => handleButtonClick('getChannelConcurrency')} name = "getChannelConcurrency" className="getChannelConcurrency api">getChannelConcurrency</button>
        <button onClick={() => handleButtonClick('getExtension')} name = "getExtension" className="getExtension api">getExtension</button>
        <button onClick={() => handleButtonClick('getDialableCountries')} name = "getDialableCountries" className="getDialableCountries api">getDialableCountries</button>
      </div>
      <div className="agent_request_result">
        Agent API: {JSON.stringify(agentRequest)}
      </div>
    </div>
  );
};

export default AgentApiRequest;