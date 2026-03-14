export function GameCover() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 px-4">
      {/* Ana kapak container */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 80px rgba(245,200,66,0.3)',
        }}
      >
        {/* Arka plan görseli */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1773314863076-835e0bdbe3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1hZGFuJTIwaWZ0YXIlMjB0YWJsZXxlbnwxfHx8fDE3NzM1MjcwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="İftar Vakti - Ramazan Cooking Game"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay - cinematic effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(13,7,5,0.95) 0%, rgba(13,7,5,0.7) 40%, rgba(13,7,5,0.3) 70%, transparent 100%)',
            }}
          />

          {/* Üst gradient - başlık için */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,7,5,0.8) 0%, transparent 30%)',
            }}
          />

          {/* Glow efekti kenarlar */}
          <div 
            className="absolute inset-0"
            style={{
              boxShadow: 'inset 0 0 100px rgba(245,200,66,0.1)',
            }}
          />
        </div>

        {/* Oyun bilgileri overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
          {/* Üst kısım - Genre & Platform tags */}
          <div className="flex flex-wrap gap-3">
            <span 
              className="px-4 py-2 rounded-full text-sm backdrop-blur-md border"
              style={{
                background: 'rgba(200,98,42,0.4)',
                borderColor: 'rgba(200,98,42,0.6)',
                color: '#F5EDE0',
                fontFamily: "'Inter', sans-serif",
                boxShadow: '0 4px 15px rgba(200,98,42,0.3)',
              }}
            >
              COOKING MANAGEMENT
            </span>
            <span 
              className="px-4 py-2 rounded-full text-sm backdrop-blur-md border"
              style={{
                background: 'rgba(245,200,66,0.4)',
                borderColor: 'rgba(245,200,66,0.6)',
                color: '#0D0705',
                fontFamily: "'Inter', sans-serif",
                boxShadow: '0 4px 15px rgba(245,200,66,0.3)',
              }}
            >
              RAMAZAN SPECIAL
            </span>
          </div>

          {/* Alt kısım - Başlık ve bilgiler */}
          <div>
            {/* Ana başlık */}
            <div className="mb-6">
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl mb-4 tracking-wider"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: '#F5EDE0',
                  textShadow: '0 0 60px rgba(245,200,66,0.8), 0 8px 20px rgba(0,0,0,0.9), 0 0 120px rgba(200,98,42,0.4)',
                  letterSpacing: '0.05em',
                }}
              >
                İFTAR VAKTİ
              </h1>
              
              <p 
                className="text-2xl md:text-3xl mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#F5C842',
                  textShadow: '0 4px 10px rgba(0,0,0,0.9), 0 0 30px rgba(245,200,66,0.5)',
                }}
              >
                Ezan çalmadan önce herkesi doyur 🌙
              </p>
            </div>

            {/* Alt bilgi çubuğu */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#4A8C3F' }}
                />
                <span 
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5EDE0',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  SahurJAM 2025
                </span>
              </div>

              <div className="h-6 w-px" style={{ background: 'rgba(245,200,66,0.3)' }} />

              <div className="flex items-center gap-2">
                <span 
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#9C8A75',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Platform:
                </span>
                <span 
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5C842',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Web • HTML5
                </span>
              </div>

              <div className="h-6 w-px" style={{ background: 'rgba(245,200,66,0.3)' }} />

              <div className="flex items-center gap-2">
                <span 
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#9C8A75',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Genre:
                </span>
                <span 
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5C842',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Time Management
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Köşe süsleme - Islamic pattern hint */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-20"
          style={{
            background: 'radial-gradient(circle at top right, #F5C842 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-32 h-32 opacity-20"
          style={{
            background: 'radial-gradient(circle at bottom left, #C8622A 0%, transparent 70%)',
          }}
        />

        {/* Hilal süslemesi - sağ üst */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <div className="relative w-16 h-16 md:w-20 md:h-20 opacity-80">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: '#F5C842',
                boxShadow: '0 0 40px rgba(245,200,66,0.6)',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: '#0D0705',
                transform: 'translateX(30%) scale(0.95)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Alt dekoratif çizgi */}
      <div 
        className="h-1 mt-6 rounded-full mx-auto"
        style={{
          width: '60%',
          background: 'linear-gradient(to right, transparent, #C8622A, #F5C842, #C8622A, transparent)',
          boxShadow: '0 0 20px rgba(245,200,66,0.5)',
        }}
      />
    </div>
  );
}
