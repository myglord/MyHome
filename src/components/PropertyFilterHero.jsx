import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyFilterContext } from '../contextApi/PropertyFilterContext';

const PropertyFilterHero = () => {
  const {
    dataStatus,
    handleDataStatusChange,
    dataType,
    handleDataTypeChange,
    dataLocation,
    handleDataLocationChange,
  } = useContext(PropertyFilterContext);
  const navigate = useNavigate();

  const handleFindProperties = (e) => {
    e.preventDefault();
    navigate('/property');
  };

  return (
    <section className="property-filter-hero padding-y-80">
      <div className="container container-two">
        <div className="property-filter-hero__card bg-white rounded-3 shadow-sm p-4 p-lg-5">
          <h2 className="property-filter-hero__title text-center mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-center text-muted mb-4">
            Answer a few questions to discover properties that match your needs
          </p>
          <form onSubmit={handleFindProperties}>
            <div className="row g-4 justify-content-center">
              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold">What are you looking for?</label>
                <select
                  className="form-select common-input"
                  value={dataStatus}
                  onChange={handleDataStatusChange}
                >
                  <option value="All">All</option>
                  <option value="Rent">Rent</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold">Property type?</label>
                <select
                  className="form-select common-input"
                  value={dataType}
                  onChange={handleDataTypeChange}
                >
                  <option value="All">All types</option>
                  <option value="Houses">Houses</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Office">Office</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold">Where?</label>
                <select
                  className="form-select common-input"
                  value={dataLocation}
                  onChange={handleDataLocationChange}
                >
                  <option value="All">All locations</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Japan">Japan</option>
                  <option value="Korea">Korea</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Germany">Germany</option>
                  <option value="Thailand">Thailand</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6 d-flex align-items-end">
                <button type="submit" className="btn btn-main w-100">
                  Find Properties
                  <span className="icon-right ms-2"><i className="fas fa-search"></i></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PropertyFilterHero;
