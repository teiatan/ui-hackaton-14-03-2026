export function ChatDropzone({ userPhoto, photoPreviewUrl, onRemovePhoto }) {
  return (
    <div className="chat-dropzone chat-dropzone--has-photo">
      <div className="chat-dropzone-preview">
        <div className="chat-dropzone-img-wrap">
          {photoPreviewUrl && <img src={photoPreviewUrl} alt="Your photo" />}
          <button
            type="button"
            className="chat-dropzone-remove"
            onClick={(e) => {
              e.stopPropagation()
              onRemovePhoto()
            }}
            aria-label="Remove photo"
          >
            ×
          </button>
        </div>
        <span className="chat-dropzone-hint">Your photo — looks will be generated on you</span>
      </div>
    </div>
  )
}
