window.renderBComponent = (el, options) => {
  $(el).append($(`
    <div>
      <p>ここは、b-serviceにより描画されています。</p>
      <p>jQueryにより、DOMを生成して描画しています。</p>
      <p>以下のパラメータがコンテナ画面より渡されています。</p>
      <pre class="p-3 bg-dark text-white">${JSON.stringify(options, null, 2)}</pre>
    </div>
  `))
}