import React from 'react';
import './assets/scss/components.scss';
import TeaCup from './components/TeaCup';

function App() {
  let data = [
    {
      name: "",
      percent: 25,
      color: "#95d1b2"
    },
    {
      name: "",
      percent: 18,
      color: "#ed7c7c"
    },
    {
      name: "",
      percent: 30,
      color: "#62b8eb"
    },
  ]

  return (
    <div className="App">
      <TeaCup 
        width={425} 
        height={500}
        cupBottomH={17}
        cupMaxH={48}
        data={data}
      />
    </div>
  );
}

export default App;
