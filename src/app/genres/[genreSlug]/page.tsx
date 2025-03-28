import Navigation from "@/components/Navigation/Navigation";
import Movies from "@/components/Movies/Movies";
import Footer from "@/components/Footer/Footer";

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
