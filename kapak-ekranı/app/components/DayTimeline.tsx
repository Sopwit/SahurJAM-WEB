import { Clock, Moon, Star, Sunrise, Sunset } from 'lucide-react';

const phases = [
  {
    name: 'İftar Hazırlığı',
    icon: Sunset,
    color: '#4A8C3F',
    bgGradient: 'linear-gradient(135deg, rgba(74,140,63,0.2) 0%, rgba(74,140,63,0.05) 100%)',
    description: 'Çadırı hazırla, malzemeleri düzenle',
  },
  {
    name: 'İftar Rush',
    icon: Clock,
    color: '#C0392B',
    bgGradient: 'linear-gradient(135deg, rgba(192,57,43,0.2) 0%, rgba(192,57,43,0.05) 100%)',
    description: 'Yoğun sipariş trafiği - hızlı davran!',
  },
  {
    name: 'Gece Arası',
    icon: Moon,
    color: '#9C8A75',
    bgGradient: 'linear-gradient(135deg, rgba(156,138,117,0.2) 0%, rgba(156,138,117,0.05) 100%)',
    description: 'Sakin dönem, hazırlık zamanı',
  },
  {
    name: 'Sahur',
    icon: Sunrise,
    color: '#C8622A',
    bgGradient: 'linear-gradient(135deg, rgba(200,98,42,0.2) 0%, rgba(200,98,42,0.05) 100%)',
    description: 'Son sipariş hattı',
  },
];

export function DayTimeline() {
  return (
    <section className="py-20 px-4" style={{ background: '#1A0F08' }}>
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Gün Döngüsü
        </h2>

        <p 
          className="text-center mb-16 text-lg"
          style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
        >
          Her gün dört faza ayrılır. Her fazın kendine özgü temposu var.
        </p>

        {/* Timeline - Circular döngüsel */}
        <div className="relative">
          {/* Desktop - Horizontal */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="relative">
                  {/* Bağlantı çizgisi */}
                  {index < phases.length - 1 && (
                    <div 
                      className="absolute top-1/2 left-full w-6 h-0.5 -translate-y-1/2"
                      style={{ 
                        background: `linear-gradient(to right, ${phase.color}, ${phases[index + 1].color})`,
                        opacity: 0.3,
                      }}
                    />
                  )}
                  
                  {/* Döngüyü kapatmak için son item'dan ilke bağlantı */}
                  {index === phases.length - 1 && (
                    <div 
                      className="absolute top-1/2 left-1/2 w-full h-0.5 opacity-20"
                      style={{ 
                        background: `linear-gradient(to right, ${phase.color}, ${phases[0].color})`,
                        transform: 'translateX(50%)',
                      }}
                    />
                  )}

                  <div
                    className="group relative p-6 rounded-lg border transition-all duration-300 hover:scale-105"
                    style={{
                      background: phase.bgGradient,
                      borderColor: `${phase.color}40`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 30px ${phase.color}40`,
                      }}
                    />

                    <div className="relative text-center">
                      <Icon 
                        className="w-16 h-16 mx-auto mb-4" 
                        style={{ color: phase.color }}
                      />
                      
                      <h3 
                        className="text-xl mb-2"
                        style={{ 
                          fontFamily: "'Playfair Display', serif",
                          color: '#F5EDE0',
                        }}
                      >
                        {phase.name}
                      </h3>

                      <p 
                        className="text-sm"
                        style={{ 
                          fontFamily: "'Inter', sans-serif",
                          color: '#9C8A75',
                        }}
                      >
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile - Vertical */}
          <div className="md:hidden space-y-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="relative">
                  {/* Bağlantı çizgisi dikey */}
                  {index < phases.length - 1 && (
                    <div 
                      className="absolute top-full left-1/2 w-0.5 h-6 -translate-x-1/2"
                      style={{ 
                        background: `linear-gradient(to bottom, ${phase.color}, ${phases[index + 1].color})`,
                        opacity: 0.3,
                      }}
                    />
                  )}

                  <div
                    className="p-6 rounded-lg border"
                    style={{
                      background: phase.bgGradient,
                      borderColor: `${phase.color}40`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Icon 
                        className="w-12 h-12 flex-shrink-0" 
                        style={{ color: phase.color }}
                      />
                      
                      <div>
                        <h3 
                          className="text-lg mb-1"
                          style={{ 
                            fontFamily: "'Playfair Display', serif",
                            color: '#F5EDE0',
                          }}
                        >
                          {phase.name}
                        </h3>

                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: "'Inter', sans-serif",
                            color: '#9C8A75',
                          }}
                        >
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kadir Gecesi indicator */}
        <div className="mt-12 text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 animate-pulse"
            style={{
              borderColor: '#F5C842',
              background: 'radial-gradient(circle, rgba(245,200,66,0.2) 0%, rgba(245,200,66,0.05) 100%)',
              boxShadow: '0 0 30px rgba(245,200,66,0.3)',
            }}
          >
            <Star className="w-6 h-6" style={{ color: '#F5C842' }} fill="#F5C842" />
            <span 
              className="text-lg"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#F5C842',
              }}
            >
              Kadir Gecesi: Özel Zorluklar & 3x Hurma!
            </span>
            <Star className="w-6 h-6" style={{ color: '#F5C842' }} fill="#F5C842" />
          </div>
        </div>
      </div>
    </section>
  );
}
