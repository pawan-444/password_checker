import React, { useState } from 'react';

interface Policy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  bannedSubstrings: string[];
}

const PolicyTester: React.FC = () => {
  const [policy, setPolicy] = useState<Policy>({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    bannedSubstrings: ['password', '123456'],
  });
  const [password, setPassword] = useState('');
  const [results, setResults] = useState<Record<string, boolean>>({});

  const testPassword = () => {
    const newResults: Record<string, boolean> = {};
    newResults.minLength = password.length >= policy.minLength;
    newResults.requireUppercase = policy.requireUppercase ? /[A-Z]/.test(password) : true;
    newResults.requireLowercase = policy.requireLowercase ? /[a-z]/.test(password) : true;
    newResults.requireNumbers = policy.requireNumbers ? /\d/.test(password) : true;
    newResults.requireSymbols = policy.requireSymbols ? /[\W_]/.test(password) : true;
    newResults.bannedSubstrings = !policy.bannedSubstrings.some((sub) => password.includes(sub));
    setResults(newResults);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Password Policy Tester</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="minLength" className="block text-sm font-medium">
            Min Length: {policy.minLength}
          </label>
          <input
            type="range"
            id="minLength"
            min="4"
            max="32"
            value={policy.minLength}
            onChange={(e) => setPolicy({ ...policy, minLength: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Minimum Length"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireUppercase"
            checked={policy.requireUppercase}
            onChange={(e) => setPolicy({ ...policy, requireUppercase: e.target.checked })}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
            aria-label="Require Uppercase"
          />
          <label htmlFor="requireUppercase" className="ml-2">
            Require Uppercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireLowercase"
            checked={policy.requireLowercase}
            onChange={(e) => setPolicy({ ...policy, requireLowercase: e.target.checked })}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="requireLowercase" className="ml-2">
            Require Lowercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireNumbers"
            checked={policy.requireNumbers}
            onChange={(e) => setPolicy({ ...policy, requireNumbers: e.target.checked })}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="requireNumbers" className="ml-2">
            Require Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireSymbols"
            checked={policy.requireSymbols}
            onChange={(e) => setPolicy({ ...policy, requireSymbols: e.target.checked })}
            className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="requireSymbols" className="ml-2">
            Require Symbols
          </label>
        </div>
        <div>
          <label htmlFor="bannedSubstrings" className="block text-sm font-medium">
            Banned Substrings (comma-separated)
          </label>
          <input
            type="text"
            id="bannedSubstrings"
            value={policy.bannedSubstrings.join(',')}
            onChange={(e) => setPolicy({ ...policy, bannedSubstrings: e.target.value.split(',') })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
          placeholder="Password to test"
        />
        <button
          onClick={testPassword}
          className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Test
        </button>
      </div>
      <div className="mt-4">
        {Object.entries(results).map(([rule, passed]) => (
          <p key={rule} className={passed ? 'text-green-500' : 'text-red-500'}>
            {rule}: {passed ? 'Passed' : 'Failed'}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PolicyTester;
