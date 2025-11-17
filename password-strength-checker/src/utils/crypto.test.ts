import {
  calculateEntropy,
  calculateTimeToCrack,
  formatTimeToCrack,
  attackerRates,
} from './crypto';

describe('crypto utils', () => {
  describe('calculateEntropy', () => {
    it('should return 0 for an empty password', () => {
      expect(calculateEntropy('')).toBe(0);
    });

    it('should calculate the entropy correctly', () => {
      expect(calculateEntropy('password')).toBeCloseTo(22.46);
    });
  });

  describe('calculateTimeToCrack', () => {
    it('should calculate the time to crack correctly', () => {
      const entropy = 18.44;
      const rate = attackerRates.offlineGpu;
      expect(calculateTimeToCrack(entropy, rate)).toBeCloseTo(3.7e-6);
    });
  });

  describe('formatTimeToCrack', () => {
    it('should format seconds correctly', () => {
      expect(formatTimeToCrack(1)).toBe('≈ 1 second');
      expect(formatTimeToCrack(59)).toBe('≈ 59 seconds');
    });

    it('should format minutes correctly', () => {
      expect(formatTimeToCrack(60)).toBe('≈ 1 minute');
      expect(formatTimeToCrack(3599)).toBe('≈ 60 minutes');
    });

    it('should format hours correctly', () => {
      expect(formatTimeToCrack(3600)).toBe('≈ 1 hour');
    });
  });
});
