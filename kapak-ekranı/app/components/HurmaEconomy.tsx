import { ArrowRight } from 'lucide-react';

const upgrades = {
  tier1: [
    { name: 'Hızlı Tezgah', cost: 50, effect: '+20% pişirme hızı' },
    { name: 'Ekstra Ocak', cost: 80, effect: '2 yemek aynı anda' },
    { name: 'Çırağı Çağır', cost: 100, effect: 'Basit siparişleri halleder' },
  ],
  tier2: [
    { name: 'Usta Aşçı', cost: 200, effect: 'Hatasız pişirme garantisi' },
    { name: 'İkram Sepeti', cost: 250, effect: 'Müşteri sabrı +30%' },
    { name: 'Lüks Dekor', cost: 300, effect: 'Gelen müşteri sayısı +50%' },
  ],
  tier3: [
    { name: 'Otomatik Hazırlık', cost: 500, effect: 'Malzemeler otomatik hazır' },
    { name: 'VIP Çadır', cost: 750, effect: 'Özel müşteriler gelir (2x hurma)' },
    { name: 'Efsane Şef', cost: 1000, effect: 'Tüm bonuslar aktif' },
  ],
};

export function HurmaEconomy() {
  return (
    <section className="py-20 px-4" style={{ background: '#1A0F08' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-7xl mb-4 animate-pulse">🌴</div>
          
          <h2 
            className="text-4xl md:text-5xl mb-4"
            style={{ 
              fontFamily: "'Cinzel', serif",
              color: '#F5EDE0',
              textShadow: '0 0 20px rgba(245,200,66,0.3)',
            }}
          >
            Hurma Ekonomisi
          </h2>

          <p 
            className="text-lg"
            style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
          >
            Kazandığın hurmalarla çadırını geliştir, daha fazla müşteri çek!
          </p>
        </div>

        <div className="space-y-10">
          {/* Tier 1 */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="px-4 py-2 rounded-full border-2"
                style={{
                  borderColor: '#4A8C3F',
                  background: 'rgba(74,140,63,0.2)',
                  color: '#4A8C3F',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Tier 1 - Başlangıç
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(245,200,66,0.2)' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upgrades.tier1.map((upgrade, index) => (
                <UpgradeCard key={index} upgrade={upgrade} tier="1" />
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="px-4 py-2 rounded-full border-2"
                style={{
                  borderColor: '#C8622A',
                  background: 'rgba(200,98,42,0.2)',
                  color: '#C8622A',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Tier 2 - Gelişim
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(245,200,66,0.2)' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upgrades.tier2.map((upgrade, index) => (
                <UpgradeCard key={index} upgrade={upgrade} tier="2" />
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="px-4 py-2 rounded-full border-2 animate-pulse"
                style={{
                  borderColor: '#F5C842',
                  background: 'rgba(245,200,66,0.2)',
                  color: '#F5C842',
                  fontFamily: "'Playfair Display', serif",
                  boxShadow: '0 0 20px rgba(245,200,66,0.3)',
                }}
              >
                Tier 3 - Efsanevi
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(245,200,66,0.2)' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upgrades.tier3.map((upgrade, index) => (
                <UpgradeCard key={index} upgrade={upgrade} tier="3" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpgradeCard({ upgrade, tier }: { upgrade: { name: string; cost: number; effect: string }; tier: string }) {
  const tierColors = {
    '1': '#4A8C3F',
    '2': '#C8622A',
    '3': '#F5C842',
  };

  const color = tierColors[tier as keyof typeof tierColors];

  return (
    <div
      className="group p-5 rounded-lg border transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
        borderColor: `${color}40`,
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      }}
    >
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 25px ${color}30`,
        }}
      />

      <div className="relative">
        <h4 
          className="text-xl mb-3"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#F5EDE0',
          }}
        >
          {upgrade.name}
        </h4>

        <div className="flex items-center gap-2 mb-3">
          <span 
            className="text-2xl font-mono"
            style={{ color: '#F5C842' }}
          >
            🌴 {upgrade.cost}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <ArrowRight 
            className="w-5 h-5 flex-shrink-0 mt-0.5" 
            style={{ color }} 
          />
          <p 
            className="text-sm"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: '#9C8A75',
            }}
          >
            {upgrade.effect}
          </p>
        </div>
      </div>
    </div>
  );
}
