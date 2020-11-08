import React, { useEffect, useState } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(category));
  }, [dispatch]);

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
      setSortOrder(e.target.value);
      dispatch(listProducts(category,searchKeyword, sortOrder));
  }
  return (
      <div className="content">
      {category && <h2>{category}</h2>}
      <ul className="filter">
          <li>
              <form onSubmit={submitHandler}>
                  <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} type="text"/>
                  <button type="submit">Search</button>
              </form>
          </li>
          <li>
            Sort By {' '}
              <select name="sortOrder" onChange={sortHandler}>
                  <option value="">Newest</option>
                  <option value="">Newest</option>
                  <option value="">Newest</option>
              </select>
          </li>
      </ul>
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
