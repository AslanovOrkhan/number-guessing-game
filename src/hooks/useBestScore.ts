import { useEffect, useState } from "react";

export const useBestScore = () => {
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem("number-guessing-best");

    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (bestScore !== null) {
      localStorage.setItem("number-guessing-best", String(bestScore));
    }
  }, [bestScore]);

  return {
    bestScore,
    setBestScore,
  };
};
