import React, { useEffect, useState } from "react";
import axios from "axios";
//import CryptoContext from "../CryptoContext";
import { CryptoState } from "../CryptoContext";
//import { Crypto } from "../CryptoContext";
import Pagination from "react-bootstrap/Pagination";
import {
  Container,
  FormControl,
  InputGroup,
  Table,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { CoinList } from "../config/api";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const darkTheme = {
    color: "white",
    backgroundColor: "#14161a",
  };

  return (
    <Container className="mt-4" style={darkTheme}>
      <h4 className="mb-4" style={{ fontFamily: "Montserrat" ,textAlign:'Center' }}>
        Cryptocurrency Prices by Market Cap
      </h4>
<div className="mb-3 d-flex justify-content-center">
      <InputGroup style={{ width: '80%', marginLeft: '74px',marginTop: '20px',marginBottom: '20px'}}>
        <FormControl
          style={{ fontSize: "1.5rem", textAlign: "center", height: '50px' }}
          placeholder="Search For a Crypto Currency.."
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </div>
      <Card>
        {loading && <ProgressBar now={100} variant="warning" />}
        {!loading && (
          <Table striped bordered hover variant="dark">
            <thead style={{ backgroundColor: "#03a9fc" }}>
              <tr>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <th
                    key={head}
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    className={head === "Coin" ? "" : "text-right"}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <tr
                      key={row.name}
                      className="cursor-pointer"
                      style={{ backgroundColor: "#16171a" }}
                    >
                      <td className="d-flex align-items-center">
                        <Link to={`/coins/${row.id}`} className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'white' }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10, marginRight: 10 }}
                          />
                          <div>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <br />
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="text-right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </td>
                      <td
                        className="text-right"
                        style={{
                          color: profit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="text-right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Card>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        />
        <Pagination.Next
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= handleSearch().length / 10}
        />
      </Pagination>
    </Container>
  );
};

export default CoinsTable;

