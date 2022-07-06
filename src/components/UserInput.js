// import React, { Component } from "react";
// import "../index.css";

// const { Configuration, OpenAIApi } = require("openai");

// export default class UserInput extends Component {
//   state = { userInput: undefined, responses: [] };

//   handleSubmit = (event) => {
//     // console.log(this.state.userInput);
//     this.getResponse();
//     event.preventDefault();
//   };

//   handleChange = (event) => {
//     this.setState({
//       userInput: event.target.value,
//     });
//   };

//   getResponse = async () => {
//     try {
//       const { userInput } = this.state;
//       if (userInput) {
//         const configuration = new Configuration({
//           apiKey: process.env.REACT_APP_API_KEY,
//         });
//         const openai = new OpenAIApi(configuration);
//         const response = await openai.createCompletion("text-curie-001", {
//           prompt: userInput,
//           temperature: 0.7,
//           max_tokens: 256,
//           top_p: 1,
//           frequency_penalty: 0,
//           presence_penalty: 0,
//         });
//         const { choices } = response.data;
//         if (choices && choices.length > 0) {
//           this.setState({
//             responses: this.state.responses.push({
//               prompt: userInput,
//               answer: choices[0],
//             }),
//           });
//         }
//       }
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   render() {
//     return (
//       <section>
//         <h3>Fun with AI</h3>
//         <form onSubmit={this.handleSubmit}>
//           <label>Enter your prompt</label>
//           <textarea
//             className="form-control mt-2"
//             onChange={this.handleChange}
//           ></textarea>
//           <div className="d-flex justify-content-end">
//             <button className="btn btn-primary mt-2">Submit</button>
//           </div>
//         </form>
//       </section>
//     );
//   }
// }
