import DisplayedMovie from "@/components/DisplayedMovie/DisplayedMovie";

export default async function Home({
  params,
}: {
  params: Promise<{ movieSlug: string }>;
}) {
  return (
    <>
      <DisplayedMovie movieSlug={(await params).movieSlug} />
    </>
  );
}
