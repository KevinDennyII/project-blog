import Link from 'next/link'
import styles from "@/app/[postSlug]/postSlug.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h2>Page Not Found!</h2>
      <p>Sorry, but this page does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
