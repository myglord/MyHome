import React from 'react';

import Header from './../common/Header';
import PropertyFilterHero from '../components/PropertyFilterHero';
import Banner from '../components/Banner';
import Footer from '../common/Footer';
import MobileMenu from '../common/MobileMenu';
import OffCanvas from '../common/OffCanvas';
import PageTitle from '../common/PageTitle';

const HomeSeven = () => {
    return (
        <>
        <PageTitle title="Solution Inc- Home Seven" />

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

                {/* Banner */}
                <Banner/>

                {/* Property Filter */}
                <PropertyFilterHero/>

             
                {/* Footer */}
                <Footer/>
                
            </main>   
        </>
    );
};

export default HomeSeven;