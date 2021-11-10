import React, { Component } from 'react';
import axios from 'axios';
export default class Banner extends Component{
    //constructor 
    constructor(){
        // to get the this of the class
        super();
        this.state = {
          movieBanner:{}
        }
    }
    
    //when the render function will be finished this function will run
     async componentDidMount(){
        const res = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=cce90a0a7dc84fa808c4485d3ae3f993");
        let data = res.data.results[0];
        this.setState({
          //using the spread operator to spread the object data
          movieBanner: {...data}
        })
        console.log('mounting done');
    }

    render() {
        return (
        <>
        {/* Put curly braces while writing javascript logic in JSX */}
        {
          //checking if the object is empty
          Object.keys(this.state.movieBanner).length === 0?
          //loading the loader
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>:
          //otherwise loading the banner of the movie
                <div className="card banner">
                  <img src={`https://image.tmdb.org/t/p/original${this.state.movieBanner.backdrop_path}`} className="card-img-top bannerImage" alt="..."/>
                  <div className ="card-body">
                  <h5 className ="card-title bannerTitle">{this.state.movieBanner.original_title}</h5>
                  <p className ="card-text bannerText">{this.state.movieBanner.overview}</p>
                  </div>
                </div>
        }
        </>
        );
    }
}
