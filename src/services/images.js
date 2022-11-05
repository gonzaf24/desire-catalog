const ENDPOINT = 'https://desire-catalog.herokuapp.com'
//const ENDPOINT = 'http://localhost:3001'

const _401_ERROR = '401 Sesion expirada, vuelve a loguearte.';
const _OPERATION_NOT_POSSIBLE = 'No es posible realizar esta operacion.';
const _CATEGORY_NAME_ALREADY_EXISTS = 'Nombre de categoria ya existe.'
const _ERROR_DELETE_IMAGE = 'Hubo un problema al eliminar la imagen.'

export async function newImage(jwt, image, imageName) {
   const formData = new FormData()
   formData.append('image', image)
   formData.append('fileName', imageName)
   return await fetch(`${ENDPOINT}/api/images`, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
      body: formData,
      redirect: 'follow',
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
      .catch((error) => console.log('error ', error))
}

export async function deleteImage(jwt, id) {
   return await fetch(`${ENDPOINT}/api/images/${id}`, {
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
         if (!res.ok) throw new Error(_ERROR_DELETE_IMAGE)
         return res.ok
      })
      .then((res) => {
         return res
      })
}
