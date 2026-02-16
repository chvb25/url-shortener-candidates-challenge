import { describe, it, expect, vi } from "vitest";
import { GetUrlByCodeUseCase } from "./get-url-by-code.use-case";
import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

describe("GetUrlByCodeUseCase", () => {
  const mockRepository: UrlRepository = {
    save: vi.fn(),
    findByCode: vi.fn(),
    getAll: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the URL and increment clicks if found", async () => {
    const useCase = new GetUrlByCodeUseCase(mockRepository);
    const existingUrl = new Url("1", "abc", "https://google.com", new Date(), 5);
    vi.mocked(mockRepository.findByCode).mockResolvedValue(existingUrl);

    const result = await useCase.execute("abc");

    expect(result).toBe(existingUrl);
    expect(existingUrl.clicks).toBe(6);
    expect(mockRepository.update).toHaveBeenCalledWith(existingUrl);
  });

  it("should return null if URL not found", async () => {
    const useCase = new GetUrlByCodeUseCase(mockRepository);
    vi.mocked(mockRepository.findByCode).mockResolvedValue(null);

    const result = await useCase.execute("nonexistent");

    expect(result).toBeNull();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});
