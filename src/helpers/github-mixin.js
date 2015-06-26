import app from 'ampersand-app'

export default {
  ajaxConfig () {
    return {
      headers: {
        AUthorization: 'token ' + app.me.token
      }
    };
  }
}