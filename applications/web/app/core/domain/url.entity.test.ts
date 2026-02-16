import { describe, it, expect } from "vitest";
import { Url } from "./url.entity";

describe("Url Entity", () => {
  it("should create a new Url instance with 0 clicks by default", () => {
    const now = new Date();
    const url = new Url("1", "abc", "https://google.com", now);

    expect(url.id).toBe("1");
    expect(url.code).toBe("abc");
    expect(url.originalUrl).toBe("https://google.com");
    expect(url.createdAt).toBe(now);
    expect(url.clicks).toBe(0);
  });

  it("should increment clicks", () => {
    const url = new Url("1", "abc", "https://google.com", new Date());
    url.incrementClicks();
    expect(url.clicks).toBe(1);
    url.incrementClicks();
    expect(url.clicks).toBe(2);
  });
});
