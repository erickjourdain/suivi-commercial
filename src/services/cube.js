import cubejs from '@cubejs-client/core'
import numeral from 'numeral'
import { forEach, map, mean, sum, sumBy } from 'lodash'

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
const loadData = async (query, bins = false) => {
  try {
    // création de l'instance du cube si inexistante
    if (!cubejsApi) createCubeInstance()

    // lancement de la requête de récupération des données
    const resultSet = await cubejsApi.load(query)

    let values, labels

    if (resultSet.series()[0] && resultSet.series()[0].series) {
      if (bins) {
        const total = sumBy(resultSet.series()[0].series, 'value')
        values = map(bins, bin => {
          return sumBy(resultSet.series()[0].series, d => {
            if (parseInt(d.x) >= bin.min && parseInt(d.x) < bin.max) {
              return d.value
            } else return 0
          })
        })
        labels = map(bins, (b, ind) => {
          const percentage = numeral(values[ind] / total).format('0.0%')
          return `${b.titre} - ${percentage}`
        })
      } else {
      // transformation du résultat pour affichage dans les composants
        values = map(resultSet.series()[0].series, 'value')
        labels = map(resultSet.series()[0].series, 'x')
      }
    } else {
      values = []
      labels = []
    }

    return {
      resultSet,
      values,
      labels,
      sum: sum(values),
      average: mean(values)
    }
  } catch (error) {
    console.error(error)
  }
}

const drilldown = async (query, itemsTransform = null) => {
  try {
    // création de l'instance du cube si inexistante
    if (!cubejsApi) createCubeInstance()

    // lancement de la requête de récupération des données
    const resultSet = await cubejsApi.load(query,
      {
        kip: !query
      }
    )

    let res = resultSet.tablePivot()

    if (itemsTransform) {
      res = map(res, data => {
        forEach(itemsTransform, item => {
          data[item.key] = item.funct(data[item.key])
        })
        return data
      })
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export {
  loadData,
  drilldown
}
