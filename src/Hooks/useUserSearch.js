import { useEffect, useState } from "react";

export function useUserSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setUsers([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((res) => {
        setUsers((prev) => {
          return [...prev, ...res.items];
        });
        setHasMore(res.incomplete_results);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, users, hasMore };
}
