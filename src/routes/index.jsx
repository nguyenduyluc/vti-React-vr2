import { Card, Space, Typography } from 'antd';
import { Col, Row } from 'antd';
import Slice from '../slide/Slide';

import Chart from './../chart/Chart';

const { Text, Link, Title } = Typography;

export default function Index() {
  const user = localStorage.getItem('user');
  return (
    <>
      <Text type="success">Welcome back</Text>
      <Title level={2}>{user ? `${user} !` : ''}</Title>

      <Row style={{ border: '1px solid gray' }}>
        <Col span={16}>
          <section style={{ height: '300px' }}>
            <Chart />
          </section>
        </Col>
        <Col span={8}>
          <section style={{ height: '300px' }}>
            <Card title="Laba (YtD)" extra={<a href="https://vtireactjs.web.app/">Laba (YtD)</a>}>
              <Text type="danger"><Title level={3}>100.01%</Title></Text>
              <Text type="danger">IDR 1.800 M Year to Date</Text>
              <p>21 Mei 23 to GS 2023</p>
            </Card>
          </section>
        </Col>
      </Row>

      
        <Slice />
    </>
  );
}