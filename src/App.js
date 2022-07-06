import "./App.css";
import { useState, useEffect } from "react";
import ResponseCard from "./components/ResponseCard";

const { Configuration, OpenAIApi } = require("openai");
function App() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [searching, setSearching] = useState(false);
  const [aiEngine, setAiEngine] = useState("text-curie-001");

  const aiEngines = [
    "text-curie-001",
    "text-davinci-002",
    "text-babbage-001",
    "text-ada-001",
    "text-davinci-001",
    "davinci-instruct-beta",
    "davinci",
    "curie-instruct-beta",
    "curie",
    "babbage",
    "ada",
  ];

  //get the data from localstorage
  useEffect(() => {
    const getData = localStorage.getItem("responses");
    if (getData) {
      setResponses(JSON.parse(getData));
    }
    console.log("uuseEffect result", getData);
  }, []);

  const handleSubmit = (event) => {
    getResponse();
    event.preventDefault();
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const getResponse = async () => {
    try {
      setSearching(true);
      if (userInput) {
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion(aiEngine, {
          prompt: userInput,
          temperature: 0.5,
          max_tokens: 64,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log("Resposne message", response);

        const { choices } = response.data;
        console.log("choices", choices);

        if (choices && choices.length > 0) {
          console.log("Choices", choices);
          const answer = choices[0]["text"];
          const regex = new RegExp(userInput.toLowerCase(), "g");
          if (answer.toLowerCase().match(regex)) {
            const newResponse = {
              question: userInput,
              answer: choices[0]["text"],
              engine: aiEngine,
              dateTime: Date(),
            };
            const newResponses = [...responses, newResponse];
            console.log("new responses", newResponses);
            setResponses(newResponses);
            localStorage.setItem("responses", JSON.stringify(newResponses));
          } else {
            alert(
              `Open AI can't find the right answer!\nHere is what it can find.\n${answer}`
            );
          }
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setSearching(false);
    }
  };

  const handleSelectChange = (event) => {
    setAiEngine(event.target.value);
  };

  const clearResponses = () => {
    if (window.confirm("Are you sure?")) {
      setResponses([]);
      console.log(localStorage());
      localStorage.clear();
    }
  };

  return (
    <main>
      <section>
        <h3 className="mt-4">Fun with AI</h3>
        <form onSubmit={handleSubmit}>
          <label className="mt-2">Select the Engine</label>
          <select
            className="form-control"
            onChange={handleSelectChange}
            value={aiEngine}
          >
            {aiEngines.map((engine) => {
              return <option>{engine}</option>;
            })}
          </select>
          <textarea
            className="form-control mt-2"
            placeholder="Ask anything to AI"
            onChange={handleChange}
          ></textarea>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mt-2" disabled={searching}>
              {searching ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                  <span> Searching</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </section>
      <section className="card mt-4 mb-2 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0">Responses</h4>
          <button className="btn btn-danger" onClick={clearResponses}>
            Clear Responses
          </button>
        </div>
      </section>
      <ResponseCard responses={responses} />
    </main>
  );
}

export default App;
