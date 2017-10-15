import fetchMock from 'fetch-mock'
import API from './API'

describe('API', () => {
  describe('verbs', () => {
    it('should include get', async () => {
      fetchMock.get('http://localhost:3000/yo', {hello: 'world'})
      let { resp, error } = await API.build().get({endpoint: '/yo'})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })
    it('should include post', async () => {
      fetchMock.post((url, options) => {
        let parsedBody = JSON.parse(options.body)
        return parsedBody.yo === "dawg" && 'http://localhost:3000/yo' === url
      }, {hello: 'world'})
      let { resp, error } = await API.build().post({endpoint: '/yo', body: {yo: 'dawg'}})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })
    it('should include put', async () => {
      fetchMock.put((url, options) => {
        let parsedBody = JSON.parse(options.body)
        return parsedBody.yo === "dawg" && 'http://localhost:3000/yo' === url
      }, {hello: 'world'})
      let { resp, error } = await API.build().put({endpoint: '/yo', body: {yo: 'dawg'}})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })

    it('should include delete', async () => {
      fetchMock.delete('http://localhost:3000/yo', {hello: 'world'})
      let { resp, error } = await API.build().delete({endpoint: '/yo', body: {yo: 'dawg'}})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })
  })

  describe('headers', () => {
    it('should add default headers', async () => {
      fetchMock.get((url, options) => {
        return (options.headers['Accept'] === 'application/json' && 
          options.headers['Content-Type'] === 'application/json' &&
          options.headers['X-Example'] === 'winning')
      }, {hello: 'world'})

      let { resp, error } = await API.build({defaultHeaders: {'X-Example': 'winning'}}).get({endpoint: '/yo'})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })

    it('should let the call overwrite the defaults', async () => {
      // Ensure the defaults  can get  overwritten
      fetchMock.get((url, options) => {
        return (options.headers['Accept'] === 'application/json' && 
          options.headers['Content-Type'] === 'application/json' &&
          options.headers['X-Example'] === 'loosing')
      }, {hello: 'world'})

      let api = API
        .build({defaultHeaders: {'X-Example': 'winning'}})
      let { resp, error } = await api.get({endpoint: '/yo', headers: { 'X-Example': 'loosing'}})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()

      // Ensure the defaults stay there for the entire time
      fetchMock.get((url, options) => {
        return (options.headers['Accept'] === 'application/json' && 
          options.headers['Content-Type'] === 'application/json' &&
          options.headers['X-Example'] === 'winning')
      }, {hello: 'world'})
      let secondRsp = await api.get({endpoint: '/yo'})
      expect(secondRsp.resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })
  })

  describe('authentication', () => {
    it('should add the correct authentication header', async () => {
      let api = API.build({authenticationStore: { getAuthenticationToken: () => { return '12345'}}})
      fetchMock.get((url, options) => {
        return options.headers['Authentication'] === 'Bearer 12345'
      }, {hello: 'world'})
      let { resp, error } = await api.authenticated().get({endpoint: '/yo'})
      expect(resp).toEqual({hello: 'world'})
      fetchMock.restore()

      // It should only add it for that on request
      fetchMock.get((url, options) => {
        // We don't want an authentication header
        return options.headers['Authentication'] === undefined
      }, {hello: 'world'})
      let secondRsp = await api.get({endpoint: '/yo'})
      expect(secondRsp.resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })

    it('should allow always authenticated settings', async () => {
      let logger = {error: () => {}}  // Avoids error message
      let api = API.build({
        authenticationStore: { getAuthenticationToken: () => { return '12345'}},
        alwaysAuthenticate: true, 
        logger,
      })

      fetchMock.get((url, options) => {
        return options.headers['Authentication'] === 'Bearer 12345'
      }, {hello: 'world'})
      let { resp, error } = await api.get({endpoint: '/yo'})
      expect(resp).toEqual({hello: 'world'})

      let secondRsp = await api.authenticated().get({endpoint: '/yo'})
      expect(secondRsp.resp).toEqual({hello: 'world'})
      fetchMock.restore()
    })
  })
})