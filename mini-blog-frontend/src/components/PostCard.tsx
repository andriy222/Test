"use client";

import { Post } from "@/src/types";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.postDate}>
          <span className={styles.dateIcon}>📅</span>
          {formatDate(post.createdAt)}
        </div>
      </div>

      <p className={styles.postContent}>{post.content}</p>

      <div className={styles.postFooter}>
        <button
          onClick={() => onDelete(post.id)}
          className={styles.deleteButton}
        >
          🗑️ Видалити
        </button>
      </div>
    </div>
  );
}
