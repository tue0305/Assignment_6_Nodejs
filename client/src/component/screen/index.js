import React, { Fragment }  from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';

export default function Index() {
    return (
        <Fragment>
            <Header/>
            <Navbar/>
            <Footer/>
        </Fragment>
    )
}
