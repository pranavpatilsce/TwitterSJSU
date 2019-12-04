import React from 'react';
import TopTenViews from './topTenViews.js';
import TopTenLiked from './topTenLiked.js';
import TopFiveRetweets from './topFiveRetweets.js';


function Analysis() {
  return (
    <div className="App">
      <TopTenViews/>
      <br></br>
      <TopTenLiked/>
      <br></br>
      <TopFiveRetweets/>
    </div>
  );
}

export default Analysis;
