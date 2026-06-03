"use client";

import { motion } from "framer-motion";
import { PlayCircle, Calendar, User, Clock, ArrowRight } from "lucide-react";

const webinars = [
  {
    id: 1,
    title: "Математика: Разбор сложной планиметрии (Задание 16)",
    tutor: "Алексей Иванов",
    date: "Сегодня",
    time: "18:00",
    image: "https://images.unsplash.com/photo-1632559795000-72124cb11ce1?q=80&w=800&auto=format&fit=crop",
    tags: ["Профиль", "Сложное"],
    live: true,
  },
  {
    id: 2,
    title: "Физика: Законы Ньютона на реальных примерах",
    tutor: "Мария Смирнова",
    date: "Завтра",
    time: "16:30",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop",
    tags: ["Кинематика", "Основы"],
    live: false,
  },
  {
    id: 3,
    title: "Информатика: Динамическое программирование",
    tutor: "Илья Петров",
    date: "15 Июня",
    time: "19:00",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    tags: ["Программирование", "Алгоритмы"],
    live: false,
  },
];

export default function WebinarsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Вебинары</h1>
          <p className="text-muted-foreground mt-2">Присоединяйтесь к живым лекциям и задавайте вопросы онлайн.</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-1 flex">
          <button className="px-6 py-2 rounded-lg bg-muted font-medium text-sm">Предстоящие</button>
          <button className="px-6 py-2 rounded-lg text-muted-foreground hover:text-foreground font-medium text-sm transition-colors">Записи</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {webinars.map((webinar, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={webinar.id}
            className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-brand-purple/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] flex flex-col"
          >
            <div className="relative h-48 w-full bg-muted overflow-hidden">
              <img 
                src={webinar.image} 
                alt={webinar.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {webinar.live && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                  </span>
                )}
                {webinar.tags.map(tag => (
                  <span key={tag} className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{webinar.title}</h3>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                  <User className="w-4 h-4 text-brand-purple" />
                  <span>{webinar.tutor}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                  <Calendar className="w-4 h-4 text-brand-green" />
                  <span>{webinar.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{webinar.time}</span>
                </div>
              </div>

              <button className="mt-auto w-full py-3 rounded-xl bg-brand-purple/10 text-brand-purple font-bold hover:bg-brand-purple hover:text-white transition-colors flex items-center justify-center gap-2">
                {webinar.live ? (
                  <>
                    <PlayCircle className="w-5 h-5" /> Подключиться
                  </>
                ) : (
                  <>
                    Записаться <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
