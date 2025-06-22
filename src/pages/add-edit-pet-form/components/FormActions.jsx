import React from 'react';
import Icon from 'components/AppIcon';

const FormActions = ({ isEdit, isLoading, isDraft, onPublish, onSaveDraft, onCancel }) => {
  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center justify-between pt-8 border-t border-border-light">
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline flex items-center space-x-2"
          disabled={isLoading}
        >
          <Icon name="X" size={16} />
          <span>Cancelar</span>
        </button>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center space-x-2 px-6 py-3 border border-border text-text-secondary rounded-lg font-medium transition-all duration-300 hover:bg-surface hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isDraft ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Guardar Borrador</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onPublish}
            className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
            disabled={isLoading}
          >
            {isLoading && !isDraft ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>{isEdit ? 'Actualizando...' : 'Publicando...'}</span>
              </>
            ) : (
              <>
                <Icon name={isEdit ? "Save" : "Send"} size={16} />
                <span>{isEdit ? 'Actualizar Mascota' : 'Publicar Mascota'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Actions - Sticky Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border-light p-4 z-40">
        <div className="space-y-3">
          {/* Primary Action */}
          <button
            type="button"
            onClick={onPublish}
            className="btn-primary w-full flex items-center justify-center space-x-2 h-12"
            disabled={isLoading}
          >
            {isLoading && !isDraft ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>{isEdit ? 'Actualizando...' : 'Publicando...'}</span>
              </>
            ) : (
              <>
                <Icon name={isEdit ? "Save" : "Send"} size={16} />
                <span>{isEdit ? 'Actualizar Mascota' : 'Publicar Mascota'}</span>
              </>
            )}
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onSaveDraft}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-all duration-300 hover:bg-surface hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isDraft ? (
                <>
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  <span className="text-sm">Guardando...</span>
                </>
              ) : (
                <>
                  <Icon name="Save" size={14} />
                  <span className="text-sm">Guardar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-all duration-300 hover:bg-surface hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Icon name="X" size={14} />
              <span className="text-sm">Cancelar</span>
            </button>
          </div>
        </div>

        {/* Safe area for mobile devices */}
        <div className="h-safe-area-inset-bottom" />
      </div>

      {/* Mobile spacing to prevent content overlap */}
      <div className="md:hidden h-32" />
    </>
  );
};

export default FormActions;