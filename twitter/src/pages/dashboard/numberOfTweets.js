import React from 'react';
import {Bar, Doughnut, Polar, Line, Radar, Bubble} from 'react-chartjs-2';
import axios from 'axios';

let response_data = [
];

let labels = []

class NumberOfTweets extends React.Component {

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
        console.log('data loaded is -------------->',response.data)
        response_data = response.data;
        response_data.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
        response_data = (response_data.length > 10) ? response_data.slice(0,10) : response_data;
        
        let bc = []

        let lastDay = 0;
        let lastMonth = 0; 
        let lastYear = 0;

        let today = new Date();

        for(let tweet of response_data){
            console.log(tweet);
            let tweetDate = tweet.date.split('-');
            
            if(tweetDate[2] == today.getFullYear()){
                lastYear++;
                if(tweetDate[0] == (today.getMonth() + 1)){
                    lastMonth++;
                    if(tweetDate[1] == today.getDate()){
                        lastDay++;
                    }
                }
            }
        }

        let data =[lastDay, lastMonth, lastYear];
        let labels = ["Last Day", "Last Month", "Last Year"];
        for(let i = 0; i <3; i++){
            bc.push("#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)));
        }
    
        this.setState({
            chartData : {
                labels : labels,
                datasets : [
                    {
                        label : "Tweet Count",
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
				<Bar
					data={this.state.chartData}
					options={
					{
						title:{
							display:true,
							text:`Showing Tweets per Day / Month / Year`,
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

export default NumberOfTweets;
