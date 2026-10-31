Bir startup’ta çalışıyorsanız, bir şeyi düzgün şekilde hayata geçirmeye neredeyse hiç zamanınız olmadığını bilirsiniz. Animasyona zaman ayırmak çoğunlukla gereksiz görülür. Bir de frontend tarafında animasyonsuz bir şey yaptığınızda hep bir şeyler eksikmiş gibi gelir. Küçük bir startup’ta çalışan bir frontend geliştirici olarak, bir şey değiştiğinde kullanıcıya bunu hissettirmek için her zaman olabildiğince hızlı birkaç küçük animasyon eklemek isterim. Bu yüzden bunu başarabilmek için seçenekler aramaya başladım; çünkü animasyonsuz bir site, cilası çekilmemiş marangoz işi gibi fazlasıyla soluk görünüyor.

Geçenlerde, işleri neredeyse hiç zahmet çekmeden animasyona çevirmeyi amaçlayan `AutoAnimate` kütüphanesini buldum. Üstelik şu anda tüm büyük frontend framework’lerini destekliyorlar, ki bu harika. Zamanı kısıtlı startup çalışanları için adeta bir mücevher. Ben de bir günde tüm frontend projelerimize `AutoAnimate`’i ekledim. Animasyon tarafında hâlâ pek çok şeyin mükemmel olmadığını biliyorum ama azıcık olması hiç olmamasından her zaman iyidir. Bugün `auto-animate`’i Vue 3 projelerine nasıl ekleyeceğinizi göstereceğim, ayrıca uç durumlar için kullandığım bazı püf noktalarını da anlatacağım.

