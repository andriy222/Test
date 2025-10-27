"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "@/src/utils/auth";
import { Post } from "@/src/types";
import { postsAPI } from "@/src/services/api";
import PostCard from "@/src/components/PostCard";
import styles from "./posts.module.css";

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push("/login");
      return;
    }

    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts();
      setPosts(response.posts);
    } catch (err: any) {
      setError("Помилка завантаження постів");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await postsAPI.createPost(formData);
      setFormData({ title: "", content: "" });
      setShowForm(false);
      loadPosts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Помилка створення поста");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей пост?")) {
      return;
    }

    try {
      await postsAPI.deletePost(id);
      loadPosts();
    } catch (err: any) {
      setError("Помилка видалення поста");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Завантаження постів...</p>
      </div>
    );
  }

  return (
    <div className={styles.postsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.headerIcon}>📚</span>
            <h1>Мої пости</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? styles.cancelButton : styles.createButton}
          >
            {showForm ? " Скасувати" : " Створити пост"}
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {showForm && (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <span className={styles.formIcon}>✍️</span>
              <h2>Новий пост</h2>
            </div>
            <form onSubmit={handleCreatePost} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Заголовок</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={styles.input}
                  placeholder="Введіть заголовок поста..."
                  required
                  minLength={3}
                  maxLength={200}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Текст</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className={styles.textarea}
                  placeholder="Напишіть ваш пост..."
                  required
                  minLength={10}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                🚀 Опублікувати
              </button>
            </form>
          </div>
        )}

        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h2 className={styles.emptyTitle}>Поки що немає постів</h2>
            <p className={styles.emptyText}>
              Створіть свій перший пост, натиснувши кнопку вище
            </p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
