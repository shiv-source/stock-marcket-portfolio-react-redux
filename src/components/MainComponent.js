import React from "react";
import { connect } from "react-redux";
import { fetchStocks } from "../redux/ActionCreators";
import { Row, Col, NavbarToggler, Button, Navbar, Progress } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    stock: state.stock,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: () => {
    dispatch(fetchStocks());
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: null,
    };
    this.stockData = this.stockData.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  stockData() {
    let stock = this.props.stock.stock;
    let sum = 0;

    if (stock.length > 0) {
      stock.forEach((result) => {
        let investedAmount = (result.quantity * result.avg_price).toFixed(2);
        sum += parseFloat(investedAmount);
      });

      const newArr = [];
      stock.map((data) => {
        let invested = (data.quantity * data.avg_price).toFixed(2);
        let pL = data.quantity * (data.price - data.avg_price);
        let returnPercentage = (pL / parseFloat(invested)) * 100;
        let percentageOfPortfolio = (parseFloat(invested) / sum) * 100;

        const eachStockData = {
          id: data.id,
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          avg_price: data.avg_price,
          invested: invested,
          percentageOfPortfolio: percentageOfPortfolio.toFixed(2),
          pL: pL.toFixed(2),
          returnPercentage: returnPercentage.toFixed(2),
        };

        newArr.push(eachStockData);
      });
      const data = {
        stocks: newArr,
        sum: sum,
      };
      return data;
    } else {
      return null;
    }
  }

  render() {
    const renderStocksView = () => {
      const stockData = this.stockData();
      if (stockData !== null) {
        const stocks = stockData.stocks;
        const stockList = stocks.map((data) => {
          return (
            <div key={data.id} className="stcksDetails">
              <Row className="mt-2">
                <Col sm={12}>
                  <Row>
                    <Col className="col align-self-center">
                      <Navbar color="faded" light>
                        <NavbarToggler className="mr-2" />
                      </Navbar>
                    </Col>
                    <Col className="col align-self-center">
                      <Row>{data.name} </Row>
                      <Row>$ {data.price}</Row>
                    </Col>
                    <Col className="col align-self-center">
                      <Row>iShares</Row>
                      <Row>
                        <b>S&P 500 Index</b>
                      </Row>
                      <Row>US Equity</Row>
                    </Col>
                    <Col sm={2} className="mt-2 mb-2">
                      <Row>
                        <Col>Quantity</Col>
                        <Col>{data.quantity} </Col>
                      </Row>
                      <Row>
                        <Col>Avg. Cost </Col>
                        <Col>$ {data.avg_price}</Col>
                      </Row>
                      <Row>
                        <Col>Invested Amt </Col>
                        <Col>$ {data.invested}</Col>
                      </Row>
                    </Col>
                    <Col sm={3} className="mt-2 mb-2">
                      <Row>
                        <Col> Market Value</Col>
                        <Col>$ {data.price * data.quantity}</Col>
                      </Row>
                      <Row>
                        <Col> % of Portfolio value</Col>
                        <Col>{data.percentageOfPortfolio}%</Col>
                      </Row>
                      <Row>
                        <Col className="mt-4">
                          <Progress
                            color="success"
                            value={data.percentageOfPortfolio}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={3} className="col align-self-center">
                      <Row>
                        <Col>Unrealized P/L </Col>
                        <Col>$ {data.pL} </Col>
                      </Row>
                      <Row>
                        <Col>% Return</Col>
                        <Col>{data.returnPercentage} % </Col>
                      </Row>
                      <Row>
                        <Col className="mt-5">
                          <Progress
                            color="success"
                            value={data.returnPercentage}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="col align-self-center">
                      <Row>
                        <Button
                          outline
                          color="danger"
                          style={{ width: "60px" }}
                        >
                          BUY
                        </Button>
                      </Row>
                      <Row className="mt-2">
                        <Button
                          outline
                          color="danger"
                          style={{ width: "60px" }}
                        >
                          SELL
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                {/* <Col sm={2}></Col> */}
              </Row>
            </div>
          );
        });

        return stockList;
      }
    };

    const renderTableData = () => {
      const stockData = this.stockData();

      if (stockData !== null) {
        let stocks = stockData.stocks;
        const stockList = stocks.map((data) => {
          return (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td className="text-center">{data.name}</td>
              <td className="text-center">{data.quantity}</td>
              <td className="text-center">$ {data.price}</td>
              <td className="text-center">$ {data.avg_price}</td>
              <td className="text-center">$ {data.invested}</td>
              <td className="text-center">{data.percentageOfPortfolio} %</td>
              <td className="text-center">$ {data.pL}</td>
              <td className="text-center">{data.returnPercentage} %</td>
            </tr>
          );
        });

        return stockList;
      } else {
        return <tr></tr>;
      }
    };

    const renderView = () => {
      let isLoading = this.props.stock.isLoading;
      if (isLoading) {
        return <RenderLoader />;
      } else {
        return <div></div>;
      }
    };

    return (
      <div className="container">
        <div className="mt-5">{renderStocksView()}</div>
        <div style={{ color: "blue" }} className="text-center mt-5">
          <h2>Stock Market Portfolio Table</h2>
        </div>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Scrip</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Avg.Cost</th>
              <th scope="col">Invested Amount</th>
              <th scope="col">% of Portfolio Value</th>
              <th scope="col">Unrealized P&L</th>
              <th scope="col">% Return</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        {renderView()}
      </div>
    );
  }
}

const RenderLoader = (props) => {
  return (
    <div className="loader">
      <div className="row justify-content-md-center">
        <span className="fa fa-spinner fa-pulse fa-5x fa-fw text-primary"></span>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
