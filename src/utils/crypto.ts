export const calculateEntropy = (password: string): number => {
  if (!password) {
    return 0;
  }
  const charSet = new Set(password);
  const entropy = password.length * Math.log2(charSet.size);
  return Math.round(entropy * 100) / 100;
};

export const attackerRates = {
  onlineThrottled: 100 / 3600, // 100 attempts/hour
  slowOnline: 10 / 3600, // 10 attempts/hour
  offlineCpu: 1000, // 1000 guesses/sec
  offlineGpu: 1e11, // 100 billion guesses/sec
};

export const calculateTimeToCrack = (
  entropy: number,
  rate: number
): number => {
  const guesses = 2 ** entropy;
  return guesses / rate;
};

export const formatTimeToCrack = (seconds: number): string => {
  if (seconds < 1) return 'instantly';
  const units = [
    { name: 'second', limit: 60, in_seconds: 1 },
    { name: 'minute', limit: 60, in_seconds: 60 },
    { name: 'hour', limit: 24, in_seconds: 3600 },
    { name: 'day', limit: 30, in_seconds: 86400 },
    { name: 'month', limit: 12, in_seconds: 2592000 },
    { name: 'year', limit: Infinity, in_seconds: 31536000 },
  ];
  let i = 0;
  while (i < units.length - 1 && seconds >= units[i].limit) {
    seconds /= units[i].limit;
    i++;
  }
  const value = Math.round(seconds);
  return `≈ ${value} ${units[i].name}${value === 1 ? '' : 's'}`;
};

export const checkPwned = async (password: string): Promise<boolean> => {
  if (!password) {
    return false;
  }
  async function sha1(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}
  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!response.ok) {
    return false;
  }

  const text = await response.text();
  return text.split('\n').some((line) => line.split(':')[0] === suffix);
};
