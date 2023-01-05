import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UpcomingOperations() {
  const { data, error } = useSWR(
    "https://raid-helper.dev/api/v1/event/1059539511094300723",
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div className="operation">{data.description}</div>;
}