> Bu yazıda örnekleri ve kullanımı Vue 3 için göstereceğim; diğer framework’ler için [dokümantasyonu](https://auto-animate.formkit.com/#usage-react) okuyabilirsiniz.

## Vue Projesi Oluşturma

`auto-animate`’in nasıl eklendiğini ve kullanıldığını göstermek için Vue 3, Vite, typescript ve tailwind kullanacağım. Vue şart değil; `auto-animate`’in desteklediği tüm yaygın frontend framework’lerinde kullanabilirsiniz.

Hadi Vue ekibinin geliştirdiği **[create-vue](https://github.com/vuejs/create-vue)** kütüphanesiyle bir Vue 3 uygulaması oluşturalım. Projeyi oluştururken seçtiğim seçenekler şunlar.

```bash
✔ **Project name:** … auto-animate-example
✔ **Add TypeScript?** … No /  Yes
✔ **Add JSX Support?** …  No  / Yes
✔ **Add Vue Router for Single Page Application development?** …  No  / Yes
✔ **Add Pinia for state management?** …  No  / Yes
✔ **Add Vitest for Unit Testing?** … No /  Yes
✔ **Add an End-to-End Testing Solution?** › No
✔ **Add ESLint for code quality?** … No /  Yes
✔ **Add Prettier for code formatting?** …  No  / Yes

Scaffolding project in .../projects/auto-animate-example...
Done. Now run:
**cd auto-animate-example**
**npm install**
**npm run dev**
```

Çalıştırmadan önce `tailwind` ve `auto-animate`’i ekleyeceğim.

## Tailwind’i Ekleme

Tailwind’i aşağıdaki komutlarla ekleyebilirsiniz. Başarıyla tamamladığınızda proje klasörünüzde `tailwind.config.js` ve `postcss.config.js` dosyaları olacak.

```
npm install -D tailwindcss
npx tailwindcss init
```

İlk yapacağım şey, `tailwind.config.js` dosyasının adını `tailwind.config.cjs` olarak değiştirmek; aksi hâlde Vite projesinde çalışmazlar. Aynı şeyi `postcss.config.js` için de yapmalısınız. Ardından `tailwind.config.cjs` dosyasını aşağıdaki gibi güncelleyin; böylece tailwind, hangi sınıfların kullanımda olduğunu ve hangilerinin ayıklanacağını anlamak için bileşenlerinizi tarayacak.

```js
/** @type {import('tailwindcss').Config} */  
module.exports = {  
  content: [  
  "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx,vue}",  
  ],  
  theme: {  
  extend: {},  
  },  
  plugins: [],  
}
```

Sırada `src/assets/base.css` dosyasını silmek ve `src/assets/main.css` dosyasını aşağıdaki gibi düzenlemek var. Böylece tüm projede bütün tailwind sınıflarına erişebiliyorum. `main.css` dosyası varsayılan olarak `main.ts` içinde import ediliyor, yani onu ayrıca import etmenize gerek yok.

```css
@tailwind base;  
@tailwind components;  
@tailwind utilities;
```

## `AutoAnimate` Nasıl Çalışır?

[Dokümantasyonda](https://auto-animate.formkit.com/#usage) okuyabileceğiniz gibi, aşağıda listelenen koşullar gerçekleştiğinde öğeleriniz animasyona girecek.

- Bir alt öğe DOM’a **eklendiğinde**.
- Bir alt öğe DOM’dan **kaldırıldığında**.
- Bir alt öğe DOM içinde **taşındığında**.

İşin güzel yanı, `AutoAnimate` kullanıcının animasyon tercihini `prefers-reduced-motion` ayarından okuyor ve animasyonları otomatik olarak devre dışı bırakıyor.

## AutoAnimate’i Ekleme

Son olarak `auto-animate`’i projeye ekleyeceğim; ondan sonra projede bir şeyleri nasıl animasyona sokacağınıza dair örnekler gösterebilirim.

```bash
npm install @formkit/auto-animate
```

`auto-animate`’i global directive olarak kullanacağım, o yüzden bu şekilde yapılandırmam gerekiyor. `main.ts` dosyasında spagetti kod oluşmasını engellemek için yapılandırma gerektiren kütüphaneleri her zaman `plugins` klasöründe ayrı tutarım. Bu yüzden `auto-animate`’i yapılandırmak için `src/plugins/auto-animate.ts` adında bir dosya oluşturacağım.

```ts
// src/plugins/auto-animate.js file  
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'  
import type { App } from 'vue';  
  
export default (app: App): App => {  
  return app.use(autoAnimatePlugin);  
};
```

```ts
// main.ts file  
import { createApp } from 'vue'  
import App from './App.vue'  
import initAutoAnimate from '@/plugins/auto-animate';  
import './assets/main.css'  
  
const app = createApp(App);  
  
initAutoAnimate(app);  
  
app.mount('#app');
```

Her şey hazır. Şimdi projeyi `npm run dev` komutuyla çalıştıracağım.

Sizi bileşen oluşturmakla falan yormayacağım. Örnekleri sadece dummy kod üzerinden göstereceğim; detay isterseniz yazının sonunda paylaşacağım örnek projede tüm örneklere bakabilirsiniz.

## Örnekler

### DOM’a Öğe Ekleme/Çıkarma

DOM’a yeni öğe eklediğinizde ya da çıkardığınızda, yani `v-if` ile görünürlüğü değiştirdiğinizde animasyon devreye girer. `v-auto-animate` directive’ini animasyona girecek öğenin ebeveynine eklemelisiniz. Bu ebeveyn öğe her zaman görünür olmalı, yoksa animasyonunuz düzgün çalışmayabilir.

```html
<collapse v-auto-animate>  
  <header @click="toggleBody">  
  Header  
  </header>  
  
 <body v-if="isBodyVisible">  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
    Donec posuere malesuada nulla, vitae congue metus rutrum ac.  
    Aliquam placerat metus consectetur nisi venenatis, eget tristique ligula consectetur.  
    Phasellus quis blandit nulla. Vestibulum tempus lectus elit, sit amet accumsan ligula  
    consectetur sit amet. Phasellus egestas, mi et dapibus pulvinar, ipsum augue vulputate  
    metus, vel suscipit nunc velit id tellus. Vestibulum viverra dolor non euismod malesuada.  
  </body>  
</collapse>
```

![animasyonsuz örnek](/cms/effortless-animations-autoanimate-vue-3-image-1.gif)

![animasyonlu örnek](/cms/effortless-animations-autoanimate-vue-3-image-2.gif)

### Listeye Öğe Ekleme/Çıkarma

Listeye öğe ekleme/çıkarma olayını animasyonla göstermek istiyorsanız, `v-auto-animate` directive’ini döngüye giren öğelerin ebeveynine eklemelisiniz. Böylece kütüphane değişiklikleri otomatik algılar ve öğeler eklendiğinde ya da silindiğinde onları animasyona sokar.

```html
<section class="mt-10">
 <div v-auto-animate>  
	  <template v-for="item in items" :key="item.title">  
		  <item />  
	  </template>  
  </div>  
  
 <div>  
  <button @click="addNew"> Add New </button>  
  <button @click="removeRandom"> Remove random </button>  
 </div>  
</section>
```

![animasyonsuz öğe ekleme/çıkarma](/cms/effortless-animations-autoanimate-vue-3-image-3.gif)

![animasyonlu öğe ekleme/çıkarma](/cms/effortless-animations-autoanimate-vue-3-image-4.gif)

### Listenin Sıralamasını Değiştirme

Öğeleri bir butonla tek tek değiştirmenin karmaşasından kaçınmak için liste öğelerinin sırasını değiştirmek üzere rastgeleleştirme fonksiyonu kullanacağım. Animasyon her iki durumda da aynı olacak, sadece çoklu indeks atlamalarında biraz daha uzun sürecek.

![animasyonsuz sıra değiştirme](/cms/effortless-animations-autoanimate-vue-3-image-5.gif)

![animasyonlu sıra değiştirme](/cms/effortless-animations-autoanimate-vue-3-image-6.gif)

### Animasyon Süresini Değiştirme

Directive sayesinde, aşağıda gösterildiği gibi directive’e bir config nesnesi vererek animasyon süresini kolayca değiştirebilirsiniz.

```html
<div v-auto-animate="{ duration: 100 }" class="flex flex-col gap-2">
      <template v-for="item in items" :key="item.title">
        <item /> 
      </template>
    </div>
```

Bu örnekte `v-auto-animate="{ duration: 100 }"` koduyla animasyon süresini varsayılan değer yerine `100` ms olarak değiştiriyorum (varsayılan değerin kaç olduğunu ben de bilmiyorum bu arada).

## Zorlu Animasyonlar

Karşılaştığım bazı uç durumları listelemek istiyorum. Çoğu html render’ıyla ilgili: Vue, html öğelerini olabildiğince az günceller; bu yüzden bileşene `key` eklemek öğeyi tamamen yeniden render etmeye zorlar ve böylece yeniden render sırasında animasyon çalışır.

- Bazen bileşenlerinizin metni ya da görsel kaynağı değiştiğinde animasyon çalışmasını istersiniz ama bu, `auto-animations` tarafından otomatik olarak algılanmaz; bu yüzden HTML öğenize `key` eklemeli ve `v-auto-animate` directive’ini onun ebeveyn öğesine koymalısınız. O zaman her `key` değişiminde öğe yumuşak bir geçişle kaybolur.
- Route değişimini animasyonla göstermek istiyorsanız `<router-view />` bileşeninize şöyle benzersiz bir key eklemelisiniz: `<router-view :key="$route.fullPath">`
- Bazen animasyon, öğenin arka plan rengi yoksa (üst üste binmeye yol açarak) diğer öğelerin altından başlar ya da animasyon çalışırken scrollbar ekler. Bunu önlemek istiyorsanız ebeveyn öğeye `overflow-hidden` eklemelisiniz. Böylece öğe alanının dışında gerçekleşen animasyonları görmezsiniz.

## Daha Fazla Örnek

Bu kütüphaneyle yapabileceğiniz bazı temel şeyleri göstermek istedim; diğer örnekler ve kullanım senaryoları için [dokümantasyonlarına](https://auto-animate.formkit.com/#examples) bakabilirsiniz.

## Kendi Animasyonunuzu Oluşturma

Ayrıca `AutoAnimation` kütüphanesi, kendi animasyonunuzu oluşturmanız ya da beraberinde gelen varsayılan animasyonları genişletmeniz/değiştirmeniz için bir API sunuyor. Bu kısma yazıda değinmeyeceğim ama detaylar için [dokümantasyonu](https://auto-animate.formkit.com/#plugins) okuyabilirsiniz.

Sonuç olarak, tüm uygulamalarınızı `AutoAnimate` ile hızlı ve en önemlisi **zahmetsizce** animasyona sokabilirsiniz. `AutoAnimate` hakkında bildiğim tüm detayları paylaştım. Umarım keyif almışsınızdır. Örnek kodlara aşağıdaki bağlantıdan ulaşabilirsiniz.

- [AutoAnimate dokümantasyonu](https://auto-animate.formkit.com/)
- [Örnek kod deposu](https://github.com/turanibrahim/auto-animate-example)
