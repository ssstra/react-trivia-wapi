export default function RestartButton({ children }) {
  return (
    <a href="/">
      <button>
        <h3>{children || "RESTART?"}</h3>
      </button>
    </a>
  );
}
