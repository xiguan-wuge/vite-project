import { hello, foo, bar } from "./hello";

describe('should get hello world', () => {
  // 预处理操作-all
  beforeAll(() => {
    console.log('before All')
  })

  // 预处理-each
  beforeEach(() => {
    console.log('beforeEach')
  })

  test('is foo',() => {
    expect(foo()).toBeTruthy()// 测试返回truthy
  })

  test('is bar', () => {
    expect(bar()).toBeFalsy() // 测试返回falsy
  })
  test('is hello', () => {
    expect(hello()).toBe('hello world!2')
  })

  // 后处理-all 
  afterAll(() => {
    console.log('afterAll')
  })
  // 后处理Each
  afterEach(() => {
    console.log('after Each')
  })
})