import test from 'node:test'
import assert from 'node:assert'
import { buildApp } from '../app.js'

test('GET /health responds with ok equals to true', async () => {
  const app = buildApp()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.json.ok, true)
})

test('GET unknown path', async () => {
  const app = buildApp()

  const response = await app.inject({
    method: 'GET',
    url: '/unknown'
  })

  assert.strictEqual(response.statusCode, 404)
})