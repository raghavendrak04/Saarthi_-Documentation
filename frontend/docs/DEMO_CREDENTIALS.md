# Demo Login Credentials

**All demo accounts have been successfully created in your MongoDB Atlas database!**

## 🔐 Demo User Accounts

### **Student Accounts** (4 users)

#### 1. John Doe
```
Email: john@university.edu
Password: Demo1234
Role: Student
```

#### 2. Jane Smith
```
Email: jane@university.edu
Password: Demo1234
Role: Student
```

#### 3. Alice Johnson
```
Email: alice@college.edu
Password: Demo1234
Role: Student
```

#### 4. Bob Wilson
```
Email: bob@university.edu
Password: Demo1234
Role: Student
```

---

### **Admin Account** (1 user)

#### 5. Dr. Sarah Miller
```
Email: sarah.miller@university.edu
Password: Demo1234
Role: Admin
```

---

## 🚀 How to Use

### **Quick Test Login**
1. Go to: `http://localhost:5173/login` (React) or `http://localhost:3000/login` (Next.js)
2. Use any email from above
3. Password: **Demo1234**
4. Click "Sign In"
5. You'll be redirected to the dashboard!

### **Recommended for Testing**
Use **John Doe** for your first test:
- Email: `john@university.edu`
- Password: `Demo1234`

---

## 📝 Notes

- ✅ All passwords are **Demo1234** (contains uppercase, lowercase, and numbers)
- ✅ Passwords are securely hashed with bcrypt in the database
- ✅ All users are stored in MongoDB Atlas
- ✅ You can login with any of these accounts immediately
- ✅ The admin account (Sarah Miller) has elevated privileges

---

## 🔄 Reset Demo Users

If you need to reset or recreate the demo users:

```bash
cd backend
npx tsx src/scripts/seed-demo-users.ts
```

This will:
1. Delete existing demo users
2. Create fresh accounts
3. Display the credentials

---

## 🎯 Test Scenarios

### **Scenario 1: Student Login**
- Use **John Doe** credentials
- Login → See student dashboard
- View courses, assignments, etc.

### **Scenario 2: Different Student**
- Logout from John's account
- Login as **Jane Smith**
- See different user dashboard

### **Scenario 3: Admin Login**
- Use **Dr. Sarah Miller** credentials
- Login → See admin dashboard
- (Future: admin-specific features)

### **Scenario 4: Multiple Users**
- Open app in different browsers
- Login with different accounts
- Test concurrent usage

---

## 🎨 Login Page Features to Test

1. **Email Input**: Copy-paste from credentials above
2. **Password Toggle**: Click eye icon to show/hide
3. **Remember Me**: Check the checkbox
4. **Form Validation**: Try wrong password to see errors
5. **Loading State**: Watch spinner during login
6. **Auto-redirect**: Successful login → Dashboard

---

## 🔐 Password Reset

If you want to change a demo user's password:

1. **Option A**: Use the seed script (resets to Demo1234)
2. **Option B**: Manually update in MongoDB Atlas
3. **Option C**: Implement "Forgot Password" feature (future)

---

## 📊 Database Location

Your demo users are stored in:
- **Database**: `saarthi-ai`
- **Collection**: `users`
- **Platform**: MongoDB Atlas

You can view them in MongoDB Compass or Atlas UI.

---

## 💡 Pro Tips

- **Bookmark**: Save `http://localhost:5173/login` with John's credentials
- **Browser DevTools**: Check localStorage for JWT tokens
- **Network Tab**: Watch API calls during login
- **Reset**: Run seed script anytime to fresh reset

---

## 🎉 Ready to Test!

**Start here:**
```
http://localhost:5173/login
```

**Login with:**
```
Email: john@university.edu
Password: Demo1234
```

**Enjoy your Saarthi.ai dashboard!** 🚀
