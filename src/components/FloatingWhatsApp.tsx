import { useState } from "react";

const WHATSAPP_LINK =
  "https://wa.me/2349160595507?text=Hello%20Damakasu%20Multi-Link%20Investiment%20Ltd.%20I%20would%20like%20to%20request%20a%20quotation.";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span
        className={`bg-foreground text-background text-xs font-semibold px-3 py-1.5 rounded-lg shadow-medium whitespace-nowrap transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat with us
      </span>

      {/* Button */}
      <div className="relative">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping [animation-delay:0.4s]" />

        {/* Button circle */}
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-medium hover:shadow-gold transition-all duration-300 group-hover:scale-110">
          {/* WhatsApp SVG */}
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.5 4.5C24.4 1.4 20.4 -0.1 16.1 0C7.3 0.1 0.1 7.4 0.2 16.2C0.2 19.1 1 21.9 2.5 24.3L0 32L7.9 29.5C10.2 30.9 12.9 31.6 15.7 31.6H15.8C24.5 31.6 31.8 24.4 31.8 15.7C31.9 11.4 30.2 7.3 27.5 4.5ZM15.8 29C13.3 29 10.9 28.3 8.8 27L8.3 26.7L3.6 28L4.9 23.4L4.5 22.9C3.1 20.7 2.3 18.1 2.3 15.5C2.2 8.5 7.9 2.8 15.1 2.8C18.6 2.8 21.9 4.1 24.4 6.6C26.9 9.1 28.2 12.4 28.2 15.9C28.1 22.9 22.5 29 15.8 29ZM22.4 18.9C22 18.7 20 17.7 19.7 17.6C19.4 17.5 19.1 17.4 18.8 17.8C18.5 18.2 17.7 19.1 17.5 19.4C17.3 19.7 17 19.7 16.7 19.6C15 18.8 13.8 18.1 12.7 16.3C12.4 15.9 12.8 15.9 13.1 15.3C13.3 15 13.2 14.7 13.1 14.5C13 14.3 12.3 12.3 12 11.7C11.7 11.1 11.4 11.1 11.2 11.1H10.7C10.4 11.1 10 11.2 9.7 11.6C9.4 12 8.5 12.8 8.5 14.8C8.5 16.8 9.8 18.7 10 18.9C10.2 19.1 12.7 23 16.6 24.8C19.3 26 20.3 26.1 21.5 25.9C22.3 25.8 23.7 25 24.1 24.1C24.5 23.2 24.5 22.4 24.4 22.3C24.3 22 24 21.9 23.6 21.7L22.4 18.9Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
