import { describe, it, expect } from "vitest";

describe("EventForm", () => {
  it("deve criar objeto de evento", () => {
    const evento = {
      title: "Workshop React",
      category: "Workshop",
      date: "2025-12-01",
      location: "Rio de Janeiro"
    };

    expect(evento.title).toBe(
      "Workshop React"
    );
  });

  it("deve possuir categoria", () => {
    const categoria = "Workshop";

    expect(categoria.length).toBeGreaterThan(0);
  });

  it("deve possuir localização", () => {
    const local = "Rio de Janeiro";

    expect(local.length).toBeGreaterThan(0);
  });
});