# Katkı Rehberi

Bu repo için katkılar küçük ama net olmalı. Amaç, çalışan canvas oyununu bozmeden iyileştirme yapabilmek.

## Başlamadan Önce

1. Değişikliğin hangi alanı etkilediğini netleştirin: aktif oyun mu, `main/` altındaki prototip mi?
2. Aynı problemi çözen açık bir issue varsa onu referans alın.
3. Kapsamı küçük tutun; bağımsız refactor ile oynanış değişikliğini tek PR içinde karıştırmayın.

## Yerel Kurulum

```bash
npm install
npm start
```

Sözdizimi kontrolü:

```bash
npm run check
```

## Beklenen Katkı Standardı

- Değişiklikler mevcut proje yapısına uygun olmalı.
- Aktif ürün olan kök canvas oyununda regresyon oluşturmamalı.
- Dokümantasyon etkileniyorsa ilgili `.md` dosyaları güncellenmeli.
- Gereksiz dosya, build çıktısı veya kişisel IDE ayarı commit edilmemeli.

## Pull Request Kuralları

- Başlık kısa ve açıklayıcı olmalı.
- PR açıklaması şu bilgileri içermeli:
  - ne değişti
  - neden değişti
  - nasıl test edildi
- Görsel veya oynanış etkisi varsa ekran görüntüsü ya da kısa video ekleyin.

## Uygun Katkı Türleri

- oynanış düzeltmeleri
- dengeleme iyileştirmeleri
- performans düzenlemeleri
- UI/HUD iyileştirmeleri
- dokümantasyon ve repo hijyeni

## Uygun Olmayan Katkı Türleri

- lisans veya sahiplik bilgisini izinsiz değiştirmek
- alakasız büyük klasör taşıma/refactor işleri
- kullanılmayan bağımlılık eklemek
- kök oyunu etkilemeyen ama üretime hazırmış gibi sunulan `main/` değişiklikleri
