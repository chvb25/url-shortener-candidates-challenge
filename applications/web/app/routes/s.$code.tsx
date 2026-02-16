import { redirect } from "react-router";
import type { Route } from "./+types/s.$code";
import { PrismaUrlRepository } from "../core/infrastructure/prisma-url.repository";
import { GetUrlByCodeUseCase } from "../core/application/get-url-by-code.use-case";

export async function loader({ params }: Route.LoaderArgs) {
  const { code } = params;

  if (!code) {
    throw new Response("Bad Request", { status: 400 });
  }

  try {
    const repository = new PrismaUrlRepository();
    const getUrlUseCase = new GetUrlByCodeUseCase(repository);
    
    const url = await getUrlUseCase.execute(code);

    if (!url) {
      throw new Response("Short Link Not Found", { status: 404 });
    }

    return redirect(url.originalUrl);
  } catch (err) {
    if (err instanceof Response) throw err;
    
    console.error(err);
    throw new Response("Internal Server Error", { status: 500 });
  }
}
