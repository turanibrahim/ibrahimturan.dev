Bugün websiteme PWA eklemeye karar verdim. Hazır eklemişken bunu bir makale ile sizle de paylaşmak istedim. Websitemde Vite kullandığım için, PWA için `vite-plugin-pwa` eklentisini kullanacağım. Bu eklenti sayesinde PWA ekleme işi oldukça kolaylaşıyor ve varsayılan olarak `precaching` özelliği de sağlıyor. Bundan dolayı manuel olarak eklemek yerine eklentiyi kullanmaya karar verdim.

## PWA Eklemek İçin Gereksinimler

- [vite](https://github.com/vitejs/vite) >= 3
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa)

## PWA Nedir ve Neden önemli?

PWA ya da diğer bir deyişle Progressive Web Apps, tarayıcı üzerinde kullandığımız websitelerine;

- Websitenin assetlerini indirerek hızlı açılmasını ve çalışmasını

sağlama

- Push Notifications özelliği
- Uygulamayı çevrimdışı kullanabilme
- Precaching sayesinde arka planda uygulamayı güncelleyebilme
- Websitesini masaüstüne/menüye uygulama gibi kısayol olarak ekleyebilme

gibi ekstra olarak bir kaç özellik sunuyor.

## Nasıl Çevrimdışı Çalışabiliyor ve Arka Planda Güncelleme Yapabiliyor?

