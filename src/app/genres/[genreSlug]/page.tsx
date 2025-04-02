import Movies from "@/components/Movies/Movies";

export default async function Home({
  params,
}: {
  params: Promise<{ genreSlug: string }>;
}) {
  return (
    <>
      <Movies genre_slug={(await params).genreSlug} />
    </>
  );
}
