import React, { Fragment, useState, useEffect } from "react";
import Header from "./header/header";
import FlashSale from "../user/flash-Sale/flashSale";
import Loading from "./loading/loading";

export default function Index() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <Header />
            <FlashSale />
          </Fragment>
        )}
      </div>
    </>
  );
}
