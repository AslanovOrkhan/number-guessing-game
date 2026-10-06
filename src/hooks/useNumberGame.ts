import {type FormEvent, useState } from "react";
import type { Feedback } from "../types/numberGame";
import { useBestScore } from "./useBestScore";

const randomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export const useGame = () => {
  const [secretNumber, setSecretNumber] = useState(randomNumber);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [attempts, setAttempts] = useState(0);
  const { bestScore, setBestScore } = useBestScore();

  const won = feedback === "correct";

  const submitGuess = (event?: FormEvent) => {
    event?.preventDefault();

    const value = Number(guess);

    if (
      !guess.trim() ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 100
    ) {
      setFeedback("invalid");
      return;
    }

    if (guesses.includes(value)) {
      setFeedback("duplicate");
      return;
    }

    const nextAttempts = attempts + 1;

    setAttempts(nextAttempts);
    setGuesses((previous) => [...previous, value]);
    setGuess("");

    if (value === secretNumber) {
      setFeedback("correct");
      if (bestScore === null || nextAttempts < bestScore) {
        setBestScore(nextAttempts);
      }
    } else if (value > secretNumber) {
      setFeedback("high");
    } else {
      setFeedback("low");
    }
  };

  const newGame = () => {
    setSecretNumber(randomNumber());
    setGuess("");
    setGuesses([]);
    setFeedback(null);
    setAttempts(0);
  };

  return {
    guess,
    setGuess,
    guesses,
    feedback,
    attempts,
    bestScore,
    won,
    submitGuess,
    newGame,
    secretNumber,
  };
};