import { Play } from 'lucide-react';

export function MainScreen() {
  const handlePlay = () => {
    window.location.href = './';
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Arka plan görseli */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1773314863076-835e0bdbe3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1hZGFuJTIwaWZ0YXIlMjB0YWJsZXxlbnwxfHx8fDE3NzM1MjcwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ramadan Looper"
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(13,7,5,0.92) 0%, rgba(26,15,8,0.88) 50%, rgba(13,7,5,0.92) 100%)',
          }}
        />
      </div>

      {/* Yıldızlar */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F5C842] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Hilal - büyük */}
      <div className="absolute top-16 right-16 md:top-24 md:right-32 w-32 h-32 md:w-48 md:h-48 opacity-40">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: '#F5C842',
            boxShadow: '0 0 100px rgba(245,200,66,0.8)',
            filter: 'blur(1px)',
          }}
        />
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: '#0D0705',
            transform: 'translateX(25%) scale(0.95)',
          }}
        />
      </div>

      {/* Ana içerik */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Genre tag */}
        <div className="mb-8 flex justify-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 backdrop-blur-sm"
            style={{
              borderColor: 'rgba(245,200,66,0.5)',
              background: 'rgba(245,200,66,0.15)',
              boxShadow: '0 0 30px rgba(245,200,66,0.3)',
            }}
          >
            <span 
              className="text-sm md:text-base tracking-wider"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                color: '#F5C842',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              ⭐ Cooking Management • Ramazan Special ⭐
            </span>
          </div>
        </div>

        {/* Ana başlık */}
        <h1 
          className="text-7xl md:text-9xl lg:text-[12rem] mb-6 tracking-wider leading-none"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: `
              0 0 80px rgba(245,200,66,0.9),
              0 0 120px rgba(200,98,42,0.6),
              0 10px 30px rgba(0,0,0,0.9),
              0 0 200px rgba(245,200,66,0.4)
            `,
            letterSpacing: '0.08em',
          }}
        >
          İFTAR
          <br />
          VAKTİ
        </h1>
        
        {/* Alt başlık */}
        <p 
          className="text-2xl md:text-4xl lg:text-5xl mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#F5C842',
            textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 40px rgba(245,200,66,0.6)',
          }}
        >
          Ezan çalmadan önce herkesi doyur 🌙
        </p>

        {/* OYNA butonu - büyük ve çarpıcı */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handlePlay}
            className="group relative px-16 py-6 rounded-2xl border-4 transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              borderColor: '#C8622A',
              background: 'linear-gradient(135deg, rgba(200,98,42,0.4) 0%, rgba(200,98,42,0.2) 100%)',
              boxShadow: '0 0 60px rgba(200,98,42,0.6), 0 20px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Pulsing glow */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
              style={{
                boxShadow: '0 0 100px rgba(245,200,66,0.8)',
              }}
            />

            <span 
              className="relative flex items-center gap-4 text-4xl md:text-5xl"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#F5EDE0',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                letterSpacing: '0.1em',
              }}
            >
              <Play 
                className="w-10 h-10 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform duration-300" 
                fill="#C8622A" 
                style={{ color: '#C8622A' }}
              />
              OYNA
            </span>
          </button>

          {/* Alt bilgi */}
          <div 
            className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: '#9C8A75',
            }}
          >
            <span className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#4A8C3F' }}
              />
              SahurJAM 2025
            </span>
            
            <span style={{ color: 'rgba(245,200,66,0.3)' }}>•</span>
            
            <span>Web • HTML5</span>
            
            <span style={{ color: 'rgba(245,200,66,0.3)' }}>•</span>
            
            <span>Flash Nostalji</span>
          </div>
        </div>

        {/* Dekoratif emojiler */}
        <div className="mt-16 flex justify-center gap-6 text-4xl md:text-5xl opacity-60">
          {['🕌', '🌴', '🍲', '🌙', '⭐'].map((emoji, index) => (
            <span 
              key={index}
              className="hover:scale-125 transition-transform duration-300 cursor-default"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Fener efekti - sol alt */}
      <div className="absolute bottom-10 left-10 w-16 h-20 origin-top animate-swing opacity-60">
        <div className="w-2 h-10 bg-[#9C8A75] mx-auto"></div>
        <div 
          className="w-16 h-16 rounded-lg border-2 border-[#F5C842] mt-1"
          style={{
            background: 'radial-gradient(circle, rgba(245,200,66,0.4) 0%, rgba(200,98,42,0.1) 100%)',
            boxShadow: '0 0 40px rgba(245,200,66,0.5)',
          }}
        />
      </div>

      {/* Fener efekti - sağ alt */}
      <div className="absolute bottom-10 right-10 w-16 h-20 origin-top animate-swing-reverse opacity-60">
        <div className="w-2 h-10 bg-[#9C8A75] mx-auto"></div>
        <div 
          className="w-16 h-16 rounded-lg border-2 border-[#F5C842] mt-1"
          style={{
            background: 'radial-gradient(circle, rgba(245,200,66,0.4) 0%, rgba(200,98,42,0.1) 100%)',
            boxShadow: '0 0 40px rgba(245,200,66,0.5)',
          }}
        />
      </div>

      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes swing-reverse {
          0%, 100% { transform: rotate(4deg); }
          50% { transform: rotate(-4deg); }
        }
        .animate-swing {
          animation: swing 3.5s ease-in-out infinite;
        }
        .animate-swing-reverse {
          animation: swing-reverse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
