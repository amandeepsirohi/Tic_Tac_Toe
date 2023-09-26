import React, { useState , useRef } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png';
import x_icon from '../Assets/x-mark.png';
// import ROW from './ROW';
var data = Array(9).fill("");
const TicTacToe = () => {

  let [count , setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  var arr = [useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)];
  const toggle = (e , num) =>
  {
    if(lock){
        return 0;
    }
    if(count %2 === 0)
    {
        e.target.innerHTML = `<img src = '${x_icon}'>`;
        data[num] = "x";
        setCount(++count);
    }
    else
    {
        e.target.innerHTML = `<img src = '${circle_icon}'>`;
        data[num] = "o";
        setCount(++count);
    }
    checkWin();
  }
  const checkWin = () =>
  {
    if(data[0] === data[1] && data[1] === data[2] && data[2] !== 0)
    {
        won(data[2]);
    }
    else if(data[3] === data[4] && data[4] === data[5] && data[5] !== "" )
    {
        won(data[5]);
    }
    else if(data[6] === data[7] && data[7] === data[8] && data[8] !== "" )
    {
        won(data[8]);
    }
    else if(data[0] === data[3] && data[3] === data[6] && data[6] !== "" )
    {
        won(data[6]);
    }
    else if(data[1] === data[4] && data[4] === data[7] && data[7] !== "" )
    {
        won(data[7]);
    }
    else if(data[2] === data[5] && data[5] === data[8] && data[8] !== "" )
    {
        won(data[8]);
    }
    else if(data[0] === data[4] && data[4] === data[8] && data[8] !== "" )
    {
        won(data[8]);
    }
    else if(data[2] === data[4] && data[4] === data[6] && data[6] !== "" )
    {
        won(data[6]);
    }

  }
  const won = (winner) =>
  {
    setLock(true);
    if(winner === "x")
    {
        titleRef.current.innerHTML = `Congratulations : <img src = '${x_icon}'>`;
    }
    else{
        titleRef.current.innerHTML = `Congratulations : <img src = '${circle_icon}'>`;
    }
    
  }

  const reset = () =>
  {
    setLock(false);
    var data = Array(9).fill("");
    titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
    arr.map((e) =>{
        e.current.innerHTML = "";
    });
  }
  return (
    <div className='container'>
        <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
        <div className='board'>
            <div className='row1'>
                <div className='boxes' ref={arr[0]} onClick={(e)=>toggle(e , 0)} ></div>
                <div className='boxes' ref={arr[1]} onClick={(e)=>toggle(e , 1)}></div>
                <div className='boxes' ref={arr[2]} onClick={(e)=>toggle(e , 2)}></div>
            </div>
            <div className='row2'>
                <div className='boxes' ref={arr[3]} onClick={(e)=>toggle(e , 3)}></div>
                <div className='boxes' ref={arr[4]} onClick={(e)=>toggle(e , 4)}></div>
                <div className='boxes' ref={arr[5]} onClick={(e)=>toggle(e , 5)}></div>
            </div>
            <div className='row3'>
                <div className='boxes' ref={arr[6]} onClick={(e)=>toggle(e , 6)}></div>
                <div className='boxes' ref={arr[7]} onClick={(e)=>toggle(e , 7)}></div>
                <div className='boxes' ref={arr[8]} onClick={(e)=>toggle(e , 8)}></div>
            </div>
        </div>
        <button type="button" class="btn btn-primary" onClick={reset}>Reset</button>
    </div>
  )
}

export default TicTacToe