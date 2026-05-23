import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "inverse" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    let variantClasses = "";

    switch (variant) {
      case "primary":
        variantClasses = 
          "bg-pearl-deep text-white px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-pearl-deep-hover transition-colors duration-300 rounded-none border border-transparent";
        break;
      case "secondary":
        variantClasses = 
          "border-b border-pearl-ink pb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-pearl-ink hover:opacity-60 transition-opacity duration-300 rounded-none bg-transparent inline-flex items-center gap-2";
        break;
      case "inverse":
        variantClasses = 
          "bg-white text-pearl-deep px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-pearl-white transition-colors duration-300 rounded-none border border-transparent";
        break;
      case "ghost":
        variantClasses = 
          "text-pearl-ink hover:text-pearl-deep font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 rounded-none bg-transparent px-4 py-2";
        break;
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-pearl-gray disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
