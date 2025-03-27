import DisplayedMovie from "@/components/DisplayedMovie/DisplayedMovie";
import Navigation from "@/components/Navigation/Navigation";

export default async function Home({
    params,
  }: {
    params: Promise<{ movieSlug: string }>;
  }) {

  return (
    <div>
      <Navigation />
      <DisplayedMovie movieSlug={(await params).movieSlug}/>
    </div>
  );
}
