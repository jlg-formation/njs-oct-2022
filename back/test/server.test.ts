import assert from "assert";
import axios from "axios";
import { WebServer } from "../src/WebServer";

const port = +(process.env.TEST_PORT || 3555);

describe("WebServer", () => {
  it("should start, verify, stop the server", async () => {
    const server = new WebServer({ port: port });
    await server.start();
    const response = await axios.get(`http://localhost:${port}/api/ping`, {
      validateStatus: () => true,
    });
    assert.strictEqual(response.status, 200);
    await server.stop();
    let error;
    try {
      await axios.get(`http://localhost:${port}/api/ping`);
    } catch (err) {
      error = err;
    }
    assert(error);
  });
});
