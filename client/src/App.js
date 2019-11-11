import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formValues, setFormValues] = React.useState({
    username: "",
    password: ""
  });

  return (
    <div className="App">
      <h1>Users App</h1>
      <Login formValues={formValues} setFormValues={setFormValues} />
    </div>
  );
}

function Login(props) {
  const { username, password } = props.formValues;

  const handleChange = () => e => {
    return props.setFormValues({
      ...props.formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", { username, password })
      .then(res => {
        debugger;
        console.log(res);
      })
      .catch(err => {
        debugger;
        console.log(err.message);
      });
  };

  return (
    <form>
      <label htmlFor="username">Username: </label>
      <input
        name="username"
        value={username}
        onChange={handleChange()}
        type="text"
      ></input>
      <label htmlFor="password">Password: </label>
      <input
        name="password"
        value={password}
        onChange={handleChange()}
        type="password"
      ></input>
      <button onClick={handleSubmit()}>Submit</button>
    </form>
  );
}

export default App;
