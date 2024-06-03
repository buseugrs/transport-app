import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AddProduct} />
        <Route path="/products" component={ProductList} />
      </Switch>
    </Router>
  );
};

export default App;
