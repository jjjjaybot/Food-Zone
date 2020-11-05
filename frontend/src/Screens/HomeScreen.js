import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'

export default function HomeScreen(props) {

  // const [products, setProduct] = useState([]);
  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(listProducts());    
    return () => {
    }
  }, []);

    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : 
        <ul className="products">
      {
        products.map(product => <li key={product._id}>
          <div className="product">
            <img className="product-image" src="/imges/d1.jpg" alt="images"/>
            <div className="product-name">
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars</div>
          </div>
        </li>)
      }
    </ul>
}
