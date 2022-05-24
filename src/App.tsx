import React from 'react';
import './assets/scss/components.scss';
import TeaCup from './components/TeaCup';
const Cup = require("./assets/img/HugMug.svg");

function App() {
  let data = [
    {
      name: "",
      amount: 25,
      color: "#95d1b2"
    },
    {
      name: "",
      amount: 18,
      color: "#ed7c7c"
    },
    {
      name: "",
      amount: 30,
      color: "#62b8eb"
    },
    {
      name: "",
      amount: 27,
      color: "blue"
    },
  ]

  return (
    <div className="App">
      <TeaCup 
        width={425} 
        cupBottomH={19}
        cupMaxH={52}
        data={data}
      />
    </div>
  );
}

export default App;
