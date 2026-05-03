"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 sm:text-sm [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 sm:h-8",
        icon: "size-9 sm:size-8",
        "icon-lg": "size-10 sm:size-9",
        "icon-sm": "size-8 sm:size-7",
        "icon-xl": "size-11 sm:size-10",
        "icon-xs": "size-7 rounded-md sm:size-6",
        lg: "h-10 px-5 sm:h-9",
        sm: "h-8 gap-1.5 px-3 sm:h-7",
        xl: "h-11 px-6 text-lg sm:h-10 sm:text-base",
        xs: "h-7 gap-1 rounded-md px-2.5 text-sm sm:h-6 sm:text-xs",
      },
      variant: {
        default:
          "border-transparent bg-[#D8FF85] text-[#0A211F] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]",
        destructive:
          "border-destructive bg-destructive text-white hover:bg-destructive/90",
        "destructive-outline":
          "border-input bg-transparent text-destructive-foreground hover:border-destructive/32 hover:bg-destructive/4",
        ghost:
          "border-transparent text-foreground hover:bg-[rgba(10,33,31,0.06)] hover:-translate-y-0.5",
        link: "border-transparent underline-offset-4 hover:underline",
        outline:
          "border-[rgba(10,33,31,0.18)] bg-transparent text-[#0A211F] hover:bg-[#D8FF85] hover:border-[#D8FF85] hover:-translate-y-0.5",
        secondary:
          "border-transparent bg-[#0A211F] text-[#F7F9F2] hover:bg-[#12302D] hover:-translate-y-0.5",
      },
    },
  },
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(buttonVariants({ className, size, variant })),
    "data-slot": "button",
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export { Button, buttonVariants };
