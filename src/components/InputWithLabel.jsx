import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default InputWithLabel;
