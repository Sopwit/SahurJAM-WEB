# Mimari Özeti

Bu belge, depo içindeki aktif oyun akışını ve klasör sorumluluklarını özetler.

## Çalışma Akışı

İstek akışı:

1. `server.js` statik dosyaları `127.0.0.1:3000` üzerinden servis eder.
2. Tarayıcı `index.html` dosyasını yükler.
3. `index.html`, `style.css` ve `src/main.js` üzerinden oyunu başlatır.
4. `src/main.js` asset'leri yükler, `Game` örneğini oluşturur ve UI bağlarını kurar.
5. `Game`, alt sistemleri (`Renderer`, `AudioManager`, `OrderManager`, `Player`, `Station`) yönetir.

## Ana Modüller

### `src/main.js`

- DOM referanslarını toplar
- Asset yükleme akışını başlatır
- `Game` nesnesini oluşturur
- Panel, buton ve klavye etkileşimlerini bağlar

### `src/game.js`

Oyunun ana orkestrasyon katmanıdır.

- Tur durumlarını yönetir (`menu`, `playing`, `paused`, vb.)
- Skor, kombo, süre ve seviye bilgisini tutar
- Tutorial, bildirim ve yükseltme akışlarını koordine eder
- Sipariş sistemi ile oyuncu etkileşimini birleştirir
- Ayarları ve kalıcı ilerlemeyi uygular

### `src/orderManager.js`

- Aktif sipariş listesini üretir ve günceller
- Faz (`iftar` / `sahur`) değişimine göre sipariş temposunu ayarlar
- Seviye bazlı tarif kilidini yönetir
- Sipariş tamamlama ve kaçırma sonuçlarını hesaplar

### `src/progression.js`

- Varsayılan ilerleme modelini üretir
- `localStorage` yükleme/kaydetme işlemlerini yapar
- Yükseltmelerin toplam etkisini hesaplar

### `src/config/gameConfig.js`

Tek noktadan dengeleme ayarlarını barındırır:

- Tuval ölçüleri
- Oyuncu hareket verileri
- Tur süreleri
- Faz zamanları
- Sipariş limitleri
- Seviye hedefleri
- Hurma ekonomisi
- Yükseltme katalogları

## Veri ve Kalıcılık

Kalıcı veri `localStorage` içinde `ramadan-looper-progress` anahtarına yazılır.

Tutulan başlıca alanlar:

- `highScore`
- `bestCombo`
- `totalHurma`
- `lifetimeHurma`
- `settings`
- `upgrades`

Bu yapı tarayıcı bazlıdır; sunucu tarafında oyuncu verisi tutulmaz.

## İçerik Yapısı

### Tarifler

`src/recipes.js` tariflerin:

- görünen adını
- ikonunu
- açılma seviyesini
- puan değerini
- gerekli işlem adımlarını

tanımlar.

### Yerleşim

`src/layouts/kitchenLayout.js` mutfak içindeki istasyon koordinatlarını belirler:

- 2 adet yemek dolabı
- 2 adet fırın
- 4 adet servis masası
- 2 adet çöp alanı

## UI Sınırı

Aktif kullanıcı deneyimi kök dizindeki canvas oyunudur. `main/` klasörü bu akışın parçası değildir; ayrı bir React tabanlı sunum/landing page denemesi olarak durur.
