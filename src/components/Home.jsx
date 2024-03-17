import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import ProductCard from "./ProductCard";

function Home(props) {
  const { cart, setCart } = props;

  const { products } = data;

  const [curPage, setCurPage] = useState(1);
  const [curProducts, setCurProducts] = useState([]);
  const productsPerPage = 16;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const idxOfLastProd = curPage * productsPerPage;
    const idxOfFirstProduct = idxOfLastProd - productsPerPage;

    setCurProducts(products.slice(idxOfFirstProduct, idxOfLastProd));
  }, [curPage, products]);

  const paginate = (pageNumber) => setCurPage(pageNumber);

  return (
    <div className="App">
      <div className="header">
        <h2>Select Products</h2>
        <Link to="/cart">
          <button>Checkout</button>
        </Link>
      </div>

      <div className="products">
        {curProducts.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            cart={cart}
            setCart={setCart}
            idx={i}
            curPage={curPage}
            productsPerPage={productsPerPage}
          />
        ))}
      </div>
      <div className="pagination">
        <span>CurPage: {curPage}</span>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
