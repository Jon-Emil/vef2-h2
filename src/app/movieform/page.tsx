import Navigation from '@/components/Navigation/Navigation';
import styles from "../page.module.css";
import MovieForm from '@/components/MovieForm/MovieForm';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <MovieForm />
    </div>
  );
}