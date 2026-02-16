import { describe, it, expect, vi } from "vitest";
import { GetUrlStatsUseCase } from "./get-url-stats.use-case";
import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

describe("GetUrlStatsUseCase", () => {
  const mockRepository: UrlRepository = {
    save: vi.fn(),
    findByCode: vi.fn(),
    getAll: vi.fn(),
    update: vi.fn(),
  };

  it("should return all URLs from the repository", async () => {
    const useCase = new GetUrlStatsUseCase(mockRepository);
    const urls = [
      new Url("1", "abc", "https://google.com", new Date()),
      new Url("2", "def", "https://github.com", new Date()),
    ];
    vi.mocked(mockRepository.getAll).mockResolvedValue(urls);

    const result = await useCase.execute();

    expect(result).toBe(urls);
    expect(result).toHaveLength(2);
    expect(mockRepository.getAll).toHaveBeenCalled();
  });
});
