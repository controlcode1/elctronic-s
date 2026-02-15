# تعليمات رفع المشروع إلى GitHub

## الخطوات:

افتح Terminal/PowerShell في مجلد المشروع ونفذ الأوامر التالية بالترتيب:

```bash
# 1. تهيئة Git (إذا لم يكن موجوداً)
git init

# 2. إضافة جميع الملفات
git add .

# 3. عمل commit
git commit -m "ElectroTech Store - Complete Design System Overhaul with Dark Auth Pages"

# 4. إضافة remote repository
git remote add origin https://github.com/controlcode1/elctronic-s.git

# 5. تغيير اسم الفرع إلى main
git branch -M main

# 6. رفع الملفات إلى GitHub
git push -u origin main
```

## في حالة وجود remote سابق:

إذا ظهر خطأ "remote origin already exists"، نفذ هذا الأمر أولاً:

```bash
git remote remove origin
```

ثم أعد الخطوة 4 والخطوات التي تليها.

## ملاحظات:

- تأكد من تسجيل الدخول إلى GitHub
- قد يطلب منك اسم المستخدم وكلمة المرور أو Personal Access Token
- إذا كانت هذه أول مرة، قد تحتاج لإعداد Git config:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
