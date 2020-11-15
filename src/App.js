import React, { useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import axios from 'axios'

function App() {
  const apiurl = "https://www.omdbapi.com/?apikey=1dfa35e4";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  })

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s)
      .then((data) => {
        let initialResult = data;
        let results = data.data.Search;
        console.log(initialResult);
        console.log(typeof(initialResult));
        setState(prevState => {
          return {
            ...prevState,
            results
          }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { 
        ...prevState, 
        s
      }
    })

    //console.log(state.s)
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({data}) => {
      let result = data;
      console.log(result);
      
      setState(prevState => {
          return {
            ...prevState,
            selected: result
          }
      })
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return {
        ...prevState,
        selected: {}
      }
    })
  }

  return (
    <div className="App">
      <header>
       <h1>Movie Database</h1>
      </header>
      <main>
          <Search handleInput={handleInput} search={search}/>
          <Results results={state.results} openPopup={openPopup}/>

          {(typeof state.selected.Title !== "undefined") ?
            <Popup selected={state.selected} closePopup={closePopup} /> :
            false
          }

      </main>
    </div>
  );
}

export default App;
