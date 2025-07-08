import { useState, useRef } from 'react';
import  QuizData  from './data';
import  './style.css'

function QuizzApp(){
 
    // let [currentQuestion, setCurrentQuestion] = useState(null)
    const [index, setIndex] = useState(null);
    const [correctAns,setCorrectAns] = useState(0);
    const [hide,setHide] = useState(false);
    const [selected, setSelected] = useState(false);
    // const trueEl = useRef();
    
    const HandleStart = () =>{

        //  setCurrentQuestion(QuizData[0])
         setIndex(0);
         setHide(true);

          
                  
    }
     
                
      const QuestionIncrement=(selected)=>{
            setTimeout(()=>{
            setIndex(prev => prev +1 );
             const correctAns = QuizData[index].answer
             setSelected(selected);

            if( correctAns === selected){
                 setCorrectAns(prev => prev+1);
                //  selected.style.backgroundColor="green"
                
                //  selected.classList.add("corrected");

            }
            },1000)
    }
        

        


    return(
        <div>
            <div id='inpContainer' style={{display:hide? "none" : "block"}}>
            <h2>Start U'r Quizz</h2>    
            <button onClick={HandleStart} >Start</button>
             </div>

            { QuizData[index] && (
                <div id='mainQuizz'>
                {index !== null && (
                <div className='QuestionsContent' >
            <h3>{QuizData[index].question}</h3>
            {QuizData[index].options.map((opt,ind) => (

                <div key={ind}  onClick={(e)=>{QuestionIncrement(opt);
                    
                }} className='options' style={{backgroundColor:selected && opt === QuizData[index].answer ? "green" : "", pointerEvents: selected ? 'none' : 'auto',}}>{opt}</div>
             ))} 
             </div>
             )}
           
         </div> ) }
         {/* {  QuizData[index] > QuizData.length &&( */}
               
            <div id='Result-box' style={{display: index === QuizData.length ? "block" : "none"}}>
            <h2>Result: {correctAns}/{QuizData.length}</h2>
            <button onClick={HandleStart}>Restart</button>
           </div>
        {/* //  )
            
         
        //  } */}
         
            
        </div>
    )



}
export default QuizzApp;