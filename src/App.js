import { filesize } from 'filesize'
import { uniqueId } from 'lodash'
import React, { useEffect, useState } from 'react'
import FileList from './components/FileList'
import Upload from './components/Upload'
import './index.css'
import api from './services/api'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      uploadedFiles.forEach((file) => processUpload(file))
    }
  }, [uploadedFiles])

  useEffect(() => {
    const getUploadedFiles = async () => {
      const response = await api.get('/files')

      const newUploaded = response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      }))

      setUploadedFiles(newUploaded)
    }
    getUploadedFiles()
  }, [])

  function handleUpload(files) {
    const newUploaded = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))
    setLoading(true)
    setUploadedFiles(uploadedFiles.concat(newUploaded))
  }

  function updateFile(id, data) {
    const newUploaded = uploadedFiles.map((i) => {
      return id === i.id ? { ...i, ...data } : i
    })
    setUploadedFiles(newUploaded)
    setLoading(false)
  }

  function processUpload(uploadedFile) {
    const data = new FormData()

    data.append('file', uploadedFile.file, uploadedFile.name)
    api
      .post('/files', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))
          updateFile(uploadedFile.id, { progress })
        },
      })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.message._id,
          url: response.data.message.url,
        })
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        })
      })
  }

  async function handleDelete(id) {
    await api.delete(`/files/${id}`)

    const newUploaded = uploadedFiles.filter((f) => f.id !== id)
    setUploadedFiles(newUploaded)
    setLoading(false)
  }

  return (
    <div
      className="flex h-screen w-screen items-center justify-center 
      bg-purple-500 p-8 shadow"
    >
      <div
        className="m-1 flex min-h-min w-1/3 flex-col items-center 
        justify-start rounded-sm border bg-gray-100 p-3 shadow-md"
      >
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
export default App
