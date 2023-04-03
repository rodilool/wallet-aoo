import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

// Components export
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import LoginPage from "./Components/LoginPage/LoginPage";

function App() {
  let loginStored = JSON.parse(localStorage.getItem("login"));
  let nameStored = JSON.parse(localStorage.getItem("name"));
  let balanceStored = JSON.parse(localStorage.getItem("balance"));

  const [login, setLogin] = useState(loginStored || false);
  const [name, setName] = useState(nameStored || "");
  const [balance, setBalance] = useState(balanceStored || 0);

  function saveRegister(balance, name, login) {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("login", JSON.stringify(login));
  }

  function Register(event) {
    event.preventDefault();

    let names = event.target.name.value;
    let balances = event.target.balance.value;

    setBalance(balances);
    setName(names);
    setLogin(true);

    saveRegister(balances, names, true);

    event.target.name.value = "";
    event.target.balance.value = "";
  }
  return (
    <div>
      {/* <LoginPage className="LoginPage" /> */}
      {login === false ? (
        <LoginPage className="LoginPage" Register={Register} />
      ) : (
        <>
          <NavBar />
          <Home balance={balance} />
        </>
      )}
    </div>
  );
}

export default App;
