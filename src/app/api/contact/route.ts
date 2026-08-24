import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Contact API] Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          error: "Email service is not configured. Please set RESEND_API_KEY in your environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    const resend = new Resend(apiKey);

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #0c0d0e;
              color: #f1f5f9;
              padding: 24px;
              margin: 0;
            }
            .card {
              background-color: #141618;
              border: 1px solid #26292d;
              border-radius: 12px;
              max-width: 600px;
              margin: 0 auto;
              overflow: hidden;
            }
            .header {
              padding: 20px 24px;
              background-color: #1a1d20;
              border-bottom: 1px solid #26292d;
            }
            .tag {
              display: inline-block;
              font-size: 11px;
              font-family: monospace;
              letter-spacing: 0.08em;
              color: #22c55e;
              background: rgba(34, 197, 94, 0.1);
              padding: 3px 8px;
              border-radius: 4px;
              margin-bottom: 8px;
            }
            .title {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #ffffff;
            }
            .content {
              padding: 24px;
            }
            .field {
              margin-bottom: 16px;
            }
            .label {
              font-size: 11px;
              font-family: monospace;
              text-transform: uppercase;
              color: #94a3b8;
              letter-spacing: 0.05em;
              margin-bottom: 4px;
            }
            .value {
              font-size: 15px;
              color: #f8fafc;
            }
            .message-box {
              background-color: #0c0d0e;
              border: 1px solid #26292d;
              border-radius: 8px;
              padding: 16px;
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
              color: #e2e8f0;
              margin-top: 6px;
            }
            .footer {
              padding: 16px 24px;
              background-color: #1a1d20;
              border-top: 1px solid #26292d;
              font-size: 12px;
              color: #64748b;
              text-align: center;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="tag">NEW MESSAGE // PORTFOLIO</span>
              <h1 class="title">Transmission from ${escapeHtml(name)}</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">&gt; Sender Name</div>
                <div class="value">${escapeHtml(name)}</div>
              </div>
              <div class="field">
                <div class="label">&gt; Sender Email</div>
                <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #38bdf8;">${escapeHtml(email)}</a></div>
              </div>
              <div class="field">
                <div class="label">&gt; Message</div>
                <div class="message-box">${escapeHtml(message)}</div>
              </div>
            </div>
            <div class="footer">
              Sent via devadex-portfolio • You can reply directly to this email to respond to ${escapeHtml(name)}.
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Contact API] Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email via Resend" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Message sent successfully!",
    });
  } catch (err: unknown) {
    console.error("[Contact API] Unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
