import { useLoaderData } from "react-router";
import { PrismaUrlRepository } from "../core/infrastructure/prisma-url.repository";
import { GetUrlStatsUseCase } from "../core/application/get-url-stats.use-case";
import { Layout } from "../components/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/card";

export async function loader() {
  const repository = new PrismaUrlRepository();
  const getStatsUseCase = new GetUrlStatsUseCase(repository);
  const urls = await getStatsUseCase.execute();

  return { 
    urls: urls.map(url => ({
      ...url,
      createdAt: url.createdAt.toISOString()
    }))
  };
}

export default function StatsPage() {
  const { urls } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Link Analytics</h1>
          <p className="text-slate-500 mt-2">Monitor the performance of all your shortened URLs.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Links</CardTitle>
            <CardDescription>A list of all URLs created and their engagement metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-slate-100">
                  <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-100">
                    <th className="h-12 px-4 text-left align-middle font-semibold text-slate-900">Short Code</th>
                    <th className="h-12 px-4 text-left align-middle font-semibold text-slate-900">Original URL</th>
                    <th className="h-12 px-4 text-center align-middle font-semibold text-slate-900">Clicks</th>
                    <th className="h-12 px-4 text-right align-middle font-semibold text-slate-900">Created At</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {urls.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500 italic">No links shortened yet.</td>
                    </tr>
                  ) : (
                    urls.map((url) => (
                      <tr key={url.id} className="border-b transition-colors hover:bg-slate-50/50">
                        <td className="p-4 align-middle">
                          <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-medium">/{url.code}</code>
                        </td>
                        <td className="p-4 align-middle font-medium max-w-xs truncate">
                          <a href={url.originalUrl} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                            {url.originalUrl}
                          </a>
                        </td>
                        <td className="p-4 align-middle text-center">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                            {url.clicks}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right text-slate-500 text-xs">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
