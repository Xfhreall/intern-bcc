import axios from "axios";

interface RepoData {
  full_name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
}

export const fetchData = async (): Promise<RepoData> => {
  const res = await axios.get<RepoData>(
    "https://api.github.com/repos/TanStack/query"
  );

  return res.data;
};
