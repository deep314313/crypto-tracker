import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  // Function to handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Ensure "USD" is set as default currency on component mount
  React.useEffect(() => {
    setCurrency("USD");
  });

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ color: "gold", fontFamily: "Montserrat", fontWeight: "bold", cursor: "pointer" }}>
          Crypto Hunter
        </Navbar.Brand>

        <div className="flex">
          {/* Single Dropdown for currency selection */}
          <Dropdown >
            <Dropdown.Toggle variant="warning" id="currencyDropdown" style={{ color: 'black', marginTop: '8px', float: 'right'}} >
              {currency}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{float:'Right' , marginTop: '8px'}}>
              <Dropdown.Item onClick={() => handleCurrencyChange("USD")}>
                USD
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCurrencyChange("INR")}>
                INR
              </Dropdown.Item>
              {/* Add more currencies as needed */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
