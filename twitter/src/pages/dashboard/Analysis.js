import React from 'react';
import TopTenViews from './topTenViews.js';
import TopTenLiked from './topTenLiked.js';
import TopFiveRetweets from './topFiveRetweets.js';


function Analysis() {
  return (
    <div className="App">
      <TopTenViews/>
      <TopTenLiked/>
      <TopFiveRetweets/>
    </div>
  );
}

export default Analysis;
