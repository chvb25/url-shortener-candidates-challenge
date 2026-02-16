import { Url } from "./url.entity";

export interface UrlRepository {
  save(url: Url): Promise<void>;
  findByCode(code: string): Promise<Url | null>;
  getAll(): Promise<Url[]>;
  update(url: Url): Promise<void>;
}
