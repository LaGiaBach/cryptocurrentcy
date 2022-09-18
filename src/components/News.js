import React, {useState} from 'react';
import {Select, Typography, Row, Col , Avatar , Card } from 'antd';
import moment from 'moment';


import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/crytoApi';
import Loader from './Loader';


const {Text , Title} = Typography
const {Option} = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const News = ({simplified}) => {
  const [newCategory, setNewCategory] = useState('Cryptocurrency');

  const {data : cryptoNews } = useGetCryptoNewsQuery({newCategory , count: simplified ? 6 : 20 })
  const { data } = useGetCryptosQuery(100);
  // console.log(data)
  // console.log(cryptoNews)

  if(!cryptoNews?.value) return <Loader/>;
  return (
    <Row gutter={[24,24]} >
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp='children'
            onChange={(value) => setNewCategory(value)}
            filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news , i) => (
        <Col xs={24} sm={12} lg={12} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
              </div>
              <p>
                 {news.description > 100 
                 ? `${news.description.substring(0 , 100)} ... ` 
                 : news.description }
              </p>
              <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                    <Text className="provider-name">{news.provider[0]?.name}</Text> 
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>  
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News