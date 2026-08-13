import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export const useViewCounter = () => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const checkAndIncrementView = async () => {
      // نستهدف مستند معين يحفظ عدد الزيارات (مثلاً باسم "global" داخل مجموعة "views")
      const counterRef = doc(db, 'views', 'global');
      
      const hasVisited = localStorage.getItem('hasVisitedBefore');

      try {
        // إذا كان الجهاز يزور الموقع لأول مرة
        if (!hasVisited) {
          localStorage.setItem('hasVisitedBefore', 'true');
          
          const docSnap = await getDoc(counterRef);
          
          if (docSnap.exists()) {
            // زيادة العداد بمقدار 1
            await updateDoc(counterRef, {
              count: increment(1)
            });
            setViews(docSnap.data().count + 1);
          } else {
            // إنشاء المستند في حال لم يكن موجوداً
            await setDoc(counterRef, { count: 1 });
            setViews(1);
          }
        } else {
          // إذا كان زار الموقع سابقاً، نجلب العدد فقط للعرض
          const docSnap = await getDoc(counterRef);
          if (docSnap.exists()) {
            setViews(docSnap.data().count);
          } else {
            // في حال تم حذف المستند بالخطأ
            await setDoc(counterRef, { count: 0 });
            setViews(0);
          }
        }
      } catch (error) {
        console.error("حدث خطأ في تحديث/جلب الزيارات من Firebase:", error);
      }
    };

    checkAndIncrementView();
  }, []);

  return views;
};
