import {useEffect,useState} from 'react'

function JokeGen(){
      
    const [data, setData] = useState([]);
      const handleClick= async()=>{
         const response = await fetch("https://v2.jokeapi.dev/joke/Any")
         const data = await response.json();
         setData(data);
         console.log(data);
    }
      const styles={
          container:{
               backgroundColor:"yellow",
               // display:"flex",
               // alignItems:"center",
               // justifyContent:"center",
               width:"500px",
               maxHeight:"400px",
               marginLeft:"70%",
               borderRadius:"8px",
               border:"6px solid white",
           boxShadow: `
           -3px -3px 20px 0 rgba(255, 0, 174, 0.7), 
            2px 2px 20px 0 rgba(0, 255, 255, 0.7)

            
               
        `,     

          },
          button:{
               margin:"30px 200px 0px",
               backgroundColor:"rgb(229, 14, 161)",
               borderRadius:"4px",
               boxShadow:"0px 0px 0px 1px  pink ",
               border:"2px solid pink"
          },
          p:{
              marginLeft:"30px",
              color:"black",
              display:"flex"


          }

     }
     return(
        <div className='container' style={styles.container}>
        <button onClick={(e)=> handleClick(e)} style={styles.button}>Generate</button>

       { <p style={styles.p}> {data.type === "twopart"  ?  `${data.setup} ..... ${data.delivery}` : data.joke }</p>
          
       }

        </div>
     )

  
}
export default JokeGen;