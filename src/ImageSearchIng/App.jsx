import { Component } from "react";

import './style.css'

import axios from 'axios';

export default class ImgSearchApp extends Component {

    //  ApiKey = "WLjzO6ZZ8ajRPhFGh3uU5RkN1K4dGUtM6MYc2kKf77tIv8RgXnTfI9vm";
    //  apiUrl="https://api.pexels.com/v1/search?query=people";
    state = {
        inpValue: "",
        Resultdata: []

    }
    handleSearch = async (e) => {
         
        // axious.get("https://api.pexels.com/v1/search?query=${this.state.inpValue}&per_page=25`")
        try{

       
        const response =  await axios.get(`https://api.pexels.com/v1/search?query=${this.state.inpValue}&per_page=25`, {
            headers: {
                Authorization: "WLjzO6ZZ8ajRPhFGh3uU5RkN1K4dGUtM6MYc2kKf77tIv8RgXnTfI9vm"
            }
         });

        // fetch(`https://api.pexels.com/v1/search?query=${this.state.inpValue}&per_page=15`, {
        //     headers: {
        //         Authorization: "WLjzO6ZZ8ajRPhFGh3uU5RkN1K4dGUtM6MYc2kKf77tIv8RgXnTfI9vm"
        //     }
        // })

            // .then(response => response.json())
            // // .then(data => console.log(data))
            // .then(data => this.setState({ Resultdata:data.photos|| [] }))

            this.setState({ Resultdata: response.data.photos|| []});

             }
             catch(error){
                 console.error("error while fetching data", error);
             }
    

    };


    render() {

        const { Resultdata } = this.state;

        return (
            <div className="container">
                <div id="inputsContainer">
                    <label htmlFor="inp">search..</label>
                    <input type="text"
                        id="inp"
                        placeholder="search for Img...."
                        onChange={(e) => this.setState({ inpValue: e.target.value })} />

                    <button type="submit" onClick={(e) => this.handleSearch(e)}>Search</button>
                </div>
                   
                   <div className="photos-grid">
                    {Resultdata.map((images) => (

                         <div  key={images.id} 
                         style={{ 
                                borderRadius: "8px", 
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                maxWidth:"500px"
                            }}>

                        <img
                            key={images.id}
                            src={images.src.medium}
                            alt={images.potographer}
                        />
                        </div>
                    ))}
                    </div>
                


            </div>
        )
    }
}