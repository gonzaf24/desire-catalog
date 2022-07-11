const ENDPOINT = 'https://desire-catalog.herokuapp.com'
//const ENDPOINT = 'http://localhost:3001'

export async function newCategory(jwt, categoryParam) {
  return await fetch(`${ENDPOINT}/api/categorys`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ ...categoryParam })
  }).then(res => {
    if (res.status === 401) {
      throw new Error("401 Sesion expirada, vuelve a loguearte.")
    }
    if (res.status === 422) {
      throw new Error("Nombre de categoria ya existe.")
    }
    if (!res.ok) throw new Error('No es posible realizar esta operacion.')
    return res.json()
  }).then(res => {
    return res
  })
}

export async function getCategorys(jwt) {
  return await fetch(`${ENDPOINT}/api/categorys`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    //no body needed
    /* body: JSON.stringify({}) */
  }).then(res => {
    if (res.status === 401) {
      throw new Error("401 Sesion expirada, vuelve a loguearte.")
    }
    if (!res.ok) throw new Error('No es posible realizar esta operacion.')
    return res.json()
  }).then(res => {
    return res
  })
}

export async function deleteCategory(jwt, id) {
  return await fetch(`${ENDPOINT}/api/categorys/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
  }).then(res => {
    if (res.status === 401) {
      throw new Error("401 Sesion expirada, vuelve a loguearte.")
    }
    if (!res.ok) throw new Error('No es posible realizar esta operacion.')
    return res.ok
  }).then(res => {
    return res
  })
}

export async function editCategory(jwt, categoryParam) {
  return await fetch(`${ENDPOINT}/api/categorys/${categoryParam.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ ...categoryParam })
  }).then(res => {
    if (res.status === 401) {
      throw new Error("401 Sesion expirada, vuelve a loguearte.")
    }
    if (!res.ok) throw new Error('No es posible realizar esta operacion.')
    return res.ok
  }).then(res => {
    return res
  })
}