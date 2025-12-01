// src/lib/email.ts

import { FORWARD_EMAIL_API_KEY, ADMIN_EMAIL } from 'astro:env/server'; // Added FORWARD_EMAIL_API_KEY

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from_name?: string; // Optional custom from address name
}

export async function sendEmail(options: EmailOptions) {
  const SENDER_EMAIL = `no-reply@${new URL(import.meta.env.SITE || 'http://localhost').hostname}`;

  try {
    const response = await fetch('https://api.forwardemail.net/v1/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FORWARD_EMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `"${options.from_name || 'Donatale'}" <${SENDER_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending email via Forward Email API:', response.status, errorData);
      return false;
    }

    console.log('Message sent via Forward Email API to %s', options.to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Function to send confirmation to admin
export async function sendAdminNotification(
  donationEventId: string,
  itemName: string,
  donorName: string,
  donorEmail: string,
  donatedBy: string,
  donationCode: string,
) {
  const subject = `Nuova Donazione: ${itemName} (#${donationCode})`;
  const html = `
    <h1>Nuova Donazione Ricevuta!</h1>
    <p>È stata effettuata una nuova donazione per l'oggetto: <strong>${itemName}</strong>.</p>
    <p><strong>Codice Donazione:</strong> ${donationCode}</p>
    <p><strong>Donato da:</strong> ${donatedBy}</p>
    <p><strong>Nome del Donatore:</strong> ${donorName}</p>
    <p><strong>Email del Donatore:</strong> ${donorEmail}</p>
    <p><strong>ID Evento Donazione:</strong> ${donationEventId}</p>
    <p>Si prega di verificare il pagamento e aggiornare lo stato dell'oggetto in DatoCMS.</p>
  `;

  await sendEmail({
    to: ADMIN_EMAIL, // Admin email address from environment variables
    subject: subject,
    html: html,
  });
}

// Function to send confirmation to donor
export async function sendDonorConfirmation(
  donorEmail: string,
  donorName: string,
  itemName: string,
  donationCode: string,
) {
  const subject = `Conferma della tua donazione a Donatale per ${itemName}`;
  const html = `
    <h1>Grazie per la tua Donazione!</h1>
    <p>Ciao ${donorName},</p>
    <p>Abbiamo registrato la tua intenzione di donare per l'oggetto: <strong>${itemName}</strong>.</p>
    <p>Il tuo <strong>Codice Donazione Univoco</strong> è: <strong style="font-size: 1.5em; color: #f59e0b;">${donationCode}</strong></p>
    <p>Ricorda di includere questo codice nella causale o nel commento del pagamento quando effettui la donazione tramite PayPal, Satispay o bonifico bancario.</p>
    <p>Ti contatteremo non appena avremo verificato il pagamento e aggiornato lo stato del dono.</p>
    <p>Grazie di cuore per il tuo supporto!</p>
    <p>Il team di Donatale</p>
  `;

  await sendEmail({
    to: donorEmail,
    subject: subject,
    html: html,
  });
}
