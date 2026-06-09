# BabyBear Offer Mailer 📨

Send official, bilingual **BabyBear 小熊双语夏令营** offer letters from your `babybearai.com` mailbox over SMTP.

## Setup

1. **Enable email on `babybearai.com`** with any provider (Zoho Mail, Google Workspace, Fastmail, etc.) and create a sending mailbox, e.g. `admissions@babybearai.com`. Generate an **app password** if your provider requires one.

2. **Install dependencies** (Node.js 18+):
   ```bash
   cd email-service
   npm install
   ```

3. **Configure credentials**:
   ```bash
   cp .env.example .env
   # then edit .env with your SMTP host / port / user / pass
   ```

   Common SMTP settings:

   | Provider          | Host              | Port | Secure |
   |-------------------|-------------------|------|--------|
   | Zoho Mail         | `smtp.zoho.com`   | 465  | true   |
   | Google Workspace  | `smtp.gmail.com`  | 465  | true   |
   | Fastmail          | `smtp.fastmail.com` | 465 | true |
   | (STARTTLS option) | —                 | 587  | false  |

## Usage

**Preview the letter without sending** (no SMTP needed — writes `preview.html`):
```bash
node send-offer.js --preview --child "Emma" --parent "Ms. Li" --session "Week 1 · 自然探索"
```

**Verify your SMTP credentials**:
```bash
node send-offer.js --verify
```

**Send a real offer**:
```bash
node send-offer.js \
  --to parent@example.com \
  --parent "Ms. Li" \
  --child "Emma 李欣然" \
  --session "Week 1 · 自然探索 Into the Woods" \
  --dates "July 6 – July 10, 2026" \
  --reply-by "June 20, 2026"
```

### All options

| Flag | Meaning | Default |
|------|---------|---------|
| `--to` | Recipient (parent) email | *required to send* |
| `--child` | Child's name | `your child` |
| `--parent` | Parent's name | `Parent` |
| `--session` | Program / week name | All-summer (Weeks 1–5) |
| `--dates` | Program dates | July 6 – August 7, 2026 |
| `--hours` | Daily hours | Mon–Fri, 9:00 AM – 3:00 PM |
| `--location` | Location text | Seattle, WA (details to follow) |
| `--tuition` | Tuition text | $1,999 全夏 / $450 per week |
| `--reply-by` | Reply-by deadline | June 20, 2026 |
| `--contact` | Contact email shown in letter | `REPLY_TO` / `FROM_EMAIL` |
| `--subject` | Override email subject | auto bilingual subject |
| `--preview` | Render to `preview.html`, don't send | — |
| `--verify` | Test SMTP connection only | — |

## Notes

- Each email includes both an HTML version (`templates/offer.html`) and a plain-text fallback.
- Set `BCC=records@babybearai.com` in `.env` to keep a copy of every offer.
- `.env` and `preview.html` are git-ignored so credentials never get committed.
- To switch from SMTP to a transactional API (Resend/SendGrid) later, only the transport block in `send-offer.js` needs to change — the template and CLI stay the same.
