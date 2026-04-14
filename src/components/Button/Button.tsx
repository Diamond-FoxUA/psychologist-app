interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
}

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}
