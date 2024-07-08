import { useState, useEffect } from 'react';
import './App.css';
import AgentStatus from './agent/agentStatus';
import ContactStatus from './contact/contactStatus';
import AgentApiRequest from './agent/agentApiRequest';
import ContactApiRequest from './contact/contactApiRequest';
import { AmazonConnectApp } from '@amazon-connect/app';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (log: string) => {
    setLogs(prevLogs => [...prevLogs, log]);
  };
  const clearLogs = () => {
    setLogs([]);
  };
  const [contactEvent, setContactEvent] = useState<string | undefined>();
  const [showOptions, setShowOptions] = useState(false);
  let currentTime = new Date().toLocaleString();

  // useEffect(() => {
  //   const { provider } = AmazonConnectApp.init({
  //     onCreate: (event) => {
  //       const { appInstanceId } = event.context;
  //       console.log('App initialized: ', appInstanceId);
  //       addLog(`App initialized: ${appInstanceId}`);
  //     },
  //     onDestroy: (event) => {
  //       console.log('App being destroyed');
  //       addLog('App being destroyed');
  //     },
  //   });

  //   // Cleanup function to handle app destruction
  //   return () => {
  //     provider.destroy();
  //   };
  // }, []);

  return (
    <div className="mid_body">
      <h1>Agent Events</h1>
      <AgentStatus currentTime={currentTime} addLog={addLog} />
      <AgentApiRequest currentTime={currentTime} addLog={addLog} />
      <h1>Contact Events</h1>
      <ContactStatus currentTime={currentTime} addLog={addLog} contactEvent={contactEvent} setContactEvent={setContactEvent} />
      <ContactApiRequest currentTime={currentTime} contactEvent={contactEvent} showOptions={showOptions} setShowOptions={setShowOptions} addLog={addLog} />
      <h1>Log</h1>
      <div className="clear_button"><button onClick={clearLogs} style={{ height: '30px', width: '80px' }}>Clear Logs</button></div>
      <div className="add_log">
        {logs.map((content, index) => (
          <div key={index}>{content}</div>
        ))}
      </div>
    </div>
  );
};

export default App;