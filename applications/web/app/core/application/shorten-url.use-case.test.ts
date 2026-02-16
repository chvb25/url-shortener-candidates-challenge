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
});
