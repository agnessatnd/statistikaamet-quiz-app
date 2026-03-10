type Props = {
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
};

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  onAnswer,
}: Props) {
  return (
    <div>
      <h2>{question}</h2>

      {options.map((option, index) => (
        <label key={index} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="radio"
            name="answer"
            checked={selectedAnswer === index}
            onChange={() => onAnswer(index)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
