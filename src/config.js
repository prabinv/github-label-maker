const config = {
  'localhost': {
      clientId: '9343e05c1b9f8a6a2c2a',
      authUrl: 'https://pvlabelr.herokuapp.com/authenticate/'
    },
    'important-amusement.surge.sh': {
      clientId: '784db8a5c18dae9b01e4',
      authUrl: 'https://pvlablr-prod.herokuapp.com/authenticate/'
    }
}[window.location.hostname]

export default config