Küçük bir frontend projeniz varsa, aynı türden şeyleri aynı yere koymak iyi bir fikirdir. Bunu yazar kasanın içindeki para gibi düşünebilirsiniz. Her banknot türü birbirinin üstüne düzenlice istiflenmiştir.

Diyelim ki yazar kasanın içindeki her bölmeyi çoğaltmanız gerekiyor. Artık iki tane 20 dolarlık, iki tane de 10 dolarlık desteniz var ve bu destelerdeki paralar birbirine karışamıyor. Yani bir müşteri size 20 dolar verdiğinde onu o 20 dolarlık destenin içine koymanız ve para üstünü de yine aynı desteden vermeniz gerekiyor. İkinci 10 dolarlık deste ve aynı bozuk para kabı da tam olarak aynı şekilde çalışıyor.

Bir seçenek daha var: yazar kasayı ikiye bölüp aynalamak. Böylece kasanın bir tarafından 20 dolarlık bir banknot aldığınızda diğer kısmı tamamen atlarsınız. İşi biraz daha zorlaştıralım ve 50 dolarlık banknotların ortak olduğunu varsayalım. Bu durumda yapabileceğiniz şey, kasaya ikinci bir kat ekleyip ortak banknotların hepsini tek bir deste halinde oraya koymak; çünkü onları nereden aldığınızın ya da nereye koyduğunuzun bir önemi yok.

Modüler frontend mimarisinde kullandığımız fikir tam olarak bu. Bir proje oluşturduğunuzda her şey geleneksel olarak türüne göre yerleştirilir: testler `tests` klasörüne, bileşenler `components` klasörüne ve böyle devam eder. Ama proje büyüdükçe hangi bileşenin neyle ilgili olduğunu ya da hangi store’un ne tür veri tuttuğunu takip etmekte zorlanırsınız. Bu sizi yavaşlatır, çünkü projenin başka bir alanını **bozmadığından** emin olmak için değiştirdiğiniz her şeyi takip etmek zorunda kalırsınız. Bu da zamanla sistemin içinde bir sürü gizli bug’a ve istenmeyen davranışa yol açar.

![yazar kasa](/cms/modular-frontend-architecture-image-1.jpg)

Yazar kasa dosyaları nasıl organize ettiğimizi anlatıyorsa, bilgisayar donanımı da onların nasıl haberleştiğini anlatıyor.

Modülleri bilgisayar kasasının içindeki parçalar gibi düşünebilirsiniz. Bilgisayar çok karmaşık bir şeydir, ama GPU, CPU ve RAM çubukları gibi bağımsız parçalardan oluşur.

Her parça iç yapısı itibarıyla tamamen farklıdır ve kendi özel işini yapar. Yine de tamamen kapsüllenmiştir. Anakart, ekran kartının ham devreleriyle ya da iç çipleriyle uğraşmak zorunda değildir; onunla yalnızca PCIe yuvası gibi standart bir arayüz üzerinden etkileşir.

Anakart, bir sayfa ya da global scope gibi davranır. Ekran kartının içeride pikselleri nasıl çizdiğini bilmesi gerekmez; yalnızca kartın yuvaya uyup iletişim kurallarına uyduğuna bakar. Bu kapsülleme sayesinde ekran kartını, bilgisayarın geri kalanını değiştirmeden kolayca yenisiyle değiştirebilirsiniz.

Frontend modülleri de tam olarak böyle davranmalı. İç mantık karmaşık ve özgün olabilir, ama projenin geri kalanıyla iletişim kurma şekli tek ve katı bir geçitten geçmek zorundadır.

![bilgisayarın içi](/cms/modular-frontend-architecture-image-2.jpg)

## Neden Modüler Mimari?

Projeler yeterince büyüdüğünde eninde sonunda monorepo ya da micro-frontend projelerine dönüşürler. Sınırları ve ilişkileri anlamadan bir projeyi monorepo’ya çevirmek son derece can sıkıcıdır. Modüler mimariyi bu yaklaşımlar arasında kusursuz bir orta yol olarak düşünebilirsiniz.

Bir de günümüzde projeleri sık sık AI desteğiyle geliştiriyoruz. AI, context window’uyla sınırlıdır ve tüm projeyi yeterince iyi bilmiyorsanız context window’un tamamını etkili biçimde yönetemezsiniz. Katı sınırlar yoksa AI, projenin tamamen ilgisiz alanlarından referans çeker. Projenizde yeterli otomatik guardrail yoksa deprecated bileşenler ya da eski mantık kullanmaya başlarsınız. Kimse bunu review sırasında fark etmezse çok kısa sürede **kocaman bir karmaşaya** sahip olursunuz.

