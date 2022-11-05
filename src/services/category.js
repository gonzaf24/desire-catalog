const ENDPOINT = 'https://desire-catalog.herokuapp.com'
//const ENDPOINT = 'http://localhost:3001'

const _401_ERROR = '401 Sesion expirada, vuelve a loguearte.';
const _OPERATION_NOT_POSSIBLE = 'No es posible realizar esta operacion.';
const _CATEGORY_NAME_ALREADY_EXISTS = 'Nombre de categoria ya existe.'

export async function newCategory(jwt, categoryParam) {
   return await fetch(`${ENDPOINT}/api/categorys`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ...categoryParam }),
   })
      .then((res) => {
         if (res.status === 401) {
            throw new Error(_401_ERROR)
         }
         if (res.status === 422) {
            throw new Error(_CATEGORY_NAME_ALREADY_EXISTS)
         }
         if (!res.ok) throw new Error(_OPERATION_NOT_POSSIBLE)
         return res.json()
      })
      .then((res) => {
         return res
      })
}

export async function getCategorys(jwt) {
   return await fetch(`${ENDPOINT}/api/categorys`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
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

export async function deleteCategory(jwt, id) {
   return await fetch(`${ENDPOINT}/api/categorys/${id}`, {
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

export async function editCategory(jwt, categoryParam) {
   return await fetch(`${ENDPOINT}/api/categorys/${categoryParam.id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ...categoryParam }),
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
