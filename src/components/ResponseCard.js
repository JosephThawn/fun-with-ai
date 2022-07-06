import React from "react";

function ResponseCard({ responses }) {
  //descedubg order b-a
  const results = responses.sort((a, b) => a.dateTime - b.dateTime);
  console.log("responsecard", results);
  return (
    <section>
      {results.map((result, index) => {
        return (
          <div className="response-bg" key={index}>
            <div className="col row m-0 p-0">
              <b className="col-3">Prompt:</b>
              <p className="col-9">{result.question}</p>
            </div>
            <div className="col row m-0 p-0">
              <b className="col-3">Engine:</b>
              <p className="col-9">{result.engine}</p>
            </div>
            <div className="col row m-0 p-0">
              <b className="col-3">Result:</b>
              <p className="col-9">{result.answer}</p>
            </div>
            <div className="col row m-0 p-0">
              <b className="col-3">Date:</b>
              <p className="col-9">{result.dateTime}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ResponseCard;
