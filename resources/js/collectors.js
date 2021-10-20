import helpers from './helper'

const plugin = {
    install (app) {
      app.config.globalProperties.foo = helpers
    }
}

export default plugin;

