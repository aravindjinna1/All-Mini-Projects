import {Component} from 'react'

import './styles.css'

export default class BMICal extends Component {

constructor(props){
    super(props)
      this.state ={
        
        height:'',
        weight:'',
        bmiCalResult:'',
        status:''
   }
    this.HandleSubmit = this.HandleSubmit.bind(this);

}


   HandleSubmit(e){
        const { height, weight, status } = this.state;

         e.preventDefault();

          this.setState({
            height:'',
             weight:'',
                   });

         if(!height || !weight){

          return alert("Both inputs should be filled");

         }
         


             const heightVal = height / 100;
             const calHeight =  heightVal *  heightVal;  

             const bmiCal = (weight / calHeight).toFixed(2);

             this.setState({bmiCalResult: bmiCal});

             if(bmiCal < 18.5){
               this.setState({status: "Underweight ☹️"})
             }
             else if(bmiCal >= 18.5 && bmiCal <= 24.9){
               this.setState({status: "Normal 😐"})
             }
             else if(bmiCal >= 25 && bmiCal <= 29.9 ){
                this.setState({status: "Overweight 😟"})
             }
             else if(bmiCal >= 30){
                this.setState({status:"Obese 😖"})
             }
  
      }
 
    render(){
         
         return(

        <div className='container'>
         <h2>BMI Calculator</h2>
         <form onSubmit={ this.HandleSubmit}> 
            

         <label >Height:  
         <input type='number'
          id='height' onChange={(e)=> this.setState({ height: e.target.value})} 
          placeholder='Enter ur Height'
          value={this.state.height}/>
         </label>

         <label htmlFor='weight'>Weight:
         <input type='number'
          id='weight' onChange={(e)=> this.setState({ weight: e.target.value})} 
          placeholder='Enter ur weight'
          value={this.state.weight}/>
         </label>

         <button type='submit'>Calculate</button>
         
         </form> 

         <div id='status'>
          
          { this.state.bmiCalResult? <h1>BMI: {this.state.bmiCalResult} --- BMI Status: {this.state.status} </h1> : "" }
         

         </div>
        </div>

     )

    }
    
}