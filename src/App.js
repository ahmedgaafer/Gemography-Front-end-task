import { Repo } from "./Components/Repo/Repo.component";
import "./styles.css";

import React, { useRef, useState, useCallback } from "react";
import { useUserSearch } from "./Hooks/useUserSearch";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, users, hasMore } = useUserSearch(pageNumber);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className="App">
      {users.map((user, index) => {
        if (users.length === index + 1) {
          return (
            <Repo innerRef={lastUserElementRef} key={user.id} repo={user} />
          );
        } else {
          return <Repo key={user.id} repo={user} />;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}
