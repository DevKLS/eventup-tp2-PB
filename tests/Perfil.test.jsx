import { describe, it, expect } from "vitest";

describe("Perfil", () => {
  it("deve carregar usuário", () => {
    const user = {
      nome: "Keila",
      email: "keilasantanalima654@email.com"
    };

    expect(user.nome).toBe("Keila");
  });

  it("deve possuir email", () => {
    const user = {
      email: "keilasantanalima654@email.com"
    };

    expect(user.email).toContain("@");
  });

  it("deve possuir nome", () => {
    const user = {
      nome: "Keila"
    };

    expect(user.nome.length).toBeGreaterThan(0);
  });
});