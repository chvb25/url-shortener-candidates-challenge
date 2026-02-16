import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(originalUrl: string): Promise<Url> {
    this.validateUrl(originalUrl);

    const code = await this.generateUniqueCode();
    const id = crypto.randomUUID();
    const url = new Url(id, code, originalUrl, new Date(), 0);
    
    await this.urlRepository.save(url);
    return url;
  }

  private validateUrl(url: string): void {
    try {
      const parsedUrl = new URL(url);
      
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error("Only HTTP and HTTPS protocols are supported.");
      }

      const hostname = parsedUrl.hostname.toLowerCase();
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        throw new Error("Shortening local URLs is not allowed.");
      }
    } catch (err) {
      if (err instanceof Error && (err.message.includes("protocol") || err.message.includes("local"))) {
        throw err;
      }
      throw new Error("Please provide a valid URL.");
    }
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
