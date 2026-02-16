import { describe, it, expect, vi } from "vitest";
import { ShortenUrlUseCase } from "./shorten-url.use-case";
import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

describe("ShortenUrlUseCase", () => {
  const mockRepository: UrlRepository = {
    save: vi.fn(),
    findByCode: vi.fn(),
    getAll: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate a 7-character code and save the URL", async () => {
    const useCase = new ShortenUrlUseCase(mockRepository);
    vi.mocked(mockRepository.findByCode).mockResolvedValue(null);

    const originalUrl = "https://example.com";
    const result = await useCase.execute(originalUrl);

    expect(result.originalUrl).toBe(originalUrl);
    expect(result.code).toHaveLength(7);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it("should retry code generation if code already exists", async () => {
    const useCase = new ShortenUrlUseCase(mockRepository);
    
    // First call returns an existing URL, second returns null (unique)
    vi.mocked(mockRepository.findByCode)
      .mockResolvedValueOnce(new Url("1", "exists", "url", new Date()))
      .mockResolvedValueOnce(null);

    const result = await useCase.execute("https://example.com");

    expect(result.code).toHaveLength(7);
    expect(mockRepository.findByCode).toHaveBeenCalledTimes(2);
  });

  it("should throw error for non-HTTP(S) protocols", async () => {
    const useCase = new ShortenUrlUseCase(mockRepository);
    await expect(useCase.execute("ftp://example.com")).rejects.toThrow("Only HTTP and HTTPS protocols are supported");
    // URL constructor might fail for javascript: or it might just parse as protocol: "javascript:"
    await expect(useCase.execute("javascript:alert(1)")).rejects.toThrow();
  });

  it("should throw error for localhost or 127.0.0.1", async () => {
    const useCase = new ShortenUrlUseCase(mockRepository);
    await expect(useCase.execute("http://localhost:3000")).rejects.toThrow("Shortening local URLs is not allowed");
    await expect(useCase.execute("https://127.0.0.1/abc")).rejects.toThrow("Shortening local URLs is not allowed");
  });
});
