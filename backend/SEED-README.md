# 🌱 Database Seeding Scripts

After deploying to Netlify, you need to add questions to your database.

## Option 1: Double-Click (Easiest) 🖱️

**For Windows users:**

1. Double-click `seed-database.bat`
2. Paste your MongoDB URI when prompted
3. Press Enter
4. Done! ✅

---

## Option 2: Command Line 🖥️

**Works on all systems:**

```bash
node seed-prod.js "your-mongodb-uri-here"
```

**Example:**
```bash
node seed-prod.js "mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/embedprep?retryWrites=true&w=majority"
```

---

## Where to Find MongoDB URI?

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Database** → **Connect**
3. Click **Drivers** → **Node.js**
4. Copy the connection string
5. Replace `<password>` with your actual password

---

## ❌ If It Fails

**Error: "IP not whitelisted"**

1. Go to MongoDB Atlas
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **Confirm**
6. Run the script again

---

## ✅ Success?

Your questions are now in the database! Visit your Netlify site to see them.
