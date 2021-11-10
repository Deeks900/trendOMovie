import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    //class has this function
    render(){
        return(
            <>
                <div style = {{
                    display: 'flex',
                    paddingLeft: '2rem',
                    paddingTop: '0.8rem',
                }}>
                    <Link to = '/' style = {{textDecoration: 'none', color:'#8115e6e0'}}><h1 className='navbarHeading'><i className="fas fa-compact-disc navbarIcon"></i>TrendOMovies</h1></Link>
                    <Link to = '/Favourites' style = {{textDecoration: 'none', color:'#8115e6e0', fontFamily:'roboto', paddingLeft: '3rem', marginTop: '0.6rem'}}><h3 className='navbarText'>Favourites</h3></Link>  
                </div>
                
            </>
        )
    }

}
