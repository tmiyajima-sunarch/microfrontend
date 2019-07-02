const BComponent = {
  props: {
    message: {
      type: String,
      default: '(No message)'
    }
  },
  template: `
    <h1>This is B-Component: Hello {{ message }}</h1>
  `
}

window.renderBComponent = (el, options) => {
  new Vue({
    el,
    render(h) {
      return h(BComponent, {
        props: options
      })
    }
  })
}