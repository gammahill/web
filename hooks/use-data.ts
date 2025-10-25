import { useState, useEffect, useCallback } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

type DummyData = {
  users: User[];
  posts: Post[];
  settings: {
    theme: "light" | "dark";
    language: string;
  };
  lastUpdated: string;
};

/**
 * Hook: useData
 * Returns dummy JS object data, loading state, and a refresh function.
 */
export default function useData() {
  const [data, setData] = useState<DummyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const generateDummy = (): DummyData => {
    const now = new Date().toISOString();
    return {
      users: [
        { id: 1, name: "Alice Johnson", email: "alice@example.com" },
        { id: 2, name: "Bob Smith", email: "bob@example.com" },
        { id: 3, name: "Carol Lee", email: "carol@example.com" },
      ],
      posts: [
        { id: 1, title: "Welcome", body: "This is a dummy post." },
        { id: 2, title: "Second Post", body: "More dummy content." },
      ],
      settings: {
        theme: "light",
        language: "en-US",
      },
      lastUpdated: now,
    };
  };

  const load = useCallback(() => {
    setLoading(true);
    // simulate async fetch
    const t = setTimeout(() => {
      setData(generateDummy());
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, [load]);

  const refresh = () => {
    load();
  };

  return { data, loading, refresh };
}