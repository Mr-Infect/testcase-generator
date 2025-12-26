import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:from-primary/95 hover:to-primary/85 shadow-md hover:shadow-lg active:shadow-sm",
        destructive:
          "bg-gradient-to-br from-destructive to-destructive/90 text-white hover:from-destructive/95 hover:to-destructive/85 shadow-md hover:shadow-lg active:shadow-sm focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary/5 shadow-sm hover:shadow-md dark:bg-input/30 dark:border-primary dark:hover:bg-primary/10 transition-all",
        secondary:
          "bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/95 hover:to-secondary/85 shadow-md hover:shadow-lg active:shadow-sm",
        success:
          "bg-gradient-to-br from-success to-success/90 text-white hover:from-success/95 hover:to-success/85 shadow-md hover:shadow-lg active:shadow-sm",
        ghost: "text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-11 rounded-lg px-6 has-[>svg]:px-4 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
