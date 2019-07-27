# マイクロフロントエンドサンプル

マイクロフロントエンドの実装サンプルです。

コンテナ画面内で、バックエンドサービス側で定義されているコンポーネントを動的に描画します。

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
