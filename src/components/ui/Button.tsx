import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode, memo } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md font-medium text-white duration-500 dark:text-white disabled:bg-primary disabled:hover:bg-primary disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ** FILLED
        default: "bg-primary text-white dark:text-white hover:bg-primary/80",
        danger:
          "bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-hover",
        cancel:
          "bg-gray-400 text-dark dark:bg-gray-400 dark:text-dark hover:bg-gray-500 dark:hover:bg-gray-500",
        // ** OUTLINE
        outline:
          "border border-white-400 hover:text-black bg-transparent dark:text-primary dark:hover:text-white hover:text-white",
      },
      size: {
        default: "p-3",
        sm: "text-sm px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  type,
  variant,
  size,
  fullWidth,
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default memo(Button);
