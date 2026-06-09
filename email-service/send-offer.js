#!/usr/bin/env node
/**
 * BabyBear 小熊双语夏令营 — Offer letter mailer
 * Sends a bilingual official offer email via SMTP (babybearai.com).
 *
 * Usage:
 *   node send-offer.js --to parent@example.com --child "Emma" --parent "Ms. Li" \
 *        --session "Week 1 · 自然探索 Into the Woods"
 *
 * Modes:
 *   --preview   Render the email to ./preview.html without sending (no SMTP needed).
 *   --verify    Test the SMTP connection/credentials only.
 *
 * Run "node send-offer.js --help" for all options.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------- arg parsing ----------
function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) { out[key] = true; }
      else { out[key] = next; i++; }
    } else { out._.push(a); }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  console.log(`
BabyBear Offer Mailer

  --to <email>        Recipient (parent) email address          [required to send]
  --child <name>      Child's name                              (default: "your child")
  --parent <name>     Parent's name                             (default: "Parent")
  --session <text>    Program / week name                       (default: all-summer)
  --dates <text>      Program dates
  --hours <text>      Daily hours
  --location <text>   Location text
  --tuition <text>    Tuition text
  --reply-by <text>   Reply-by deadline
  --contact <email>   Contact address shown in the letter       (default: REPLY_TO/FROM_EMAIL)
  --subject <text>    Override the email subject

  --preview           Render to ./preview.html, do not send (no SMTP needed)
  --verify            Verify SMTP connection only
  --help              Show this help
`);
  process.exit(0);
}

// ---------- content defaults ----------
const year = String(new Date().getFullYear());
const contactEmail = args.contact || process.env.REPLY_TO || process.env.FROM_EMAIL || 'hello@babybearai.com';

const fields = {
  childName: args.child || 'your child',
  parentName: args.parent || 'Parent',
  session: args.session || '整夏 5 周 · All-Summer (Weeks 1–5)',
  dates: args.dates || 'July 6 – August 7, 2026',
  hours: args.hours || 'Mon–Fri, 9:00 AM – 3:00 PM',
  location: args.location || 'Seattle, WA (details to follow)',
  tuition: args.tuition || '$1,999 全夏 / $450 per week',
  replyBy: args['reply-by'] || 'June 20, 2026',
  contactEmail,
  year,
};

// ---------- render ----------
function render(tpl, data) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (data[k] !== undefined ? String(data[k]) : ''));
}
function buildText(d) {
  return [
    `恭喜 ${d.childName}！/ Congratulations!`,
    ``,
    `亲爱的 ${d.parentName}，${d.childName} 已被 BabyBear 小熊双语夏令营正式录取。`,
    `Dear ${d.parentName}, ${d.childName} has been offered a place at BabyBear Bilingual Summer Camp.`,
    ``,
    `项目 Program : ${d.session}`,
    `日期 Dates   : ${d.dates}`,
    `时间 Hours   : ${d.hours}`,
    `地点 Location: ${d.location}`,
    `学费 Tuition : ${d.tuition}`,
    ``,
    `请在 ${d.replyBy} 前回复本邮件确认参加，我们将发送缴费指引与入营须知。`,
    `Please reply by ${d.replyBy} to accept; we'll follow up with payment details and a welcome packet.`,
    ``,
    `如有疑问请来信 ${d.contactEmail}。`,
    `BabyBear 招生团队 / The BabyBear Admissions Team`,
    `babybearai.com`,
  ].join('\n');
}

const tplPath = path.join(__dirname, 'templates', 'offer.html');
const html = render(fs.readFileSync(tplPath, 'utf8'), fields);
const text = buildText(fields);
const subject = args.subject || `🧸 录取通知 Offer · ${fields.childName} @ BabyBear 小熊双语夏令营`;

// ---------- preview mode ----------
if (args.preview) {
  const out = path.join(__dirname, 'preview.html');
  fs.writeFileSync(out, html);
  console.log('✅ Preview written to', out);
  console.log('   Subject:', subject);
  console.log('   Open it in a browser to review the offer layout. No email was sent.');
  process.exit(0);
}

// ---------- build transport ----------
function requireEnv(keys) {
  const missing = keys.filter(k => !process.env[k]);
  if (missing.length) {
    console.error('❌ Missing required env vars:', missing.join(', '));
    console.error('   Copy .env.example to .env and fill in your babybearai.com SMTP credentials.');
    process.exit(1);
  }
}
requireEnv(['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: String(process.env.SMTP_SECURE ?? (Number(process.env.SMTP_PORT) === 465)).toLowerCase() === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ---------- verify mode ----------
if (args.verify) {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection OK — credentials accepted by', process.env.SMTP_HOST);
    process.exit(0);
  } catch (err) {
    console.error('❌ SMTP verify failed:', err.message);
    process.exit(1);
  }
}

// ---------- send ----------
if (!args.to) {
  console.error('❌ --to <email> is required to send. (Use --preview to render without sending.)');
  process.exit(1);
}

const fromName = process.env.FROM_NAME || 'BabyBear 小熊双语夏令营';
const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

try {
  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: args.to,
    replyTo: process.env.REPLY_TO || fromEmail,
    bcc: process.env.BCC || undefined,
    subject,
    text,
    html,
  });
  console.log('✅ Offer sent to', args.to);
  console.log('   Child   :', fields.childName);
  console.log('   Session :', fields.session);
  console.log('   Message :', info.messageId);
} catch (err) {
  console.error('❌ Failed to send:', err.message);
  process.exit(1);
}
