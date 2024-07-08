import { useState } from 'react';
import { ContactClient } from "@amazon-connect/contact";

const contactClient = new ContactClient();

interface Props {
  currentTime: string;
  contactEvent: string | undefined;
  addLog: (log: string) => void;
  showOptions : boolean;
  setShowOptions : (showOptions:boolean) => void;
}

const ContactApiRequest: React.FC<Props> = ({ currentTime, contactEvent, addLog, showOptions, setShowOptions }) => {
  const [contactRequest, setContactRequest] = useState<any>(null);

  const handleButtonClick = async (apiName: string) => {
    try {
      let requestResult: any;
      switch(apiName) {
        case 'getAttributes':
          requestResult = await contactClient.getAttributes(contactEvent || '', '*');
        break;
        case 'getAttribute':
          setShowOptions(!showOptions);
        break;
        case 'getApiAttribute':
            const inputElement = document.getElementById('getapiAttribute');
            if (inputElement instanceof HTMLInputElement) {
              const attributevalue = inputElement.value;
              if (attributevalue.length === 0) {
                alert('Contact 속성값을 입력해 주세요!');
              } else {
                requestResult = await contactClient.getAttribute(String(contactEvent), attributevalue);
              }
            }
          break;
          case 'getInitialContactId':
            requestResult = await contactClient.getInitialContactId(String(contactEvent));
          break;
          case 'getType':
            requestResult = await contactClient.getType(String(contactEvent));
          break;
          case 'getStateDuration':
            requestResult = await contactClient.getStateDuration(String(contactEvent));
          break;
          case 'getQueue':
            requestResult = await contactClient.getQueue(String(contactEvent));
          break;
          case 'getQueueTimestamp':
            requestResult = await contactClient.getQueueTimestamp(String(contactEvent))
          break;
        default:
          break;
      }
      setContactRequest(requestResult);
      if(apiName!=='getAttribute'){addLog(`[${currentTime}] -> [ContactRequest] - ${apiName}(): ${JSON.stringify(requestResult)}`);}
      
    } catch (error) {
      console.error("Error fetching contact API:", error);
    }
  };

  return (
    <div className="contact_request">
      <h1>Contact API request</h1>
      <div className="contact_api_list">
      <button onClick={() => handleButtonClick('getAttributes')} className="getAttributes api">getAttributes</button>
        <button onClick={() => handleButtonClick('getAttribute')} name = "getAttribute" className="getAttribute api">getAttribute</button>
            {showOptions && ( 
              <div className='input_attribute'>
                  <input type="text" id="getapiAttribute"></input>
                  <button onClick={() => handleButtonClick('getApiAttribute')} name="getApiAttribute" className="get_api_attribute">GO</button>
              </div>
            )}
        <button onClick={() => handleButtonClick('getInitialContactId')} name = "getInitialContactId" className="getInitialContactId api">getInitialContactId</button>
        <button onClick={() => handleButtonClick('getType')} name = "getType" className="getType api">getType</button>
        <button onClick={() => handleButtonClick('getStateDuration')} name = "getStateDuration" className="getStateDuration api">getStateDuration</button>
        <button onClick={() => handleButtonClick('getQueue')} name = "getQueue" className="getQueue api">getQueue</button>
        <button onClick={() => handleButtonClick('getQueueTimestamp')} name = "getQueueTimestamp" className="getQueueTimestamp api">getQueueTimestamp</button>
      </div>
      <div className="contact_request_result">
        Contact API: {JSON.stringify(contactRequest)}
      </div>
    </div>
  );
};

export default ContactApiRequest;