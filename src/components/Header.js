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
  }, [setCurrency]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{
            color: "#03a9fc",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "4rem",
            transition: "transform 0.2s",
            marginTop: "15px"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Crypto Tracker
        </Navbar.Brand>

        <div className="ml-auto">
          {/* Single Dropdown for currency selection */}
          <Dropdown>
            <Dropdown.Toggle
              variant="basic"
              id="currencyDropdown"
              style={{
                color: 'black',
                marginTop: '8px',
                backgroundColor: '#03a9fc',
                borderColor: '#FFD700',
                float: 'right',
                
              }}
            >
              {currency}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ marginTop: '40px', marginLeft: '86%' }}>
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

