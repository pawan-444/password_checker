import React, { useState, useEffect, useCallback } from 'react';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import PasswordGenerator from './components/PasswordGenerator';
import PolicyTester from './components/PolicyTester';
import ComparisonView from './components/ComparisonView';
import Badges from './components/Badges';
import zxcvbn from 'zxcvbn';
import { calculateEntropy, calculateTimeToCrack, formatTimeToCrack, attackerRates, checkPwned } from './utils/crypto';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

function App() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<zxcvbn.ZXCVBNResult | null>(null);
  const [isPwned, setIsPwned] = useState<boolean | null>(null);
  const [checkingPwned, setCheckingPwned] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const debouncedCheckPwned = useCallback(
    debounce(async (pass: string) => {
      if (privacyMode || !pass) {
        setIsPwned(null);
        return;
      }
      setCheckingPwned(true);
      const pwned = await checkPwned(pass);
      setIsPwned(pwned);
      setCheckingPwned(false);
    }, 500),
    [privacyMode]
  );

  useEffect(() => {
    debouncedCheckPwned(password);
  }, [password, debouncedCheckPwned]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      const newResult = zxcvbn(newPassword);
      setResult(newResult);
      if ((newResult.score + 1) * 20 === 100) {
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
    } else {
      setResult(null);
      setIsPwned(null);
      setShowConfetti(false);
    }
  };

  const score = result ? (result.score + 1) * 20 : 0;
  const entropy = result ? calculateEntropy(password) : 0;

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex items-center justify-center font-sans`}>
      {showConfetti && <Confetti />}
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-end mb-4">
          <button onClick={toggleTheme} className="mr-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md">
            Toggle Theme
          </button>
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-lg">Privacy Mode</span>
            <div className="relative">
              <input type="checkbox" checked={privacyMode} onChange={() => setPrivacyMode(!privacyMode)} className="sr-only" />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${privacyMode ? 'transform translate-x-full bg-cyan-400' : ''}`}></div>
            </div>
          </label>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-400">
          Password Strength Checker
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="md:col-span-1 bg-gray-800 p-6 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <StrengthMeter score={score} />
          </motion.div>
          <motion.div className="md:col-span-2 bg-gray-800 p-6 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
            <PasswordInput value={password} onChange={handlePasswordChange} />
          </motion.div>
          <AnimatePresence>
            {result && (
              <motion.div className="md:col-span-3 bg-gray-800 p-6 rounded-lg mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Breach Check</h3>
                    {privacyMode ? (
                      <p className="text-gray-400">Breach check is disabled in Privacy Mode.</p>
                    ) : checkingPwned ? (
                      <p>Checking...</p>
                    ) : isPwned === null ? (
                      <p>...</p>
                    ) : isPwned ? (
                      <p className="text-red-500 font-bold">Compromised! This password was found in a data breach.</p>
                    ) : (
                      <p className="text-green-500">Not found in any known breaches.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Entropy</h3>
                    <p>{entropy} bits</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Time to Crack</h3>
                    <ul className="space-y-1">
                      <li><strong>Online (Throttled):</strong> {formatTimeToCrack(calculateTimeToCrack(entropy, attackerRates.onlineThrottled))}</li>
                      <li><strong>Online (Slow):</strong> {formatTimeToCrack(calculateTimeToCrack(entropy, attackerRates.slowOnline))}</li>
                      <li><strong>Offline (CPU):</strong> {formatTimeToCrack(calculateTimeToCrack(entropy, attackerRates.offlineCpu))}</li>
                      <li><strong>Offline (GPU):</strong> {formatTimeToCrack(calculateTimeToCrack(entropy, attackerRates.offlineGpu))}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Weaknesses</h3>
                    <p>{result?.feedback?.warning || 'No weaknesses detected.'}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Suggestions</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result?.feedback?.suggestions?.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      )) || <li>Make your password longer.</li>}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="md:col-span-3">
            <Badges score={score} />
          </div>
          <div className="md:col-span-3">
            <PasswordGenerator />
          </div>
          <div className="md:col-span-3">
            <PolicyTester />
          </div>
          <div className="md:col-span-3">
            <ComparisonView />
          </div>
        </div>
      </div>
    </div>
  );
}

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise(resolve => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
}

export default App;
