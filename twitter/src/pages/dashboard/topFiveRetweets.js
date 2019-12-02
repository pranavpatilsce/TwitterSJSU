import React from 'react';
import {Bar} from 'react-chartjs-2';
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

        for(let tweet of response_data){
            labels.push(tweet.tweet);
        }
        let data = []
        for(let tweet of response_data){
            data.push(tweet.retweets);
        }
    
        this.setState({
            chartData : {
                labels : labels,
                datasets : [
                    {
                        label : "Retweets",
                        data: data,
                        backgroundColor : 'rgb(29, 161, 242)'
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
				<Bar
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
							position:'left'
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
