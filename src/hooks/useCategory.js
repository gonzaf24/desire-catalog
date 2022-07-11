import { useCallback, useContext, useState } from 'react'
import Context from '../context/UserContext'
import { newCategory, getCategorys, deleteCategory, editCategory } from '../services/category'

export default function useCategory() {
  const { jwt } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const newCategoryHook = useCallback(async (categoryParam) => {
    setState({ loading: true, error: false })
    return await newCategory(jwt, { ...categoryParam })
      .then(categoryResult => {
        setState({ loading: false, error: false })
        return categoryResult
      })
      .catch(error => {
        setState({ loading: false, error: true })
        throw error;
      })
  }, [jwt])

  const getCategorysHook = useCallback(async () => {
    setState({ loading: true, error: false })
    return await getCategorys(jwt)
      .then(categoryListResult => {
        setState({ loading: false, error: false })
        return categoryListResult
      })
      .catch(error => {
        setState({ loading: false, error: true })
        throw error;
      })
  }, [jwt])

  const deleteCategoryHook = useCallback(async (id) => {
    setState({ loading: true, error: false })
    return await deleteCategory(jwt, id)
      .then(isDeleted => {
        setState({ loading: false, error: false })
        return isDeleted
      })
      .catch(error => {
        setState({ loading: false, error: true })
        throw error;
      })
  }, [jwt])

  const editCategoryHook = useCallback(async (categoryParam) => {
    setState({ loading: true, error: false })
    return await editCategory(jwt, categoryParam)
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
    isLoginLoadingCategorys: state.loading,
    hasLoginError: state.error,
    newCategoryHook,
    getCategorysHook,
    deleteCategoryHook,
    editCategoryHook
  }
} 