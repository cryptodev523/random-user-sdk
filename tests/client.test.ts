import { RandomUserClient } from "../src/client";

describe("RandomUserClient", () => {
  let client: RandomUserClient;

  beforeEach(() => {
    client = new RandomUserClient();
  });

  describe("Success scenarios", () => {
    test("getUsers returns array of users", async () => {
      const users = await client.getUsers({ results: 2 });
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(2);
    });

    test("getUser returns single user", async () => {
      const user = await client.getUser();
      expect(user).toBeDefined();
      expect(user.name).toBeDefined();
    });

    test("helper methods format data correctly", async () => {
      const user = await client.getUser();

      const fullName = client.getFullName(user);
      expect(typeof fullName).toBe("string");

      const address = client.getFormattedAddress(user);
      expect(typeof address).toBe("string");

      const dob = client.getFormattedDateOfBirth(user);
      expect(typeof dob).toBe("string");
    });
  });

  describe("input validation errors", () => {
    test("throws error for negative results", async () => {
      await expect(client.getUsers({ results: -1 })).rejects.toThrow(
        "Results must be a positive integer"
      );
    });

    test("throws error for zero results", async () => {
      await expect(client.getUsers({ results: 0 })).rejects.toThrow(
        "Results must be a positive integer"
      );
    });

    test("throws error for invalid gender", async () => {
      // @ts-expect-error Testing invalid input
      await expect(client.getUsers({ gender: "invalid" })).rejects.toThrow(
        'Gender must be either "male" or "female"'
      );
    });

    test("throws error for invalid nationality", async () => {
      await expect(client.getUsers({ nat: "XX" })).rejects.toThrow(
        "Invalid nationality code"
      );
    });
  });

  describe("API error handling", () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    test("handles network error", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(client.getUsers()).rejects.toThrow(
        "Failed to fetch users: Network error"
      );
    });

    test("handles HTTP error", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
      });

      await expect(client.getUsers()).rejects.toThrow(
        "Failed to fetch users: HTTP error! status: 429"
      );
    });

    test("handles malformed JSON response", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error("Invalid JSON")),
      });

      await expect(client.getUsers()).rejects.toThrow(
        "Failed to fetch users: Invalid JSON"
      );
    });
  });
});
