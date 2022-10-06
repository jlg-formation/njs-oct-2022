import assert from "assert";
import { RAMService } from "../src/services/RAMService";

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it("should instantiate a service", function () {
      const service = RAMService.getInstance("toto");
      assert.ok(service instanceof RAMService);
    });
  });
});
