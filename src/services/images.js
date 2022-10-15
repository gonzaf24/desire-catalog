const ENDPOINT = 'https://desire-catalog.herokuapp.com'
//const ENDPOINT = 'http://localhost:3001'

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
            throw new Error('401 Sesion expirada, vuelve a loguearte.')
         }
         if (res.status === 422) {
            throw new Error('Nombre de categoria ya existe.')
         }
         if (!res.ok) throw new Error('No es posible realizar esta operacion.')
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
            throw new Error('401 Sesion expirada, vuelve a loguearte.')
         }
         if (!res.ok) throw new Error('Hubo un problema al eliminar la imagen.')
         return res.ok
      })
      .then((res) => {
         return res
      })
}
