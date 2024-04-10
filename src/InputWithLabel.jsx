import React, { useEffect, useRef } from 'react';

const InputWithLabel = ({ id, children, value, onInputChange, type = 'text' }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // This effect will run once after the component mounts
    console.log('InputWithLabel component mounted');

    // Focus the input element
    inputRef.current.focus();
    
    // Cleanup function
    return () => {
      console.log('InputWithLabel component unmounted');
    };
  }, []); // Empty dependency list

  return (
    <>
      <label htmlFor={id}>{children}</label>&nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        ref={inputRef} // Assign inputRef to the ref attribute
      />
    </>
  );
};

export default InputWithLabel;
