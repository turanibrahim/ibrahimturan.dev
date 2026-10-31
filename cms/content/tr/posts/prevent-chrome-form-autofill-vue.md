Bir siteye giriş yaptığınızda Chrome, bir sonraki ziyaretiniz için giriş bilgilerinizi kaydetmek isteyip istemediğinizi sorar. Kabul ederseniz Chrome şifrenizi kaydeder ve o sitedeki tüm şifre alanlarını (type’ı password olan alanları) şifrenizle doldurur.

Bu, özelliğin beklenen davranışı; ama bazen kullanıcıların canını sıkıyor. Örneğin sitede API secret key için bir alanınız var ve güvenlik nedeniyle o alanın türünü password yapmaya karar verdiniz; Chrome bunu giriş formu sanıp otomatik olarak bilgilerinizle dolduruyor. Bugün bu davranışı nasıl engelleyeceğinizi göstereceğim.

Bu davranışı nasıl engelleyeceğime dair epey araştırma yaptım ama ne bulduğum cevaplar ne de kütüphaneler işe yaradı. Bu yüzden kendi çözümümü yazmaya ve paylaşmaya karar verdim.

## Bu Davranışın Nedeni

Daha önce de söylediğim gibi, formda password alanı varsa ve o site için bilgilerinizi Chrome’a kaydettiyseniz, Chrome bu siteye giriş yapmaya çalıştığınızı düşünür ve tüm password alanlarını otomatik olarak doldurur.

## Çözüm

Bulduğum çözüm çok basit. Yazıda Vue ile uygulayacağım ama React ile de rahatça uygulanabileceğini düşünüyorum. Çözümümün 3 adımı var;

- İlk render için formdaki tüm input’lara `type='text'` ver ve `autocomplete="off"` ekle.
- Kullanıcı password alanına odaklandığında alanın türünü `password` olarak değiştir.
- Kullanıcı alandan boş bir değerle ayrılırsa (blur) input türünü text olarak değiştir.

## Vue’da Uygulama

Uygulama kurulum adımlarını atlayacağım. Varsayılan ayarlarla bir Vue 2 uygulaması oluşturdum. Ardından `src/App.vue` dosyasına aşağıda gösterilen basit giriş formunu ekledim.

```vue
<template>
  <div id="app">
    <div v-if="isloggedin" class="welcome">
      Welcome {{username}}
    </div>
    <div v-else id="form-wrapper">
      <label for="username">Username: </label>
      <input
        v-model="username" 
        class="form-input" 
        type="text" 
        name="username" 
        value=""
      />
      <label for="password">Password: </label>
      <input 
        v-model="password"
        class="form-input"
        type="password"
        name="password"
        value=""
      />
      <button class="block" type="button" @click="saveCredentials">
        Submit Form
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      username: '',
      password: '',
      isloggedin: false
    }
  },
  methods: {
    saveCredentials() {
      this.isloggedin = true;
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#form-wrapper {
  flex-shrink: 1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-input {
  margin: 4px 0px;
}

.block {
  width: 100%;
}
</style>
```

Diyelim ki bu siteye daha önce girip giriş yaptık ve bilgileri Chrome’a kaydettik. Siteye bir sonraki ziyarette giriş formu aşağıdaki gibi görünecek.

![çözüm öncesi](/cms/prevent-chrome-form-autofill-vue-image-1.png)

Bu davranışı engellemek için önce input türlerini reactive hâle getirip state’te tutmamız gerekiyor. İlk render için input türünü `text` olarak ayarlamalıyız.

```html
<input 
  v-model="password"
  class="form-input"
  :type="fieldTypes.password" // change this as reactive
  name="password"
  value=""
/>
```

```js
data() {
  return {
    username: '',
    password: '',
    isloggedin: false,
    fieldTypes: { // add this for change input type
      password: 'text',
    }
  }
},
```

Ardından password input’una @focus ve @blur event’lerini ekleyip bu event’ler için callback fonksiyonunu tetiklememiz gerekiyor.

```html
<input 
  v-model="password"
  class="form-input"
  :type="fieldTypes.password"
  name="password"
  value=""
  @focus="handleType"
  @blur="handleType"
/>
```

```js
handleType(event) {
  const { srcElement, type } = event;
  const { name, value } = srcElement;

  if(type === 'blur' && !value) {
    this.fieldTypes[name] = 'text'
  } else {
    this.fieldTypes[name] = 'password'
  }
}
```

Son olarak Chrome’un önerilerini engellemek için tüm input’lara `autocomplete="off"` eklememiz gerekiyor. Tarayıcıdan güçlü şifre önerileri almak için password alanına `autocomplete="new-password"` ekleyebilirsiniz. Password alanının son hâli yukarıda gösterildiği gibi oluyor.

```html
<input 
  v-model="password"
  class="form-input"
  :type="fieldTypes.password"
  name="password"
  value=""
  @focus="handleType"
  @blur="handleType"
  autocomplete="off"
/>
```

Her şeyin sonunda `App.vue` dosyasının son hâli şöyle görünüyor.

```vue
<template>
  <div id="app">
    <div v-if="isloggedin" class="welcome">
      Welcome {{username}}
    </div>
    <div v-else id="form-wrapper">
      <label for="username">Username: </label>
      <input
        v-model="username" 
        class="form-input" 
        type="text" 
        name="username" 
        value=""
        autocomplete="off"
      />
      <label for="password">Password: </label>
      <input 
        v-model="password"
        class="form-input"
        :type="fieldTypes.password"
        name="password"
        value=""
        @focus="handleType"
        @blur="handleType"
        autocomplete="off"
      />
      <button class="block" type="button" @click="saveCredentials">
        Submit Form
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      username: '',
      password: '',
      isloggedin: false,
      fieldTypes: {
        password: 'text',
      }
    }
  },
  methods: {
    saveCredentials() {
      this.isloggedin = true;
    },
    handleType(event) {
      const { srcElement, type } = event;
      const { name, value } = srcElement;

      if(type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
      }
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#form-wrapper {
  flex-shrink: 1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-input {
  margin: 4px 0px;
}

.block {
  width: 100%;
}
</style>
```
