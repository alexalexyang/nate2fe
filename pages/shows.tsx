import useApi from "../utils/use-api";

export default function TvShows() {
  const { response, error, loading } = useApi("/api/shows");

  return (
    <>
      <h1>TV Shows</h1>

      {loading && <p>Loading TV shows...</p>}

      {!loading && response && (
        <>
          <p>My favourite TV shows:</p>
          <pre>{response.payload}</pre>
        </>
      )}
      {!loading && error && (
        <>
          <p>Error loading TV shows</p>
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </>
  );
}
