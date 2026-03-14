export function Footer() {
  return (
    <footer 
      className="py-12 px-4 border-t"
      style={{ 
        background: '#1A0F08',
        borderColor: 'rgba(245,200,66,0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <div className="text-4xl mb-3">🌙</div>
          <h3 
            className="text-2xl mb-2"
            style={{ 
              fontFamily: "'Cinzel', serif",
              color: '#F5EDE0',
            }}
          >
            İFTAR VAKTİ
          </h3>
          <p 
            className="text-sm"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: '#9C8A75',
            }}
          >
            Ezan çalmadan önce herkesi doyur.
          </p>
        </div>

        <div className="mb-6">
          <p 
            className="text-base"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#F5C842',
            }}
          >
            SahurJAM 2025 · Hayırlı Ramazanlar 🌙
          </p>
        </div>

        <div 
          className="pt-6 border-t"
          style={{ borderColor: 'rgba(245,200,66,0.1)' }}
        >
          <p 
            className="text-sm"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: '#9C8A75',
            }}
          >
            Made with ❤️ by [Takım Adınız] • 2025
          </p>
        </div>

        {/* Dekoratif elementler */}
        <div className="flex justify-center gap-4 mt-6">
          {['🕌', '🌴', '✨', '🌙', '⭐'].map((emoji, index) => (
            <span 
              key={index}
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
