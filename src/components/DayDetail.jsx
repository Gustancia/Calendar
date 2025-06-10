import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importamos motion y AnimatePresence

const DayDetail = ({ image, story, day, month, onClose }) => { // Añadimos day y month a las props
  return (
    // AnimatePresence tiene que envolver el componente que se va a animar
    <AnimatePresence mode="wait">
      {/* Usar motion.div para aplicar las animaciones al contenedor del modal */}
      <motion.div
        key="day-detail-modal" // Una key única para AnimatePresence
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // Close modal when clicking the overlay
        style={{ overflowY: 'auto' }}
      >
        <motion.div
          key={image} // Key para animar el contenido interno si la imagen cambia
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }} // Pequeño retraso para que aparezca después del fondo
          className="rounded-2xl p-6 shadow-2xl w-full max-w-4xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto relative bg-white bg-opacity-95 border-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.5)), url('/images/wallpaper/pastel-tulips.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <button
            onClick={onClose}
            className="mb-4 text-sm text-gray-600 hover:text-red-500 transition-all"
          >
            Cerrar
          </button>
          
          {/* Aca integramos etiqueta img con las nuevas clases */}
          <img
            src={image}
            alt={`Ilustración del ${day} de ${month}`} // props day y month
            className="w-full max-w-md rounded-xl shadow-md mx-auto mb-4 object-contain max-h-[300px]" // Combinamos clases
          />
          
          <p className="whitespace-pre-line text-base leading-relaxed text-justify text-gray-800">
            {story}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DayDetail;