import {useEffect, useState} from 'react';

import  './style.css'


export default function App(){
       
    
      //  const [updateData, setupdateData] = useState([]);
       const [remaining, setRemaining] = useState(0);
       const [store,setStore] = useState(()=>{
         const stored = localStorage.getItem("item");
         return stored ? JSON.parse(stored) : []; 

       })
       const [Data, setData] = useState({
        
         title:"",
         amount:"",
         category:"",
         date:"",

        } );
        


        const handleInp=(e)=>{
           const {name, value} = e.target;
           setData(prevState => ({...prevState, [name]:value}));
           

     
        };
        const HandleSubmit=(e)=>{
           
          e.preventDefault();

           if(!Data.title.trim() || !Data.amount.trim()){
             alert("Must fill the inputs");
             return;
           }
            const updateData  = [...store, Data];
 
            localStorage.setItem("item", JSON.stringify(updateData));
            setStore(updateData);
          
            setData({
         title: "",
         amount: "",
         category: "",
         date: "",
    });

  };
        const deleteItem=(e,index)=>{
          const del =  store.filter((_, i) => i !== index)

          localStorage.setItem("item", JSON.stringify(del));
          setStore(del);

        }
            // const [items,setItems] = useState([]);
            // const arr=[];
         useEffect(()=>{  

            // const stored = JSON.parse(localStorage.getItem("item"))||[];
            // arr.push(stored);

            const totalAmount = store.reduce((acc, re) => 
              re.category == "Income" ? acc + Number(re.amount)
              : acc - Number(re.amount) , 0);

            
            console.log("totalAmount", remaining); // This will show correct result
             setRemaining(totalAmount);
            },[store]);

        
        
    return(

        
        <div className='container'> 
       
        <div id='main'>
        <h1>Expense Tracker</h1>
        <h2>Remain: {remaining}</h2>
           
            <form id="formInputs" onSubmit={HandleSubmit}>
                <label htmlFor="title">Title: </label>
                <input id='title' 
                 type='text'
                 name='title'
                 value={Data.title}
                 placeholder='Enter title'
                 onChange={handleInp}/>
                  
                 <label htmlFor="Amount">Amount:</label> 
                <input type='number'
                name='amount'
                 id='Amount'
                 value={Data.amount}
                  placeholder='Amount'
                  onChange={handleInp}/>

                <label htmlFor="choose">Choose:</label>
                <select 
                onChange={handleInp}
                 name='category'
                 value={Data.category} required>
                    <option value="" defaultChecked >Select</option>
                    <option value="Income" >Income</option>
                    <option value="Expense">Expense</option>
                </select>
              
                {/* <label htmlFor='date'>Date: </label>
                <input type='date' 
                name='date' value={Data.date} 
                onChange={handleInp}/> */}

                <button type='submit'>submit</button>
              </form>
              </div>
            

           
  {/* {store.map((item,index) => (
  //   <div className='data'  key={index}>  {/* Better key */}
       {/* <h2>Title: {item.title}</h2>
  //     <h3>Amount: {item.amount}</h3>
  //     <h3>Category: {item.category}</h3>
  //     <button onClick={(e)=> deleteItem(e,index)}>Del</button>
  //   </div>
  // )) } */} 
       
       <table className='data-table'>
        <thead>
          <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {store.map((item,index)=>(
            <tr key={index} className='data-row'>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={(e)=>deleteItem(e,index)} className='delete-btn'>Delete</button>
              </td>
            
            </tr>
          ))}
        </tbody>
       </table>
       
       <style jsx>{`
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  
  .data-table th, 
  .data-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .data-table th {
    background-color:rgb(120, 120, 120);
    font-weight: bold;
  }
  
  .data-row:hover {
    background-color:rgb(120, 120, 120);
  }
  
  .delete-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .delete-btn:hover {
    background-color: #cc0000;
  }
`}</style>





       </div>
           
        
    )
   
}