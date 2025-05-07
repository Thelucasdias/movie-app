import Link from "next/link";

interface BackButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({
  href = "/",
  className = "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",
  children = "Voltar a pesquisa",
}: BackButtonProps) => (
  <Link href={href}>
    <button className={className}>{children}</button>
  </Link>
);

export default BackButton;
