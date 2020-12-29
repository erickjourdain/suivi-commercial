import cubejs from '@cubejs-client/core'
import { map, mean, sum } from 'lodash'

let cubejsApi = null

/**
 * création de l'instance de communication au serveur cubejs
 */
const createCubeInstance = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    if (!token) return reject(new Error('aucun token d\'authentification enregistré'))
    cubejsApi = cubejs(token, {
      apiUrl: process.env.VUE_APP_CUBE_URL
    })
    return resolve()
  })
}

/**
 * chargement des données à partir du serveur cubejs
 *
 * @param  - [Query object](query-format) la requête à éxecuter
 * @return - Promise<ResultSet> résultat de la requête
 */
const loadData = async (query) => {
  try {
    // création de l'instance du cube si inexistante
    if (!cubejsApi) createCubeInstance()

    // lancement de la requête de récupération des données
    const resultSet = await cubejsApi.load(query)

    // transformation du résultat pour affichage dans les composants
    const values = (resultSet.series()[0] && resultSet.series()[0].series)
      ? map(resultSet.series()[0].series, 'value') : []
    const labels = (resultSet.series()[0] && resultSet.series()[0].series)
      ? map(resultSet.series()[0].series, 'x') : []

    return {
      values,
      labels,
      sum: sum(values),
      average: mean(values)
    }
  } catch (error) {
    console.error(error)
  }
}

export {
  loadData
}
