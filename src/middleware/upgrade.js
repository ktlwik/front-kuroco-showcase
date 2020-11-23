export default function ({ store, redirect, route }) {
  // 仮会員の時 / は ページ側でチェック 
  if (
    store.$auth.loggedIn &&
    route.path !== "/upgrade" &&
    route.path !== "/inquiry"
  ) {
    const group_ids = JSON.parse(JSON.stringify(store.$auth.user.group_ids))
    let upgraded_flg = false
    Object.keys(group_ids).forEach(function (key) {
      if (key == 100) { //ここでグループIDを指定すると、グループによって強制的に遷移させられる
        upgraded_flg = true
      }
    })
    if (!upgraded_flg) {
      return redirect("/upgrade")
    }
  }
}
