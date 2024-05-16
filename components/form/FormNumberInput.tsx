"use client";
import React, { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input"; // Assuming you have an Input component similar to Textarea
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";

interface FormNumberInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  defaultValue?: number;
}

export const FormNumberInput = forwardRef<HTMLInputElement, FormNumberInputProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            type="number"
            step="0.01" // Allow decimal values
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            className={cn(
              "focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue ?? ''}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormNumberInput.displayName = "FormNumberInput";