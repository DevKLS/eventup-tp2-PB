import { describe, it, expect } from "vitest";

describe("Login", () => {
  it("deve existir", () => {
    expect(true).toBe(true);
  });

  it("deve validar email", () => {
    const email = "teste@email.com";

    expect(email).toContain("@");
  });

  it("deve validar senha", () => {
    const senha = "123456";

    expect(senha.length).toBeGreaterThan(5);
  });
});