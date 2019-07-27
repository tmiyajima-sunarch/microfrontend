window.renderBComponent = (el, options) => {
  const div = $(`
    <div>
      <p>ここは、b-serviceにより、jQueryで描画されています。</p>
      <p>以下のパラメータがコンテナ画面より渡されています。</p>
      <pre class="p-3 bg-dark text-white">${JSON.stringify(options, null, 2)}</pre>
      <button class="btn btn-primary" type="button">コンテナ画面のコールバックを呼び出す</button>
    </div>
  `)

  div.find('button').click(() => {
    if (options.onClick) {
      options.onClick();
    }
  })

  div.appendTo(el)
}