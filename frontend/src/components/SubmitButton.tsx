import { CSSProperties, ReactElement, cloneElement } from "react";

import { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type SubmitButtonState = {
  icon?: ReactElement;
  title?: string;
  description?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

interface SubmitButtonProps {
  className?: ClassValue;
  style?: CSSProperties;
  labelClassName?: ClassValue;
  loadingClassName?: ClassValue;
  state: SubmitButtonState;
  submit: () => Promise<void>;
}

export default function SubmitButton({
  className,
  style,
  labelClassName,
  loadingClassName,
  state,
  submit,
}: SubmitButtonProps) {
  const { icon, title, description, isLoading, isDisabled, onClick } = state;

  return (
    <button
      className={cn(
        "relative flex min-h-[60px] w-full flex-row items-center justify-center gap-2.5 rounded-md bg-navy-800 px-4 py-2.5 text-white transition-opacity disabled:opacity-50",
        className,
      )}
      disabled={isLoading || isDisabled}
      onClick={onClick ?? submit}
      style={style}
    >
      <div
        className={cn(
          "absolute inset-0 z-[2] flex flex-row items-center justify-center transition-opacity",
          !isLoading && "opacity-0",
        )}
      >
        <Loader2 className={cn("animate-spin", loadingClassName)} />
      </div>

      {icon &&
        cloneElement(icon, {
          className: cn(
            "relative z-[1] h-5 w-5 transition-opacity",
            isLoading && "opacity-0",
          ),
        })}
      <div
        className={cn(
          "relative z-[1] transition-opacity",
          isLoading && "opacity-0",
        )}
      >
        <p className={cn(labelClassName)}>{title}</p>
        {description && (
          <span className="block font-sans text-[11px] normal-case">
            {description}
          </span>
        )}
      </div>
    </button>
  );
}
