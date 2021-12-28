import React, { Fragment }  from 'react';
import Header from './header/header';
import FlashSale from '../user/flash-Sale/flashSale';

export default function Index() {
    return (
        <Fragment>
            <Header/>
            <FlashSale/>
        </Fragment>
    )
}
