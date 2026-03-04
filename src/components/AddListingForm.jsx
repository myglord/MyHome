import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../api/api';
import { useAuth } from '../contextApi/AuthContext';
import ListingBasicInformation from '../common/ListingBasicInformation';
import ListingPropertyGallery from '../common/ListingPropertyGallery';
import ListingPropertyInformation from './ListingPropertyInformation';
import ListingContactDetails from '../common/ListingContactDetails';

const AddListingForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const getVal = (form, id) => {
    const el = form.querySelector(`#${id}`);
    return el ? el.value.trim() : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;

    const title = getVal(form, 'propertyTitle');
    const price = getVal(form, 'Price');
    if (!title) {
      toast.error('Property title is required.', { theme: 'colored' });
      return;
    }
    if (!price || isNaN(Number(price))) {
      toast.error('Please enter a valid price.', { theme: 'colored' });
      return;
    }

    setSubmitting(true);
    try {
      const statusSelect = form.querySelector('#Status');
      const typeSelect = form.querySelector('#Type');
      const apiType = statusSelect?.value || 'Buy';
      const apiPropertyType = typeSelect?.value || 'Houses';

      await api.createProperty({
        title,
        description: getVal(form, 'Description') || null,
        price: Number(price),
        location: getVal(form, 'Location') || null,
        status: 'active',
        type: apiType,
        bedrooms: parseInt(getVal(form, 'Bedrooms') || '0', 10) || 0,
        bathrooms: parseInt(getVal(form, 'Bathrooms') || '0', 10) || 0,
        area: getVal(form, 'Area') || null,
        image_url: null,
      });

      toast.success('Property added successfully!', { theme: 'colored' });
      form.reset();
      navigate(isAdmin ? '/admin' : '/account');
    } catch (err) {
      toast.error(err.message || 'Failed to add property.', { theme: 'colored' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} noValidate>
        <ListingBasicInformation />
        <ListingPropertyGallery />
        <ListingPropertyInformation />
        <ListingContactDetails />
        <button
          type="submit"
          className="btn btn-main w-100"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </form>
    </>
  );
};

export default AddListingForm;
