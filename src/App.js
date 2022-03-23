import { Repo } from "./Components/Repo/Repo.component";
import "./styles.css";
import { getData } from "./utils.js";
import { useState, useEffect } from "react";

export default function App() {
  const [repos, UpdateRepos] = useState([]);

  useEffect(() => {
    const URL =
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";

    getData(URL).then((res) => {
      UpdateRepos(res);
    });
  }, []);

  return (
    <div className="App">
      {repos?.items?.map((repo) => {
        return <Repo key={repo.id} {...{ repo }} />;
      })}
    </div>
  );
}
