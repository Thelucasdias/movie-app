import { useRouter } from "next/router";

interface BackButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BackButton = ({
  href = "/",
  className = "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",
  children = "Voltar a pesquisa",
  onClick,
}: BackButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    window.location.href = href;
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default BackButton;
