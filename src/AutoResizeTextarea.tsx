import React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  autoResize?: boolean;
}

const ExtractMaxHeightValue = (
  maxHeightMap: CSSStyleValue | undefined
): number => {
  let maxHeightNumber: number = Infinity;
  if (maxHeightMap && "value" in maxHeightMap) {
    maxHeightNumber =
      maxHeightMap.value === "none" ? Infinity : (maxHeightMap.value as number);
  }
  return maxHeightNumber;
};

const AutoResizeTextarea = ({
  id,
  className,
  style,
  value,
  setValue,

  placeholder = "Type here...",
  autoResize = false,
  ...otherProps
}: ButtonProps) => {
  const handleChange = setValue
    ? (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.currentTarget.value)
    : undefined;

  const autoResizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const textarea = e.currentTarget;
      const computedStyles = textarea.computedStyleMap();
      const maxHeightMap = computedStyles.get("max-height");
      const maxHeight = ExtractMaxHeightValue(maxHeightMap);
      textarea.style.height = "1px";
      textarea.style.height = `${Math.min(maxHeight, textarea.scrollHeight)}px`;
    }
  };

  return (
    <textarea
      id={id}
      className={className}
      style={style}
      value={value}
      onChange={handleChange}
      onInput={autoResizeTextarea}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default AutoResizeTextarea;
