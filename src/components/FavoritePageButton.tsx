import Link from "next/link";

const FavoritePageButton = () => (
  <Link href="/favorites">
    <button className="bg-yellow-600 text-white px-4 py-2 rounded-md">
      Favoritos
    </button>
  </Link>
);

export default FavoritePageButton;
