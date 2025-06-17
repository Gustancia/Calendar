import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button"; // No es necesaria si uso botones HTML estándar
import CityRevealButton from "./CityRevealButton";
import DayDetail from "./DayDetail";
import { meses } from '../data/calendarData';

export default function Calendario() {
  const [mesActual, setMesActual] = useState("Marzo");
  const [selectedDay, setSelectedDay] = useState(meses["Marzo"][0]);
  const [showSaberMas, setShowSaberMas] = useState(false);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const monthOrder = ["Marzo", "Abril", "Mayo"];

  const cambiarMes = (nuevoMes) => {
    setMesActual(nuevoMes);
    setSelectedDay(meses[nuevoMes][0]);
  };

  const goToPrev = () => {
    const index = meses[mesActual].findIndex((d) => d.day === selectedDay.day);
    if (index > 0) setSelectedDay(meses[mesActual][index - 1]);
  };

  const goToNext = () => {
    const index = meses[mesActual].findIndex((d) => d.day === selectedDay.day);
    if (index < meses[mesActual].length - 1) setSelectedDay(meses[mesActual][index + 1]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSaberMas || showDayDetail) return;
      if (e.key === "ArrowLeft") {
        const index = meses[mesActual].findIndex((d) => d.day === selectedDay.day);
        if (index > 0) {
          setSelectedDay(meses[mesActual][index - 1]);
        } else {
          // Go to previous month if possible
          const currentMonthIdx = monthOrder.indexOf(mesActual);
          if (currentMonthIdx > 0) {
            const prevMonth = monthOrder[currentMonthIdx - 1];
            const prevMonthDays = meses[prevMonth];
            setMesActual(prevMonth);
            setSelectedDay(prevMonthDays[prevMonthDays.length - 1]);
          }
        }
      } else if (e.key === "ArrowRight") {
        const index = meses[mesActual].findIndex((d) => d.day === selectedDay.day);
        if (index < meses[mesActual].length - 1) {
          setSelectedDay(meses[mesActual][index + 1]);
        } else {
          // Go to next month if possible
          const currentMonthIdx = monthOrder.indexOf(mesActual);
          if (currentMonthIdx < monthOrder.length - 1) {
            const nextMonth = monthOrder[currentMonthIdx + 1];
            setMesActual(nextMonth);
            setSelectedDay(meses[nextMonth][0]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mesActual, selectedDay, showSaberMas, showDayDetail]);

  if (showSaberMas) {
    return (
      <div className="p-4 bg-[#fff5ec] text-[#5e3023] rounded-2xl shadow-md max-w-4xl mx-auto transition-all duration-500 flex flex-col min-h-screen">
        <button
          className="self-start mb-4 bg-[#e38873] text-white rounded-full px-4 py-2 hover:bg-[#cf6a56]"
          onClick={() => setShowSaberMas(false)}
        >
          ← Volver
        </button>
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres saber?</h2>
          <p className="mb-1 max-w-2xl text-center text-lg">
            ¿Que cuál es el objetivo de este calendario? ¿Este obsequio tan raro, tan mío? Pues la verdad… estoy completamente enamorada de vos. Completamente boba. Y me pareció una forma linda, única y personal de rememorar nuestros dos primeros meses juntos. Al principio la idea era hacer un regalito chiquito, algo simple, un calendario de un solo mes. Pero claro… se me fue de las manos. Cada día me parecía especial. Cada momento, digno de recordarse. Y así, poquito a poquito, se fue alargando. Hasta que, bueno, acá estamos: tres meses. Los tres mejores meses de mi vida. Mi intención es que esto quede, que lo guardemos, y que algún día —ojalá con una tónica en mano, tirados en un sillón, rodeados de gatos o lo que sea que tengamos— podamos volver a leerlo. Reírnos. Recordar. Ver cómo empezó todo esto tan lindo que estamos construyendo. Gracias por estos meses juntos. Te amo con todo mi corazón.
          </p>
        </div>
        <div className="mt-8">
          <CityRevealButton />
        </div>
      </div>
    );
  }

  // Sidebar illustration (replace with your own if you want)
  const sidebarImage = "/images/house.png"; // You can use any image you like
  const monthNames = { Marzo: "MARZO", Abril: "ABRIL", Mayo: "MAYO" };
  const year = 2025;
  const monthNumber = selectedDay ? String(selectedDay.day).padStart(2, '0') : "";
  
  return (
    <div className="flex bg-[#f7f3ec] rounded-2xl shadow-md max-w-5xl mx-auto transition-all duration-500 overflow-hidden calendario-bg">
      {/* Sidebar with Radial Wipe transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mesActual}
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="w-1/3 min-w-[260px] bg-[#f3e7d8] flex flex-col items-center py-8 px-4 border-r border-[#e2d3c2]"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="text-[#a97c50] text-lg font-bold mb-2">{year}</div>
          <div className="text-6xl font-extrabold text-[#7c4a1e] leading-none mb-2">
            {monthNumber}
          </div>
          <div className="text-2xl font-bold text-[#a97c50] mb-6 tracking-widest">{monthNames[mesActual]}</div>
          {/* Only the image fades on day change */}
          <AnimatePresence mode="wait">
            <motion.button
              key={selectedDay ? `${mesActual}-${selectedDay.day}` : mesActual}
              onClick={() => setShowDayDetail(true)}
              className="focus:outline-none group w-full flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img src={selectedDay.image} alt={`Dibujo del día ${selectedDay.day}`} className="w-40 h-40 object-contain mb-4 rounded-xl shadow-lg border-2 border-[#e38873] group-hover:scale-105 transition mx-auto block" />
            </motion.button>
          </AnimatePresence>
          {/* Notes box with story and arrows (static) */}
          <div className="w-full bg-white rounded-xl p-4 shadow text-[#a97c50] text-base mt-2 flex flex-col items-center min-h-[380px] justify-between">
            <div className="flex items-center w-full justify-between mb-2">
              <button
                onClick={goToPrev}
                disabled={meses[mesActual].findIndex((d) => d.day === selectedDay.day) === 0}
                className="text-2xl px-2 py-1 rounded-full hover:bg-[#f0c3af] disabled:opacity-30"
              >
                ←
              </button>
              <span className="font-bold text-lg">{selectedDay.day} de {mesActual}</span>
              <button
                onClick={goToNext}
                disabled={meses[mesActual].findIndex((d) => d.day === selectedDay.day) === meses[mesActual].length - 1}
                className="text-2xl px-2 py-1 rounded-full hover:bg-[#f0c3af] disabled:opacity-30"
              >
                →
              </button>
            </div>
            <div className="overflow-y-auto max-h-72 w-full text-justify whitespace-pre-line flex-1">
              {selectedDay.text}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Calendar grid */}
      <div className="flex-1 p-6">
        {/* Title above calendar grid */}
        <h1 className="recapitulemos-title ">RECORDEMOS NUESTRO HERMOSO TIEMPO JUNTOS</h1>
        <div className="bg-[#fdf8f3] rounded-2xl p-4 shadow-md">
          <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-[#a97c50] text-lg tracking-wide">
            <div>DOM</div>
            <div>LUN</div>
            <div>MAR</div>
            <div>MIE</div>
            <div>JUE</div>
            <div>VIE</div>
            <div>SAB</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {(() => {
              const offsets = { Marzo: -1, Abril: 2, Mayo: 3 };
              const offset = Math.max(0, offsets[mesActual] || 0);
              const days = Array.from({ length: 31 }, (_, i) => i + 1);
              const blanks = Array.from({ length: offset }, (_, i) => <div key={`blank-${i}`}></div>);
              return [
                ...blanks,
                ...days.map((day) => {
                  const match = meses[mesActual].find((d) => d.day === day);
                  return (
                    <div
                      key={day}
                      className="aspect-square rounded-xl border border-[#e2d3c2] bg-white flex items-center justify-center relative"
                    >
                      {match ? (
                        <button
                          onClick={() => setSelectedDay(match)}
                          className="focus:outline-none w-full h-full flex items-center justify-center"
                        >
                          <img src={match.image} alt={`Día ${match.day}`} className="w-full h-full object-contain rounded-xl hover:scale-110 transition" />
                        </button>
                      ) : (
                        <span className="text-[#a97c50] font-bold text-lg z-10">{day}</span>
                      )}
                    </div>
                  );
                })
              ];
            })()}
          </div>
        </div>
        {/* Mes selector */}
        <div className="flex justify-center gap-2 mt-6">
          {Object.keys(meses).map((mes) => (
            <button
              key={mes}
              className={`rounded-full px-4 py-2 ${
                mes === mesActual ? "bg-[#e38873] text-white" : "bg-white"
              }`}
              onClick={() => cambiarMes(mes)}
            >
              {mes}
            </button>
          ))}
        </div>
        {/* Saber más button */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold mb-2">¿Te preguntas cuál es el objetivo de este calendario?</p>
          <button className="bg-[#e38873] text-white rounded-full px-6 py-2 hover:bg-[#cf6a56]" onClick={() => setShowSaberMas(true)}>
            ¿Would you like to know mai lov?
          </button>
        </div>
      </div>
      {/* Move modal here so it overlays the whole calendar, not just the sidebar */}
      {showDayDetail && (
        <DayDetail
          image={selectedDay.image}
          story={selectedDay.text}
          day={selectedDay.day}
          month={mesActual}
          onClose={() => setShowDayDetail(false)}
        />
      )}
    </div>
  );
}