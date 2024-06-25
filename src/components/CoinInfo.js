import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true); // State for loading indicator

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Handle error and set loading to false
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="container mt-4">
      {loading ? (
        <Spinner animation="border" role="status" variant="warning" style={{ width: "250px", height: "250px" }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <button
                key={day.value}
                className={`btn btn-${day.value === days ? "primary" : "outline-primary"}`}
                onClick={() => {setDays(day.value); setLoading(true);}}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
