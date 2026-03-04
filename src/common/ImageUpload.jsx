import React, { useState } from 'react';

const ImageUpload = ({ images = [], onImagesChange }) => {
    const [localImages, setLocalImages] = useState([]);
    const isControlled = onImagesChange != null;

    const currentImages = isControlled ? images : localImages;
    const setImages = isControlled ? onImagesChange : setLocalImages;

    const handleImageChange = (event) => {
        const selectedImages = Array.from(event.target.files || []);
        if (selectedImages.length === 0) return;
        const newImages = [...(currentImages || []), ...selectedImages];
        setImages(newImages);
        event.target.value = '';
    };

    const handleRemoveImage = (index) => {
        setImages(currentImages.filter((_, i) => i !== index));
    };

  return (
    <div className="image-uploader input-images">
        <input type="file" className='image-uploader__input' id='ImageUploadLabel' multiple accept="image/*" onChange={handleImageChange} />
        {currentImages.length > 0 ? (
            <>
                <div className="uploaded-images d-flex flex-wrap gap-3" style={{ position: 'relative', zIndex: 2 }}>
                    {currentImages.map((image, index) => (
                        <div className="uploaded-image" key={index}>
                            <button type="button" className='uploaded-image__remove' onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}>
                                <i className="fas fa-times"></i>
                            </button>
                            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <label htmlFor="ImageUploadLabel" className="image-uploader__add-more mt-3 d-inline-block">
                    <i className="fas fa-plus me-2"></i>Add more images
                </label>
            </>
        ) : (
            <>
                <label htmlFor="ImageUploadLabel" className="image-uploader__label">
                    <span className="d-none">Upload Image</span>
                </label>
                <div className="upload-text">
                    <span className="upload-text__icon">
                        <i className="fas fa-cloud-upload-alt"></i>
                    </span>
                    <span className='upload-text__text'>Drag &amp; Drop files here or click to browse</span>
                </div>
            </>
        )}
    </div>
  );
};

export default ImageUpload;
