
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  message?: string;
  className?: string;
}

const Loading = ({ size = "medium", message, className = "" }: LoadingProps) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-primary`} />
      {message && <p className="text-sm text-muted-foreground mt-2">{message}</p>}
    </div>
  );
};

export default Loading;
