import assert from "assert";
import axios from "axios";
import { WebServer } from "../src/WebServer";
import { newArticle } from "./data/articles";

describe("CRUD", () => {
  const port = +(process.env.TEST_PORT || 3555);
  const server = new WebServer({ port: port });
  const apiUrl = `http://localhost:${port}/api/roles`;

  before(async () => {
    await server.start();
  });

  after(async () => {
    await server.stop();
  });

  it("should delete all", async () => {
    let response = await axios.post(apiUrl, newArticle);
    assert.strictEqual(response.status, 201);
    response = await axios.delete(apiUrl);
    assert.strictEqual(response.status, 204);
    response = await axios.get(apiUrl);
    assert.strictEqual(JSON.stringify(response.data), "[]");
  });

  it("should create one article", async () => {
    let response = await axios.post(apiUrl, newArticle);
    assert.strictEqual(response.status, 201);
    const id = response.data.id;
    assert(id);
    response = await axios.get(apiUrl + "/" + id);
    assert.strictEqual(response.data.name, newArticle.name);
  });

  it("should not delete because body malformed", async () => {
    const body = { toto: 123 };
    let response = await axios.delete(apiUrl, {
      data: body,
      validateStatus: () => true,
    });
    assert.strictEqual(response.status, 400);
  });
});
