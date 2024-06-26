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
## ファイルシステムルーティング
- NuxtはVueファイルの木構造に基づいて、vue-routerの設定を自動的に生成する。
- 動的なルーティングを生成したい場合は、`_`（アンダースコア）をつける。
- ディレクトリ配下に`_`から始まるファイルのみ存在してる場合、その動的な値は必須ではない扱いになる。
  - 必須にしたい場合は、ディレクトリ配下に`index.vue`ファイルを作成する
- コンポーネント内での現在のパラメータを`this.$route.params.id`（idパラメータにアクセスする場合）などでアクセスできる
- ネストされたルートを作るメリット
```text
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```
- 上記のような木構造を作ることで、親コンポーネントには共通のレイアウトや機能を定義し、子コンポーネントに`<NuxtChild />`を含めることで、共通の部分を維持しつつ異なるコンテンツを表示できる。
  - カスタムレイアウトを使用するでも対応できそうだが、違うのかな
- `next.config.js`で、routerプロパティを使うことでvue-routerをカスタマイズできる。
- 自動で設定されるデフォルトのルーティングをカスタマイズしたい時は、`extendRoutes`を使用する。
  - 用法として、全ての未定義のrouteに対して 404 ページを表示する。などがある。
- `routeNameSplitter`オプションとはルート名の区切り文字を変更するもの
  - ルート名とは、`pages/posts/index.vue` のルート名は `posts`、`pages/posts/_id.vue` のルート名は `posts-id`
  - ルート名は、特定のルートをプログラム的に参照したり、ナビゲーションを行う際に使われる。(下記のようなイメージ)
```vue
export default {
  methods: {
    goToAboutPage() {
      this.$router.push({ name: 'about' });
    },
    goToPost(id) {
      this.$router.push({ name: 'posts-id', params: { id } });
    }
  }
}
```
## データの取得
- SSRでは`asyncData()`か`fetch()`でデータ取得する。
  - asyncDataメソッドは、ページのレンダリング前にデータを取得し、コンポーネントの状態を初期化する。 
    - ページが表示される前に必要なデータを取得して、ページ全体をレンダリングすることができる。
    - ページコンポーネントでのみ使用できる。
  - fetchメソッドは、コンポーネントのレンダリング後にデータを取得する。
    - SSRではコンポーネントのインスタンスが作成された後に呼び出され、クライアントサイドでは遷移時に呼び出される。
    - どのコンポーネントでも使用可能。
- `asyncData()`: 事前にdataメソッドでプロパティを宣言する必要はない。asyncDataが返すオブジェクトがそのままコンポーネントのデータとして使用されるため。
- `fetch()`: 事前にdataメソッドでプロパティを宣言する必要がある。fetchメソッド内でthisを使って既存のプロパティにデータを割り当てるため。
  - または、Vuexでdispatchが必要
- fetchする際にエラーが発生した場合は、`$fetchState.error`を使ったコンポーネント内でエラー処理する必要がある。
  - `fetch()`内で`redirect`や`error`メソッドを使うべきではない
## メタタグとSEO
- メタタグとはHTMLドキュメントの<head>セクションに含まれ、ウェブページに関する追加情報（メタデータ）を提供するもの。
  - 検索エンジンだったり、ブラウザに対して渡される情報
  - Nuxtでは、`nuxt.config.js`にグローバルに設定する方法と、`head`オブジェクトに渡してローカルに設定する方法などがある
## 設定
- デフォルトの設定を上書きしたい場合は、`nuxt.config.js`に追記する。
- .nuxtignoreファイルは、プロジェクトのビルドプロセス中に特定のファイルやディレクトリを無視するために使用される。
  - 最終的なアプリケーションに含まれなくなる。
  - 一時的にビルドに含めたくない場合に良さそう？（そんなことあるのか？）
- `ignorePrefix`プロパティ
  - ファイル名がignorePrefixプロパティで指定された接頭辞から始まっているファイルはビルド時に無視される 
  - デフォルトでは`-`から始まる store/-foo.jsやpages/-bar.vue のようなファイルはすべて無視される。

# ディレクトリ構造
## コンポーネントディレクトリ
- コンポーネントから非同期にデータ取得するには、`fetch()`を使用する。
  - `fetch()`を使用する際は、`data()`でプロパティを宣言しておく必要がある。
    - `data()`メソッドで初期状態を設定することで、コンポーネントがマウントされる際に確実に必要なプロパティが存在するようになる。これにより、非同期処理が完了する前でも、適切なデフォルト値が提供され、未定義エラーを防ぐことができる。

## ページディレクトリ
- `asyncData()`、`fetch()`ともに`context`を利用できる
- `asyncData()`で返されたデータはdataプロパティを定義しなくても利用できる（dataプロパティにマージされる）
- `fetch()`はページのルートが最初にレンダリングされるときに呼び出される。
- また、ユーザーがクライアントサイドでページ間を遷移するとき（`<NextLink>`など）に`fetch()`が呼び出される。 
  - これにより、ページが遷移するたびに最新のデータを取得できる。
## ストアディレクトリ
- `store`ディレクトリに`index.js`を作成することでVuexストアが有効化される。（デフォルトでは無効化されている）
- すべてのコンポーネントからthis.$storeを通じてVuexストアにアクセスできる。
- `nuxtServerInit`はサーバーサイドのみで呼び出されるアクション。クライアントサイドでは呼び出されない。
  - SSR時に自動的に呼び出される。
  - サーバーサイドで取得したデータをstoreに保存するために使用される。（ユーザー認証情報や初期データのfetchなどに利用される。）
