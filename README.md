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

![構成図](https://www.plantuml.com/plantuml/svg/0/SoWkIImgAStDKIX9BIxXoabDAr4eoLSeoapFA558oInAJIx9pC_ZuW8n4lFISr8L7ZTFUzoyyd7JiiTDsnGIYnMIYlBBYrEBa9Kav-UL96RcfHRf9XOKWDJ01Ho1_6ek1Q10Ra5-NcfUYSBZfisFcu6exN5pr_Cfkr_ENOIY8I0nFPMhbYilloGLuYWhXOByeX9R2mCB0sGh4tM1RYZBJ4u5wKuCXh9HhL9Ar8LpbC3gd65S75OO8bkHX6n54Wuhaj2iI29aXH4N5pG45NHrKVsjOAMWf66egOIi0E5aiAmHgcmIggmnKDOXDIy56Bq0)

| アプリ | 役割 |
|--------|------|
| container-app | 画面テーマの切り替え、コンテナ画面の表示 |
| a-service | バックエンドサービス |
| b-service | バックエンドサービス |

全体的な画面テーマ（CSS）の切り替えと、表示するコンポーネントの出し分けは、container-appにより表示される「コンテナ画面」でコントロールし、個々のコンポーネントの内容は、各バックエンドサービスから配信されるJavaScriptで制御しています。

## 処理の流れ

![シーケンス図](https://www.plantuml.com/plantuml/svg/0/nPFVIW915CRlzoa6xtq12R6xBWg2Ue7PRP2Dt1rcnxfrPqf44oFKWf9GH2p12lk35VWmX_NFMpIhRhGgTHDqiypE-Nrdlkymat0uPZoTEa0WNa5-W7W4sGFHzwvw6bKbqp0fjZW2MGLv2w85uWLX1-dCFd882pEYvujb5cH-L7wVr1e-QTWMnwP5s3PEaX0V-If5CQMH4BnEQPZ5KNNSeMcGAOTtPZzXHWynUi1eSxCe6WyTW69ePXF4ESWx4FSWsYexo9mMufPr2xYNFV6wVN0xtk0Qt4jmMnkxMvkgxUZv6Dp1g5DGMo0AIsq3Pp4q5um7PQ_uf1cCO4uMPhSgXbzGwd6zFMg-QLgIsMcASDImKzIsYCN1xGvB9HNpkpgOdXAkEGOpAOyhxo1o8FAGSVSTa1KGTH1Da9qLms64fvc56B7s29jK6yFAWwAyCyLcbiJpH3-ON-pJlHdNJy6zcCviTgLg_jsKnUawvpUTvLN28BF-IsRzBpFp_mwTK1_rQZy1)
