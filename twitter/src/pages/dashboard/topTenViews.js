import React from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Scatter, Radar, HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';

let response_data = [
];

let labels = []

class TopTenViews extends React.Component {

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
		
		

		response_data.sort((a, b) => ((a.views < b.views) )? 1 : -1);
		response_data = (response_data.length > 10) ? response_data.slice(0,10) : response_data;

        let bc = []
		let data = []
		for(let tweet of response_data){
			data.push(tweet.views);
			labels.push(tweet.date);
			let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
          	bc.push(c)
		}
	
		this.setState({
			chartData : {
				labels : labels,
				datasets : [
					{
						label : "Views",
						data: data,
						backgroundColor : bc
					}
				]
			}
		})
		console.log(data);
    
    })
    .catch(error=>{
        console.log("Error: "+JSON.stringify(error));
    });
  }


  

  
  render(){

    return(
		<div>
			<div className="chart">
				<HorizontalBar
					data={this.state.chartData}
					options={
					{
						title:{
							display:true,
							text:`Showing Top 10 Viewed Tweets`,
							fontSize:25
						},
						legend:{
							display:true,
							position:'bottom'
						},
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    min: 0  
                                }
                              }]
                        }
					}
				}
				/>

			</div>


		</div>
    )
  }
}

export default TopTenViews;
