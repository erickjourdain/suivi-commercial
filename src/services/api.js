import axios from 'axios'

// instance axios
let instance

/**
 * création d'une instance d'axios avec les paramètres
 * de configuration générale à toutes futures requêtes
 * vers l'API de l'application
 */
function createInstance () {
  return new Promise((resolve, reject) => {
    try {
      if (!instance) {
        const token = (localStorage.getItem('token') !== 'undefined')
          ? localStorage.getItem('token') : null

        instance = axios.create({
          baseURL: process.env.VUE_APP_CUBE_API_URL,
          timeout: 5000,
          headers: (token) ? { Authorization: `Bearer ${token}` } : {},
          responseType: 'json',
          maxContentLength: 2000,
          maxRedirects: 0
        })
        return resolve()
      } else return resolve()
    } catch (err) {
      return reject(err)
    }
  })
}

/**
 * Ajout du token d'indentification dans l'entête de l'instance
 *
 * @param {String} token - token d'identification
 */
function addAuthorisation (token) {
  localStorage.setItem('token', token)
  instance.defaults.headers.Authorization = `Bearer ${token}`
}

/**
 * Suppression du token d'identification
 */
function removeAuthorisation () {
  instance.defaults.headers = {}
}

/**
 * Envoi d'une requête vers l'API de l'appplication
 *
 * @param {JSON} config - les paramêtres de la requête
 * @return {JSON} les données retournées par la requête
 */
async function request (config) {
  try {
    return await instance.request(config)
  } catch (error) {
    let message = 'Erreur inconnue'
    if (error.response.data.message.length) {
      message = error.response.data.message[0].messages[0].message
    }
    throw new Error(`Impossible d'executer la requête: ${message}`)
  }
}

export {
  createInstance,
  addAuthorisation,
  removeAuthorisation,
  request
}
