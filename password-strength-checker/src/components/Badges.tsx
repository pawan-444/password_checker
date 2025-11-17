import React from 'react';
import { motion } from 'framer-motion';

interface BadgesProps {
  score: number;
}

const badges = [
  { name: 'Passphrase Pro', score: 80 },
  { name: 'Leak-free', score: 100 },
];

const Badges: React.FC<BadgesProps> = ({ score }) => {
  const earnedBadges = badges.filter((badge) => score >= badge.score);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Badges</h2>
      <div className="flex space-x-4">
        {earnedBadges.map((badge) => (
          <motion.div
            key={badge.name}
            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {badge.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
