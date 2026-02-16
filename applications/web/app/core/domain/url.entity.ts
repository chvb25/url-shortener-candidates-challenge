export class Url {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly originalUrl: string,
    public readonly createdAt: Date,
    public clicks: number = 0
  ) {}

  public incrementClicks(): void {
    this.clicks += 1;
  }
}
