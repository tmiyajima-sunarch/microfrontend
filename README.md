# マイクロフロントエンドサンプル

Spring BootとVue.jsによるマイクロフロントエンドの実装サンプルです。

## 実行方法

```sh
# コンパイル
./mvnw package

# 実行(それぞれ別コンソールで実行)
java -jar a-service/target/a-service-*.jar
java -jar b-service/target/b-service-*.jar
java -jar container-app/target/container-app-*.jar
```
