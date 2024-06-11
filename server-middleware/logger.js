// リクエストがサーバーに到達したときに呼び出され、リクエストされた URL をコンソールにログ出力します。[
// その後、次のミドルウェアまたはルートハンドラーに制御を渡す。
export default function (req, res, next) {
  console.log(req.url)
  next()
}