Modüller, AI bağlamını yönetmenize yardımcı olur. AI, kodu ve sizin gerçekte neyi başarmak istediğinizi çok daha iyi anlar. Bu aynı zamanda maliyeti düşürür; context window çok büyüdüğünde AI daha az etkili ve daha pahalı olma eğilimindedir.

Son olarak projeyi güncellemek daha az can sıkıcı hale gelir ve bug’larla uğraşmak çok daha kısa sürer. Modüllerin içinde kullanılan özel isimlendirme kuralları sayesinde bug’ları Sentry gibi platformlarda kolayca bulup takip edebilirsiniz.

## Proje Yapısı

![dağınık oda](/cms/modular-frontend-architecture-image-3.jpg)

Modüller aslında projenin alt programlarıdır. Global scope’un sahip olduğu dosya yapısının çoğunu içerirler. Ancak `plugins`, `layouts`, `pages` ve `services` gibi bazı klasörler yalnızca global scope’ta bulunur.

`services` klasörünü bilerek global scope’a koydum, çünkü onları tek tek modüllerin içine koymak çok fazla kod tekrarına, tip yönetimi sorununa ve veri yönetimi problemine yol açıyor. Çok büyük projelerde servisleri bulmak ve kullanmak biraz daha zor olabilir, ama tek bir modülle ilgili olsalar bile onları modüllerin içine koymayı yine de önermiyorum.

Yapınızda istisnalar yapmak projeye çok fazla entropi sokar, çünkü AI deterministik çalışmaz ve her seferinde şeyleri farklı yerlere koyar. Bu aynı zamanda ekip içi iletişim problemlerine yol açar. Belirli bir mimariye karar verdiyseniz, bu konuda tamamen tutarlı olmalısınız.

i18n çevirilerini de modüllerin içine koymayı tercih ediyorum. Projeniz i18n gerektiriyorsa, bunu global scope ile tek tek modüller arasında bölebilirsiniz.

```plaintext
├── assets/                  # Global static assets (images, global styles, fonts)
├── components/              # Global reusable UI components (atomic/base components)
├── constants/               # Global application constants and enums
├── layouts/                 # Page layouts (e.g., Default, Auth, Dashboard)
├── libs/                    # Global utility libraries and helper functions
├── plugins/                 # Third-party plugin configurations (e.g., i18n, UI libraries)
├── services/                # Global API clients and data-fetching layer
├── store/                   # Global state management (e.g., Pinia, Redux)
├── types/                   # Global TypeScript types and interfaces
├── tests/                   # Global integration, E2E, or orchestration tests
│
├── docs/                    # Project documentation
│   ├── ADR/                 # Architectural Decision Records
│   │   ├── _superseded/     # Outdated or replaced ADRs
│   │   └── [ADR-NO]_[DATE]-[title].md
│   ├── changelog/           # Version history
│   │   ├── UNRELEASED.md    # Unreleased changes for the next version
│   │   └── [VERSION].md     # Released version logs
│   ├── how-to/              # Guides for developers (e.g., deployment, local setup)
│   ├── architecture.md      # High-level system architecture overview
│   └── setup.md             # Local environment onboarding guide
│
├── modules/                 # Feature-driven domain modules
│   └── [module-name]/       # Encapsulated feature module (e.g., 'auth', 'billing')
│       ├── assets/          # Module-specific static assets
│       ├── components/      # Module-specific UI components
│       │   ├── [ModuleName][ComponentName].vue
│       │   └── [ModuleName][ComponentName][SubComponent].vue
│       ├── constants/       # Module-specific constants
│       ├── docs/            # Module-specific business logic documentation
│       ├── hooks/           # Module-specific hooks or composables (e.g., use[ModuleName][HookName].ts)
│       ├── libs/            # Module-specific utility wrappers
│       ├── store/           # Module-specific state slices (e.g., [module-name]-[store-name].store.ts)
│       ├── tests/           # Unit tests isolated to this module
│       │   └── [component|lib|hook].test.ts
│       ├── types/           # Module-specific TypeScript types
│       └── index.ts         # Module public API (exports what the rest of the app can use)
│
├── views/                   # Application pages/routes (maps to router config)
├── AGENTS.md                # AI Agent / LLM context instructions and guardrails
├── main.ts                  # Application entry point
└── README.md                # Project landing page

```

### Global Scope

Global scope, hook’lar/composable’lar, yardımcı kütüphaneler (`libs`) ve plugin’ler gibi paylaşılan mantığı barındırır. Global scope içindeki bileşenler kesinlikle **dumb component** olmalıdır. Temel iş mantığını sayfaların ve hook’ların içine koymayı tercih ediyorum; aksi halde o mantık tamamen bir modülün içine aittir.

