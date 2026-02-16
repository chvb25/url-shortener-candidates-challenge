import { Form, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/_index";
import { PrismaUrlRepository } from "../core/infrastructure/prisma-url.repository";
import { ShortenUrlUseCase } from "../core/application/shorten-url.use-case";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/card";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kabilio | Smart URL Shortener" },
    { name: "description", content: "Shorten your long links into smart, manageable URLs with ease." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const url = formData.get("url") as string;

  if (!url) {
    return { error: "Please provide a valid URL." };
  }

  try {
    const repository = new PrismaUrlRepository();
    const shortenUseCase = new ShortenUrlUseCase(repository);
    try {
      const domainUrl = await shortenUseCase.execute(url);
      return {
        shortenedUrl: `${new URL(request.url).origin}/s/${domainUrl.code}`
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to shorten URL"
      };
    }
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.shortenedUrl) {
      toast.success("Link shortened successfully!", {
        description: "You can now share your shortened URL.",
      });
    }
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-12 sm:mt-20">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Shorten your <span className="text-blue-600">long links</span>
          </h1>
          <p className="text-lg text-slate-600">
            Kabilio helps you create clean, professional, and trackable short links in seconds.
          </p>
        </div>

        <Card className="shadow-xl border-slate-200/60 overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle>Create reaching links</CardTitle>
            <CardDescription>Paste your long URL below to get your shortened version.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Form method="post" className="space-y-6">
              <Input
                name="url"
                type="url"
                placeholder="https://example.com/very-long-url-to-shorten"
                required
                label="Destination URL"
                autoComplete="off"
                error={actionData?.error}
              />
              <Button 
                type="submit" 
                className="w-full" 
                isLoading={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Shortening..." : "Shorten URL"}
              </Button>
            </Form>
          </CardContent>
          {actionData?.shortenedUrl && !isSubmitting && (
            <CardFooter className="bg-blue-50/50 border-t border-blue-100 flex-col items-start gap-4 p-6">
              <div className="w-full">
                <p className="text-sm font-semibold text-blue-900 mb-2 uppercase tracking-wider">Success! Your link is ready:</p>
                <div className="flex items-center gap-2 w-full p-3 bg-white border border-blue-200 rounded-lg shadow-inner">
                  <span className="flex-1 font-mono text-sm text-slate-700 truncate">
                    {actionData.shortenedUrl}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(actionData.shortenedUrl!);
                      toast.info("Copied to clipboard!");
                    }}
                    className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <p className="text-xs text-blue-600/80 italic text-center w-full">
                Share this link anywhere to track its performance.
              </p>
            </CardFooter>
          )}
        </Card>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4">
                <div className="text-blue-600 font-bold text-xl mb-1">Simple</div>
                <p className="text-sm text-slate-500">No complex setup. Just paste and go.</p>
            </div>
            <div className="p-4 border-slate-200 sm:border-x">
                <div className="text-blue-600 font-bold text-xl mb-1">Secure</div>
                <p className="text-sm text-slate-500">Safe and reliable link management.</p>
            </div>
            <div className="p-4">
                <div className="text-blue-600 font-bold text-xl mb-1">Fast</div>
                <p className="text-sm text-slate-500">Optimized for speed and minimal latency.</p>
            </div>
        </div>
      </div>
    </Layout>
  );
}
