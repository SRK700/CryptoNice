import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data.stats;

  if (isFetching) return <Loader />;

  return (
    <main>
      {/* แสดงส่วนของสถิติโลกเกี่ยวกับ cryptocurrencies */}
      <Title level={2} className="heading">
        สถิติโลกเกี่ยวกับ Crypto
      </Title>
      <Row>
        <Col span={12}>
          {" "}
          <Statistic
            title="จำนวน Cryptocurrencies ทั้งหมด"
            value={globalStats.total}
          />{" "}
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="จำนวน Exchanges ทั้งหมด"
            value={millify(globalStats.totalExchanges)}
          />{" "}
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="มูลค่าตลาดรวมทั้งหมด"
            value={millify(globalStats.totalMarketCap)}
          />{" "}
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="ปริมาณการซื้อขายในระยะเวลา 24 ชั่วโมง"
            value={millify(globalStats.total24hVolume)}
          />{" "}
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="จำนวน Markets ทั้งหมด"
            value={millify(globalStats.totalMarkets)}
          />{" "}
        </Col>
      </Row>
      {/* แสดงส่วนของ Top 10 cryptocurrencies */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          สกุลเงินดิจิตอล 10 อันดับแรกในโลก
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/cryptocurrencies"}>ดูเพิ่มเติม</Link>
        </Title>
      </div>
      {/* แสดง Cryptocurrencies component */}
      <Cryptocurrencies simplified />
      {/* แสดงส่วนของ Latest Crypto News */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          ข่าวล่าสุดเกี่ยวกับ Crypto
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/news"}>ดูเพิ่มเติม</Link>
        </Title>
      </div>
      {/* แสดง News component */}
      <News simplified />
    </main>
  );
};

export default Homepage;
