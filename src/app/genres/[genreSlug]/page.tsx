import Navigation from "@/components/Navigation/Navigation";
import Movies from "@/components/Movies/Movies";

export default async function Home({
    params,
  }: {
    params: Promise<{ genreSlug: string }>;
  }) {

  return (
    <div>
      <Navigation />
      <Movies genre_slug={(await params).genreSlug}/>
    </div>
  );
}