### Modüller

Modüller, projenin kapsüllenmiş ve bağımsız alt formlarıdır. Plugins, layouts ve public klasörleri hariç olmak üzere, ihtiyaç duyulduğunda global scope’un sahip olduğu neredeyse her klasör özelliğine sahip olabilirler.

Modüller yalnızca paylaşılan mantığı da temsil edebilir. Örneğin tablo konfigürasyonları, o modül hiç UI bileşeni içermese ve yalnızca saf uygulama ve konfigürasyon dosyalarından oluşsa bile bir `table` modülünün içinde yaşayabilir.

Kod tabanında AI’ya referans olarak verebileceğiniz birkaç “mükemmel” modül olmasını hedeflemelisiniz. Böylece AI, projenin geri kalanı için çok daha iyi ve tutarlı kod üretir.

### Modül Kuralları

- **Public API:** Modüllerin kökünde bir kök dosya (genellikle `index.ts`) bulunmalıdır. Bu dosya, modülün sunduğu her API’yi (bileşenler, hook’lar, sabitler, yardımcılar) dış dünyaya açıkça sunmalıdır.
- **Bileşen İsimlendirmesi:** Modül bileşenleri her zaman modül adını önek olarak kullanmalıdır. Bu, sayfalarda ya da global scope’ta kullanıldıklarında isim çakışmalarını önler.
- **Sayfa Kompozisyonu:** Sayfalar bir ya da birden fazla modül içerebilir. Sayfalar, modül davranışını değiştiren mantık içerebilir ya da farklı layout’lar ve akışlar kurmak için birden fazla modülü bir araya getirebilir. Farklı kullanıcı akışları elde etmek için bu kompozisyonu yönetirler. Bu sayfa seviyesindeki değişiklikler prop’lar üzerinden modülün davranışını etkilese de modülün kendisi bağımsız kalmalıdır. Bir modül asla doğrudan başka bir modülde değişiklik tetiklememelidir; bu orkestrasyon tamamen onları kullanan sayfanın sorumluluğundadır.
- **Kısmi Açığa Çıkarma Yok:** Modüller, dışarıda toplanıp kullanıcı tarafından yeniden birleştirilecek kısmi bileşenleri ya da parçalanmış mantığı dışarıya açamaz. Örneğin, uygulamanın farklı yerlerinde birbirinden farklı formlar kurabilmek için ham form alanlarını, kısmi formları ve ayrı form yönetimi mantığını dışarıya açmamalısınız. Bu, ciddi kapsülleme sorunlarına yol açar ve modül bağımsızlığını kaybeder. Bir modülü güncellediğinizde yalnızca modülün içini ve public API’sini güncellemeniz gerekir. Bir modül asla dış programın akışını değiştirmemeli; yalnızca kendi iç davranışını değiştirmelidir.
- **İletişim:** Modüller kendi iç mantıklarını yönetir ve dışarı sızdırmaz. Bir modül bileşenleri kullandığında, dış dünyayla iletişim kurmak standart prop’lar ve event’ler üzerinden tamamen onun sorumluluğundadır.
- **Bağımlılıklar:** Bir modül başka bir modüle bağımlı olabilir, ama başka bir modülün iç parçalarını doğrudan kullanamaz. Ya diğer modülü public API’si üzerinden bütün bir alt modül olarak import etmelisiniz ya da paylaşılan parçaları global scope’a taşıyıp iki modülün de güvenle kullanmasını sağlamalısınız.

## Projeyi Dokümante Etmek

![masanın üzerinde birkaç doküman](/cms/modular-frontend-architecture-image-4.jpg)

Modülleri dokümante etmek ve test etmek hayati önemde. Dokümante edilmeyen modüller genellikle mantık tekrarına yol açar, çünkü diğer geliştiriciler onların var olduğunu bilmez. Testi olmayan modüller ise onları bir gün yeniden yazmanız ya da yükseltmeniz gerektiğinde büyük sorunlara yol açar.

Genel proje mimarisi, global kullanımlar, sayfa oluşturma adımları, layout mantığı, kimlik doğrulama, yetki yönetimi (örn. sayfa veya action yetkilerinin nasıl kontrol edileceği), hata yönetimi, geri bildirim yönetimi, form validasyonu ve global UI bileşenleri global scope’ta ayrıntılı biçimde dokümante edilmelidir.

Modül oluşturma, modül kompozisyonu, modül kullanımı ve sayfa oluşturma hakkında özel “how-to” dokümanları yazmalısınız. Bu, AI asistanına kod tabanında modülleri doğru şekilde nasıl oluşturacağını ve kullanacağını açıkça öğretir.

