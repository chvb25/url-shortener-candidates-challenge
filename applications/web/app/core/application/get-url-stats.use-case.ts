import type { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

export class GetUrlStatsUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(): Promise<Url[]> {
    return await this.urlRepository.getAll();
  }
}
