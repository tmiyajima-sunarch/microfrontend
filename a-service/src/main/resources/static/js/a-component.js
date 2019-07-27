(function() {
  const AComponent = {
    props: {
      message: {
        type: String,
        default: '(No message)'
      },
      baseUrl: {
        type: String,
        required: true
      }
    },
    template: `
      <div>
        <p>ここは、a-serviceにより、Vue.jsで描画されています。</p>
        <p>以下のパラメータがコンテナ画面より渡されています。</p>
        <pre class="bg-dark text-white p-3">{{ JSON.stringify($props, null, 2) }}</pre>
        <b-button variant="primary" type="button" :disabled="loading" @click="callApi()">
          <template v-if="loading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
          </template>
          APIを呼び出す
        </b-button>
        <pre class="bg-dark text-white p-3 mt-3 mb-0" v-if="result">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    `,
    data() {
      return {
        loading: false,
        result: null
      }
    },
    methods: {
      async callApi() {
        this.loading = true
        this.result = null
        try {
          const res = await fetch(`${this.baseUrl}/api`, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          this.result = {
            response: await res.text()
          }
        } catch (e) {
          this.result = {
            error: true,
            message: e.message
          }
        } finally {
          this.loading = false
        }
      }
    }
  }

  window.renderAComponent = (el, options) => {
    new Vue({
      el,
      render(h) {
        return h(AComponent, {
          props: options
        })
      }
    })
  }
})()
