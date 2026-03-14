import { ChefHat, Coins, TrendingUp, UtensilsCrossed } from 'lucide-react';

const steps = [
  {
    icon: UtensilsCrossed,
    emoji: '🍽️',
    title: 'Sipariş Gelir',
    description: 'Müşteri kartı ekranda belirir',
    color: '#F5C842',
  },
  {
    icon: ChefHat,
    emoji: '👨‍🍳',
    title: 'Yemek Yap',
    description: 'Malzeme al, pişir, servis et',
    color: '#C8622A',
  },
  {
    icon: Coins,
    emoji: '🌴',
    title: 'Hurma Kazan',
    description: 'Her siparişten hurma ödülü',
    color: '#F5C842',
  },
  {
    icon: TrendingUp,
    emoji: '⬆️',
    title: 'Yükselt',
    description: 'Hurmayla çadırını geliştir',
    color: '#4A8C3F',
  },
];

export function GameplayLoop() {
  return (
    <section id="gameplay" className="py-20 px-4" style={{ background: '#0D0705' }}>
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-16"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Nasıl Oynanır?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-lg border transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                  borderColor: 'rgba(245,200,66,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                {/* Glow efekti */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 30px ${step.color}40`,
                  }}
                />

                {/* Step number */}
                <div 
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: '#1A0F08',
                    borderColor: step.color,
                    color: step.color,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {index + 1}
                </div>

                <div className="relative">
                  <div className="text-5xl mb-4 text-center">{step.emoji}</div>
                  
                  <Icon 
                    className="w-12 h-12 mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{ color: step.color }}
                  />

                  <h3 
                    className="text-xl mb-3 text-center"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      color: '#F5EDE0',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p 
                    className="text-center text-sm"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      color: '#9C8A75',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
