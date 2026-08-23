"use server";

export type SendEmailResult = {
  ok: boolean;
};

export async function SendEmail(
  senderName: string,
  senderEmail: string,
  senderMessage: string,
): Promise<SendEmailResult> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail);

  if (
    !webhookUrl ||
    !senderName.trim() ||
    !validEmail ||
    !senderMessage.trim() ||
    senderName.length > 120 ||
    senderEmail.length > 254 ||
    senderMessage.length > 4000
  ) {
    return { ok: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**Name:** ${senderName.trim()}\n**Email:** ${senderEmail.trim()}\n**Message:** ${senderMessage.trim()}`,
      }),
      cache: "no-store",
    });

    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
