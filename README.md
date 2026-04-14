# SahurJAM Web

SahurJAM Web, Ramazan temalı tarayıcı oyununun web sürümüdür. Aktif ürün kök dizindeki HTML5 canvas oyunudur; `main/` klasörü ise oyuna eşlik eden, şu anda üretim akışına bağlı olmayan ayrı bir sunum/prototip arayüzü içerir.

## Proje Durumu

- Aktif giriş noktası: `index.html`
- Oyun başlangıcı: `src/main.js`
- Çalıştırma şekli: Node ile statik dosya servisi (`server.js`)
- Kalıcı veri: `localStorage`
- Ayrı prototip alanı: `main/`
- GitHub otomasyonu: `.github/workflows/check.yml`

## Hızlı Başlangıç

Gereksinimler:

- Node.js 18+
- Modern bir masaüstü tarayıcı

Kurulum ve çalıştırma:

```bash
npm install
npm start
```

Ardından `http://127.0.0.1:3000` adresini açın.

Alternatif komutlar:

- `npm run serve`: geliştirme sırasında yerel sunucuyu açar
- `npm run check`: repo doğrulaması ve JavaScript sözdizimi kontrolünü çalıştırır
- `npm run build:pages`: GitHub Pages için dağıtım klasörü üretir

## Oynanış Özeti

Oyuncu mutfakta dolaşarak raftan yemeği alır, fırında ısıtır ve doğru masaya servis eder. Tur ilerledikçe yeni yemekler açılır, sipariş yoğunluğu değişir ve teslimat hedefleri büyür.

Temel kurallar:

- Her tur süre sınırına sahiptir.
- Döngü iki fazdan oluşur: `iftar` ve `sahur`.
- Siparişler masa bazlı üretilir; yanlış masa veya yanlış yemek teslim edilemez.
- Yemekler servis öncesi fırında ısıtılmalıdır.
- Kaçan siparişler puan kaybettirir ve komboyu bozar.
- Tur sonunda hedef teslimat sayısı karşılanmazsa seviye başarısız olur.

## Kontroller

- `WASD` / yön tuşları: hareket
- `E` / `Space`: etkileşim
- `Enter`: oyunu başlat, tutorial ekranını geç, tur sonu ekranlarında ilerle
- `Escape`: duraklat / devam et
- `Tab`: yan paneli aç / kapat
- `R`: mevcut turu yeniden başlat
- `T`: manuel müzik tetikleme

## Sistemler

Oyunda aşağıdaki sistemler aktif olarak çalışır:

- Seviye bazlı tarif açılımı
- `iftar` ve `sahur` fazlarına göre değişen sipariş temposu
- Hurma ekonomisi ve kalıcı yükseltmeler
- En yüksek skor ve en iyi kombo kaydı
- Ses, animasyon ve yardım metni ayarları
- Tutorial overlay ve localStorage tabanlı ilerleme

Yükseltme kategorileri:

- `swiftFeet`: hareket hızını artırır
- `quickPrep`: hazırlama/ısıtma süresini kısaltır
- `patientGuests`: sipariş sürelerini uzatır
- `blessing`: skor ve hurma kazancını artırır

## Dizin Yapısı

```text
.
├── assets/            # Karakter, çevre ve istasyon görselleri
├── audio/             # Oyun içi ses efektleri ve müzik
├── docs/              # Proje için güncel teknik dokümanlar
├── main/              # Bağımsız UI/prototip ekranları
├── src/
│   ├── config/        # Oyun dengeleme ve sabitler
│   ├── layouts/       # Mutfak yerleşimi
│   └── *.js           # Oyun döngüsü, render, ses, sipariş ve oyuncu mantığı
├── index.html         # Aktif canvas oyununun HTML kabuğu
├── server.js          # Yerel statik dosya sunucusu
└── style.css          # Aktif oyunun arayüz stilleri
```

## Geliştirme Notları

- Sunucu yalnızca mevcut dosyaları servis eder; bundler kullanılmaz.
- `server.js` varsayılan olarak `127.0.0.1:3000` üzerinde çalışır.
- Port değiştirmek için `PORT` ortam değişkeni kullanılabilir.
- Kalıcı oyun verileri `ramadan-looper-progress` anahtarıyla `localStorage` içine yazılır.

Daha ayrıntılı teknik bilgi için:

- [Mimari Özeti](docs/ARCHITECTURE.md)
- [Geliştirme Rehberi](docs/DEVELOPMENT.md)
- [Kontrol Listesi](docs/QA.md)
- [Katkı Rehberi](CONTRIBUTING.md)
- [Davranış Kuralları](CODE_OF_CONDUCT.md)

## Test ve Kontrol Listesi

Manuel doğrulama için kısa akış:

1. Oyunu açın ve başlangıç ekranından turu başlatın.
2. Dolaptan bir yemek alın, doğrudan servise götürün ve ısıtma zorunluluğu uyarısını doğrulayın.
3. Aynı yemeği fırında bekletip doğru masaya servis edin.
4. `Tab` ile paneli açıp yükseltme, ayar ve durum alanlarını kontrol edin.
5. Sayfayı yenileyip hurma, skor ve ayarların korunup korunmadığını kontrol edin.
6. `Escape`, `R` ve `T` kısayollarının beklenen davranışı verdiğini doğrulayın.

## Lisans

Bu proje [MIT License](LICENSE) ile lisanslandı.
