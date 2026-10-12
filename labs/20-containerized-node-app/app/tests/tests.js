import { test } from 'node:test'
import assert from 'node:assert'
import { buildApp } from '../app.js'


test('GET tests', async (t) => {
  let app;

  try {
    app = await buildApp();

    await t.test('GET health returns 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health'
      });

      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    });

    await t.test('Unknown path 404', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/unknown'
      });

      assert.strictEqual(response.statusCode, 404);
    });

  } finally {
    if (app) {
      await app.close();
    }
  }
});