import DisplayedMovie from "@/components/DisplayedMovie/DisplayedMovie";

export default async function Home({
  params,
}: {
  params: Promise<{ movieSlug: string }>;
}) {
  const par = await params;
  return (
    <>
      <DisplayedMovie movieSlug={par.movieSlug} />
    </>
  );
}
