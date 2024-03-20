import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {

    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleClear = () => {
      if (onChange) {
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
      }
      inputRef.current?.focus()
    }


    return (
      <div className="flex items-center justify-center">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputRef}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className=" text-xs right-10 p-2 hover:text-red-500"
          >Clear</button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
