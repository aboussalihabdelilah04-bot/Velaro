const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Email] SMTP not configured. Emails will not be sent. Set SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT env vars.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: (parseInt(process.env.SMTP_PORT) || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'velarocars26@gmail.com';
const SITE_NAME = 'VelaroCar';
const SITE_URL = 'https://www.velarocars.com';

async function sendMail(options) {
  const transport = getTransporter();
  if (!transport) {
    console.warn('[Email] No transport available. Skipping email:', options.subject);
    return { sent: false, reason: 'smtp_not_configured' };
  }

  try {
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || `"${SITE_NAME}" <${process.env.SMTP_USER || ADMIN_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    });
    console.log('[Email] Sent:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Email] Send failed:', err.message);
    return { sent: false, reason: err.message };
  }
}

function bookingCreatedAdminHtml(booking) {
  const typeLabels = { car: 'Voiture', motorcycle: 'Moto', villa: 'Villa', excursion: 'Excursion', transfer: 'Transfert', pack: 'Pack' };
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;">Nouvelle Réservation</h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
        <p>Une nouvelle réservation a été reçue sur <strong>${SITE_NAME}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;">Référence</td><td style="padding:8px 0;font-weight:bold;">#${booking.reference}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Client</td><td style="padding:8px 0;">${booking.clientName}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;">${booking.clientEmail}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Téléphone</td><td style="padding:8px 0;">${booking.clientPhone}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Type</td><td style="padding:8px 0;">${typeLabels[booking.productType] || booking.productType}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Produit</td><td style="padding:8px 0;">${booking.productName || '-'}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Dates</td><td style="padding:8px 0;">${new Date(booking.startDate).toLocaleDateString('fr-FR')} → ${new Date(booking.endDate).toLocaleDateString('fr-FR')}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Prix total</td><td style="padding:8px 0;font-weight:bold;color:#e94560;">${booking.totalPrice} MAD</td></tr>
          ${booking.notes ? `<tr><td style="padding:8px 0;color:#666;">Message</td><td style="padding:8px 0;">${booking.notes}</td></tr>` : ''}
        </table>
        <div style="margin-top:20px;text-align:center;">
          <a href="${SITE_URL}/admin/#/bookings" style="display:inline-block;background:#1a1a2e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Gérer la réservation</a>
        </div>
      </div>
    </div>
  `;
}

function bookingStatusCustomerHtml(booking, newStatus) {
  const statusLabels = { confirmed: 'Confirmée', completed: 'Terminée', cancelled: 'Annulée' };
  const statusColors = { confirmed: '#27ae60', completed: '#3498db', cancelled: '#e74c3c' };
  const typeLabels = { car: 'Voiture', motorcycle: 'Moto', villa: 'Villa', excursion: 'Excursion', transfer: 'Transfert', pack: 'Pack' };

  let message = '';
  if (newStatus === 'confirmed') {
    message = 'Votre réservation a été confirmée. Nous avons hâte de vous accueillir !';
  } else if (newStatus === 'completed') {
    message = 'Votre réservation est terminée. Merci d\'avoir choisi VelaroCar !';
  } else if (newStatus === 'cancelled') {
    message = 'Votre réservation a été annulée. Si vous avez des questions, contactez-nous.';
    if (booking.cancellationReason) {
      message += `<br><strong>Raison :</strong> ${booking.cancellationReason}`;
    }
  }

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;">Mise à jour de votre réservation</h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
        <p>Bonjour <strong>${booking.clientName}</strong>,</p>
        <p>${message}</p>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:15px 0;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:4px 0;color:#666;">Référence</td><td style="padding:4px 0;font-weight:bold;">#${booking.reference}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Type</td><td style="padding:4px 0;">${typeLabels[booking.productType] || booking.productType}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Produit</td><td style="padding:4px 0;">${booking.productName || '-'}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Statut</td><td style="padding:4px 0;"><span style="color:${statusColors[newStatus]};font-weight:bold;">${statusLabels[newStatus] || newStatus}</span></td></tr>
            <tr><td style="padding:4px 0;color:#666;">Montant</td><td style="padding:4px 0;font-weight:bold;">${booking.totalPrice} MAD</td></tr>
          </table>
        </div>
        <p style="color:#666;font-size:13px;">Si vous avez des questions, contactez-nous au +212 681 11 71 95 ou via <a href="${SITE_URL}/contact.html">notre formulaire de contact</a>.</p>
        <p style="color:#666;font-size:13px;">L'équipe ${SITE_NAME}</p>
      </div>
    </div>
  `;
}

function contactMessageAdminHtml(msg) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0f3460;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;">Nouveau message de contact</h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
        <p>Un nouveau message a été reçu sur <strong>${SITE_NAME}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;">Nom</td><td style="padding:8px 0;font-weight:bold;">${msg.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;">${msg.email}</td></tr>
          ${msg.phone ? `<tr><td style="padding:8px 0;color:#666;">Téléphone</td><td style="padding:8px 0;">${msg.phone}</td></tr>` : ''}
          ${msg.subject ? `<tr><td style="padding:8px 0;color:#666;">Sujet</td><td style="padding:8px 0;">${msg.subject}</td></tr>` : ''}
        </table>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:15px 0;">
          <p style="margin:0;">${msg.message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="text-align:center;margin-top:20px;">
          <a href="mailto:${msg.email}" style="display:inline-block;background:#0f3460;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;">Répondre par email</a>
          <a href="${SITE_URL}/admin/#/messages" style="display:inline-block;background:#fff;color:#0f3460;padding:10px 20px;text-decoration:none;border-radius:6px;border:1px solid #0f3460;margin-left:10px;">Voir dans l'admin</a>
        </div>
      </div>
    </div>
  `;
}

async function notifyAdminNewBooking(booking) {
  return sendMail({
    to: ADMIN_EMAIL,
    subject: `[${SITE_NAME}] Nouvelle réservation #${booking.reference}`,
    html: bookingCreatedAdminHtml(booking)
  });
}

async function notifyCustomerBookingStatus(booking, newStatus) {
  if (!booking.clientEmail) return { sent: false, reason: 'no_email' };
  const statusLabels = { confirmed: 'Confirmée', completed: 'Terminée', cancelled: 'Annulée' };
  return sendMail({
    to: booking.clientEmail,
    subject: `[${SITE_NAME}] Votre réservation #${booking.reference} est ${statusLabels[newStatus] || newStatus}`,
    html: bookingStatusCustomerHtml(booking, newStatus)
  });
}

async function notifyAdminNewMessage(msg) {
  return sendMail({
    to: ADMIN_EMAIL,
    subject: `[${SITE_NAME}] Nouveau message de ${msg.name}`,
    html: contactMessageAdminHtml(msg)
  });
}

module.exports = {
  sendMail,
  notifyAdminNewBooking,
  notifyCustomerBookingStatus,
  notifyAdminNewMessage
};
