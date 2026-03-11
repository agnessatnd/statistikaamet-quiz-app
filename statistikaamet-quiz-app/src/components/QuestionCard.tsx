type Props = {
  question: string;
  options: string[];
  selectedAnswer: number | null;
  answered: boolean;
  onAnswer: (index: number) => void;
};

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  answered,
  onAnswer,
}: Props) {
  return (
    <div className="question-block">
      <h2>{question}</h2>

      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="answer"
            checked={selectedAnswer === index}
            onChange={() => onAnswer(index)}
            disabled={answered}
          />
          {option}
        </label>
      ))}
    </div>
  );
}