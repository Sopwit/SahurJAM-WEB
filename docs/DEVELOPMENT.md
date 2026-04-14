# Geliştirme Rehberi

Bu belge, depoda çalışırken hangi parçanın aktif ürün olduğunu ve değişiklik yaparken nelere dikkat edilmesi gerektiğini açıklar.

## Aktif Çalışma Alanı

Geliştirme yaparken öncelikli alanlar:

- `index.html`
- `style.css`
- `server.js`
- `src/**`

Bu dosyalar çalışan oyunu doğrudan etkiler.

## İkincil Çalışma Alanı

`main/` klasörü ayrı bir React/Tailwind arayüzü içerir. Depo kökünde bu alanı derleyen veya servis eden bir script olmadığı için burada yapılan değişiklikler aktif oyunda görünmez.

Bu klasöre dokunmadan önce şu amaçlardan biri net olmalıdır:

- tanıtım sayfası hazırlamak
- Figma veya sunum çıktısı üretmek
- ileride ayrı bir frontend uygulamasına ayrıştırmak

## Yerel Çalıştırma

```bash
npm install
npm start
```

Varsayılan adres:

```text
http://127.0.0.1:3000
```

Port özelleştirme:

```bash
PORT=4321 npm start
```

## Değişiklik Türlerine Göre Rehber

### Oynanış ve dengeleme

Önce şu dosyalara bakın:

- `src/config/gameConfig.js`
- `src/recipes.js`
- `src/orderManager.js`
- `src/game.js`

### Mutfak yerleşimi

Önce şu dosyalara bakın:

- `src/layouts/kitchenLayout.js`
- `src/station.js`
- `src/renderer.js`

### Ses ve geri bildirim

Önce şu dosyalara bakın:

- `src/audioManager.js`
- `audio/`
- `src/game.js`

### HUD ve başlangıç deneyimi

Önce şu dosyalara bakın:

- `index.html`
- `style.css`
- `src/main.js`

## Kalıcı Veriyle Çalışırken

İlerleme sistemi tarayıcı depolamasına bağlıdır. Test sırasında eski kayıtlar sonucu etkileyebilir. Temiz test için:

- oyun içindeki `İLERLEMEYİ SIFIRLA` düğmesini kullanın
- veya tarayıcıdan `localStorage` içindeki `ramadan-looper-progress` kaydını silin

## Kontrol Komutu

Kod üzerinde değişiklik yaptıktan sonra en azından şu komutu çalıştırın:

```bash
npm run check
```

Bu komut birim testi çalıştırmaz; yalnızca temel sözdizimi hatalarını yakalar.
