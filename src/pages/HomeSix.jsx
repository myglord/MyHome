import React from 'react';

import Header from './../common/Header';
import PropertyFilterHero from '../components/PropertyFilterHero';
import Banner from '../components/Banner';
import Footer from '../common/Footer';
import MobileMenu from '../common/MobileMenu';
import OffCanvas from '../common/OffCanvas';
import PageTitle from '../common/PageTitle';

const HomeSix = () => {
    return (
        <>
        <PageTitle title="Solution Inc- Home Six" />

            <OffCanvas/>
            <MobileMenu/>
            
            <main className="body-bg">

                {/* Header */}
                <Header 
                    headerClass="" 
                    logoBlack={true}
                    logoWhite={false}
                    headerMenusClass=""
                    btnClass="btn btn-outline-light d-lg-block d-none"
                    btnLink="/property"
                    btnText="Sell Property"
                    spanClass="icon-right text-gradient" 
                    showHeaderBtn={true}
                    showOffCanvasBtn={true}
                    offCanvasBtnClass=""
                    showContactNumber={false}
                />

                {/* Property Filter - First thing users see */}
                <PropertyFilterHero/>

                {/* Banner */}
                <Banner/>

              
                {/* Footer */}
                <Footer/>
                
            </main>   
        </>
    );
};

export default HomeSix;