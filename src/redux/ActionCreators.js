import * as ActionTypes from "./ActionTypes";
import axios from 'axios';
import { apiURL } from '../config/apiURL';

export const fetchStocks = () => (dispatch) =>{
    axios.get(apiURL + 'stocks')
    .then( (res) => {
        let data = res.data;
        dispatch(addStock(data))
    } )
    .catch((err) => console.log(err))

}





export const addStock = (stock) => ({
  type: ActionTypes.ADD_STOCKS,
  payload: stock,
});
