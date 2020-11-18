import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

import axios from 'axios'

function App() {
  const apiurl = "https://www.omdbapi.com/?apikey=1dfa35e4";
  const starWar = "https://www.omdbapi.com/?apikey=1dfa35e4&s=star wars";
  const [state, setState] = useState({
    s: "",
    results: [],
    resultsFirst: [],
    loading: true,
    selected: {},
    nothing: false
  })

  useEffect(() => {
    axios(starWar)
    .then(({data}) => {
      let results = data.Search;
      console.log(results);
      setState(prevState => {
        return {  
              prevState,         
             results
          }
       })
    })
  }, [])

  //console.log(state);

  const search = (e) => {
    if (e.key === "Enter" && (state.s)) {
      axios(apiurl + "&s=" + state.s)
      .then((data) => {
        let initialResult = data;
        let results = "";
        if (data.data.Search) {
          results = data.data.Search;
        }

       
        console.log(results);
        console.log(typeof(initialResult));
        setState(prevState => {
          return {
            ...prevState,
            loading: false,
            results
          }
        })
      });
    } 
  }

  const handleInput = (e) => {
    let s = e.target.value;
    if (s) {
    setState(prevState => {
      return { 
        ...prevState, 
        
        s
      }
    })
  }
    //console.log(state.s)
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({data}) => {
      let result = data;
      console.log(result);
      if (result) {
      setState(prevState => {
          return {
            ...prevState,
            selected: result
          }
      })
      }
    })
  
  }

  const closePopup = () => {
    setState(prevState => {
      return {
        ...prevState,
        selected: false
      }
    })
  }

  console.log(typeof (state.selected))

  return (
    <div className="App">
      <header>
       <h1>Movie Database</h1>
      </header>
      <main>
          <Search handleInput={handleInput} search={search} />
         
         { (state.results)?
            <Results results={state.results} openPopup={openPopup}/> :
            <div className="no-result">
              <h1>no result</h1>
            </div>

         }
           
        
          
          {(state.selected) &&
            <Popup selected={state.selected} closePopup={closePopup} /> 
            
          }
           
            
        

      </main>
    </div>
  );
}

export default App;

/*
 <Results results={state.results} openPopup={openPopup}/> 

   {(typeof state.selected.Title !== "undefined") ?
            <Popup selected={state.selected} closePopup={closePopup} /> :
            false
          }

*/