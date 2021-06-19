import React from "react";

export default function TestCaseEditor({ testcase, setTestcase }) {
  return (
    <div>
      <textarea
        className="border border-gray-300 rounded-md block mx-auto w-full max-w-2xl my-4"
        value={testcase.input}
        placeholder="Input Value"
        onChange={(e) => setTestcase({ ...testcase, input: e.target.value })}
      />
      <textarea
        className="border border-gray-300 rounded-md block mx-auto w-full max-w-2xl"
        value={testcase.output}
        placeholder="Output Value"
        onChange={(e) => setTestcase({ ...testcase, output: e.target.value })}
      />

      <div className="flex flex-row justify-between my-4 mx-2">
        <div>
          <label className="mr-2 text-gray-600">Difficulty</label>
          <input
            className="border border-gray-300 rounded-md"
            type="number"
            min={0}
            max={10}
            value={testcase.difficulty}
            onChange={(e) =>
              setTestcase({
                ...testcase,
                difficulty: e.target.value,
              })
            }
            placeholder="Difficulty"
          />
        </div>

        <div>
          <label className="mx-2 text-gray-600">Is Public</label>
          <input
            type="checkbox"
            checked={testcase.is_public}
            onChange={() =>
              setTestcase({
                ...testcase,
                is_public: !testcase.is_public,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
