import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Col,Row,Typography } from 'antd'
Chart.register(...registerables);

const {Title} = Typography

const LineChart = ({coinHistory,currentPrice,coinName}) => {
    const coinPrice = []
    const coinTimestamp =[]
    // console.log(coinHistory)

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }
    
      for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleTimeString());
    }
    const data = {
        labels: coinTimestamp,
        datasets:[
            {
                label:'Price in USD',
                data:coinPrice,
                fill:false,
                backgroundColor:"#0071BD",
                borderColor:"#0071BD",
            }
        ]
    }
    const option = {
        scales:{
            yAxes: [
                {
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]
        }
    }
  return (
   <>
    <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
            <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
            <Title level={5} className="current-price">Current {coinName} Price : $ {currentPrice}</Title>
        </Col>
    </Row>
    <Line data={data} option={option}/>
   </>
  )
}

export default LineChart