PWA bu özellik için `serviceworker` denen bir yapı kullanıyor. Service Worker’lar js ile aynı thread’de çalışmadıkları için arka planda çalışıp bir takım işleri halledebiliyorlar. Örneğin, Precaching işlemi ile websitesinin dosyalarını indirip tarayıcı üzerine kaydediyorlar. Bu şekilde uygulama istenirse kısmen de olsa çevrimdışı çalışabiliyor. Gerekli ayarlamaları yaparak precaching içerisine API call isteklerinin verilerini dahi kaydedebiliyorsunuz. Detaylar için [bu](https://pwa-workshop.js.org/4-api-cache/) makaleye göz atabilirsiniz.

![Preache edilmiş dosyalar](/cms/vite-uygulamasina-pwa-ozelligi-nasil-eklenir-image-1.png)

### Serviceworkers Websitesinin Güncellendiğini Nasıl Anlıyor?

Aslında bunu sağlayan basit bir mekanizma var ve `vite-plugin-pwa` bunu otomatik olarak hallediyor. Projede build alındıktan sonra pwa dosyaları oluşturuluyorken `sw.js` dosyası içerisine build sonucunda oluşan dosyalar ve onların revizyon numaraları liste halinde yazılıyor. Eğer `vite-pwa` dosyanın yeni olduğunu anlarsa ve precache edilmesi gerekiyorsa revizyon numarası null olarak atanıyor direk tarayıcı tarafında precache ediliyor, fakat dosyanın daha önceden aynı isimde dosya var ise ona rastgele bir revision numarası atıyor. Tarayıcı tarafında ise `sw.js` dosyası güncelleniyor ve yeni dosyadaki revizyon numarası farklı ise bu dosyalar silinip sunucudan yeni hali alınıyor.

![sw.js içindeki liste](/cms/vite-uygulamasina-pwa-ozelligi-nasil-eklenir-image-2.png)

## PWA Eklenti Kütüphanesinin Kurulumu

Öncelikli olarak projeye PWA eklemek için gerekli olan Vite projesine PWA eklemek işlemini bir kaç adımda tamamlayacağız. Bu adımları;

- Uygulama ikon dosyalarının oluşturulması
- Robots.txt dosyasının oluşturulması
- Index.html dosyasının hazırlanması
- PWA eklentisinin ayarlanması

olarak sıralayabiliriz.

### Uygulama İkon Dosyalarının Oluşturulması

İkonları oluşturmak için [https://favicon.io/](https://favicon.io/) sitesini kullanabilirsiniz. Siteden ikonları oluşturduktan sonra elinizde;

- android-chrome-192x192.png
- android-chrome-512x512.png
- apple-touch-icon.png
- favicon-16x16.png
- favicon-32x32.png
- favicon.ico

dosyaları olması gerekiyor. Bu dosyaları projenin içerisinde yer alan `public` klasörü içerisine kopyalamanız gerekiyor. Sonrasında ise aşağıdaki dosyaları kopyalarak, yeni isimleri ile aynı yere kaydetmeniz gerekiyor. Bu dosyaları manifest dosyası ve `index.html` içerisinde kullanacağız.

- android-chrome-192x192.png -> pwa-192x192.png
- android-chrome-512x512.png -> pwa-512x512.png

### Robots.txt Dosyasının Oluşturulması

Botların websitesini analiz edebilmesi ve PWA kullanabilmek için `robots.txt` oluşturmanız gerekiyor. [seoptimer](https://www.seoptimer.com/robots-txt-generator) yardımıyla kolaylıkla oluşturabilirsiniz. Benim projemde default dosya yeterli oluyor, çoğu proje için iş görecektir bundan dolayı public klasörü içerisinde `robots.txt` dosyası oluşturup aşağıdaki kodları içerisine kopyalayabilirsiniz.

```
User-agent: *
Disallow:
```

Tüm bu işlemlerin ardından public klasörü bu şekilde olmalı.

![public klasörü içindeki dosyalar](/cms/vite-uygulamasina-pwa-ozelligi-nasil-eklenir-image-3.png)

### Index.html Dosyasının Hazırlanması

Proje içerisindeki `ındex.html` dosyası içerisine yukarıda oluşturduğumuz ikon dosyalarını ve mobil uyumlu olabilmesi için gerekli head tag’lerini eklememiz gerekiyor. Aşağıdaki örnekte eklenmesi gereken alanları gösterdim. `manifest.webmanifest` dosyasını oluşturmayı unuttuk derseniz, merak etmeyin eklenti onu otomatik olarak oluşturacak. Eklerken başlığını ve açıklamasını değiştirmeyi unutmayın :)

```html
<!DOCTYPE html>  
<html lang="en">  
  <head>  
	 <meta charset="UTF-8" />
	 
	 <!-- EKlenmesi Gereken Alanlar Baslangic   -->  
	 <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
	 <title>Google Aramasinda gozukmesini istediginiz baslik</title>  
	 <meta name="description" content="Google aramasinda gozukmesini istediginiz aciklama">  
	 <meta charset="UTF-8" />
	 <link rel="manifest" href="/manifest.webmanifest">
	 <link rel="icon" href="/favicon.ico" />
	 <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">  
	 <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">  
	 <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">  
	 <link rel="mask-icon" href="/masked-icon.png" color="#FFFFFF">  
	 <meta name="theme-color" content="#ffffff">  
	 <!-- EKlenmesi Gereken Alanlar Bitis   -->
	 
  </head>  
 <body>  
  <div id="app"></div>  
	 <script type="module" src="/src/main.js"></script>  
  </body>  
</html>
```

### PWA Eklentisinin Ayarlanması

Bir sonraki adım olarak ise proje içerisine `vite-plugin-pwa` kütüphanesini eklememiz gerekiyor. Aşağıdaki komut ile projenize pwa eklentisini kurmanız gerekiyor.

```shell
npm i vite-plugin-pwa -D
```

Sonrasında ise `vite.config.js` dosyasına kütüphaneyi ekleyerek ayarları yapmak gerekiyor. Plugins arrayi içerisine `VitePWA`’yi ekledikten sonra içerisine gerekli manifest dosyasını ve ayarları ekliyoruz. `name`, `short_name` ve `description` alanlarını websitesine göre güncellemeniz gerekiyor.

```javascript
import { defineConfig } from 'vite';  
import { VitePWA } from 'vite-plugin-pwa';
  
export default defineConfig({  
  plugins: [  
  VitePWA({  
	  registerType: 'prompt',  
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],  
      manifest: {  
  name: 'siteismi',  
        short_name: 'siteismi',  
        description: 'Site aciklamasi (index.html icerisindekini kullanabilirsiniz)',  
        theme_color: '#ffffff',  
        start_url: '/',  
        icons: [  
  {  
  src: 'pwa-192x192.png',  
            sizes: '192x192',  
            type: 'image/png',  
          },  
          {  
  src: 'pwa-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
          },  
          {  
  src: 'pwa-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
            purpose: 'any maskable',  
          },  
        ],  
      },  
    }),  
  ],  
});
```

Bu işlemi de başarılı şekilde tamamlayıp build alırsanız, `vite-plugin-pwa` otomatik olarak `manifest.webmanifest`, `sw.js`, `registerSW.js` ve `workbox-???.js` dosyalarını build dosyalarının içerisine eklediğini göreceksiniz. Eğer dosyalar oluşturulmuş ise tebrikler, sitenize başarılı şekilde PWA eklediniz 🎉 Projeyi deploy ettikten sonra `Lighthouse` üzerinden, PWA’nın çalışıp çalışmadığını kontrol edebilirsiniz.

![build içindeki pwa dosyaları](/cms/vite-uygulamasina-pwa-ozelligi-nasil-eklenir-image-4.png)

![lighthouse raporu](/cms/vite-uygulamasina-pwa-ozelligi-nasil-eklenir-image-5.png)

### Bazı Dosyaların PWA Tarafından Precache Edilmesini İstemiyorum

Bazı durumlarda server içerisinde bulunan tüm dosyaların cache edilmesini istemeyebilirsiniz. Örneğin, CDN server içerisinde sitenizde kullandığınız bir PDF dosyası bulunuyor, bu dosyayı sık sık güncelliyor fakat her güncellemede deploy yapmıyorsanız bazı kullanıcıların hala eski dosyayı görmekte olduğunu göreceksiniz. Bu durumun önüne geçmek için `vite.config.js` dosyasında bulunan PWA ayarlarını güncellememiz gerekiyor. Bu sayede serviceworker’lara bu dosyayı precache etmemesi gerektiğini söyleyebiliyorsunuz. Örneğin, sadece js ve css dosyalarının precache edilmesini istiyorsanız ayarlarınızı aşağıdaki gibi güncelleyebilirsiniz.

```javascript
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'ibrahimturan',
        short_name: 'ibrahimturan',
        description: 'I\'m Ibrahim, working as Frontend Developer almost 3 years. Interest everything related to software. Like being practical and work solution oriented. Have high communications skills and always curious about the cutting-edge technologies.',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      // Bu ayar sayesinde sadece js, css ve index.html dosyalari precahe oluyor.
      workbox: {
        globPatterns: ['**/*.{js,css}', 'index.html'],
      },
    }),
  ],
});
```
