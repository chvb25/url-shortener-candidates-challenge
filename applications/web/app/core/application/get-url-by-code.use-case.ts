import type { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

export class GetUrlByCodeUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(code: string): Promise<Url | null> {
    const url = await this.urlRepository.findByCode(code);
    
    if (url) {
      url.incrementClicks();
      await this.urlRepository.update(url);
    }

    return url;
  }
}
