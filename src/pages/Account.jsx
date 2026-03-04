import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Breadcrumb from '../common/Breadcrumb';
import Cta from '../components/Cta';
import AccountSection from '../components/AccountSection';
import PageTitle from '../common/PageTitle';
import { useAuth } from '../contextApi/AuthContext';

const Account = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
            return;
        }
        if (!user && !location.state?.userData) {
            navigate('/login');
        }
    }, [user, isAdmin, location.state, navigate]);

    return (
        <>
        <PageTitle title="Solution Inc- Account Page" />

        <main className="body-bg">
            
            {/* Header */}
            <Header 
                headerClass="dark-header has-border" 
                logoBlack={false}
                logoWhite={true}
                headerMenusClass="mx-auto"
                btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                btnLink="/add-new-listing"
                btnText="Add Listing"
                spanClass="icon-right text-gradient" 
                showHeaderBtn={true}
                showOffCanvasBtn={false}
                offCanvasBtnClass=""
                showContactNumber={false}
            />

            {/* BreadCrumb */}
            <Breadcrumb 
                pageTitle="Account"
                pageName="Account"
            />

            {/* Account Section */}
            <AccountSection/>    

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>

        </main>   
        </>
    );
};

export default Account;