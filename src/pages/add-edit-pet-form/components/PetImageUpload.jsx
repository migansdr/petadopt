import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PetImageUpload = ({ images, primaryImageIndex, onImagesChange, onPrimaryImageChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      const newImages = [...images];
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length <= 6) { // Limit to 6 images
            onImagesChange(newImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    
    // Adjust primary image index if necessary
    if (primaryImageIndex >= newImages.length) {
      onPrimaryImageChange(Math.max(0, newImages.length - 1));
    } else if (primaryImageIndex === index) {
      onPrimaryImageChange(0);
    } else if (primaryImageIndex > index) {
      onPrimaryImageChange(primaryImageIndex - 1);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary-50'
            : error
            ? 'border-error bg-error-light' :'border-border hover:border-primary-300 hover:bg-surface'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            dragActive ? 'bg-primary text-white' : 'bg-surface text-primary'
          }`}>
            <Icon name="Upload" size={24} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Subir fotografías
            </h3>
            <p className="text-text-secondary mb-4">
              Arrastra las imágenes aquí o haz clic para seleccionar
            </p>
            
            <button
              type="button"
              onClick={openFileDialog}
              className="btn-outline"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Seleccionar imágenes
            </button>
          </div>
          
          <div className="text-sm text-text-muted">
            <p>• Máximo 6 imágenes</p>
            <p>• Formatos: JPG, PNG, WebP</p>
            <p>• Tamaño máximo: 5MB por imagen</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-text-primary mb-4">
            Imágenes subidas ({images.length}/6)
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  primaryImageIndex === index
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-primary-300'
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={`Pet image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                
                {/* Primary Image Badge */}
                {primaryImageIndex === index && (
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>Principal</span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                  {primaryImageIndex !== index && (
                    <button
                      type="button"
                      onClick={() => onPrimaryImageChange(index)}
                      className="bg-white text-text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                      title="Establecer como imagen principal"
                    >
                      <Icon name="Star" size={16} />
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-white text-error p-2 rounded-full hover:bg-error hover:text-white transition-all duration-200"
                    title="Eliminar imagen"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">Consejos para mejores fotos:</p>
                <ul className="text-text-secondary space-y-1">
                  <li>• La imagen marcada como "Principal" aparecerá primero en las búsquedas</li>
                  <li>• Usa fotos con buena iluminación natural</li>
                  <li>• Incluye fotos de cuerpo completo y primeros planos</li>
                  <li>• Muestra la personalidad de la mascota</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetImageUpload;