import { useState } from "react";
import { questions } from "./data/question";
import QuestionCard from "./components/QuestionCard";
import ResultTable from "./components/ResultTable";
import type { Result } from "./types/result";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);

    const q = questions[currentQuestion];
    const correct = q.correctAnswer === index;

    setFeedback(correct ? "Õige vastus!" : "Vale vastus!");

    const result: Result = {
      question: q.question,
      selectedAnswer: q.options[index],
      isCorrect: correct,
    };

    setResults([...results, result]);
    setAnswered(true);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setResults([]);
    setFeedback(null);
    setFinished(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  if (finished) {
    const score = results.filter((r) => r.isCorrect).length;

    let message = "";

    if (score === questions.length) {
      message = "Suurepärane tulemus!";
    } else if (score >= questions.length * 0.75) {
      message = "Väga hea tulemus!";
    } else if (score >= questions.length * 0.5) {
      message = "Hea tulemus!";
    } else {
      message = "Järgmine kord läheb kindlasti paremini!";
    }

    return (
      <div>
        <h2>Viktoriin on lõppenud</h2>

        <h2>
          Tulemus: {score} / {questions.length}
        </h2>

        <h3>{message}</h3>

        <ResultTable results={results} />

        <button onClick={restartQuiz}>Alusta uuesti</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        Küsimus {currentQuestion + 1} / {questions.length}
      </p>

      <QuestionCard
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
      />

      {feedback && <p>{feedback}</p>}

      {answered && (
        <button onClick={nextQuestion}>
          {currentQuestion + 1 === questions.length
            ? "Vaata tulemusi"
            : "Järgmine küsimus"}
        </button>
      )}
    </div>
  );
}

export default App;
