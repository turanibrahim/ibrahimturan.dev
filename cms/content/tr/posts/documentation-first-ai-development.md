Kişisel sitemi yakın zamanda Vue SPA’dan statik bir Astro sitesine dönüştürdüm. Ayrıca yerel bir Payload CMS ekledim, portföy içeriğimi oraya taşıdım ve mevcut DEV makalelerimi de siteye dahil ettim.

Bu iş, iki yoğun gün içinde tamamlandı. AI hızlı ilerlememi sağladı, ama bu hız tek bir büyük prompt’tan gelmedi. Hız, **AI Task Planning Architecture** dediğim katı bir dokümantasyon iş akışından geldi.

Bu iş akışı, AI ajanlarının bağlamı korumasına, yarıda kalan görevlere kaldığı yerden devam etmesine ve uygulamaları sistematik şekilde yürütmesine yardımcı oluyor. Site dönüşümü bunun iyi bir testi oldu.

## Site Dönüşümü

Eski site, çoğu statik olan içerik için Vue, Vue Router ve Pinia kullanıyordu. Tarayıcı, aslında build sırasında tamamlanabilecek bir işi yapıyordu.

Yeni site statik sayfalar için Astro, tekrar kullanılabilir bileşenler için React, stil için Tailwind CSS ve içerik yönetimi için Payload CMS kullanıyor. Payload, yayınlanmış içeriği tipli bir snapshot’a aktarıyor ve Astro da bu snapshot’ı kullanarak siteyi üretiyor. Deploy edilen sitede çalışan bir CMS’e ya da veritabanına ihtiyaç yok.

Bu dönüşüm sırasında:

- siteyi Vue’dan Astro ve React’e taşıdım;
- yerel bir CMS ve statik içerik hattı ekledim;
- 20 projeyi, 6 deneyimi ve 26 teknolojiyi CMS’e taşıdım;
- 7 blog yazısını DEV’den taşıdım;
- PWA, SEO, responsive tasarım ve erişilebilirlik davranışını korudum;
- gereksiz client-side state ve routing’i kaldırdım.

Bunlar işe yarayan verimlilik çıktıları, ama bunların arkasındaki tekrar kullanılabilir geliştirme süreci daha önemli.

## AI Task Planning Architecture

Her görev, dört doküman içeren tarihli bir klasör alıyor:

```plaintext
plans/
  └── [issue-name]-[date]/
      ├── problem.md
      ├── investigation.md
      ├── solution.md
      └── retro.md
```

Dosyalar yalnızca bitmiş kodu açıklamak için oluşturulmuyor. Görevi ilk prompt’tan son review’a kadar baştan sona yönlendiriyorlar.

İş akışı şu sırayla ilerliyor:

1. **Başlatma:** Ajan, proje ve iş akışı kurallarını yüklemek için `AGENTS.md` dosyasını okur.
1. **Prompt alma:** Kullanıcı görevi veya problemi ortaya koyar.
1. **Kurulum:** Ajan `plans/[issue-name]-[YYYY-MM-DD]/` klasörünü oluşturur.
1. **Problem tanımı:** Ajan `problem.md` dosyasını oluşturur ve eksik bağlamı soru-cevap yoluyla kaydeder.
1. **İnceleme:** Ajan repoyu inceler, kök nedenleri bulur ve `investigation.md` dosyasını oluşturur.
1. **Çözüm planlama:** Ajan en iyi yaklaşımı seçer ve `solution.md` dosyasını oluşturur.
1. **Uygulama:** Ajan dokümante edilen çözümü uygular.
1. **Retrospektif:** Başarılı uygulamadan sonra ajan `retro.md` dosyasını oluşturur.

```plaintext
AGENTS.md + user prompt
          |
          v
 plans/[issue]-[date]/
          |
          v
     problem.md
          |
          v
  investigation.md
          |
          v
     solution.md
          |
          v
   implementation
          |
          v
       retro.md
```

Her dosya, farklı bir belirsizlik türünü ortadan kaldırıyor.

### `problem.md`: İsteği Koru

Problem dokümanı, kullanıcının ilk prompt’unu birebir içeriyor. Ardından konuyla ilgili sade ve doğrudan bir açıklama veriyor.

Ajanın önemli bir bağlamı eksikse sorular soruyor ve cevapları aynı dosyanın sonuna ekliyor. Bu önemli, çünkü kararlar bir chat geçmişinin içinde kaybolmamalı.

Doküman, görevin sözleşmesi haline geliyor. Yeni bir ajan onu daha sonra okuyup, yeniden yazılmış bir özet almadan kullanıcının gerçekte ne istediğini anlayabiliyor.

### `investigation.md`: Değiştirmeden Önce Anla

İnceleme dokümanı, kök nedenleri ve etkilenen bileşenleri listeliyor. İlgili mantık parçaları arasındaki bağlantılarla birlikte tam dosya yolları ve satır numaraları içeren madde işaretleri kullanıyor. Mevcut kodun neden var olduğunu açıklıyorsa ilgili git geçmişine de yer veriyor.

Bu aşama varsayımlara değil, repodaki kanıtlara dayanıyor. Ajan henüz kod yazmıyor.

Bu kısıt, yaygın bir AI probleminin önüne geçiyor: görünür tek bir belirtiyi bulup hemen bir patch üretmek. İnceleme aşaması, ajanı önce veri akışını, mevcut pattern’leri ve olası yan etkileri anlamaya zorluyor.

