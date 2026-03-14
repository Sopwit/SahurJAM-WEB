import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const gddSections = [
  {
    title: '🎯 Oyun Konsepti',
    content: `İFTAR VAKTİ, Ramazan ayının bereketli atmosferinde geçen bir cooking management oyunudur. Oyuncu, iftar çadırının işletmecisi olarak müşterilere hizmet eder, yemek yapar ve çadırını geliştirir. Overcooked tarzı hızlı tempolu mekanikler ile Türk kültürü birleşir.`,
  },
  {
    title: '🎮 Temel Mekanikler',
    content: `
• Sipariş Sistemi: Müşteriler gelir, siparişlerini verir
• Pişirme: Malzeme toplama → Pişirme → Servis (zincirleme işlemler)
• Zaman Baskısı: Her müşterinin sabrı sınırlı, geç kalırsan gider
• Hurma Para Birimi: Her başarılı sipariş hurma kazandırır
• Yükseltme Sistemi: Hurmayla ekipman, personel ve çadır geliştirmeleri
• Gün Döngüsü: İftar Hazırlığı → Rush → Gece Arası → Sahur
    `,
  },
  {
    title: '📊 İlerleme Sistemi',
    content: `
• Günlük Hedefler: Her gün belirli bir hurma hedefi
• Gün Sonu Özeti: Kazanılan hurma, memnun müşteri sayısı
• Unlock Sistemi: Yeni tarifler, yeni müşteriler, yeni dekorlar
• Prestij Sistemi: 30 günü tamamlayınca "Ramazan Ustası" rozeti
• Kadir Gecesi (21. gün): Özel zorluklar, 3x hurma bonusu
    `,
  },
  {
    title: '🎨 Görsel & Ses Tasarımı',
    content: `
• Flash Oyun Estetiği: 2D top-down görünüm, renkli pikselli grafik
• Renk Paleti: Sıcak tonlar (turuncu, altın), gece mavisi, toprak tonları
• Animasyonlar: Yemek pişirme efektleri, müşteri tepkileri
• Müzik: Geleneksel enstrümanlarla (ney, ud) ambient loop
• SFX: Pişirme sesleri, zil sesleri, müşteri memnuniyeti efektleri
    `,
  },
  {
    title: '🗓️ Üretim Takvimi (7 Gün - SahurJAM 2025)',
    content: `
GÜN 1-2: Prototip & Mekanik
  • Temel hareket sistemi
  • Sipariş spawn & queue
  • Basit pişirme loop
  • Hurma kazanma sistemi

GÜN 3-4: İçerik Üretimi
  • 8 İftar + 8 Sahur tarifi
  • 5 Müşteri karakteri
  • Yükseltme sistemi (9 tier)
  • UI/UX polish

GÜN 5-6: Gün Döngüsü & Dengeleme
  • 4 faz mekanikleri
  • Zorluk skalası ayarlama
  • Kadir Gecesi özel modu
  • SFX & Müzik entegrasyonu

GÜN 7: Test & Polish
  • Bug fixing
  • Balancing tweaks
  • Menü ekranları
  • Build & deploy
    `,
  },
  {
    title: '🎯 Hedef Kitle & Platform',
    content: `
• Hedef: Casual oyuncular, Türk kültürüne ilgi duyanlar
• Yaş: 12+ (ESRB: E for Everyone)
• Platform: Web (HTML5 Canvas), itch.io deploy
• Kontrol: Klavye (WASD/Oklar) + Mouse/Touch support
• Süre: 15-30 dakikalık oturumlar, toplam 4-6 saat gameplay
    `,
  },
  {
    title: '✨ Unique Selling Points (USP)',
    content: `
• Kültürel Otantiklik: Gerçek Türk mutfağı tarifleri
• Ramazan Atmosferi: Ezan vakti, fener animasyonları, hurma ekonomisi
• Flash Nostalji: Eski okul oyun hissi modern mekaniklerle
• Eğitici Yan: Ramazan geleneği, Türk yemekleri tanıtımı
    `,
  },
];

export function GDDSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gdd" className="py-20 px-4" style={{ background: '#0D0705' }}>
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Game Design Document
        </h2>

        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
        >
          Oyunun detaylı tasarım dökümanı
        </p>

        <div className="space-y-4">
          {gddSections.map((section, index) => (
            <div
              key={index}
              className="rounded-lg border overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                borderColor: 'rgba(245,200,66,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header - clickable */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 flex items-center justify-between transition-all duration-300 hover:bg-opacity-80"
                style={{
                  background: openIndex === index ? 'rgba(200,98,42,0.1)' : 'transparent',
                }}
              >
                <h3 
                  className="text-xl text-left"
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5EDE0',
                  }}
                >
                  {section.title}
                </h3>

                <ChevronDown
                  className="w-6 h-6 transition-transform duration-300"
                  style={{ 
                    color: '#F5C842',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {/* Content - collapsible */}
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: openIndex === index ? '1000px' : '0px',
                }}
              >
                <div className="p-5 pt-0">
                  <div 
                    className="whitespace-pre-line text-base leading-relaxed"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      color: '#F5EDE0',
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SahurJAM info */}
        <div 
          className="mt-12 p-6 rounded-lg border text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(200,98,42,0.1) 0%, rgba(200,98,42,0.05) 100%)',
            borderColor: 'rgba(200,98,42,0.4)',
            boxShadow: '0 0 30px rgba(200,98,42,0.2)',
          }}
        >
          <p 
            className="text-lg mb-2"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#C8622A',
            }}
          >
            📅 SahurJAM 2025
          </p>
          <p 
            className="text-sm"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: '#9C8A75',
            }}
          >
            7 günde tamamlanacak game jam projesi • Ramazan teması zorunlu
          </p>
        </div>
      </div>
    </section>
  );
}
