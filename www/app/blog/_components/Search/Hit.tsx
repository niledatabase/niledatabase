import Link from "next/link";
import Image from "next/image";
import { Authors } from "../Authors";
import { Metadata } from "../Metadata";
import Coffee from "@/public/blog/coffee.webp";
import styles from "../../blog.module.css";

export default function Hit({ hit }: any) {
  const [publishDate] = /\d{4}-\d{2}-\d{2}/.exec(hit.objectID) ?? "";
  const cleaned = hit.objectID.replace(/\d{4}-\d{2}-\d{2}-/, "");
  const slug = cleaned.replace(".mdx", "");
  return (
    <div className={styles.postCard}>
      <div className={styles.postCardInner}>
        <Link href={`/blog/${slug}`}>
          <div className={styles.postImageContainer}>
            {hit?.image ? (
              <Image
                className={styles.postImage}
                priority
                alt={hit.image}
                data-image-zoom-disabled
                width={416}
                height={242}
                src={`/blog/${hit.image}`}
              />
            ) : (
              <Image
                alt="coffee"
                className={styles.postImage}
                data-image-zoom-disabled
                width={416}
                height={216}
                src={Coffee}
              />
            )}
          </div>
          <Metadata
            publishDate={publishDate}
            readLength={hit?.readLength}
            title={hit?.title}
            sizzle={hit?.sizzle}
          />
          <Authors authors={hit?.authors} />
        </Link>
      </div>
    </div>
  );
}
