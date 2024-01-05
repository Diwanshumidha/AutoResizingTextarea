import React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  autoResize?: Boolean;
}

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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  const autoResizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const textarea = e.currentTarget;
      const computedStyles = textarea.computedStyleMap();
      const maxHeightMap = computedStyles.get("max-height");
      if (maxHeightMap && "value" in maxHeightMap) {
        const maxHeight =
          maxHeightMap.value === "none"
            ? Infinity
            : (maxHeightMap.value as number);

        textarea.style.height = "1px";
        textarea.style.height = `${Math.min(
          maxHeight,
          textarea.scrollHeight
        )}px`;
      }
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
