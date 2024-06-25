import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { numberWithCommas } from '../components/CoinsTable';
import { CryptoState } from '../CryptoContext';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <Spinner animation="border" style={{ color: 'blue' }} />;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center align-items-start">
        <Col md={8} className="text-center mb-4">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
          </div>
          <h3 style={{ fontWeight: 'bold', fontFamily: 'Montserrat', fontSize: '2rem' }}>
            {coin?.name}
          </h3>
          <p style={{ fontFamily: 'Montserrat', textAlign: 'justify', padding: '0 25px', fontSize: '1.8rem' }}>
            {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
          </p>
          <div style={{ padding: '0 25px', fontSize: '1.2rem' }}>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Rank:</span>
              <span style={{ fontFamily: 'Montserrat' }}>
                {numberWithCommas(coin?.market_cap_rank)}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Current Price:</span>
              <span style={{ fontFamily: 'Montserrat' }}>
                {symbol}{' '}
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Market Cap:</span>
              <span style={{ fontFamily: 'Montserrat' }}>
                {symbol}{' '}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </span>
            </div>
          </div>
        </Col>
        <Col md={8} className="mb-4">
          <CoinInfo coin={coin} />
        </Col>
      </Row>
    </Container>
  );
};

export default CoinPage;

