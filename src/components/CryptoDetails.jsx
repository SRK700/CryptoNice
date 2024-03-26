import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Select, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;

    const stats = [
        { title: 'ราคาต่อดอลลาร์สหรัฐ', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'อันดับ', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: 'ปริมาณการซื้อขายรายวัน (24 ชั่วโมง)', value: `$ ${cryptoDetails && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'มูลค่าตลาด', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'ราคาสูงสุดตลอดกาล (เฉลี่ยรายวัน)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'จำนวนตลาด', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'จำนวนแลกเปลี่ยน', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'จำนวนสินค้าที่อนุมัติ', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'จำนวนสินค้าทั้งหมด', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'จำนวนสินค้าที่มีการแจกจ่ายอยู่', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if (isFetching) return <Loader />;

    const time = ['3 ชั่วโมง', '24 ชั่วโมง', '7 วัน', '30 วัน', '1 ปี', '3 เดือน', '3 ปี', '5 ปี'];

    return (
        <Col>
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <Title level={2} className='coin-name'>
                        {cryptoDetails.name}({cryptoDetails.symbol}) ราคา
                    </Title>
                    <p>
                        ราคาสดของ {cryptoDetails.name} ในดอลลาร์สหรัฐ
                        ดูสถิติค่าเงิน, มูลค่าตลาด, และจำนวนสินค้าที่มี
                    </p>
                </Col>
            </Col>
            <Select defaultValue="7 วัน" className='select-timeperiod' placeholder="เลือกช่วงเวลา"
                onChange={(value) => setTimePeriod(value)}>
                {
                    time.map((date) => <Option key={date}>{date}</Option>)
                }
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className='coin-details-heading'>
                            สถิติค่าเงินของ {cryptoDetails.name}
                        </Title>
                        <p>
                            ภาพรวมที่แสดงสถิติของ {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className='coin-details-heading'>
                            สถิติอื่น ๆ
                        </Title>
                        <p>
                            ภาพรวมที่แสดงสถิติของ cryptocurrencies ทั้งหมด
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        คืออะไร {cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        ลิงก์ของ {cryptoDetails.name}
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={9} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreffer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;

