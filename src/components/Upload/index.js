import Dropzone from 'react-dropzone'

export default function Upload({ onUpload }) {
  return (
    <Dropzone acceptedFiles="image/*" onDropAccepted={(a) => onUpload(a)}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          className={`flex h-full w-full border-spacing-1 cursor-pointer 
          items-center justify-center rounded-md border-4 border-dotted ${
            isDragActive && 'border-blue-400'
          }`}
          {...getRootProps()}
        >
          <p className={`p-5 text-gray-500 ${isDragActive && 'text-blue-400'}`}>
            Coloque aqui seu arquivo para update
          </p>
          <input {...getInputProps()} type="file" />
        </div>
      )}
    </Dropzone>
  )
}
