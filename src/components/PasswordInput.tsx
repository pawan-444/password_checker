import React from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="password"
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      placeholder="Enter your password"
      value={value}
      onChange={onChange}
      aria-label="Password Input"
    />
  );
};

export default PasswordInput;
