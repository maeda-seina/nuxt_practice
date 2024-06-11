# はじめる
## ルーティング
- NuxtLinkはNuxt固有のコンポーネントでページ遷移に使用する。
  - 他ウェブサイトへのリンクがある場合は、`<a>`タグを使用する
## ディレクトリ構造
- `nuxt.config.js` の設定で `components: true` にするか、`false` にするか。
  - trueにすると、不要なコンポーネントも読み込まれるため、ビルド時間が長くなる可能性がある。falseだとビルド時間が短縮されると思われる
  - 大規模プロジェクトだと`false` 、小規模だと`true` なのかな。と思われる
- staticディレクトリには変更されない可能性の高いファイルを置く
- Nuxtはデフォルトで、`ssr: true` となっているので`nuxt.config.js` に設定を追加する必要はない。

# コンセプト
## ビュー
- layouts ディレクトリに`default.vue`ファイルを追加することでデフォルトレイアウトを定義することができる。
  - `<nuxt />` の部分に挿入されるイメージ
```vue
// layouts/default.vue
<template>
  <div>
    <header>Header Content</header>
    <nuxt />
    <footer>Footer Content</footer>
  </div>
</template>

// pages/index.vue
<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  </div>
</template>

// HTML
<div>
  <header>Header Content</header>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  </div>
  <footer>Footer Content</footer>
</div>
```
- デフォルトレイアウト以外はカスタムレイアウトという
  - scriptタグの中で使用することを宣言する必要がある
```vue
// pages/posts.vue

<template>
  <!-- テンプレート -->
</template>
<script>
  export default {
    layout: 'blog'
    // ページコンポーネントの定義
  }
</script>
```
- エラーページ
  - Nuxt.jsではエラー発生すると、自動的にエラーページにコンポーネントを渡すようになっている。
    - だから、propsでerrorを受け取っている。
```vue
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error'
  }
</script>
```
## コンテキストとヘルパー
### コンテキスト
- Nuxt関数で利用できるオブジェクトを`context` オブジェクトと呼ぶ
  - `context`は、アプリケーションへの現在のリクエスト (request) に関する追加の情報とオプション情報を提供する。
  - fetch関数、middleware下での関数、plugins下での関数などでアクセス可能。
  - `context`オブジェクトから、app, store, route, paramsなどの情報にアクセスできる。
- `context`オブジェクトが持つ追加の情報とオプション情報について
  - （例）追加の情報とは
    - params: 動的ルートのパラメータ（例：`/user/:id`の`id`）
    - query: URLのクエリパラメータ（例：`?search=keyword`の`search`）
    - req: サーバーサイドのHTTP requestオブジェクト
  - （例）オプション情報とは
      - redirect: リダイレクト関数
      - error: エラーページ表示用の関数
      - store: Vuexストアへのアクセス
- `context.params.id`でURLからIDの取得ができたりする。
- Vuex store ストアへのアクセス（store ディレクトリを介して設定した場合）も`context`を介して可能
### ヘルパー
- `$nuxt` は、Nuxt.jsにおいてグローバルにアクセスできるオブジェクトのこと
  - Vue コンポーネントでは this.$nuxt を介してアクセスでき、それ以外の場合はクライアント側で window.$nuxt を介してアクセスできる
## サーバーサイドレンダリング
- SSRはレンダリングをサーバーサイド側で行い、その結果をクライアントに送信するまでを指す。
- クライアントサイドでのみリソースをインポートするように指定する必要がある場合は process.clientを使用する必要がある
  - localStorageやsessionStorageへのアクセスなどもこれに当てはまる。
- SSRのタイミングでは`res`や`req`オブジェクトが利用できる
  - 初回ページロードやサーバーサイドルーティング時はアクセスできる。
  - クライアントサイドのルーティング時や、ライフサイクルフック時はアクセス不可
    - `NextLink`や、`mounted`や、`created`など。
- ハイドレーションとは
  - サーバーサイドで生成された静的なHTMLをクライアントサイドで再度アクティブにするプロセスを指す。
  - 具体的には、サーバーが生成したHTMLをブラウザが受け取った後、そのHTMLにVue.jsのクライアントサイドのJavaScriptを適用して、ページを完全な動的Webアプリケーションとして機能させることを指す。
- インタラクティブとは
  - ユーザーがWebページ上の要素と対話できる状態を指す。

# 機能
## レンダリング
- NuxtではデフォルトでSSRが有効になっている
