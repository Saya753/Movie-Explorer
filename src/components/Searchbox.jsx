import React, { forwardRef } from "react";

const Searchbox = forwardRef(function Searchbox(
  { value, onChange, placeholder },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Searching..."}
    />
  );
});

export default Searchbox;
