const ENDPOINT = 'https://desire-catalog.herokuapp.com'
//const ENDPOINT = 'http://localhost:3001'

const _401_ERROR = '401 Sesion expirada, vuelve a loguearte.';
const _OPERATION_NOT_POSSIBLE = 'No es posible realizar esta operacion.';
const _PRODUCT_REF_ALREADY_EXISTS = 'Ya existe un producto con ese numero de referencia.'

export async function newProduct(jwt, productParam) {
   return await fetch(`${ENDPOINT}/api/products`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ...productParam }),
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (res.status === 422) {
            throw new Error(_PRODUCT_REF_ALREADY_EXISTS)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.json()
      })
      .then((res) => {
         return res
      })
}

export async function getProducts() {
   return await fetch(`${ENDPOINT}/api/products`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      //no body needed
      /* body: JSON.stringify({}) */
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.json()
      })
      .then((res) => {
         return res
      })
}

export async function getProductByCategory(category) {
   return await fetch(`${ENDPOINT}/api/products/${category}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      //no body needed
      /* body: JSON.stringify({}) */
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.json()
      })
      .then((res) => {
         return res
      })
}

export async function getProductById(id) {
   return await fetch(`${ENDPOINT}/api/products/id/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      //no body needed
      /* body: JSON.stringify({}) */
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.json()
      })
      .then((res) => {
         return res
      })
}

export async function deleteProduct(jwt, id) {
   return await fetch(`${ENDPOINT}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
      },
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.ok
      })
      .then((res) => {
         return res
      })
}

export async function editProduct(jwt, productParam) {
   return await fetch(`${ENDPOINT}/api/products/${productParam.id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ...productParam }),
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.ok
      })
      .then((res) => {
         return res
      })
}
