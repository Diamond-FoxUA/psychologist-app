import { Link } from "react-router-dom";

interface LinkButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  link: string;
}

export default function LinkButton({
  children,
  variant = "primary",
  className = "",
  link,
}: LinkButtonProps) {
  return (
    <Link className={`btn btn-${variant} ${className}`} to={link}>
      {children}
    </Link>
  );
}
