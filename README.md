# BabyBear 小熊双语夏令营 🧸

Marketing site + offer-letter mailer for a **Seattle Chinese–English bilingual summer camp for ages 3–5**, on the domain `babybearai.com`.

```
cc_9/
├── website/            # Static marketing site (deploy this)
│   ├── index.html      # Bilingual one-page site
│   ├── styles.css
│   ├── script.js       # Nav, scroll-reveal, enrollment form → mailto
│   └── images/         # AI-generated illustrations (+ generate.sh to regenerate)
└── email-service/      # Node CLI to send official offer emails over SMTP
    ├── send-offer.js
    ├── templates/offer.html
    ├── .env.example
    └── README.md
```

## 1. The website

A self-contained static site — no build step. Bilingual (中文 + English) throughout, with a friendly bear mascot, themed weeks, daily schedule, gallery, testimonials, logistics, FAQ, and an enrollment form that opens a pre-filled email to `hello@babybearai.com`.

**Preview locally:**
```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

**Deploy to `babybearai.com`:** upload the `website/` folder to any static host — Cloudflare Pages, Netlify, Vercel, GitHub Pages, S3, or any web server. No server-side code required.

**Images** were generated with Volcano Ark (`doubao-seedream`). To regenerate or tweak them, edit prompts in `website/images/generate.sh` and run it (requires `curl` + `jq`).

## 2. The offer mailer

A small Node CLI that sends a polished bilingual **offer letter** from your domain mailbox. See [`email-service/README.md`](email-service/README.md) for full setup, but the short version:

```bash
cd email-service
npm install
cp .env.example .env          # fill in babybearai.com SMTP credentials
node send-offer.js --preview  # render preview.html without sending
node send-offer.js --to parent@example.com --child "Emma" --parent "Ms. Li" --session "Week 1"
```

## Next steps for going live

1. Point `babybearai.com` DNS at your static host; set up email + SPF/DKIM with your mail provider.
2. Fill in `email-service/.env` and run `node send-offer.js --verify`.
3. Replace placeholder details (exact address, tuition, dates) in `website/index.html` and the mailer defaults if they change.
