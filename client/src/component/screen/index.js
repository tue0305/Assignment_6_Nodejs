import React, { Fragment }  from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import FlashSale from '../user/flash-Sale/flashSale';

export default function Index() {
    return (
        <Fragment>
            <Header/>
            <FlashSale/>
            <Footer/>
        </Fragment>
    )
}
