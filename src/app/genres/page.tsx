import Navigation from "@/components/Navigation/Navigation";
import styles from "./page.module.css";
import Genre from "@/components/Genre/Genre";



export default async function Home() {

  return (
    <div className={styles.page}>
      <Navigation />
      <Genre />
    </div>
  );
}
