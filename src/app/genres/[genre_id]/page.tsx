import Navigation from "@/components/Navigation/Navigation";
import Movies from "@/components/Movies/Movies";

export default async function Home({
    params,
  }: {
    params: Promise<{ genre_id: string }>;
  }) {

  return (
    <div>
      <Navigation />
      <Movies genre_id={parseInt((await params).genre_id)}/>
    </div>
  );
}
