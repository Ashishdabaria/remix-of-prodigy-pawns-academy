import mariposa from "@/assets/mariposa.png";
import { cn } from "@/lib/utils";

interface MariposaProps {
  size?: number;
  className?: string;
  float?: boolean;
}

export function Mariposa({ size = 80, className, float = true }: MariposaProps) {
  return (
    <img
      src={mariposa}
      alt="Mariposa, the chessboard butterfly guide"
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn("select-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]", float && "animate-flutter", className)}
    />
  );
}
