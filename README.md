# Stremio Subscene Subtitle Addon

## شرح المشروع
هذه إضافة لـ Stremio لجلب الترجمة من موقع Subscene.com باستخدام API ستريمو.  
مكتوبة لتعمل كـ Serverless Function على استضافة Vercel.

## الملفات
- /api/index.js: كود الإضافة (Serverless Function)
- package.json: تعريف المشروع والتبعيات

## طريقة الرفع على Vercel
1. سجل دخولك على https://vercel.com/
2. اربط حساب GitHub وارفع المشروع أو ارفع المشروع مباشرة (اختار "Import Project").
3. تأكد أن ملف package.json موجود وبه التبعيات.
4. اضغط Deploy وانتظر حتى يتم رفع المشروع وتشغيله.
5. الرابط العام يكون مثل:  
   https://your-project-name.vercel.app/api

## إضافة الإضافة إلى Stremio
1. افتح تطبيق Stremio.
2. اذهب إلى قسم Add-ons.
3. اختر "Add from URL".
4. ألصق الرابط: https://your-project-name.vercel.app/api
5. اضغط Add لتفعيل الإضافة.

## ملاحظات
- تأكد أن الإضافة تعمل عن طريق فتح الرابط في المتصفح وتأكد أن تظهر JSON manifest.
- الترجمة للغة الإنجليزية فقط مفعلة حالياً.
