// ContactStatus.tsx
import { useState, useEffect } from 'react';
import { ContactStartingAcwHandler, ContactDestroyedHandler, ContactMissedHandler, ContactConnectedHandler } from "@amazon-connect/contact";
import { ContactEventData } from "../events/contactEventData";
import { ContactClient } from "@amazon-connect/contact";

const contactClient = new ContactClient();

interface Props {
    currentTime: string;
    addLog: (log: string) => void;
    contactEvent : string | undefined;
    setContactEvent: (contactEvent: string | undefined) => void;
}

const ContactStatus: React.FC<Props> = ({ currentTime, addLog, contactEvent, setContactEvent }) => {

    useEffect(() => {

        let contactConnectedHandler: ContactConnectedHandler = async (data: ContactEventData) => {
            setContactEvent(data.contactId);
            addLog(`[${currentTime}] -> [ContactEvent] : ${data.contactId}`);
        };
        
        let contactStartingAcwhandler: ContactStartingAcwHandler = async (data: ContactEventData) => {
            setContactEvent(data.contactId);
            addLog(`[${currentTime}] -> [ContactEvent] : ${data.contactId}`);
        };

        let contactDestroyedHandler: ContactDestroyedHandler = async (data: ContactEventData) => {
            setContactEvent(data.contactId);
            addLog(`[${currentTime}] -> [ContactEvent] : ${data.contactId}`);
        };

        let contactMissedHandler: ContactMissedHandler = async (data: ContactEventData) => {
            setContactEvent(data.contactId);
            addLog(`[${currentTime}] -> [ContactEvent] : ${data.contactId}`);
        };

  
        
        contactClient.onConnected(contactConnectedHandler);
        contactClient.onStartingAcw(contactStartingAcwhandler);
        contactClient.onDestroyed(contactDestroyedHandler);
        contactClient.onMissed(contactMissedHandler);
        

        return () => {
            contactClient.offStartingAcw(contactStartingAcwhandler);
            contactClient.offDestroyed(contactDestroyedHandler);
            contactClient.offMissed(contactMissedHandler);
            contactClient.offConnected(contactConnectedHandler);
        };
    }, []);

    return (
        <div className="contact_event">
            Contact ID: {contactEvent}
        </div>
    );
};

export default ContactStatus;