// import React, { Component } from "react";
import "../App.css";

export default function ResponseCard({ responses }) {
  responses = responses.sort((prev, next) => next.dateTime - prev.dateTime);
  return (
    <section>
      {responses.map((response, index) => {
        return (
          <div className="response-bg" key={index}>
            <div className="col row m-0 p-0">
              <b className="col-3">Prompt:</b>
              <p className="col-9">{response.question}</p>
            </div>
            <div className="col row m-0 p-0">
              <b className="col-3">Engine:</b>
              <p className="col-9">{response.engine}</p>
            </div>
            <div className="col row m-0 p-0">
              <b className="col-3">Response:</b>
              <p className="col-9">{response.answer}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
