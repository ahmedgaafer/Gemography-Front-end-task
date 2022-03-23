import "../../styles.css";
import { GoIssueOpened, GoStar } from "react-icons/go";
export function Repo(props) {
  const { repo } = props;
  const daysDiff = new Date() - new Date(repo.created_at);
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="repo flex card">
        <img src={repo.owner.avatar_url} alt="a" />
        <div className="user">
          <h1>{repo.name}</h1>
          <div className="description">{repo.description}</div>
          <div className="meta">
            <div className="counts">
              <div className="stars">
                Stars: {repo.stargazers_count}
                <span>
                  <GoStar />
                </span>
              </div>
              <div className="issues">
                Issues: {repo.open_issues_count}
                <span>
                  <GoIssueOpened />
                </span>
              </div>
            </div>
            <div className="creator">
              {" "}
              Submitted{" "}
              <strong>
                {Math.ceil(daysDiff / (1000 * 60 * 60 * 24))}
              </strong>{" "}
              days ago by <strong>{repo.owner.login}</strong>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
