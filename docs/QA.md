# QA Kontrol Listesi

Bu belge, aktif oyunun manuel doğrulaması için kısa ama uygulanabilir bir kontrol listesi sunar.

## Başlangıç ve Akış

- `npm start` sonrası uygulama `http://127.0.0.1:3000` adresinde açılır.
- Başlangıç ekranında `OYUNU BASLAT` düğmesi görünür.
- Başlatma sonrası canvas, HUD ve yan panel tetikleyicisi görünür.

## Temel Oynanış

- Oyuncu `WASD` veya yön tuşlarıyla hareket eder.
- `E` veya `Space` ile dolaptan yemek alınabilir.
- Isıtılmamış yemek doğrudan servis edilemez.
- Fırında bekleyen ürün hazır olduğunda alınabilir.
- Doğru yemek doğru masaya teslim edildiğinde sipariş kapanır.

## Seviye ve Sipariş Davranışı

- Oyun `iftar` fazında başlar.
- Tur sırasında `sahur` fazına geçiş bildirimi görünür.
- Aynı anda birden fazla sipariş üretilebilir.
- Sipariş süresi dolduğunda puan cezası uygulanır.
- Tur sonu hedef teslimat sayısı kontrol edilir.

## Yan Panel ve Ayarlar

- `Tab` ile panel açılıp kapanır.
- `Durum` sekmesi hurma, yüksek skor ve kombo değerlerini gösterir.
- `Gelisim` sekmesinde yeterli hurma varsa yükseltme alınabilir.
- `Ayarlar` sekmesindeki ses, animasyon ve yardım metni düğmeleri durum değiştirir.
- `İLERLEMEYİ SIFIRLA` işlemi onay ister ve verileri sıfırlar.

## Kalıcılık

- Sayfa yenilenince yüksek skor korunur.
- Satın alınan yükseltmeler korunur.
- Ayar değişiklikleri korunur.

## Ses

- Oyun başladıktan sonra sesler kullanıcı etkileşimiyle aktifleşir.
- `T` tuşu müziği tetikler.
- Fırında işlem sürerken pişirme sesi devreye girer.
- Başarılı siparişte olumlu ses çalar.

## Regresyon Noktaları

- `R` turu yeniden başlatırken arayüz bozulmaz.
- `Escape` duraklatma davranışıyla panel davranışı çakışmaz.
- Panel açıkken `Escape` önce paneli kapatır.
- Küçük ekranlarda canvas ve HUD taşma yapmaz.
