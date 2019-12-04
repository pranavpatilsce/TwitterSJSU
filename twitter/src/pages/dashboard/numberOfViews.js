import React from 'react';
import {Bar, Doughnut, Polar, Line, Radar, Bubble} from 'react-chartjs-2';
import axios from 'axios';

let response_data = [
];

let labels = []

class NumberOfViews extends React.Component {

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
        
        let bc = []

        let lastDay = 0;
        let lastMonth = 0; 
        let lastYear = 0;

        let today = new Date();

        for(let tweet of response_data){

            let viewDates = tweet.viewDate;
            console.log(viewDates);
            for(let date of viewDates){
                let tweetDate = date.split('-');
                
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
        }
        console.log("Uppar");
        let data =[lastDay, lastMonth, lastYear];
        let labels = ["Last Day", "Last Month", "Last Year"];
        for(let i = 0; i <3; i++){
            bc.push("#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)));
        }
        console.log("Neeche");
        this.setState({
            chartData : {
                labels : labels,
                datasets : [
                    {
                        label : "View Count",
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
				<Polar
					data={this.state.chartData}
					options={
					{
						title:{
							display:true,
							text:`Profile Views per Day / Month / Year`,
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

export default NumberOfViews;
