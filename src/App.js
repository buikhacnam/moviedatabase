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
    selected: {},
  })

  const search = (e) => {
  
    if (e.key === "Enter" && (state.s)) {
      setState(prev => {
        return {...prev, loading: true}
      })
      axios(apiurl + "&s=" + state.s)
      .then((data) => {
        let results = "";
        if (data.data.Search) {
          results = data.data.Search;
        }
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
 
  }

  const openPopup = id => {
    setState(prev => {
      return {...prev, loading: true}
    })
    axios(apiurl + "&i=" + id).then(({data}) => {
      let result = data;
      console.log(result);
      if (result) {
      setState(prevState => {
          return {
            ...prevState,
            selected: result,
            loading: false,
          }
      })
      }
    })
  
  }

  const closePopup = () => {
    setState(prevState => {
      return {
        ...prevState,
        selected: {},
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

          {state.loading && <h1 style={{color: "#ffffff", textAlign: 'center'}}>Loading...</h1>}

         { (state.results)?
            <Results results={state.results} openPopup={openPopup}/> :
            <div className="no-result">
              <h1>no result</h1>
            </div>
         } 
          {!(Object.keys(state.selected).length === 0 && state.selected.constructor === Object) &&
            <Popup selected={state.selected} closePopup={closePopup} /> 
          }
          
      </main>
    </div>
  );
}
//Object.keys(state.selected).length === 0 && state.selected.constructor === Object
export default App;

