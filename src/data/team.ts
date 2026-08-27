export type TeamMember = {
  title: 'المهندس' | 'المهندسة';
  name: string;
  role: string;
  responsibility: string;
  image: string;
};

export const TEAM: TeamMember[] = [
  { title: 'المهندس', name: 'محمد عماره', role: 'مبرمج', responsibility: 'تطوير الأنظمة والمواقع والحلول التقنية', image: '/img/team/mohamed.PNG' },
  { title: 'المهندس', name: 'محمود محي', role: 'مصمم وسوشيال ميديا', responsibility: 'التصميمات والهوية البصرية والمحتوى الرقمي', image: '/img/team/mahmoud.svg' },
  { title: 'المهندس', name: 'أحمد محمود', role: 'مطور تطبيقات موبايل', responsibility: 'تطوير تطبيقات الهاتف الذكية وتجربة مستخدم سلسة', image: '/img/team/ahmed.jpg' },
  { title: 'المهندسة', name: 'ياسمين صبري', role: 'مديرة التسويق', responsibility: 'وضع وتنفيذ الاستراتيجيات التسويقية وإدارة الحملات', image: '/img/team/yassmin.jpg' },
  { title: 'المهندسة', name: 'دعاء غانم', role: 'سوشيال ميديا', responsibility: 'إدارة منصات التواصل الاجتماعي وصناعة ونشر المحتوى', image: '/img/team/doaa.jpg' },
];
