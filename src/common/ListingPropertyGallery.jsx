import React from 'react';
import ImageUpload from './ImageUpload';

const ListingPropertyGallery = ({ images, onImagesChange }) => {
    return (
        <>
             <div className="card-item" id="propertyGallery">
                <div className="card common-card">
                    <div className="card-header">
                        <h6 className="title mb-0">Property Gallery</h6>
                    </div>
                    <div className="card-body">
                        <ImageUpload images={images} onImagesChange={onImagesChange} />
                    </div>
                </div>
            </div>   
        </>
    );
};

export default ListingPropertyGallery;