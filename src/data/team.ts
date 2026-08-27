export type TeamMember = {
  name: string;
  role: string;
  responsibility: string;
  image: string;
};

export const TEAM: TeamMember[] = [
  { name: 'محمد عماره', role: 'مبرمج', responsibility: 'تطوير الأنظمة والمواقع والحلول التقنية', image: '/img/team/mohamed.PNG' },
  { name: 'محمود محي', role: 'مصمم وسوشيال ميديا', responsibility: 'التصميمات والهوية البصرية والمحتوى الرقمي', image: '/img/team/mahmoud.svg' },
  { name: 'ياسمين صبري', role: 'مديرة التسويق', responsibility: 'وضع وتنفيذ الاستراتيجيات التسويقية وإدارة الحملات', image: '/img/team/yasmine.svg' },
  { name: 'دعاء غانم', role: 'سوشيال ميديا', responsibility: 'إدارة منصات التواصل الاجتماعي وصناعة ونشر المحتوى', image: '/img/team/doaa.svg' },
];
