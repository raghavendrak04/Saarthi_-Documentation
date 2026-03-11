# Saarthi.ai - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

Open **TWO terminal windows** in the project root directory.

#### Terminal 1 - Backend
```powershell
cd backend
npm install
```

#### Terminal 2 - Frontend
```powershell
cd frontend
npm install
```

---

### Step 2: Configure Backend

#### Create `.env` file
```powershell
cd backend
copy .env.example .env
```

#### Edit `.env` file
Open `backend/.env` in a text editor and set these values:

```env
# MongoDB Connection (Choose ONE option)

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/saarthi-ai

# Option B: MongoDB Atlas (Cloud) - Get free at mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saarthi-ai

# JWT Secret (Generate a secure random key)
JWT_SECRET=your-super-secret-key-min-32-characters-change-this

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Generate JWT Secret (Optional but Recommended)
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and paste it as your `JWT_SECRET` in `.env`

---

### Step 3: Start MongoDB

#### Option A: Local MongoDB
If you have MongoDB installed locally:
```powershell
# In a new terminal
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

---

### Step 4: Start Both Servers

#### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

You should see:
```
Server running on port 8000
MongoDB connected
```

#### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

You should see:
```
Ready on http://localhost:3000
```

---

### Step 5: Test the Application

1. **Open your browser**: `http://localhost:3000/signup`

2. **Create an account**:
   - Full Name: `Test User`
   - Email: `test@university.edu` (must be .edu, university, or college)
   - Password: `TestPass123` (min 8 chars, uppercase, lowercase, number)
   - Confirm Password: `TestPass123`
   - Check "I agree to terms"
   - Click "Create Account"

3. **You'll be auto-logged in** and redirected to the dashboard!

4. **Try logging out and in again**:
   - Click "Logout" in the dashboard
   - Go to `http://localhost:3000/login`
   - Login with your credentials

---

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] MongoDB connected (check backend terminal)
- [ ] Can create a new account
- [ ] Can login with credentials
- [ ] Dashboard shows user information
- [ ] Can logout successfully

---

## 🔧 Troubleshooting

### Problem: "MongoDB connection error"
**Solution**: 
- Make sure MongoDB is running (if using local)
- OR check your MongoDB Atlas connection string (if using cloud)
- Verify `MONGODB_URI` in `.env` is correct

### Problem: "npm install" fails
**Solution**:
```powershell
# Clear npm cache and retry
npm cache clean --force
npm install
```

### Problem: "Port 8000 already in use"
**Solution**:
```powershell
# Kill the process using port 8000
# Find the process
netstat -ano | findstr :8000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F

# OR change the port in backend/.env
PORT=8001
```

### Problem: "Port 3000 already in use"
**Solution**:
```powershell
# When starting frontend, it will ask if you want to use port 3001
# Type 'y' and press Enter

# OR kill the process manually
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: "Invalid token" errors
**Solution**:
- Clear browser localStorage:
  - Open browser DevTools (F12)
  - Go to "Application" or "Storage" tab
  - Clear "Local Storage" for localhost:3000
  - Refresh the page

### Problem: Login doesn't work
**Solution**:
1. Check if backend is running
2. Open browser DevTools (F12) → Console
3. Look for CORS or network errors
4. Verify `FRONTEND_URL` in backend/.env matches your frontend URL

---

## 📝 Quick API Testing (Optional)

Use these curl commands to test the API directly:

### Test Signup
```powershell
curl -X POST http://localhost:8000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{\"fullName\":\"API Test\",\"email\":\"api@university.edu\",\"password\":\"Test1234\",\"confirmPassword\":\"Test1234\"}'
```

### Test Login
```powershell
curl -X POST http://localhost:8000/api/auth/signin `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"api@university.edu\",\"password\":\"Test1234\"}'
```

---

## 🎯 Next Steps

Once everything is working:

1. **Explore the code**:
   - Backend: `backend/src/controllers/auth.controller.ts`
   - Frontend: `frontend/src/app/login/page.tsx`

2. **Read the documentation**:
   - [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Complete API docs
   - [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - What was built

3. **Start building features**:
   - Add course management
   - Create quiz system
   - Implement coding environment
   - Build AI tutor integration

---

## 📚 Additional Resources

- **Main README**: `../README.md`
- **Auth Guide**: `./AUTHENTICATION_GUIDE.md`
- **UX Research**: `./planning/saarthi_ux_design_research.md`
- **Tech Architecture**: `./planning/technical_architecture.md`

---

## 🆘 Need Help?

Check the logs in your terminal windows for error messages. Most issues are related to:
1. MongoDB not running/configured
2. `.env` file not set up correctly
3. Port conflicts
4. Missing dependencies

---

**Happy coding! 🚀**

Saarthi.ai Team
