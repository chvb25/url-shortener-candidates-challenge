import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(originalUrl: string): Promise<Url> {
    const code = await this.generateUniqueCode();
    const id = crypto.randomUUID();
    const url = new Url(id, code, originalUrl, new Date(), 0);
    
    await this.urlRepository.save(url);
    return url;
  }

  private async generateUniqueCode(): Promise<string> {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    let isUnique = false;

    while (!isUnique) {
      code = "";
      for (let i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const existing = await this.urlRepository.findByCode(code);
      if (!existing) {
        isUnique = true;
      }
    }

    return code;
  }
}
