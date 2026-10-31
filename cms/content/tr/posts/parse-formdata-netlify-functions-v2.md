Bunu anlamak için 3 saat harcadım. Bu konuyla ilgili bütün blog yazıları çalışmıyor. Netlify Functions V2, [Request API](https://developer.mozilla.org/en-US/docs/Web/API/Request) kullanıyor. `multipart/form-data` isteklerindeki FormData değerlerini ayrıştırmak için Node.js v20 kullandım. Aşağıdaki örnekle ne kadar kolay olduğunu görebilirsiniz. Bu fonksiyon, form verilerini response olarak JSON biçiminde döndürüyor.

```js
export default async function (event) {
  const data = await event.formData();
  const fields = {};

  for (const pair of data.entries()) {
    fields[pair[0]] = pair[1];
  }

  return new Response(JSON.stringify(fields), { status: 200 });
}
```

Umarım işinize yarar. İyi kodlamalar!
