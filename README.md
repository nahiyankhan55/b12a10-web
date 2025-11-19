# B12A10 - IE Hub - Import Export Hub

IE Hub is a full-stack Import–Export management platform where users can manage products, track imports/exports, update stock in real time, and maintain a personal dashboard.
The project is built using **React**, **Node.js**, **Express.js**, **MongoDB**, and **Firebase Authentication**.

---

## ✅ **Features**

### **Authentication**

- Login & Register with Email/Password
- Google Login
- Firebase-based secure auth
- Protected (Private) Routes

### **Product Management**

- Add new export/product
- View all products
- View product details
- Search, sort, and filter
- Product stock auto-updates after import
- Data fetching optimized with TanStack Query

### **Import Management**

- “Import Now” modal for each product
- Quantity validation (cannot exceed available stock)
- Stores import data with importer email
- Auto-updates product stock using `$inc`
- User can view and delete their imports

### **Export Management**

- User can view all export entries they created
- Prefilled modal for editing export details
- Update reflected instantly on UI
- Delete export entries from UI and database

### **UI / UX**

- Clean, modern UI with Tailwind CSS
- Dark Mode / Light Mode toggle
- Responsive design (Mobile, Tablet, Desktop)
- Mobile-friendly navbar with dropdown menu
- Smooth animations with AOS

---

## 🛠️ **Tech Stack**

### **Frontend**

- React + Vite
- React Router
- TanStack React Query
- TailwindCSS
- Firebase Authentication
- SweetAlert2
- MUI Components (ClickAwayListener)

### **Backend**

- Node.js
- Express.js
- MongoDB (Native Driver)

---

## Dependencies

```js
 "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/material": "^7.3.5",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.7",
    "animate.css": "^4.1.1",
    "aos": "^2.3.4",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "firebase": "^12.5.0",
    "prop-types": "^15.8.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-fast-marquee": "^1.6.5",
    "react-head": "^3.4.2",
    "react-icons": "^5.5.0",
    "react-router": "^7.9.5",
    "react-toastify": "^11.0.5",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }
```

---

## ⚙️ **Installation Process**

Follow these steps to run the project locally.

---

### **📁 1. Clone the Repositories**

### **Client**

```bash
git clone https://github.com/nahiyankhan55/b12a10-web
cd b12a10-web
```

### **Server**

```bash
git clone https://github.com/nahiyankhan55/b12a10-server
cd b12a10-server
```

---

### **🔧 2. Install Dependencies**

### Client:

```bash
npm install
```

### Server:

```bash
npm install
```

---

### **🔑 3. Environment Variables**

### Client (.env)

Create a `.env` file:

```
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_BUCKET
VITE_messagingSenderId=XXXX
VITE_appId=XXXX
VITE_serverURL=http://localhost:5000
```

### Server (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

### **▶️ 4. Run the Project**

### Start Client:

```bash
npm run dev
```

### Start Server:

```bash
node index.js
```

or (if nodemon installed)

```bash
nodemon index.js
```

---

### **🌐 5. Open in Browser**

```
http://localhost:5173
```

Your IE Hub system is now running locally! 🚀

---

## 🌐 Links

- **Live Site:** [https://b12a10-nahiyan-ieh.netlify.app/](https://b12a10-nahiyan-ieh.netlify.app/)
- **Client Repository:** [https://github.com/nahiyankhan55/b12a10-web](https://github.com/nahiyankhan55/b12a10-web)
- **Server Repository:** [https://github.com/nahiyankhan55/b12a10-server](https://github.com/nahiyankhan55/b12a10-server)
