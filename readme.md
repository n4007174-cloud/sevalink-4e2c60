# SevaLink Website — Developer Guide

## 📁 Project Structure

```
sevalink/
├── index.html              ← Main landing page
├── css/
│   └── style.css           ← All styles (variables, layout, components)
├── js/
│   ├── main.js             ← Navbar, scroll effects, animations
│   └── booking.js          ← Booking flow + payment demo logic
└── pages/
    ├── book.html           ← Book a service (3-step flow + payment)
    ├── login.html          ← Login / Register
    ├── dashboard.html      ← My Orders + order tracking
    └── partner.html        ← Cyber cafe partner registration
```

---

## 🖥️ Run Locally (VS Code)

1. Open the `sevalink/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Opens at `http://127.0.0.1:5500/`

No build tools or npm required. Pure HTML/CSS/JS.

---

## 💳 Payment Demo (How It Works)

- The payment is **simulated** (no real money moves)
- UPI: Enter any text with `@` (e.g. `test@upi`)
- Card: Enter any 16-digit number
- Cash on Delivery: Just click Pay
- After "payment", a Tracking ID is generated and the order is saved in **localStorage**
- Dashboard reads from localStorage to show orders

To integrate a **real payment gateway** later:
- **Razorpay** (recommended for India): https://razorpay.com/docs/
- **PhonePe PG**: https://developer.phonepe.com/
- Replace the `setTimeout` block in `booking.js → processPayment()` with the gateway SDK call

---

## 🌐 Deploy Online (Free Options)

### Option 1 — GitHub Pages (Easiest, Free)
1. Create a free account at https://github.com
2. Create a new repository (e.g. `sevalink`)
3. Upload all your files (drag & drop in GitHub UI or use Git)
4. Go to **Settings → Pages**
5. Source: **main branch / root**
6. Your site goes live at: `https://yourusername.github.io/sevalink/`

### Option 2 — Netlify (Free, Custom Domain Support)
1. Go to https://netlify.com and sign up free
2. Drag your entire `sevalink/` folder onto the Netlify dashboard
3. Get instant URL like `https://sevalink-abc123.netlify.app`
4. Connect a custom domain (e.g. `sevalink.in`) in settings

### Option 3 — Vercel (Free, Fast)
1. Go to https://vercel.com and sign up
2. Click **"Add New Project"** → Import from GitHub or upload folder
3. Deployed instantly at `https://sevalink.vercel.app`

### Option 4 — Firebase Hosting (Google, Free tier)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting    # select your project folder as public dir
firebase deploy
```

---

## 🔧 Customization

| What to change | Where |
|---|---|
| Brand colors | `css/style.css` → `:root` variables |
| Services list | `index.html` + `pages/book.html` |
| Pricing | `pages/book.html` → `data-price` on each `.svc-btn` |
| Contact info | `index.html` footer section |
| Add real payment | `js/booking.js` → `processPayment()` function |
| Add backend/database | Replace localStorage with API calls to Node.js/Firebase |

---

## 🚀 Next Steps (Production)

- [ ] Add real payment gateway (Razorpay)
- [ ] Add backend (Node.js / Firebase / Supabase)
- [ ] Add WhatsApp API integration (Twilio / WATI)
- [ ] Add partner admin dashboard
- [ ] Add OTP-based mobile login
- [ ] Add Google Maps for partner location search
- [ ] Deploy to custom domain `sevalink.in`

---

Built with ❤️ for Bharat 🇮🇳 — SevaLink by Amit, BBA 2nd Semester, Sanskriti University
