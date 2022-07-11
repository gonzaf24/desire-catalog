import { useCallback, useContext, useState } from 'react'
import Context from '../context/UserContext'
import { deleteImage, newImage } from '../services/images'

export default function useImage() {
  const { jwt } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const newImageHook = useCallback(async (image, fileName) => {
    setState({ loading: true, error: false })
    return await newImage(jwt, image, fileName)
      .then(imageResult => {
        setState({ loading: false, error: false })
        return imageResult
      })
      .catch(error => {
        setState({ loading: false, error: true })
        throw error;
      })
  }, [jwt])


  const deleteImageHook = useCallback(async (id) => {
    setState({ loading: true, error: false })
    return await deleteImage(jwt, id)
      .then(isDeleted => {
        setState({ loading: false, error: false })
        return isDeleted
      })
      .catch(error => {
        setState({ loading: false, error: true })
        throw error;
      })
  }, [jwt])



  return {
    isLogged: Boolean(jwt),
    isLoginLoadinUpload: state.loading,
    hasUploadError: state.error,
    deleteImageHook,
    newImageHook
  }
} 