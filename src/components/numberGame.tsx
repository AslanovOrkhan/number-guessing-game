import { useGame } from "../hooks/useNumberGame";
import Bullseye from "../assets/Bullseye Target with Dart.png";
import { FaLightbulb } from "react-icons/fa";
const NumberGame = () => {
  const {
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
  } = useGame();

  const feedbackContent = {
    high: {
      title: "Too high!",
      text: "Try a smaller number.",
      icon: "✓",
      tone: "success",
    },
    low: {
      title: "Too low!",
      text: "Try a larger number.",
      icon: "✓",
      tone: "success",
    },
    correct: {
      title: "Correct! 🎉",
      text: `You found the number in ${attempts} attempt${
        attempts === 1 ? "" : "s"
      }.`,
      icon: "✓",
      tone: "success",
    },
    invalid: {
      title: "Invalid guess",
      text: "Please enter a whole number between 1 and 100.",
      icon: "!",
      tone: "warning",
    },
    duplicate: {
      title: "Already guessed!",
      text: "Try a different number.",
      icon: "!",
      tone: "warning",
    },
  } as const;

  return (
    <main className="page">
      <header className="hero">
        <div className="title-row">
          <div className="target-icon" aria-hidden="true">
            <img src={Bullseye} alt="" />
          </div>

          <h1>
            Number <span>Guessing</span> Game
          </h1>
        </div>

        <p>
          I'm thinking of a number between 1 and 100. <br /> Can you guess it?
        </p>
      </header>

      <section className="game-card">
        <div className="hint-card">
          <div className="bulb">
            <FaLightbulb />
          </div>

          <div>
            <strong>Hint:</strong>
            <p>The number is between 1 and 100.</p>
          </div>
        </div>

        <form className="guess-row" onSubmit={submitGuess}>
          <input
            type="number"
            min="1"
            max="100"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..."
            disabled={won}
            aria-label="Enter your guess"
          />

          <button type="submit" disabled={won}>
            Guess
          </button>
        </form>

        <div className="previous-row">
          <span>Previous guesses:</span>

          <div className="chips">
            {guesses.length === 0 ? (
              <span className="empty-chip">—</span>
            ) : (
              guesses.map((item, index) => (
                <span
                  className={`guess-chip ${
                    item === secretNumber && won ? "correct-chip" : ""
                  }`}
                  key={`${item}-${index}`}
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        {feedback ? (
          <div className={`feedback ${feedbackContent[feedback].tone}`}>
            <div className="feedback-icon">
              {feedbackContent[feedback].icon}
            </div>

            <div>
              <strong>{feedbackContent[feedback].title}</strong>

              <p>{feedbackContent[feedback].text}</p>
            </div>
          </div>
        ) : (
          <div className="feedback placeholder-feedback">
            <div className="feedback-icon">?</div>

            <div>
              <strong>Make your first guess!</strong>

              <p>Try a number between 1 and 100.</p>
            </div>
          </div>
        )}

        {won && (
          <button className="play-again" onClick={newGame}>
            ↻ &nbsp; Play Again
          </button>
        )}
      </section>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-icon purple">🎯</div>

          <div>
            <span>Attempts</span>
            <strong>{attempts}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">💡</div>

          <div>
            <span>Best Score</span>
            <strong>{bestScore ?? "—"}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">🏆</div>
          <div>
            <span>Range</span>
            <strong>1 - 100</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NumberGame;
