import React, { useEffect, useState } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const classes = useStyles();

  useEffect(() => {
    dispatch(listProducts(category));
  }, [category, dispatch]);

  const submitHandler = (e) => {
      e.preventDefault();
      console.log(searchKeyword);
      dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
      setSortOrder(e.target.value);
  }
  return (
      <div className="content">
      {category && <h2>{category}</h2>}
      <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
        <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Search Key Word</InputLabel>
        <BootstrapInput id="demo-customized-textbox" name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)}/>
        </FormControl>
        <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={sortOrder}
          onChange={sortHandler}
          input={<BootstrapInput />}
        >
          <MenuItem value="newest">
            Newest
          </MenuItem>
          <MenuItem value="oldest">
            Oldest
          </MenuItem>
          <MenuItem value="lowest">Lowest</MenuItem>
          <MenuItem value="highest">Highest</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" className={classes.margin} style={{marginTop:'24px'}}>Search</Button>
      {/* <button type="submit">Search</button> */}
        </form>
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
