# マイクロフロントエンドサンプル

マイクロフロントエンドの実装サンプルです。

コンテナ画面内で、バックエンドサービス側で定義されているコンポーネントを動的に描画します。

[Run-time integration via JavaScript](https://qiita.com/tmiyajima/items/daa75bf6f8dd8f7bc9e1#run-time-integration-via-javascript)という手法での実装例です。

## 実行方法

```sh
# コンパイル
./mvnw package

# 実行(それぞれ別コンソールで実行)
java -jar a-service/target/a-service-*.jar
java -jar b-service/target/b-service-*.jar
java -jar container-app/target/container-app-*.jar
```

ブラウザで`http://localhost:8080/`を開きます。

## 構成

![構成図](https://www.plantuml.com/plantuml/svg/0/SoWkIImgAStDKNYslFjPnuIdipTpvQIcbIYKv2iKPQPdb2YaP1Qb9fTavkTnSO4OYNdfEQaAZvkdFMvU-RXfsUEcRGg9nGf9HVdbnQb5o4gIy_DA4ZFpKejq4miAG6hW0ev0VZMN0b0Wjo0_BpMlHE5nq-R7pK3KzhYvw_cKtI_dBaBH492OdifLovMNNv8ASPILGa5-KOcjXO650RALYRf0DvHb9gU2T2S6GzceLYabwi8vIc1rpZ0k3YiCaQr8GhOY2OSLIMXM916omeYB2ng22hgwQFv6aa1oAf8eakaEgNafmBW40000)

| アプリ | 役割 |
|--------|------|
| container-app | 画面テーマの切り替え、コンテナ画面の表示 |
| a-service | バックエンドサービス |
| b-service | バックエンドサービス |

全体的な画面テーマ（CSS）の切り替えと、表示するコンポーネントの出し分けは、container-appにより表示される「コンテナ画面」でコントロールし、個々のコンポーネントの内容は、各バックエンドサービスから配信されるJavaScriptで制御しています。

## 処理の流れ

![シーケンス図](https://www.plantuml.com/plantuml/svg/0/pPFDIiD058NtUOgXcwxY0tGXTUT2GT0NcCInHEmaJAQwpeoMOYq5gQsWHLgaL0jLgJzKnJxC9Ktx5axw8wOL5LTkGYRtE_UUSvaaNOuPpwHt48WdaAyWxa1sG7Jziuxcg99bMWwc784iWxm2qG3nYB2B36RlkOH56T49nJ8ByZ0elGohzP0qRSgnHGbRmoaIuMCV9HqxJYm2BpbEbCMw6hThcMJ4uVNn8SeO4SQOCjh4BD8N8mDG0erjWZW6UGtY1aHJPGUPqoBSl6u6zxC7VhiBNilldODt2bvZUMDrHRKD7lR1wmMjlFe48Z_NTkeiWIQ2GQ_a5-uran7CoSpkleeH5fHwK6i6by-Qbc9sna5OD-sqOrD2ENZjVh6eOdvMJxUdXDXr2TVJc5fRnEKBswvDbGk_MFRVAXeZFCFexvLg3MfUFAsSgNFykqQp0HYXcuGDo_N-oMseQryCQaVWLKPx6r-hQdW_PM7qdWjNDSwiXDFSnW-vZJ_dDlvdxgHwg9_t7G00)

## コンテナ画面とマイクロサービスの連携方法

各マイクロサービスでは、`/asset-manifest.json`というファイルを用意しておきます。

```json:/a-service/src/main/resources/static/asset-manifest.json
{
  "main.js": "/js/a-component.js"
}
```

このファイルで定義されている`main.js`のファイルが、
コンポーネント描画時に読み込まれるようになっています。

このファイル内に、コンポーネントを描画する`render`関数を用意しておきます。

```js:/a-service/src/main/resources/static/js/a-component.js
(function() {
  // 描画するVue Componentの定義
  const AComponent = {
    // ...省略...
  }

  // コンポーネントをDOMに描画する関数。
  // `el`には描画先のDOMエレメントが、
  // `options`には、コンテナ画面からパラメータが渡ってくる。
  window.renderAComponent = (el, options) => {
    new Vue({
      el,
      render(h) {
        return h(AComponent, {
          props: options
        });
      }
    });
  }
})();
```

ここで用意した`render`関数が、コンテナ画面側から実行されることで、画面にコンポーネントが描画されます。

詳細なコンポーネント描画の流れは、[コンテナ画面のソース](./container-app/src/main/resources/templates/main.html)、および[コンポーネント読み込み部分のソース](./container-app/src/main/resources/static/js/micro-frontend.js)を参照してください。

## 現状の問題点

サンプルを単純化するために、以下の通り、コンテナ画面と各コンポーネントでの依存関係が発生しています。

- Vue.js等のライブラリはコンテナ画面でグローバルに読み込む
- 各コンポーネントは、グローバルに読み込まれているライブラリを利用する

![グローバルなライブラリに依存している](https://www.plantuml.com/plantuml/svg/0/SoWkIImgAStDKNYoR-xJjJCCkOfIaqiIyz9pKXKUDsr-t0n4RO-RkvvFsVroxYA5QYu5XUJyt8BylDIy4eMmqbGKlbD-VabnIL5Y0Rf4Lc1fQb4b5r0CORfIeYvSWP92Oh52eZECYwek2KrT4a8TK27GAWKRNLrKtSWEmPI5k0OiZcHMBPT3QbuAC2G0)

Webpackなどのモジュールバンドラーを利用して、利用するライブラリのソースも全てコンポーネント側に含めるようにすることで、コンテナ画面とコンポーネントの依存関係を断ち切ることができます。

![依存を内包する](https://www.plantuml.com/plantuml/svg/0/SoWkIImgAStDKNYoR-xJjJECk8fIaqiIyz9pKXKUDsr-t0n4RO-RkvvFsVroxYA5QYu51OG2fKJTvFpSWloyrBmI9ON4OeL4PnWNh5910Iwj45QQYYRYb9zVKbnIb5W0aQf5DJe9pUWat4Pd1PQc5bM2ZQZbSaZDIm5w1m00)

ただし、この場合でも、コンポーネントが増えてくると、ライブラリが重複し、無駄が増えてくると思います。これをどのように解消するかを考える必要があります。
