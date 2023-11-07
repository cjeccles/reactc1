import {useState, useEffect} from 'react'

export default function Counter() {
  const [counter, setCounter] = useState(15)
  const [counter2, setCounter2] = useState(0)

  function changeCount(value) {
        setCounter(counter+value)
  }

  function changeCount2(value) {
        setCounter2(counter2+value)
  }

useEffect(() => {
    if (counter2 < 0) {
      alert("Lets not get negative about this... ;)");
      setCounter2(0);
    }
}, [counter2]) //only runs if counter2 variable is changed. Dependant on this change to run.

  return (
    <div className="bg-gray-700">
        <button onClick={() => changeCount(-1)}>-</button>
        <span>{counter}</span>
        <button onClick={() => changeCount(1)}>+</button>
        <br />
        <button onClick={() => changeCount2(-1)}>-</button>
        <span>{counter2}</span>
        <button onClick={() => changeCount2(1)}>+</button>
    </div>
  )
}
