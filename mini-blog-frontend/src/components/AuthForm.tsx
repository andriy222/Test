"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/src/services/api";
import { authUtils } from "@/src/utils/auth";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const isLogin = type === "login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = isLogin
        ? await authAPI.login({
            email: formData.email,
            password: formData.password,
          })
        : await authAPI.register(formData);

      authUtils.setToken(response.token);
      authUtils.setUser(response.user);

      router.push("/posts");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          `Помилка ${isLogin ? "входу" : "реєстрації"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={isLogin ? styles.formBoxLogin : styles.formBoxRegister}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{isLogin ? "🔑" : "✨"}</span>
        </div>

        <h1 className={styles.title}>
          {isLogin ? "Вхід до системи" : "Створення акаунту"}
        </h1>
        <p className={styles.subtitle}>
          {isLogin
            ? "Введіть свої дані для входу"
            : "Заповніть форму для реєстрації"}
        </p>

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Ім'я</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={styles.input}
                placeholder="Введіть ваше ім'я"
                required={!isLogin}
                minLength={2}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={styles.input}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={styles.input}
              placeholder="Мінімум 6 символів"
              required
              minLength={6}
            />
            {!isLogin && (
              <p className={styles.hint}>Використовуйте цифри та букви</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={
              isLogin ? styles.submitButtonLogin : styles.submitButtonRegister
            }
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                {isLogin ? "Вхід..." : "Реєстрація..."}
              </>
            ) : (
              <>{isLogin ? "Увійти" : "Зареєструватися"}</>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          {isLogin ? (
            <p>
              Немає акаунту?{" "}
              <Link href="/register" className={styles.link}>
                Зареєструватися
              </Link>
            </p>
          ) : (
            <p>
              Вже є акаунт?{" "}
              <Link href="/login" className={styles.link}>
                Увійти
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
