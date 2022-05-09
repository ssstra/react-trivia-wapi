import RestartButton from "./RestartButton";

export default function InvalidApiResponse({ apiError }) {
  return (
    <main>
      <h1>Invalid API Response</h1>
      <h2>{apiError.message}</h2>
      <RestartButton />
    </main>
  );
}
