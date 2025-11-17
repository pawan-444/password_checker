import React, { useState } from 'react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let charSet = '';
    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    setPassword(newPassword);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Password Generator</h2>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
          placeholder="Generated password"
        />
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Copy
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="length" className="block text-sm font-medium">
            Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Password Length"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
            aria-label="Include Uppercase"
          />
          <label htmlFor="uppercase" className="ml-2">
            Uppercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="lowercase" className="ml-2">
            Lowercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="numbers" className="ml-2">
            Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="symbols" className="ml-2">
            Symbols
          </label>
        </div>
      </div>
      <button
        onClick={generatePassword}
        className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
