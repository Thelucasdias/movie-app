import Link from "next/link";

const BackToSearchButton = () => (
  <Link href="/">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
      Voltar a pesquisa
    </button>
  </Link>
);

export default BackToSearchButton;
