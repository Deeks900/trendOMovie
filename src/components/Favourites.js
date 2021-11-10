import React, { Component } from 'react';
import axios from 'axios';

export default class Favourites extends Component{
    //constructor
    constructor(){
        super();
        this.state = {
            movieList:[],
            genre:[],
            currentGenre:'All Genres',
            currentText:'',
            limit:5,
            currentPage:1
        }

    }

        componentDidMount(){
        let res = JSON.parse(localStorage.getItem("movies")||"[]");
        this.setState({
            movieList: [...res]
        })
        console.log("mounted");
        console.log(this.state.movieList);
      
        let genreIds = {28:'Action', 12:'Adventure', 16:'Animation', 35:'Comedy', 80:'Crime', 99:'Documentary', 18:'Drama', 10751:'Family', 14:'Fantasy', 36:'History', 27:'Horror', 10402:'Music', 9648:'Mystery', 10749:'Roamnce', 878:'Science Fiction', 10770:'TV Movie', 53:'Thriller', 10752:'War', 37:'Western'};
         // We will include those genres in our table whose movies are present
         let temp = [];
         res.map((movieObj)=>{
          if(!temp.includes(genreIds[movieObj.genre_ids[0]])){
            if(genreIds[movieObj.genre_ids[0]] != undefined)
              temp.push(genreIds[movieObj.genre_ids[0]]);
          }
        })
        temp.unshift('All Genres');
        this.setState({genre: [...temp]})
        console.log("temp");
        console.log(this.state.genre);
      }

    handleGenreSelection=(g)=>{
      this.setState({currentGenre: g})
    }
    
    // sorts the movie list in descending order of popularity
    sortPopularityDesc = ()=>{
      let temp = this.state.movieList;
      temp.sort((ma, mb)=>{
        return mb.popularity-ma.popularity;
      })
      this.setState({
        movieList: [...temp]
      })
    }
 
    // sorts the movie list in ascending order of popularity
    sortPopularityAsc = ()=>{
      let temp = this.state.movieList;
      temp.sort((ma, mb)=>{
        return ma.popularity-mb.popularity;
      })
      this.setState({
        movieList: [...temp]
      })
    }

      // sorts the movie list in descending order of rating
      sortRatingDesc = ()=>{
        let temp = this.state.movieList;
        temp.sort((ma, mb)=>{
          return mb.vote_average-ma.vote_average;
        })
        this.setState({
          movieList: [...temp]
        })
      }

    // sorts the movie list in ascending order of rating
    sortRatingAsc = ()=>{
      let temp = this.state.movieList;
      temp.sort((ma, mb)=>{
        return ma.vote_average-mb.vote_average;
      })
      this.setState({
        movieList: [...temp]
      })
    }

    handleDelete = (movieObj)=>{
      let temp = [];
      temp = this.state.movieList.filter((movie)=>movie.id !== movieObj.id);
      this.setState({
        movieList: [...temp]
      })
      localStorage.setItem('movies', JSON.stringify(temp));
    }

    render(){
      let genreIds = {28:'Action', 12:'Adventure', 16:'Animation', 35:'Comedy', 80:'Crime', 99:'Documentary', 18:'Drama', 10751:'Family', 14:'Fantasy', 36:'History', 27:'Horror', 10402:'Music', 9648:'Mystery', 10749:'Roamnce', 878:'Science Fiction', 10770:'TV Movie', 53:'Thriller', 10752:'War', 37:'Western'};
      let filterArray = [];

      // We are searching movie by title
      if (this.state.currentText == '') {
        filterArray = this.state.movieList;
      } 
      else {
        filterArray = this.state.movieList.filter((movieObj) => {
          let title = 'original_title' in movieObj==true ? movieObj.original_title.toLowerCase() : movieObj.name.toLowerCase();
          return title.includes(this.state.currentText.toLowerCase());
        });
      }

      // We are placing movies on the basis of selected Genres
      if(this.state.currentGenre !== "All Genres") {
        filterArray = this.state.movieList.filter(
          (movieObj) =>
            this.state.currentGenre === genreIds[movieObj.genre_ids[0]]
        );
      }
      
      // Pagination part logic
      let noPages = Math.ceil(filterArray.length/this.state.limit);
      //stores the count of pages
      let pageArray = [];
      for(let i = 1; i <= noPages; i++){
        pageArray.push(i);
      }
      let startIndex = ((this.state.currentPage-1)*this.state.limit);
      // Be careful here! Remember that typeOf this.state.limit will become string once I do some change in it
      let endIndex = (startIndex+parseInt(this.state.limit));
      filterArray = filterArray.slice(startIndex, endIndex);
      console.log(filterArray);

      return (
        <>
          {/* dividing the page into two columns as left and right */}
          <div className="container">
            <div className="row" style={{ paddingTop: "40px" }}>
              {/* Left column */}
              <div className="col-lg-3 leftFavourites col-sm-12">
                <ul className="list-group">
                  {this.state.genre.map((g) =>
                    g == this.state.currentGenre ? (
                      <li
                        className="list-group-item"
                        style={{ backgroundColor: "#8115e6e0", color: "white" }}
                      >
                        {g}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        onClick={() => this.handleGenreSelection(g)}
                        style={{
                          backgroundColor: "white",
                          color: "#8115e6e0",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {g}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Right Column */}
              <div className="col-lg-9 RightFavourites col-sm-12">
                {/* input row */}
                <div className="row">
                  <div className="input-group searchGroups" style={{ marginLeft: "22px" }}>
                    <input
                      type="text"
                      onChange={(e) => {
                        this.setState({ currentText: e.target.value });
                      }}
                      value={this.state.currentText}
                      placeholder="Search"
                      className="form-control"
                    />
                    <input
                      type="number"
                      placeholder="Rows Count"
                      value={this.state.limit}
                      onChange={(e)=>this.setState({limit: e.target.value})}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* table row */}
                <div className="row">
                  <table
                    className="table table-striped"
                    style={{ marginLeft: "25px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <i
                            class="fas fa-sort-up"
                            onClick={this.sortPopularityDesc}
                          ></i>
                          Popularity
                          <i
                            class="fas fa-sort-down"
                            onClick={this.sortPopularityAsc}
                          ></i>
                        </th>
                        <th scope="col">
                          <i
                            class="fas fa-sort-up"
                            onClick={this.sortRatingDesc}
                          ></i>
                          Rating
                          <i
                            class="fas fa-sort-down"
                            onClick={this.sortRatingAsc}
                          ></i>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.movieList.length === 0 ? (
                        <span className="visually-hidden">Loading...</span>
                      ) : (
                        filterArray.map((movieObj) => (
                          <tr>
                            <td>
                              <img
                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                className="card-img-top movieImage"
                                alt={movieObj.original_title}
                                style={{
                                  height: "40px",
                                  width: "80px",
                                  paddingLeft: "2px",
                                  paddingRight: "4px",
                                }}
                              />

                              {"original_title" in movieObj == true
                                ? movieObj.original_title
                                : movieObj.name}
                            </td>

                            <td>{genreIds[movieObj.genre_ids[0]]}</td>

                            <td>{movieObj.popularity}</td>

                            <td>{movieObj.vote_average}</td>

                            <td>
                              <button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* pagination */}
          <nav aria-label="Page navigation example pagination">
            <ul className="pagination">
              {
                pageArray.map((p)=>(
                  <li className="page-item">
                    <a className="page-link" style={{cursor:'Pointer'}} onClick={()=>{this.setState({currentPage:p})}}>{p}</a>
                  </li>
                ))
              }
            </ul>
          </nav>
        </>
      );
    }
}