### ADR ve Change Log Sistemi

Paralel görevler üzerinde bir ekiple çalışırken bir Architectural Decision Record (ADR) sistemi inanılmaz faydalıdır. Bir ADR dokümanı, PR review’larında ve özellik uygulamalarında referans verebileceğiniz resmi bir anlaşma görevi görür. Refactor yapmanız, bir şeyi deprecated etmeniz ya da büyük bir yeni özellik geliştirmeniz gerektiğinde bir ADR yazın. Bu, ekibi aynı hizaya getirir ve kimse devasa bir pull request karşısında hazırlıksız yakalanmaz.

> Referans olarak, bir mühendislik ekibinin ADR’ları nasıl etkili kullandığını görmek için Shopware’in public GitHub repo’sunda yer alan **ADR list**’ine göz atmanızı şiddetle tavsiye ederim.

Eski ADR dokümanlarını asla silmemelisiniz. Yeni kararların eskilerini basitçe geçersiz kıldığı artımlı bir doküman sistemi kullanın. Bu tarihsel dokümanlar olmadan ekipler sık sık aynı hataları yapar ya da aynı başarısız uygulamaları defalarca dener. Bir kütüphanenin ya da pattern’in yan etkileri yüzünden neden kaldırıldığını anlatan ADR’yi silerseniz, gelecekteki geliştiriciler onu yeniden getirebilir.

Ayrıca bir changelog tutmak, AI’nın projenin geçmişini ve zaman çizelgesini anlamasına yardımcı olur. Yayınlanmamış değişiklikleri, bir PR merge edilmeden önce güncellenmesi gereken bir `UNRELEASED.md` dosyasında takip etmenizi öneriyorum. Yapı, şu şekilde biçimlendirilmiş basit bir madde listesi olmalı: `* [bug|feature|performance|chore]: explain the change or action`

#### ADR Şablonu

```markdown
---
title: {{ title }}
date: {{ date }}
area: {{ area }}
tags: [{{ tags }}]
---

## Context

## Decision

## Consequences

```

### Bir Modülü Dokümante Etmek

Modüle özel dokümantasyon doğrudan o modülün `docs/` klasöründe yaşamalı. Buna yerel “how-to” rehberleri, modül davranışındaki güncellemeler, mimari tuhaflıklar ya da o özelliğe özgü bir domain sözlüğü dahil.

## Proje Kalitesini Sağlamak

AI ile çalışıyorsanız yüksek kod kalitesini zorunlu kılmalısınız, çünkü AI eninde sonunda projenin mevcut kalitesini kopyalar. Bir LLM ile çalışmanın en zor kısmı kod kalitesi tavanını yükseltmektir, çünkü AI doğal olarak kod tabanının çoğunluğunu taklit eden kod üretir.

Bu yüzden, AI’yı yoğun kullanmaya başlamadan ya da projenizi modüler bir mimariye çevirmeden _önce_ katı validasyon ve linting kuralları uygulamalısınız. Her sınırlama ya da mimari kısıt bir ESLint kuralı veya özel validasyon script’i ile zorunlu kılınmalı. AI dokümantasyonu okuyabilir, ama otomatik kurallar yoksa yine de hata yapar. Örneğin bir UI kütüphanesini deprecated ettiyseniz, import’larını açıkça kısıtlayan bir ESLint kuralına ihtiyacınız var.

Mümkün olan en katı kod stilini zorunlu kılın. Bir işi yapmanın tam olarak tek bir yolu olmalı ve bu otomatik olarak doğrulanmalı. Arrow fonksiyonları tercih ediyorsanız her yerde zorunlu kılın. Object parametreleri tercih ediyorsanız bunun için bir ESLint kuralı yazın. Kebab-case dosya isimlendirmesi kullanıyorsanız ESLint’in yanında bunu kontrol eden özel bir validator script’i kullanın.

Son olarak, **main branch’e asla ölü kod deploy etmeyin**. Kullanılmayan değişkenleri, fonksiyonları, bileşenleri ve dosyaları tespit eden araçlar ve script’ler kullanın ve onları hemen silin. Bir gün geri gerekirse, Git geçmişinde güvenle duruyorlar. Bu bakım yükünü main repo’nda taşımayın.

Umarım bu makale frontend mimarinizi iyileştirmenize yardımcı olur. Bir sonraki makalemde somut modül örneklerini, uygulama detaylarını ve bu mimari içinde AI’yı tam olarak nasıl prompt’layıp yönlendirdiğimi, modülleri sorunsuz biçimde nasıl bir araya getirdiğimi paylaşacağım. Okuduğunuz için teşekkürler, bir sonrakinde görüşürüz!
