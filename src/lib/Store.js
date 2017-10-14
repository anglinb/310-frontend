import { AsyncStorage } from 'react-native'


class PrefixedStore {
  constructor({ prefix = 'MainStorage' }) {
    this.prefix = prefix   
  }

  prefixedKey(key) {
    return `${this.prefix}:${key}`
  }

  /**
   * getPrefixedValue
   * Internal method to get the value stored at a prefixed key 
   * @param {String} key - The key to lookup the value
   */
  async getPrefixedValue(key) {
    return AsyncStorage.getItem(this.prefixedKey(key))
  }

  /**
   * setPrefixedValue
   * Internal method to set the value stored at a prefixed key 
   * @param {String} key - The key to lookup the value
   * @param {String} value - The value to set
   */
  async setPrefixedValue(key, value) {
    return AsyncStorage.setItem(this.prefixedKey(key), value)
  }

  /**
   * removePrefixedValue
   * Internal method to remove the value stored at a prefixed key 
   * @param {String} key - The key to lookup the value
   */
  async removePrefixedValue(key) {
    return AsyncStorage.removeItem(this.prefixedKey(key))
  }
}

class AuthenticationStore extends PrefixedStore {

  AUTHENTICATION_TOKEN_KEY = 'AuthenticationToken'

  constructor(props) {
    super(props)

    this.setAuthenticationToken = this.setAuthenticationToken.bind(this)
    this.getAuthenticationToken = this.getAuthenticationToken.bind(this)
    this.removeAuthenticationToken = this.removeAuthenticationToken.bind(this)
  }

  async getAuthenticationToken() {
    return this.getPrefixedValue(AuthenticationStore.AUTHENTICATION_TOKEN_KEY)
  }

  async setAuthenticationToken(token) {
    return this.setPrefixedValue(AuthenticationStore.AUTHENTICATION_TOKEN_KEY, token)
  }

  async removeAuthenticationToken() {
    return this.removePrefixedValue(AuthenticationStore.AUTHENTICATION_TOKEN_KEY)
  }
}

/**
 * @class Store
 * Store that contains all the factories for creating various information stores 
 */

export default class Store {
  static authenticationStore(){
    return new AuthenticationStore({prefix: '@Authentication'})
  }
}