### `solution.md`: Uygulamadan Önce Karar Ver

Çözüm dokümanı, yapılacak düzeltmeyi net biçimde tanımlıyor. Uygulama mantığını, mimari değişiklikleri, best practice’leri ve değişmesi gereken dosyaları kapsıyor.

Birden fazla yaklaşım mümkünse ajan bunları kısaca listeliyor ve seçtiği yaklaşımı sıkı biçimde gerekçelendiriyor. Böylece tradeoff, kod ortaya çıkmadan önce görünür hale geliyor.

Örneğin CMS işi sırasında, yayındaki siteden doğrudan Payload’a sorgu atmak daha basit görünmüştü. İnceleme, sitenin statik olarak deploy edildiğini ve CMS’in yerel olduğunu gösterdi. Seçilen çözüm bunun yerine statik bir export hattı kullandı ve production’ı CMS’ten bağımsız tuttu.

Uygulama, `solution.md` dosyasını takip etmek zorunda. Plan yanlışsa, kod yazarken sessizce yön değiştirmek yerine plan düzeltilmeli.

### `retro.md`: Gerçekte Ne Olduğunu Kaydet

Retrospektif yalnızca uygulama başarıyla tamamlandıktan sonra oluşturuluyor. Problemi, incelemeyi ve uygulanan çözümü kısaca özetliyor.

Aynı zamanda uygulamanın karmaşıklığını eleştiriyor, blocker’ları kaydediyor ve ileride yapılacak refactor’lar ya da proje iyileştirmeleri için önerilerde bulunuyor. `solution.md` dosyasındaki beklenen sonucu kopyalamak yerine gerçek sonucu anlatıyor.

Bu, sıradaki ajana işe yarayan bir proje geçmişi bırakıyor. Hangi alternatiflerin tutmadığını, hangi kararların işe yaradığını ve hangi teknik borcun bilinçli olarak sonraya bırakıldığını görebiliyor.

## Onu İşe Yarar Kılan Kısıtlar

Değer, dört Markdown dosyasına sahip olmaktan gelmiyor. Bu dosyaların etrafındaki kısıtlara uymaktan geliyor:

- başlamadan önce `AGENTS.md` dosyasını okuyun;
- her görev için tarihli tek bir plan klasörü oluşturun;
- kullanıcının prompt’unu birebir koruyun;
- eksik bağlamı sorun ve cevapları kaydedin;
- `problem.md`, `investigation.md` ve `solution.md` var olmadan kod yazmayın;
- inceleme bulgularını tam dosyalara ve mantık parçalarına bağlayın;
- seçilen çözüme harfiyen uyun;
- her dokümanı sade, doğrudan ve gereksiz dilden uzak tutun;
- retrospektifi ancak uygulama başarılı olduktan sonra yazın.

Bu kısıtlar rastgele kararları azaltıyor. Görevleri kaldığı yerden sürdürülebilir hale de getiriyor. Bir ajan incelemeden sonra durursa, başka bir ajan tüm konuşmayı ya da repo analizini tekrarlamadan aynı klasörden devam edebiliyor.

## Linting ve Validasyon Neden Hâlâ Önemli

Dokümantasyon niyeti açıklıyor, ama niyeti zorunlu kılamıyor. AI bir isimlendirme kuralını okuyup yine de unutabiliyor. Eski bir API kullanabiliyor, kullanılmayan bir değişken bırakabiliyor ya da doğru görünen ama build almayan kod yazabiliyor.

Ben katı ESLint, TypeScript, Prettier, içerik validasyonu ve production build’lerini çalıştırılabilir guardrail olarak kullanıyorum. ESLint; arrow callback’ler, `const` kullanımı, strict equality, süslü parantezler, kullanılmayan değişkenler ve önerilen React, React Hooks ve Astro davranışları gibi kuralları zorunlu kılıyor. TypeScript, içerikle bileşenler arasındaki sözleşmeleri koruyor. İçerik validasyonu hatalı CMS export’larını reddediyor. Production build’i de eksiksiz statik sitenin üretilebildiğini kontrol ediyor.

```plaintext
solution.md
    |
    v
implementation ---> ESLint + TypeScript + validation + build
    ^                              |
    |-------- fix failures --------|
                                   |
                                   v
                        verify real behavior
                                   |
                                   v
                               retro.md
```

Dokümantasyon, ajanın ne yapması gerektiğini tanımlıyor. Validasyon araçları ise yapmaması gerekeni reddediyor.

Bu geri bildirim verimliliği artırıyor, çünkü AI küçük ve deterministik hataları kendi başına düzeltebiliyor. İnsan review’u da böylece formatlama ya da önlenebilir kod kalitesi problemleri yerine mimariye, davranışa ve ürün kararlarına odaklanabiliyor.

## Ne Öğrendim

AI hızlıca kod yazabiliyor, ama hızlı kod üretimi hızlı geliştirmeyle aynı şey değil. Gerçek verimlilik, doğru sonuca daha az regresyonla, daha az tekrar incelemeyle ve sonraki görev için yeterli bağlamla ulaşmak demek.

İş akışım basit: prompt’u koru, sistemi incele, kararı dokümante et, planı uygula, gerçek sonucu doğrula ve olanları kaydet.

Site dönüşümü bu yöntemin bir çıktısı. Daha değerli çıktı ise bağlamını koruyan ve her görevden sonra daha güçlü hale gelen bir geliştirme süreci.
