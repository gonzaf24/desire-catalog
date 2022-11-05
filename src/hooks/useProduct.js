import { useCallback, useContext, useState } from 'react'
import Context from '../context/UserContext'
import { newProduct, getProducts, getProductById, deleteProduct, editProduct, getProductByCategory } from '../services/product'

export default function useProduct() {
   const { jwt } = useContext(Context)
   const [state, setState] = useState({ loading: false, error: false })

   const newProductHook = useCallback(
      async (productParam) => {
         setState({ loading: true, error: false })
         return await newProduct(jwt, { ...productParam })
            .then((productResult) => {
               setState({ loading: false, error: false })
               return productResult
            })
            .catch((error) => {
               setState({ loading: false, error: true })
               throw error
            })
      },
      [jwt],
   )

   const getProductsHook = useCallback(async () => {
      setState({ loading: true, error: false })
      return await getProducts()
         .then((productListResult) => {
            setState({ loading: false, error: false })
            return productListResult
         })
         .catch((error) => {
            setState({ loading: false, error: true })
            throw error
         })
   }, [])

   const getProductByCategoryHook = useCallback(async (category) => {
      setState({ loading: true, error: false })
      return await getProductByCategory(category)
         .then((product) => {
            setState({ loading: false, error: false })
            return product
         })
         .catch((error) => {
            setState({ loading: false, error: true })
            throw error
         })
   }, [])

   const getProductByIdHook = useCallback(async (id) => {
      setState({ loading: true, error: false })
      return await getProductById(id)
         .then((product) => {
            setState({ loading: false, error: false })
            return product
         })
         .catch((error) => {
            setState({ loading: false, error: true })
            throw error
         })
   }, [])

   const deleteProductHook = useCallback(
      async (id) => {
         setState({ loading: true, error: false })
         return await deleteProduct(jwt, id)
            .then((isDeleted) => {
               setState({ loading: false, error: false })
               return isDeleted
            })
            .catch((error) => {
               setState({ loading: false, error: true })
               throw error
            })
      },
      [jwt],
   )

   const editProductHook = useCallback(
      async (productParam) => {
         setState({ loading: true, error: false })
         return await editProduct(jwt, productParam)
            .then((isDeleted) => {
               setState({ loading: false, error: false })
               return isDeleted
            })
            .catch((error) => {
               setState({ loading: false, error: true })
               throw error
            })
      },
      [jwt],
   )

   return {
      isLogged: Boolean(jwt),
      isLoginLoadinProducts: state.loading,
      hasLoginError: state.error,
      newProductHook,
      getProductsHook,
      getProductByIdHook,
      deleteProductHook,
      editProductHook,
      getProductByCategoryHook,
   }
}
