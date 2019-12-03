import React from 'react';
import {Bar, Doughnut, Pie, Polar, Radar, Scatter} from 'react-chartjs-2';
import axios from 'axios';

let response_data = [
];

let labels = []

class TopFiveRetweets extends React.Component {

  constructor(props){
	super(props);
	

    this.state = {
    	chartData :{

      	}
    }
    
  }

  componentWillMount(){
    axios.defaults.withCredentials = true;
    axios.get('/dashboard/getTweets/'+localStorage.getItem('id'))
    .then(response => {
        console.log(response.data)
        response_data = response.data;
        response_data.sort((a, b) => (a.retweets < b.retweets) ? 1 : -1)
        response_data = (response_data.length > 5) ? response_data.slice(0,5) : response_data;
        let data = []  
        let bc = []

        for(let tweet of response_data){
          data.push(tweet.retweets);
          labels.push(tweet.tweet);
          let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
          bc.push(c)
        }
    
        this.setState({
            chartData : {
                labels : labels,
                datasets : [
                    {
                      label : "Retweets",
                      data: data,
                      backgroundColor : bc
                    }
                ]
            }
        });
    })
    .catch(error=>{
        console.log("Error: "+JSON.stringify(error));
    });
  }


  

  
  render(){

    return(
		<div>
			<div className="chart">
				<Pie
					data={this.state.chartData}
					options={
					{
						title:{
							display:true,
							text:`Showing Top 5 Retweeted Tweets`,
							fontSize:25
						},
						legend:{
							display:true,
							position:'bottom'
						}
					}
				}
				/>
			</div>


		</div>
    )
  }
}

export default TopFiveRetweets;
