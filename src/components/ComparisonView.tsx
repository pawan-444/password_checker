import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { calculateEntropy, formatTimeToCrack, calculateTimeToCrack, attackerRates } from '../utils/crypto';

const ComparisonView: React.FC = () => {
  const [passwordA, setPasswordA] = useState('');
  const [passwordB, setPasswordB] = useState('');

  const resultA = passwordA ? zxcvbn(passwordA) : null;
  const resultB = passwordB ? zxcvbn(passwordB) : null;

  const entropyA = resultA ? calculateEntropy(passwordA) : 0;
  const entropyB = resultB ? calculateEntropy(passwordB) : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Password Comparison</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <input
            type="text"
            value={passwordA}
            onChange={(e) => setPasswordA(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white mb-4"
            placeholder="Password A"
          />
          {resultA && (
            <div>
              <p><strong>Score:</strong> {(resultA.score + 1) * 20}/100</p>
              <p><strong>Entropy:</strong> {entropyA} bits</p>
              <p><strong>Time to Crack (GPU):</strong> {formatTimeToCrack(calculateTimeToCrack(entropyA, attackerRates.offlineGpu))}</p>
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={passwordB}
            onChange={(e) => setPasswordB(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white mb-4"
            placeholder="Password B"
          />
          {resultB && (
            <div>
              <p><strong>Score:</strong> {(resultB.score + 1) * 20}/100</p>
              <p><strong>Entropy:</strong> {entropyB} bits</p>
              <p><strong>Time to Crack (GPU):</strong> {formatTimeToCrack(calculateTimeToCrack(entropyB, attackerRates.offlineGpu))}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
