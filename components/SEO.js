import Head from "next/head";

export default function SEO({
  title = "AI Nutrition Coach",
  description = "مربی هوشمند تغذیه با Next.js — رژیم، کالری و برنامه شخصی.",
}) {
  const fullTitle = title ? `${title} | AI Nutrition Coach` : "AI Nutrition Coach";
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
