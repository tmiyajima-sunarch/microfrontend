/**
 * マイクロフロントエンドの描画用コンポーネント。
 * 動的にマイクロフロントエンドのコンポーネントを描画する。
 * 
 * 以下のReact版のコンポーネントを参考に作成しています。
 * 
 * https://github.com/micro-frontends-demo/container/blob/master/src/MicroFrontend.js
 */
const MicroFrontend = {
  props: {
    /**
     * 読み込むコンポーネント名。
     */
    name: {
      type: String,
      required: true
    },
    /**
     * マイクロサービスのURL。
     */
    url: {
      type: String,
      required: true
    },
    /**
     * コンポーネントに渡すパラメータ。
     */
    options: {
      type: Object,
      required: false
    }
  },

  template: `
    <div :id="containerId"></div>
  `,

  mounted() {
    this.loadMicroFrontend();
  },

  beforeDestroy() {
    this.unmountMicroFrontend();
  },

  computed: {
    containerId() {
      return `${this.name}-container`;
    },

    renderFunction() {
      return `render${this.name}`;
    },

    unmountFunction() {
      return `unmount${this.name}`;
    }
  },

  methods: {
    loadMicroFrontend() {
      const scriptId = `micro-frontend-script-${this.name}`;

      if (document.getElementById(scriptId)) {
        this.renderMicroFrontend();
        return;
      }

      fetch(`${this.url}/asset-manifest.json`, { mode: "cors" })
        .then(res => res.json())
        .then(manifest => {
          // <script />タグを作成して読み込み
          const $script = document.createElement('script');
          $script.id = scriptId;
          $script.src = `${this.url}${manifest['main.js']}`;
          $script.onload = () => this.renderMicroFrontend();
          document.head.appendChild($script);
        });
    },

    renderMicroFrontend() {
      window[this.renderFunction](document.getElementById(this.containerId), this.options);
    },

    unmountMicroFrontend() {
      window[this.unmountFunction](document.getElementById(this.containerId));
    }
  }
};
