export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
      <p>
        Map data &copy;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          OpenStreetMap
        </a>{" "}
        contributors
      </p>
      <p className="mt-1">&copy; 2026 おすすめ観光スポット</p>
    </footer>
  );
}
