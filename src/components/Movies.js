import React, {Component} from 'react';
import axios from 'axios';
export default class Movies extends Component{
    constructor(){
        super();
        this.state = {
            movies: [],
            hover: '',
            // keep track that how many pages we have loaded till now
            pid: [1],
            currPage: 1,
            favourites: []
        }
    }
    
    async componentDidMount(){
        let res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=cce90a0a7dc84fa808c4485d3ae3f993&page=${this.state.currPage}`);
        let data = res.data.results;
        console.log(data);
        this.setState({
            movies: [...data]
        })
        console.log("mounted");
    }
    handleHover = (movieObj)=>{
      this.setState({
        hover: movieObj.id
      })
    }
    
    changeMovies = async()=>{
      let res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=cce90a0a7dc84fa808c4485d3ae3f993&page=${this.state.currPage}`);
      let data = res.data.results;
      this.setState({
        movies: [...data],
      });
    }

    handleNext = ()=>{
      console.log('next');
      let temp = [];
      temp = [...this.state.pid];
      temp.push(this.state.currPage+1);
      this.setState({
        pid: temp,
        currPage: (this.state.currPage+1)
      }, this.changeMovies)
      
    }

    handlePrevious = ()=>{
      console.log('previous');
      if(this.state.currPage !== 1){
        let temp = [];
        for(let i = 0; i < this.state.pid.length-1; i++){
          temp.push(this.state.pid[i]);
        }
        this.setState({
          pid: [...temp],
          currPage: this.state.currPage-1
        }, this.changeMovies)
      }
     
    }
    
    handlePageClick = (targetPage)=>{
      if(targetPage != this.state.currPage){
        this.setState({
          currPage: targetPage
        }, this.changeMovies)
      }
    }
    
    handleFavourites = (movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem("movies")||"[]");
        if(this.state.favourites.includes(movieObj.id)){
          oldData = oldData.filter((m)=>m.id != movieObj.id);
        }
        else{
          oldData.push(movieObj);
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }

    handleFavouritesState = ()=>{
      let oldData = JSON.parse(localStorage.getItem("movies")||"[]");
      let temp = oldData.map((movieObj)=>movieObj.id)
    
      this.setState({
        favourites: [...temp]
      })
    }
    render(){
        return (
          <>
            {/* check if the movies object are received  */}
            {this.state.movies.length === 0 ? (
              //loader should be loaded
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              /* Using Bootsrap grid system  */
              <div className="container-fluid moviesContainer">
                <div className="row" style={{paddingLeft:'4px'}}>
                  {/* Iterating through all the movies */}
                  {
                    this.state.movies.map((movieObj) => (
                    /* Making columns in a row using breakpoints*/
                    <div className="col-lg-3 col-sm-12 col-md-6 d-flex movieCards">
                      {/* Making bootsrap card in the above columns */}
                      <div
                        className="card movie"
                        onMouseEnter={() => this.handleHover(movieObj)}
                        onMouseLeave={() => this.setState({ hover: "" })}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                          className="card-img-top movieImage"
                          alt={movieObj.original_title}
                        />
                        <div className="card-body border p-0">
                          <h5 className="card-title movieTitle">
                          {"original_title" in movieObj == true
                                ? movieObj.original_title
                                : movieObj.name}
                          </h5>
                          <div className="btn-wrapper movieButtons">
                            {
                              this.state.hover === movieObj.id && (this.state.favourites.includes(movieObj.id)?
                              <a className="btn btn-primary" onClick={()=>{this.handleFavourites(movieObj)}}>Remove from Favourites</a>:
                              <a className="btn btn-primary" onClick={()=>{this.handleFavourites(movieObj)}}>Add to Favourites</a>
                            )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Pagination */}
            <nav aria-label="Page navigation example pagination">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" onClick={this.handlePrevious} style={{cursor:'Pointer'}}>
                    Previous
                  </a>
                </li>
                {/* iterating the array so that links will be created based upon no of pages visited */}
                {this.state.pid.map((page, idx) => (
                  <li className="page-item">
                    <a className="page-link" onClick={()=>this.handlePageClick(page)} style={{cursor:'Pointer'}}>
                      {page}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" onClick={this.handleNext} style={{cursor:'Pointer'}}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        );
    }
}