
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  message?: string;
  className?: string;
  overlay?: boolean;
  fullPage?: boolean;
}

const Loading = ({ 
  size = "medium", 
  message, 
  className = "",
  overlay = false,
  fullPage = false
}: LoadingProps) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  const baseClasses = "flex flex-col items-center justify-center";
  const overlayClasses = overlay ? "absolute inset-0 bg-white/80 z-10" : "";
  const fullPageClasses = fullPage ? "fixed inset-0 bg-white/90 z-50" : "";
  
  return (
    <div className={`${baseClasses} ${overlayClasses} ${fullPageClasses} ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-primary`} />
      {message && <p className="text-sm text-muted-foreground mt-2">{message}</p>}
    </div>
  );
};

/**
 * Wrap an async component with loading state
 */
interface WithLoadingProps {
  isLoading: boolean;
  loadingMessage?: string;
  loadingSize?: "small" | "medium" | "large";
  overlay?: boolean;
  children: React.ReactNode;
}

export const WithLoading = ({
  isLoading,
  loadingMessage,
  loadingSize = "medium",
  overlay = true,
  children
}: WithLoadingProps) => {
  if (!isLoading) return <>{children}</>;
  
  return (
    <div className="relative">
      {overlay ? children : null}
      <Loading 
        size={loadingSize} 
        message={loadingMessage} 
        overlay={overlay} 
      />
    </div>
  );
};

export default Loading;
