import { Clock } from 'lucide-react';
import { useState } from 'react';

const characters = [
  {
    emoji: '👴',
    name: 'Hüseyin Amca',
    patience: 3,
    hurmaValue: 35,
    description: 'Yaşlı, sabırlı. Ama unutursan gider.',
  },
  {
    emoji: '👨‍💼',
    name: 'İşadamı Mehmet',
    patience: 1,
    hurmaValue: 50,
    description: 'Çok acele, yüksek bahşiş!',
  },
  {
    emoji: '👩‍🍳',
    name: 'Şef Ayşe',
    patience: 2,
    hurmaValue: 40,
    description: 'Yemeği eleştirir ama adil.',
  },
  {
    emoji: '🧒',
    name: 'Minik Ahmet',
    patience: 2,
    hurmaValue: 20,
    description: 'Hızlı yemeği sever, sabırsız.',
  },
  {
    emoji: '👳',
    name: 'Hacı Mustafa',
    patience: 4,
    hurmaValue: 45,
    description: 'En sabırlı müşteri, bereketli.',
  },
];

export function CharacterCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4" style={{ background: '#0D0705' }}>
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Müşteri Karakterleri
        </h2>

        <p 
          className="text-center mb-16 text-lg"
          style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
        >
          Her müşterinin kendine özgü sabrı ve değeri var
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {characters.map((character, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="group p-6 rounded-lg border transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                  borderColor: 'rgba(245,200,66,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  transformStyle: 'preserve-3d',
                  transform: hoveredIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front face */}
                <div 
                  className="absolute inset-0 p-6 rounded-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{character.emoji}</div>
                    
                    <h3 
                      className="text-lg mb-3"
                      style={{ 
                        fontFamily: "'Playfair Display', serif",
                        color: '#F5EDE0',
                      }}
                    >
                      {character.name}
                    </h3>

                    {/* Sabır göstergesi */}
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Clock
                          key={i}
                          className="w-4 h-4"
                          style={{
                            color: i < character.patience ? '#F5C842' : '#9C8A75',
                            opacity: i < character.patience ? 1 : 0.3,
                          }}
                          fill={i < character.patience ? '#F5C842' : 'none'}
                        />
                      ))}
                    </div>

                    {/* Hurma değeri */}
                    <div 
                      className="text-xl font-mono"
                      style={{ color: '#F5C842' }}
                    >
                      🌴 {character.hurmaValue}
                    </div>
                  </div>
                </div>

                {/* Back face - açıklama */}
                <div 
                  className="absolute inset-0 p-6 rounded-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                  }}
                >
                  <p 
                    className="text-center text-sm"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      color: '#F5EDE0',
                    }}
                  >
                    {character.description}
                  </p>
                </div>

                {/* Glow efekti */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(245,200,66,0.4)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p 
            className="text-sm"
            style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
          >
            💡 Kartların üzerine gel ve karakterleri tanı
          </p>
        </div>
      </div>
    </section>
  );
}
