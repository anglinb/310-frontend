import Store from './Store'

const ENDPOINT = process.env.BUILD_ENDPOINT || 'http://localhost:3000'

export default class API {
  constructor({ authenticationStore, defaultHeaders, alwaysAuthenticate, logger }) {
    // -1 is a magic number that will always authenticate requests
    this.authenticatedCount =  alwaysAuthenticate === true ? -1 : 0  

    this.defaultHeaders = Object.assign({}, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, defaultHeaders)

    this.authenticationStore = authenticationStore || Store.authenticationStore()
    this.authenticated = this.authenticated.bind(this)
    this.logger = logger || console
  }

  static build(props) {
    return new API(props || {})
  }

  async headers(extraHeaders) {
    let headers
    if (this.authenticatedCount > 0 || this.authenticatedCount == -1){
      // Loads the authentication token from the store
      let token = await this.authenticationStore.getAuthenticationToken()
      headers = {'Authentication': 'Bearer ' + token }
      if (this.authenticatedCount !== -1) {
        this.authenticatedCount--
      }
    }
    // Add defaults, authentication, then user overrides
    return Object.assign({}, this.defaultHeaders, headers ||  {}, extraHeaders)
  }

  authenticated() {
    if (this.authenticatedCount === -1) {
      this.logger.error('This client is always authenticated. Do not call the authenticated method')
      return this
    }
    this.authenticatedCount++
    return this
  }

  async get({ endpoint, headers }) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'GET',
      headers: await this.headers(headers),
    }) 
    let payload = await resp.json()    
    return payload
  }

  async delete({ endpoint, headers }) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'DELETE',
      headers: await this.headers(headers),
    }) 
    let payload = await resp.json()    
    return payload
  }

  async put({ endpoint, headers, body }) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'PUT',
      headers: await this.headers(headers),
      body: JSON.stringify(body)
    }) 
    let payload = await resp.json()    
    return payload
  }

  async post({ endpoint, headers, body }) {
    let resp = await fetch(ENDPOINT  + endpoint, {
      method: 'POST',
      headers: await this.headers(headers),
      body: JSON.stringify(body)
    })
    let payload = await resp.json()    
    return payload
  }
}