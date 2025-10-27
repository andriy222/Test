"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../types";
import { authUtils } from "../utils/auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsAuthenticated(authUtils.isAuthenticated());
    setUser(authUtils.getUser());
  }, [pathname]);

  const handleLogout = () => {
    authUtils.logout();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Міні-блог</span>
        </Link>

        <div className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <div className={styles.userInfo}>
                <span className={styles.userIcon}>👋</span>
                <span className={styles.userName}>{user?.name}</span>
              </div>
              <Link href="/posts" className={styles.linkButton}>
                Мої пости
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.linkButton}>
                Вхід
              </Link>
              <Link href="/register" className={styles.registerButton}>
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
