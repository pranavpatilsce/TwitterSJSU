import React from 'react';
import TopTenViews from './topTenViews.js';
import TopTenLiked from './topTenLiked.js';
import TopFiveRetweets from './topFiveRetweets.js';
import {Redirect} from 'react-router';


function Analysis() {
  let redirectVar = null;
      if(!localStorage.getItem('userHandle')){
          redirectVar = <Redirect to= "/"/>
      }
  return (
    <div>
      {redirectVar}
    <div className="App">
      <TopTenViews/>
      <br></br>
      <TopTenLiked/>
      <br></br>
      <TopFiveRetweets/>
    </div>
    </div>
  );
}

export default Analysis;
