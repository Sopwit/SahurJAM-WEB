import { ChevronDown, Play } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gece gökyüzü background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0705] via-[#1A0F08] to-[#0D0705]"></div>
      
      {/* Yıldızlar */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F5C842] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* Hilal - CSS ile */}
      <div className="absolute top-20 right-10 md:right-20 w-24 h-24 md:w-32 md:h-32">
        <div 
          className="absolute inset-0 rounded-full bg-[#F5C842] opacity-80"
          style={{
            boxShadow: '0 0 60px rgba(245, 200, 66, 0.6)',
          }}
        />
        <div 
          className="absolute inset-0 rounded-full bg-[#0D0705]"
          style={{
            transform: 'translateX(20%) scale(0.95)',
          }}
        />
      </div>

      {/* Fenerler - swinging animation */}
      <div className="absolute top-10 left-10 md:left-20 w-12 h-16 origin-top animate-swing">
        <div className="w-2 h-8 bg-[#9C8A75] mx-auto"></div>
        <div 
          className="w-12 h-12 rounded-lg border-2 border-[#F5C842] mt-1"
          style={{
            background: 'radial-gradient(circle, rgba(245,200,66,0.3) 0%, rgba(200,98,42,0.1) 100%)',
            boxShadow: '0 0 30px rgba(245,200,66,0.4)',
          }}
        ></div>
      </div>

      <div className="absolute top-10 right-32 md:right-40 w-12 h-16 origin-top animate-swing-reverse">
        <div className="w-2 h-8 bg-[#9C8A75] mx-auto"></div>
        <div 
          className="w-12 h-12 rounded-lg border-2 border-[#F5C842] mt-1"
          style={{
            background: 'radial-gradient(circle, rgba(245,200,66,0.3) 0%, rgba(200,98,42,0.1) 100%)',
            boxShadow: '0 0 30px rgba(245,200,66,0.4)',
          }}
        ></div>
      </div>

      {/* Ana içerik */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl mb-6 tracking-wider"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 40px rgba(245,200,66,0.5), 0 4px 8px rgba(0,0,0,0.8)',
          }}
        >
          İFTAR VAKTİ
        </h1>
        
        <p 
          className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-2xl mx-auto"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#F5C842',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          Ezan çalmadan önce herkesi doyur.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => scrollToSection('gameplay')}
            className="group px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: '#C8622A',
              background: 'linear-gradient(135deg, rgba(200,98,42,0.2) 0%, rgba(200,98,42,0.05) 100%)',
              boxShadow: '0 0 20px rgba(200,98,42,0.4)',
              color: '#F5EDE0',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span className="flex items-center gap-2 text-lg font-semibold">
              <Play className="w-5 h-5" fill="#C8622A" />
              OYNA
            </span>
          </button>

          <button
            onClick={() => scrollToSection('gdd')}
            className="group px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: '#F5C842',
              background: 'linear-gradient(135deg, rgba(245,200,66,0.1) 0%, rgba(245,200,66,0.05) 100%)',
              boxShadow: '0 0 20px rgba(245,200,66,0.3)',
              color: '#F5C842',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span className="flex items-center gap-2 text-lg font-semibold">
              GDD İncele
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8" style={{ color: '#F5C842', opacity: 0.6 }} />
      </div>

      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes swing-reverse {
          0%, 100% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
        }
        .animate-swing {
          animation: swing 3s ease-in-out infinite;
        }
        .animate-swing-reverse {
          animation: swing-reverse 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
