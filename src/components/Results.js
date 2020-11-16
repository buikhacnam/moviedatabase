import React from 'react';
import Result from './Result';

function Results({ results, openPopup }) {
    if (results.length === 0) {
        return( <div>
                 
        </div>
        )

    }
    
    return (
        <section className="results">
            {results.map(result=> {
              return  <Result key={result.imdbID} result={result} openPopup={openPopup}/>
            })}
        </section>
    )
    
}

export default Results
