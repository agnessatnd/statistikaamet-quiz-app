import type { Result } from "../types/result";

type Props = {
  results: Result[];
};

export default function ResultTable({ results }: Props) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Küsimus</th>
          <th>Sinu vastus</th>
          <th>Tulemus</th>
        </tr>
      </thead>

      <tbody>
        {results.map((r, index) => (
          <tr key={index}>
            <td>{r.question}</td>
            <td>{r.selectedAnswer}</td>
            <td style={{ color: r.isCorrect ? "green" : "red" }}>
              {r.isCorrect ? "Õige" : "Vale"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
