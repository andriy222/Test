"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authUtils } from "../utils/auth";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(authUtils.isAuthenticated());
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Міні-блог</h1>
        <p className="text-xl text-gray-600 mb-8"></p>

        <div className="flex justify-center ">
          {isAuthenticated ? (
            <Link
              href="/posts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Перейти до постів →
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Зареєструватися
              </Link>
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Увійти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
