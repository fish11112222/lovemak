# แก้ไข Vercel Deployment Error

## ปัญหา: Function Runtimes must have a valid version

**สาเหตุ:** Runtime version ไม่ได้ระบุ version number

## ✅ วิธีแก้ไข - อัปเดต vercel.json:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "functions": {
    "api/messages.ts": {
      "runtime": "@vercel/node@3.2.17"
    },
    "api/users.ts": {
      "runtime": "@vercel/node@3.2.17"
    },
    "api/auth.ts": {
      "runtime": "@vercel/node@3.2.17"
    },
    "api/chat/theme.ts": {
      "runtime": "@vercel/node@3.2.17"
    }
  },
  "routes": [
    {
      "src": "/api/messages",
      "dest": "/api/messages"
    },
    {
      "src": "/api/users",
      "dest": "/api/users"
    },
    {
      "src": "/api/auth",
      "dest": "/api/auth"
    },
    {
      "src": "/api/chat/theme",
      "dest": "/api/chat/theme"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🔧 ขั้นตอนต่อไป:

1. **Copy vercel.json ข้างบน**
2. **ไป GitHub repository** → แก้ไขไฟล์ `vercel.json`  
3. **Paste เนื้อหาใหม่** → Commit changes
4. **Vercel จะ redeploy อัตโนมัติ**

## 🎯 การเปลี่ยนแปลง:

- ✅ เพิ่ม version number: `@vercel/node@3.2.17`
- ✅ เพิ่ม builds configuration สำหรับ frontend
- ✅ ใช้ routes แทน rewrites (เสถียรกว่า)

หลังจากอัปเดตแล้วแอปจะทำงานปกติ!