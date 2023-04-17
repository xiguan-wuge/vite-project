import {testTimeout, testPromise}from './asyncHello'

describe('test asyncHello', () => {
  test('test setTimeout', () => {
    testTimeout('world', (res) => {
      expect(res).toBe('hello world')
      // done()
    })
  })

  test('test promise', () => {
    // expect.assertions(1) // 确保至少有一个断言被调用，否则测试失败
    return testPromise('world').then(res => {
      expect(res).toBe('hello world')
    })
  })
})
