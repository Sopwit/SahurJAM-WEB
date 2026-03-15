# Ramadan Looper

Ramazan temali, canvas tabanli bir mutfak ve servis oyunu. Oyuncu yemekleri dolaptan alir, firinda isitir ve dogru masalara yetistirerek seviyeleri tamamlar.

## Calistirma

```bash
npm start
```

Ardindan `http://127.0.0.1:3000` adresini ac.

## Oynanis Ozeti

- Her seviyenin kendine ait suresi ve minimum teslimat hedefi vardir.
- Tur iki faza bolunur: `iftar` ve `sahur`.
- Yemekler servisten once firinda isitilmak zorundadir.
- Hedef teslimat sayisi tutmazsa seviye basarisiz olur.
- Seviye ilerledikce tarif havuzu, tempo ve zorluk artar.

## Kontroller

- `WASD` veya yon tuslari: hareket
- `E` veya `Bosluk`: etkilesim
- `Enter`: baslat, tutorial gec, sonraki seviyeye ilerle
- `R`: seviyeyi veya oyunu yeniden baslat
- `Escape`: duraklat veya devam ettir
- `Tab`: sag panel menuyu ac veya kapat
- `T`: `ramazan.mp3` sesini cal

## Sistemler

- Kalici hurma ekonomisi ve gelisim sistemi
- High score ve en iyi kombo kaydi
- Sag panel uzerinden durum, gelisim, tuslar ve ayarlar
- Tutorial overlay ve otomatik baslama sayaci
- Faz bazli sesler: sahur dongusu, firin pisirme, siparis basarisi

## Klasor Yapisi

- `src/`: oyunun calisan kaynak kodu
- `assets/`: gorseller ve sprite dosyalari
- `audio/`: oyun ici ses dosyalari
- `main/`: ayri prototip arayuz dosyalari, calisan ana oyuna bagli degil

## Smoke Test

1. Baslangic ve tutorial
- Ana ekranda `OYUNU BASLAT` butonu calisir.
- Tutorial butonlari fare ile tiklanabilir.
- Tutorial 5 saniye sonra otomatik kapanir.

2. Mutfak akisi
- Dolaptan bir yemek al.
- Firina birak ve isitma bitmeden servis etmeye calis.
- `Bu yemek once isitilmali...` uyarisi gorunmeli.
- Isinmis urunu alip dogru masaya servis et.

3. Menu ve gelisim
- `Tab` ile paneli ac.
- `Gelisim` sekmesinde yeterli hurma varsa seviye artmali.
- `Durum` sekmesindeki istatistikler guncellenmeli.

4. Ses
- `T` tusu tam `ramazan.mp3` dosyasini calar.
- Sahur fazinda `sahur.wav` devreye girer.
- Firinda islem varken `yemek-pisme.wav` loop calar.
- Basarili serviste `siparis-ok.wav` calar.
