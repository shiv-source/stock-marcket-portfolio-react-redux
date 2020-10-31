import React from "react";
import { connect } from "react-redux";
import { fetchStocks } from "../redux/ActionCreators";

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
    this.renderTableData = this.renderTableData.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  renderTableData() {
    let stock = this.props.stock.stock;
    if (stock.length > 0) {
      var sum = 0;
      stock.forEach((result) => {
        let investedAmount = (result.quantity * result.avg_price).toFixed(2);
        sum += parseFloat(investedAmount);
      });

      const stocks = stock.map((data) => {
        let invested = (data.quantity * data.avg_price).toFixed(2);
        let pL = data.quantity * (data.price - data.avg_price);
        let returnPercentage = (pL / parseFloat(invested)) * 100;
        let percentageOfPortfolio = (parseFloat(invested) / sum) * 100;

        return (
          <tr key={data.id}>
            <th  scope="row">{data.id}</th>
            <td className="text-center">{data.name}</td>
            <td className="text-center">{data.quantity}</td>
            <td className="text-center">$ {data.price}</td>
            <td className="text-center">$ {data.avg_price}</td>
            <td className="text-center">$ {invested}</td>
            <td className="text-center">{percentageOfPortfolio.toFixed(2)} %</td>
            <td className="text-center">$ {pL.toFixed(2)}</td>
            <td className="text-center">{returnPercentage.toFixed(2)} %</td>
          </tr>
        );
      });
      return stocks;
    } else {
      return <tr></tr>;
    }
  }

  render() {
   
    const renderView = () => {
      let isLoading = this.props.stock.isLoading
      if(isLoading){
        return (
          <RenderLoader />
        )
      }
      else{
        return (
         
            <div></div>
        )
      }
        
    }

    return (
      <div className="container">
        <div style={{color : "blue"}} className="text-center mt-5">
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
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {renderView()}
      </div>
    );
  }
}

const RenderLoader = (props) => {
  return(
    <div className="loader">
        <div className="row justify-content-md-center">
        <span className="fa fa-spinner fa-pulse fa-5x fa-fw text-primary"></span>
    
      </div>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);