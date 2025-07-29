import React, { useEffect, useState } from "react";
import "../Contact.css";
import { list as listContacts } from "../contact/api-contact";

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    listContacts().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setContact(data[data.length - 1]); // get latesst
      }
    });
  }, []);

  if (!contact) {
    return <div className="contact-page">Loading...</div>;
  }

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-avatar">
          <img
            src="/src/assets/headshot.png"
            alt={contact.name || "Contact Avatar"}
          />
        </div>
        <div className="contact-info">
          <h1>Contact Me</h1>
          <div className="info-list">
            <div><strong>Name:</strong> {contact.name}</div>
            <div>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </div>
            {contact.linkedin && (
              <div>
                <strong>LinkedIn:</strong>{" "}
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  {contact.linkedin}
                </a>
              </div>
            )}
            {contact.github && (
              <div>
                <strong>GitHub:</strong>{" "}
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  {contact.github}
                </a>
              </div>
            )}
            {contact.message && (
              <div className="info-message">
                <strong>Other:</strong> {contact.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
