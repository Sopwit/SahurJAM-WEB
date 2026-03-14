import { Code2, Github } from 'lucide-react';

export function TechStack() {
  return (
    <section className="py-20 px-4" style={{ background: '#1A0F08' }}>
      <div className="max-w-5xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Teknik Stack
        </h2>

        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
        >
          Modern web teknolojileriyle Flash oyun hissi
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Stack listesi */}
          <div
            className="p-6 rounded-lg border"
            style={{
              background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
              borderColor: 'rgba(245,200,66,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6" style={{ color: '#F5C842' }} />
              <h3 
                className="text-2xl"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#F5EDE0',
                }}
              >
                Teknolojiler
              </h3>
            </div>

            <ul className="space-y-3">
              {[
                'Phaser 3 / Vanilla Canvas',
                'Vite (Build Tool)',
                'JavaScript (ES6+)',
                'CSS3 Animasyonlar',
                'HTML5 Canvas API',
              ].map((tech, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-3 text-base"
                  style={{ 
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5EDE0',
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#C8622A' }}
                  />
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub placeholder */}
          <div
            className="p-6 rounded-lg border"
            style={{
              background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
              borderColor: 'rgba(245,200,66,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-6 h-6" style={{ color: '#F5C842' }} />
              <h3 
                className="text-2xl"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#F5EDE0',
                }}
              >
                Kaynak Kod
              </h3>
            </div>

            <p 
              className="mb-6 text-base"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                color: '#9C8A75',
              }}
            >
              Proje açık kaynak! Kodları inceleyebilir, katkıda bulunabilirsin.
            </p>

            <a
              href="https://github.com/yourusername/iftar-vakti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: '#F5C842',
                background: 'linear-gradient(135deg, rgba(245,200,66,0.1) 0%, rgba(245,200,66,0.05) 100%)',
                boxShadow: '0 0 20px rgba(245,200,66,0.3)',
                color: '#F5C842',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Github className="w-5 h-5" />
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Kod snippet */}
        <div
          className="p-6 rounded-lg border overflow-hidden"
          style={{
            background: '#0D0705',
            borderColor: 'rgba(245,200,66,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#C0392B' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#F5C842' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#4A8C3F' }} />
            </div>
            <span 
              className="text-sm"
              style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
            >
              game.js
            </span>
          </div>

          <pre 
            className="overflow-x-auto text-sm"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            <code>
              <span style={{ color: '#C0392B' }}>class</span>{' '}
              <span style={{ color: '#F5C842' }}>OrderManager</span>{' '}
              <span style={{ color: '#9C8A75' }}>{'{'}</span>{'\n'}
              {'  '}
              <span style={{ color: '#C0392B' }}>constructor</span>
              <span style={{ color: '#F5EDE0' }}>() {'{'}</span>{'\n'}
              {'    '}
              <span style={{ color: '#C0392B' }}>this</span>
              <span style={{ color: '#F5EDE0' }}>.orders = [];</span>{'\n'}
              {'    '}
              <span style={{ color: '#C0392B' }}>this</span>
              <span style={{ color: '#F5EDE0' }}>.hurmaEarned = </span>
              <span style={{ color: '#4A8C3F' }}>0</span>
              <span style={{ color: '#F5EDE0' }}>;</span>{'\n'}
              {'  '}
              <span style={{ color: '#F5EDE0' }}>{'}'}</span>{'\n\n'}
              {'  '}
              <span style={{ color: '#F5C842' }}>createOrder</span>
              <span style={{ color: '#F5EDE0' }}>(customer, dish) {'{'}</span>{'\n'}
              {'    '}
              <span style={{ color: '#9C8A75' }}>// Sipariş oluştur</span>{'\n'}
              {'    '}
              <span style={{ color: '#C0392B' }}>return</span>
              <span style={{ color: '#F5EDE0' }}> {'{'}</span>{'\n'}
              {'      '}
              <span style={{ color: '#F5EDE0' }}>customer,</span>{'\n'}
              {'      '}
              <span style={{ color: '#F5EDE0' }}>dish,</span>{'\n'}
              {'      '}
              <span style={{ color: '#F5EDE0' }}>patience: customer.patience,</span>{'\n'}
              {'      '}
              <span style={{ color: '#F5EDE0' }}>hurmaReward: dish.hurma</span>{'\n'}
              {'    '}
              <span style={{ color: '#F5EDE0' }}>{'};'}</span>{'\n'}
              {'  '}
              <span style={{ color: '#F5EDE0' }}>{'}'}</span>{'\n'}
              <span style={{ color: '#9C8A75' }}>{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
