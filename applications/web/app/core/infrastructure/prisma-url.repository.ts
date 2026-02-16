import { prisma } from "../../db/client";
import { Url } from "../domain/url.entity";
import type { UrlRepository } from "../domain/url.repository";

export class PrismaUrlRepository implements UrlRepository {
  async save(url: Url): Promise<void> {
    await prisma.link.create({
      data: {
        id: url.id,
        code: url.code,
        originalUrl: url.originalUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
      },
    });
  }

  async findByCode(code: string): Promise<Url | null> {
    const prismaLink = await prisma.link.findUnique({
      where: { code },
    });

    if (!prismaLink) return null;

    return this.mapToDomain(prismaLink);
  }

  async getAll(): Promise<Url[]> {
    const prismaLinks = await prisma.link.findMany();
    return prismaLinks.map((link) => this.mapToDomain(link));
  }

  async update(url: Url): Promise<void> {
    await prisma.link.update({
      where: { id: url.id },
      data: {
        clicks: url.clicks,
        originalUrl: url.originalUrl,
      },
    });
  }

  private mapToDomain(prismaLink: {
    id: string;
    code: string;
    originalUrl: string;
    createdAt: Date;
    clicks: number;
  }): Url {
    return new Url(
      prismaLink.id,
      prismaLink.code,
      prismaLink.originalUrl,
      prismaLink.createdAt,
      prismaLink.clicks
    );
  }
}
