const ENDPOINT = 'http://localhost:3000'

export default class API {
  constructor() {
    this.authenticated = false 

    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    this.authenticated = this.authenticated.bind(this)
  }

  headers() {
    headers = {}
    if (this.authenticated){
      // TODO: Load token here
      headers = {'Authentication': 'Bearer ' + 'token'}
    }
    return Object.assign({}, this.headers, headers)
  }

  authenticated() {
    this.authenticated = true
    return this
  }

  async get({endpoint, headers, body}) {

    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'PUT',
      headers: this.headers()
      body: JSON.stringify(body)
    }) 
    let payload = await resp.json()    
    return payload
  }

  async put({endpoint, headers, body}) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'PUT',
      headers: this.headers()
      body: JSON.stringify(body)
    }) 
    let payload = await resp.json()    
    return payload
  }

  async post({endpoint, headers, body}) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'POST',
      headers: this.headers()
      body: JSON.stringify(body)
    })
    let payload = await resp.json()    
    return payload
  }
}