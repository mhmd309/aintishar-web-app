import { motion } from 'framer-motion';
import { TEAM } from '../data/team';

export default function Team() {
  return (
    <section id="team" className="bg-white py-24 dark:bg-slate-950" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="section-title mb-4">فريقنا</h2>
          <p className="section-subtitle">فريق يجمع بين التقنية، التصميم، التسويق، وصناعة المحتوى لبناء حضور رقمي متكامل.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.article key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-primary-900/50 dark:bg-slate-800">
              <div className="relative aspect-square overflow-hidden bg-primary-50 dark:bg-slate-700">
                <img src={member.image} alt={`صورة ${member.title} ${member.name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.title} {member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-400">{member.role}</p>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{member.responsibility}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
