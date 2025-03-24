import Navigation from "@/components/Navigation/Navigation";
import Movies from "@/components/Movies/Movies";
import styles from "./page.module.css";

export default async function Home() {

  return (
    <div className={styles.page}>
      <Navigation />
      <Movies />
    </div>
  );
}
