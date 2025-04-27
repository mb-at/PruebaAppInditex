import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCache, setCache } from '../CacheService'

const KEY = 'my_key'
const VALUE = { foo: 'bar' }
const TTL = 100 // ms

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('CacheService', () => {
  it('almacena y recupera antes de expirar', () => {
    setCache(KEY, VALUE, TTL)
    const cached = getCache(KEY)
    expect(cached).toEqual(VALUE)
  })

  it('expira pasado el TTL', () => {
    setCache(KEY, VALUE, TTL)
    // avanzamos el reloj más allá del TTL
    vi.advanceTimersByTime(TTL + 1)
    const cached = getCache(KEY)
    expect(cached).toBeNull()
  })
})
