export const formatDay = (number: number) => {
  const allDay: any = [
    { id: 1, name_ar: "الاحد", name_en: "Sunday" },
    { id: 2, name_ar: "الأثنين", name_en: "Monday" },
    { id: 3, name_ar: "الثلاثاء", name_en: "Tuesday" },
    { id: 4, name_ar: "الأربعاء", name_en: "Wednesday" },
    { id: 5, name_ar: "الخميس", name_en: "Thursday" },
    { id: 6, name_ar: "الجمعة", name_en: "Friday" },
    { id: 7, name_ar: "السبت", name_en: "Saturday" },
  ];

  return allDay.find((e: any) => e.id === number) || {};
};
  