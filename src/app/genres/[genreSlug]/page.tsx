import Movies from "@/components/Movies/Movies";

export default async function Home({
  params,
}: {
  params: Promise<{ genreSlug: string }>;
}) {
  const par = await params;
  return (
    <>
      <Movies genre_slug={par.genreSlug} />
    </>
  );
}
