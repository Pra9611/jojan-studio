# THE JOJAN — Mens Designer Studio
### Customer Measurement Management System

A full-stack web app for your showroom to manage customers and their shirt/pant
measurements, with one-click Excel export. Built with a Python (FastAPI) backend
and a plain HTML/CSS/JS frontend — no complicated build tools needed.

---

## 1. What's inside

```
jojan-studio/
├── backend/
│   ├── main.py              → All API routes (auth, customers, measurements, orders, export)
│   ├── database.py          → SQLite database setup
│   ├── models.py            → Request/response data models
│   └── requirements.txt     → Python dependencies
└── frontend/
    ├── index.html            → Login page
    ├── dashboard.html        → Dashboard with live stats
    ├── add-customer.html     → Add new customer
    ├── customer-list.html    → Search / view / edit / delete customers
    ├── measurements.html     → Enter or update measurements
    ├── customer-details.html → Full customer profile (measurements + orders)
    ├── export-excel.html     → Excel export with filters
    ├── settings.html         → Profile & password settings
    ├── css/style.css
    ├── js/api.js, common.js
    └── assets/logo.svg       → The Jojan gold monogram logo
```

The database (`jojan.db`, SQLite) is created automatically the first time you run
the server — no separate database installation needed.

---

## 2. Requirements

- **Python 3.9 or newer** installed on your computer.
  Check with: `python3 --version` (Windows: `python --version`)

That's the only requirement — everything else installs automatically.

---

## 3. How to run it (one time setup)

Open a terminal / command prompt inside the unzipped folder, then:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

(On Mac/Linux you may need `pip3` / `python3` instead of `pip` / `python`.)

Once you see `Uvicorn running on http://0.0.0.0:8000`, open your browser and go to:

```
http://localhost:8000
```

You'll land on the login page.

**Default login:**
- Username: `admin`
- Password: `admin123`

You can change this any time from the **Settings** page after logging in.

To run it again later, just repeat the last command (`python -m uvicorn main:app --host 0.0.0.0 --port 8000`) from inside the `backend` folder — you don't need to `pip install` again unless you move it to a new computer.

---

## 4. Using it on your shop's WiFi (so you can use it on mobile too)

1. Find your computer's local IP address (e.g. `192.168.1.5`) — on Windows run `ipconfig`, on Mac/Linux run `ifconfig` or `ip addr`.
2. Start the server as above.
3. On any phone/tablet connected to the same WiFi, open a browser and go to
   `http://<your-computer-ip>:8000` (e.g. `http://192.168.1.5:8000`).

---

## 5. What each page does

| Page | What it does |
|---|---|
| **Login** | Secure login with username/password |
| **Dashboard** | Live counts: total customers, today's orders, measurements saved, recent customers |
| **Add Customer** | Add a new customer — auto-generates a unique Customer ID (TJ000001, TJ000002, ...) |
| **Customer List** | Search by name/mobile/ID, paginated table, view/edit/delete any customer |
| **Measurements** | Pick a customer, enter all shirt & pant measurements + special instructions. Re-opening it for a customer loads their saved measurements so you can update them |
| **Customer Details** | Full profile: measurements tab + orders tab, edit customer info, add a new order, delete customer |
| **Export Excel** | Download all customers, a date range, or a single customer as a formatted `.xlsx` file |
| **Settings** | Change your display name, shop name, and password |

Everything is wired to the real backend and database — there is no fake/dummy data;
the dashboard, lists and exports always reflect exactly what's stored.

---

## 6. Notes on the logo & design

The logo (`frontend/assets/logo.svg`) is an original gold monogram "J" crest
created to match the look of your reference design (crown, laurel flourish, gold
circular border on a dark background). Since it's an SVG, you can easily recolor
it or swap in your own final artwork later — just replace `assets/logo.svg` with
your file (keep the same filename) and it will update on every page automatically.

---

## 7. Troubleshooting

- **"Address already in use"** → another program is using port 8000. Run the
  server on a different port, e.g. `--port 8010`, and open `http://localhost:8010` instead.
- **Page loads but shows no data** → make sure the terminal running `uvicorn` is
  still open; closing it stops the server.
- **Forgot admin password** → stop the server, delete `backend/jojan.db`, and
  restart — this recreates a fresh database with the default login
  (**this also erases all customers/measurements**, so only do this if truly needed).
