import Link from 'next/link'
import styles from "@/app/[postSlug]/postSlug.module.css";
import {BLOG_TITLE} from "@/constants";

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h2>Page Not Found!</h2>
      <p>Sorry, but this page does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
