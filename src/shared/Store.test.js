import  { mock as mockAsyncStorage, release as releaseAsyncStorage } from 'mock-async-storage'
import { AsyncStorage } from 'react-native'
import Store from './Store'


describe('Store', () => {

  beforeAll(() => {
    mockAsyncStorage()
  })

  afterAll(() => {
    releaseAsyncStorage()
  })

  describe('Authentication token', () => {
    let store 
    beforeEach(async () =>{
      store = Store.authenticationStore()
      return AsyncStorage.clear()
    })

    it('should return null when no token is present', async () => {
      let token = await store.getAuthenticationToken()
      expect(token).toBeUndefined()
    })

    it('should return the token after setting', async () => {
      await store.setAuthenticationToken('123456')
      let token = await store.getAuthenticationToken()
      expect(token).toEqual('123456')
    })

    it('should remove the token', async () => {
      await store.setAuthenticationToken('123456')
      let token = await store.getAuthenticationToken()
      expect(token).toEqual('123456')
      await store.removeAuthenticationToken()
      let deletedToken = await store.getAuthenticationToken()
      expect(deletedToken).toBeUndefined
    })
  })
})