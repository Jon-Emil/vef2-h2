import Navigation from "@/components/Navigation/Navigation";
import Movies from "@/components/Movies/Movies";
import MoviesForGenre from "@/components/MoviesForGenre/MoviesForGenre";



export default async function Home({
    params,
  }: {
    params: Promise<{ genre_id: string }>;
  }) {

  return (
    <div>
      <Navigation />
      <MoviesForGenre genre_id={parseInt((await params).genre_id)}/>
    </div>
  );
}
