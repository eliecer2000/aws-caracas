/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const pointStations = /* GraphQL */ `
  query PointStations($location: LocationInput!, $m: Int, $limit: Int) {
    PointStations(location: $location, m: $m, limit: $limit) {
      items {
        id
        name
        location {
          lat
          lon
        }
        distancia
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const getGeoPoint = /* GraphQL */ `
  query GetGeoPoint($id: ID!) {
    getGeoPoint(id: $id) {
      id
      name
      location {
        lat
        lon
      }
      distancia
      createdAt
      updatedAt
    }
  }
`;
export const listGeoPoints = /* GraphQL */ `
  query ListGeoPoints(
    $filter: ModelGeoPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeoPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location {
          lat
          lon
        }
        distancia
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const getUsuarios = /* GraphQL */ `
  query GetUsuarios($id: ID!) {
    getUsuarios(id: $id) {
      id
      name
      mensaje {
        items {
          id
          idUsuario
          mensaje
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsuarioss = /* GraphQL */ `
  query ListUsuarioss(
    $filter: ModelUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        mensaje {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMensajes = /* GraphQL */ `
  query GetMensajes($id: ID!) {
    getMensajes(id: $id) {
      id
      idUsuario
      usuario {
        id
        name
        mensaje {
          nextToken
        }
        createdAt
        updatedAt
      }
      mensaje
      createdAt
      updatedAt
    }
  }
`;
export const listMensajess = /* GraphQL */ `
  query ListMensajess(
    $filter: ModelMensajesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMensajess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idUsuario
        usuario {
          id
          name
          createdAt
          updatedAt
        }
        mensaje
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDatos = /* GraphQL */ `
  query GetDatos($id: ID!) {
    getDatos(id: $id) {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
export const listDatoss = /* GraphQL */ `
  query ListDatoss(
    $filter: ModelDatosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        descripcion
        monto
        rango
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchGeoPoints = /* GraphQL */ `
  query SearchGeoPoints(
    $filter: SearchableGeoPointFilterInput
    $sort: SearchableGeoPointSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchGeoPoints(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        location {
          lat
          lon
        }
        distancia
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchDatoss = /* GraphQL */ `
  query SearchDatoss(
    $filter: SearchableDatosFilterInput
    $sort: SearchableDatosSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchDatoss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        descripcion
        monto
        rango
        createdAt
        updatedAt
      }
      min
      max
      sum
      totalAveg
      nextToken
      total
    }
  }
`;
