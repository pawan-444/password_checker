import React from 'react';
import { motion } from 'framer-motion';

interface StrengthMeterProps {
  score: number; // 0-100
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ score }) => {
  const scoreColor =
    score > 80
      ? 'text-green-500'
      : score > 60
      ? 'text-yellow-500'
      : 'text-red-500';

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Strength</h2>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <motion.path
            className="text-gray-700"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <motion.path
            className={scoreColor}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100, 100"
            strokeDashoffset={100 - score}
            transition={{ duration: 1 }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className={`text-3xl font-bold ${scoreColor}`}>{score}</span>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        <motion.div
          className={`h-2.5 rounded-full ${
            score > 80 ? 'bg-green-500' : score > 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default StrengthMeter;
