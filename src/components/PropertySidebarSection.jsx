import React from 'react';
import Pagination from '../common/Pagination';
import PropertyFilterForm from './PropertyFilterForm';
import PropertyFilterBottom from './PropertyFilterBottom';
import PropertyItem from './items/PropertyItem';
import { usePropertiesData } from '../contextApi/PropertiesDataContext';
import SearchSidebar from '../common/SearchSidebar';

const PropertySidebarSection = () => {
    const { properties, loading } = usePropertiesData();
    return (
        <>
            {/* =========================== Property Sidebar Section Start ====================== */}
            <section className="property bg-gray-100 padding-y-120">
                <div className="container container-two">
                    <div className="property-filter">   
                        <PropertyFilterForm/>
                        <PropertyFilterBottom/>
                    </div>
                    
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            {loading ? (
                                <div className="text-center py-5">Loading properties...</div>
                            ) : (
                            <div className="list-grid-item-wrapper property-item-wrapper row gy-4">
                                {
                                    properties.map((property, index) => {
                                    return (
                                            <div className="col-sm-6" key={index}>
                                                <PropertyItem 
                                                    itemClass="property-item style-two style-shaped"
                                                    btnClass="text-gradient fw-semibold"
                                                    property={property}
                                                    badgeText="Sales"
                                                    badgeClass="property-item__badge"
                                                    iconsClass="text-gradient"
                                                    btnRenderBottom={true}
                                                    btnRenderRight={false}
                                                />
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                            )}
                        </div>
                        <div className="col-lg-4 ps-lg-5">
                            <SearchSidebar/>
                        </div>
                    </div>
                    {/* Pagination */}
                    <Pagination/>
                </div>
            </section>
            {/* =========================== Property Sidebar Section End ====================== */}
        </>
    );
};

export default PropertySidebarSection;