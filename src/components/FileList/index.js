import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

const FileList = ({ files, onDelete }) => (
  <div className="container m-5">
    {files.map((uploadedFile) => (
      <li
        key={uploadedFile.id}
        className="mb-2 flex items-center justify-between text-gray-900"
      >
        <div className="flex items-center">
          <div
            className="mr-3 h-11 w-11 rounded-md bg-cover bg-center 
            bg-no-repeat text-center"
          >
            <img
              src={uploadedFile.preview}
              alt={uploadedFile.name}
              className="h-11 w-11 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <strong>{uploadedFile.name}</strong>
            <span className="mt-1 text-xs text-gray-900">
              {uploadedFile.readableSize}{' '}
              {!!uploadedFile.url && (
                <button
                  className="border-0 bg-transparent text-red-600"
                  onClick={() => onDelete(uploadedFile.id)}
                >
                  Excluir
                </button>
              )}
            </span>
          </div>
        </div>
        <div className="flex">
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7159c1' },
              }}
              strokeWidth={10}
              value={uploadedFile.progress}
            />
          )}

          {!!uploadedFile.url && (
            <a
              className="flex"
              href={uploadedFile.url}
              target="__blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </div>
)

export default FileList
