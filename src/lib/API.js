import Store from './Store'
import config from '../config'

const ENDPOINT = config.endpoint

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
      headers = {'Authorization': 'Bearer ' + token }
      if (this.authenticatedCount !== -1) {
        this.authenticatedCount--
      }
    }
    // Add defaults, authentication, then user overrides
    let allHeaders = Object.assign({}, this.defaultHeaders, headers ||  {}, extraHeaders)
    return allHeaders
  }

  authenticated() {
    if (this.authenticatedCount === -1) {
      this.logger.error('This client is always authenticated. Do not call the authenticated method')
      return this
    }
    this.authenticatedCount++
    return this
  }

  async request({ endpoint, headers, body, method }) {
    try {
      let completeResponse = await fetch(endpoint, {
        method,
        headers,
        body,
      })
      let resp = await completeResponse.json()
      if (!completeResponse.ok) {
        return { resp: null, error: new Error(resp.statusText) }
      }
      return { resp, error: null }
    } catch (error) {
      this.logger.log('Request failed with error: ', error)
      return { resp: null, error }
    }
  }

  async get({ endpoint, headers }) {
    return this.request({
      endpoint: ENDPOINT  + endpoint,
      method: 'GET',
      headers: await this.headers(headers),
    }) 
  }

  async delete({ endpoint, headers }) {
    return this.request({
      endpoint: ENDPOINT  + endpoint,
      method: 'DELETE',
      headers: await this.headers(headers),
    }) 
  }

  async put({ endpoint, headers, body }) {
    return this.request({
      endpoint: ENDPOINT  + endpoint,
      method: 'PUT',
      headers: await this.headers(headers),
      body: JSON.stringify(body)
    }) 
  }

  async post({ endpoint, headers, body }) {
    return this.request({ 
      endpoint: ENDPOINT  + endpoint,
      method: 'POST',
      headers: await this.headers(headers),
      body: JSON.stringify(body)
    })
  }
}