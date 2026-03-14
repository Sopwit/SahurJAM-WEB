export const GAME_CONFIG = {
  canvas: {
    baseWidth: 900,
    baseHeight: 600,
    minWidth: 800,
    minHeight: 520
  },
  player: {
    radius: 14,
    speed: 130,
    interactRange: 40,
    spawnX: 420,
    spawnY: 350
  },
  match: {
    durationMs: 180000,
    levelCompleteOrders: 8
  },
  notifications: {
    durationMs: 1600
  },
  cycle: {
    initialPhase: "iftar",
    phaseDurationMs: 45000,
    phases: {
      iftar: {
        label: "IFTAR",
        hudColor: "#f0d594",
        notify: "Iftar yogunlugu basladi",
        orders: {
          spawnMinMs: 10000,
          spawnMaxMs: 15000,
          tipMultiplier: 2.3
        }
      },
      sahur: {
        label: "SAHUR",
        hudColor: "#9fc7ff",
        notify: "Sahur dinginligi basladi",
        orders: {
          spawnMinMs: 17000,
          spawnMaxMs: 23000,
          tipMultiplier: 1.8
        }
      }
    }
  },
  orders: {
    maxActive: 3,
    timeLimitMs: 30000,
    expirePenalty: -30,
    expireMessage: "Siparis kacirildi! -30 puan"
  },
  progress: {
    storageKey: "iftar-vakti-progress"
  },
  economy: {
    hurmaPerOrder: 10
  },
  upgrades: {
    catalog: [
      {
        id: "swiftFeet",
        name: "Hizli Adimlar",
        description: "Asci daha hizli hareket eder.",
        levels: [
          { cost: 40, bonus: { playerSpeedMultiplier: 1.08 } },
          { cost: 90, bonus: { playerSpeedMultiplier: 1.1 } },
          { cost: 160, bonus: { playerSpeedMultiplier: 1.12 } }
        ]
      },
      {
        id: "quickPrep",
        name: "Hizli Tezgah",
        description: "Pisirme ve dograma sureleri kisalir.",
        levels: [
          { cost: 50, bonus: { processSpeedMultiplier: 1.1 } },
          { cost: 110, bonus: { processSpeedMultiplier: 1.12 } },
          { cost: 190, bonus: { processSpeedMultiplier: 1.15 } }
        ]
      },
      {
        id: "patientGuests",
        name: "Sabirli Misafirler",
        description: "Siparisler daha gec suresi dolar.",
        levels: [
          { cost: 60, bonus: { orderTimeMultiplier: 1.12 } },
          { cost: 130, bonus: { orderTimeMultiplier: 1.15 } },
          { cost: 220, bonus: { orderTimeMultiplier: 1.18 } }
        ]
      },
      {
        id: "blessing",
        name: "Bereket Sofrasi",
        description: "Skor ve hurma kazanimi artar.",
        levels: [
          { cost: 75, bonus: { scoreMultiplier: 1.08, hurmaMultiplier: 1.1 } },
          { cost: 150, bonus: { scoreMultiplier: 1.1, hurmaMultiplier: 1.12 } },
          { cost: 260, bonus: { scoreMultiplier: 1.12, hurmaMultiplier: 1.15 } }
        ]
      }
    ]
  },
  ambience: {
    mahyaText: "HOS GELDIN RAMAZAN"
  }
};
