const AComponent = {
  props: {
    message: {
      type: String,
      default: '(No message)'
    }
  },
  template: `
    <h1>This is A-Component: Hello {{ message }}</h1>
  `
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