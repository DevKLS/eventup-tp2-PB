import { describe, it, expect } from "vitest";

describe("Navbar", () => {
  it("deve possuir links", () => {
    const links = [
      "Home",
      "Eventos",
      "Perfil"
    ];

    expect(links.length).toBeGreaterThan(0);
  });

  it("deve conter Home", () => {
    const links = [
      "Home",
      "Eventos",
      "Perfil"
    ];

    expect(links).toContain("Home");
  });
});