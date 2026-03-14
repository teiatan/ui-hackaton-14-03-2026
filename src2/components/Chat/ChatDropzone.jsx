export function ChatDropzone({
  userPhoto,
  photoPreviewUrl,
  isDragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  onPhotoSelect,
  onRemovePhoto,
}) {
  return (
    <div
      className={`chat-dropzone ${isDragOver ? 'chat-dropzone--active' : ''} ${userPhoto ? 'chat-dropzone--has-photo' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {userPhoto ? (
        <div className="chat-dropzone-preview">
          <div className="chat-dropzone-img-wrap">
            {photoPreviewUrl && <img src={photoPreviewUrl} alt="Your photo" />}
            <button
              type="button"
              className="chat-dropzone-remove"
              onClick={(e) => { e.stopPropagation(); onRemovePhoto(); }}
              aria-label="Remove photo"
            >
              ×
            </button>
          </div>
          <span className="chat-dropzone-hint">Your photo — looks will be generated on you</span>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            className="chat-dropzone-input"
            onChange={(e) => onPhotoSelect(e.target.files?.[0])}
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="chat-dropzone-label">
            Drop your photo here or click to upload
          </label>
        </>
      )}
    </div>
  )
}
