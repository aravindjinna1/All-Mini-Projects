import {useState} from 'react'
import Child from './Child'
export default function App() {

    const [count, setCount] = useState(0);

    const HandleCount=(e)=>{
        e.preventDefault();
          setCount(prev=> prev+1)
    }
    const decrement=()=>{
        if(count > 0 ){
           setCount(prev=> prev-1)
        }else{
           setCount(0)
           alert("cant decrement below Zero");

        }
       
    }
    const Reset=()=>{
       setCount(0)
    }

  return (
    <div>
        {/* <h3>{count}</h3> */}

      <button onClick={(e)=>HandleCount(e)}>Increment</button>
      <button onClick={(e)=>decrement(e)}>Decrement</button>
      <button onClick={(e)=>Reset(e)}>Reset</button>
      {/* <Child HandleCount={count}/> */}
    </div>
  )
}
