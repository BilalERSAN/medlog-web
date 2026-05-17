import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiry, message } = body;

    // Timezone check for Turkey (UTC+3)
    const now = new Date();
    const turkeyTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Istanbul", hour12: false, hour: "numeric", minute: "numeric" });
    const [hour, minute] = turkeyTimeStr.split(":").map(Number);

    // Check if time is between 01:00 and 08:30
    const isOutsideWorkingHours = (hour === 1 && minute >= 0) || (hour > 1 && hour < 8) || (hour === 8 && minute <= 30);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 465,
      secure: Number(process.env.MAIL_PORT) === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // --- TEMPLATE: ADMIN INFO EMAIL (SİZE GELEN) ---
    const adminEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #004a99; border-bottom: 2px solid #004a99; padding-bottom: 10px;">🔔 Yeni Başvuru Bildirimi</h2>
        <p>Web sitesi üzerinden yeni bir iletişim formu gönderildi. Detaylar aşağıdadır:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Hasta Adı:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>E-posta:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Poliklinik/Branş:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #004a99;">
          <strong>Hasta Mesajı:</strong><br>${message}
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px;">Bu mail Curelog Turkey Otomasyon Sistemi tarafından gönderilmiştir.</p>
      </div>
    `;

    // --- TEMPLATE: PATIENT CONFIRMATION EMAIL (HASTAYA GİDEN) ---
    const patientStatusMessage = isOutsideWorkingHours
      ? "Thank you for contacting us. We have received your message. Due to the time difference, we are currently outside of our working hours. We will get back to you as soon as possible."
      : "Thank you for contacting us. We have received your message and our medical team will get back to you as soon as possible.";

    const patientEmailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #004a99; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">CURELOG TURKEY</h1>
          <p style="color: #e0e0e0; margin: 5px 0 0 0;">Global Health Solutions</p>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333333;">
          <h2 style="color: #004a99;">Hello ${name},</h2>
          <p>${patientStatusMessage}</p>
          <div style="margin: 25px 0; padding: 20px; background-color: #f4f7fa; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold; color: #004a99;">Our Services:</p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Expert Medical Consultation</li>
              <li>Personalized Treatment Plans</li>
              <li>Professional Patient Coordination</li>
            </ul>
          </div>
          <p>We are dedicated to providing you with the best medical guidance in Turkey.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
          <p style="font-size: 14px;">Best Regards,<br><strong>Curelog Turkey Team</strong></p>
        </div>
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777777;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Curelog Turkey. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This is an automated confirmation of your inquiry.</p>
        </div>
      </div>
    `;

    // --- TEMPLATE: TELEGRAM MESSAGE ---
    const telegramMarkdown = `
🚀 *Yeni Başvuru Alındı!*

👤 *Hasta:* ${name}
📞 *Telefon:* [${phone}](tel:${phone})
📧 *E-posta:* ${email}
🏥 *Branş:* ${inquiry}

💬 *Mesaj:*
_${message}_

⏰ *Gönderim:* ${turkeyTimeStr} (TR)
    `.trim();

    // Execute all 3 tasks concurrently
    await Promise.all([
      // 1. Patient Confirmation Email
      transporter.sendMail({
        from: `"Curelog Turkey" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "We have received your medical inquiry - Curelog Turkey",
        html: patientEmailHtml, // Düz yazı yerine hazırladığımız HTML şablonu
      }).catch(err => console.error("Error sending patient email:", err)),

      // 2. Admin Info Email
      transporter.sendMail({
        from: `"System | Curelog Turkey" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER || "info@curelogturkey.com",
        subject: `🚨 New Contact: ${name} (${inquiry})`,
        html: adminEmailHtml,
      }).catch(err => console.error("Error sending admin email:", err)),

      // 3. Telegram Notification
      (async () => {
        if (process.env.TELEGRAM_TOKEN && process.env.TELEGRAM_CHAT_ID) {
          try {
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: telegramMarkdown,
                parse_mode: 'Markdown',
              }),
            });
          } catch (err) {
            console.error("Error sending Telegram message:", err);
          }
        }
      })()
    ]);

    return NextResponse.json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}