import { ErrorBoundary } from "react-error-boundary";

function ASTMResultFields({ record }) {
  return (
    <div className="recordDiv">
      <label className="astmResLabel">{record}</label>
      <ErrorBoundary fallback={<div>Error: Data could not be submitted.</div>}>
        <form>
          <input
            className="astmResInput"
            name="recordData"
            type="number"
            minLength={1}
            maxLength={2}
            min={1}
            max={30}
          />
        </form>
      </ErrorBoundary>
    </div>
  );
}

export default ASTMResultFields;
