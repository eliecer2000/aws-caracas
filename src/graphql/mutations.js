/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGeoPoint = /* GraphQL */ `
  mutation CreateGeoPoint(
    $input: CreateGeoPointInput!
    $condition: ModelGeoPointConditionInput
  ) {
    createGeoPoint(input: $input, condition: $condition) {
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
export const updateGeoPoint = /* GraphQL */ `
  mutation UpdateGeoPoint(
    $input: UpdateGeoPointInput!
    $condition: ModelGeoPointConditionInput
  ) {
    updateGeoPoint(input: $input, condition: $condition) {
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
export const deleteGeoPoint = /* GraphQL */ `
  mutation DeleteGeoPoint(
    $input: DeleteGeoPointInput!
    $condition: ModelGeoPointConditionInput
  ) {
    deleteGeoPoint(input: $input, condition: $condition) {
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
export const createUsuarios = /* GraphQL */ `
  mutation CreateUsuarios(
    $input: CreateUsuariosInput!
    $condition: ModelUsuariosConditionInput
  ) {
    createUsuarios(input: $input, condition: $condition) {
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
export const updateUsuarios = /* GraphQL */ `
  mutation UpdateUsuarios(
    $input: UpdateUsuariosInput!
    $condition: ModelUsuariosConditionInput
  ) {
    updateUsuarios(input: $input, condition: $condition) {
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
export const deleteUsuarios = /* GraphQL */ `
  mutation DeleteUsuarios(
    $input: DeleteUsuariosInput!
    $condition: ModelUsuariosConditionInput
  ) {
    deleteUsuarios(input: $input, condition: $condition) {
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
export const createMensajes = /* GraphQL */ `
  mutation CreateMensajes(
    $input: CreateMensajesInput!
    $condition: ModelMensajesConditionInput
  ) {
    createMensajes(input: $input, condition: $condition) {
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
export const updateMensajes = /* GraphQL */ `
  mutation UpdateMensajes(
    $input: UpdateMensajesInput!
    $condition: ModelMensajesConditionInput
  ) {
    updateMensajes(input: $input, condition: $condition) {
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
export const deleteMensajes = /* GraphQL */ `
  mutation DeleteMensajes(
    $input: DeleteMensajesInput!
    $condition: ModelMensajesConditionInput
  ) {
    deleteMensajes(input: $input, condition: $condition) {
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
export const createDatos = /* GraphQL */ `
  mutation CreateDatos(
    $input: CreateDatosInput!
    $condition: ModelDatosConditionInput
  ) {
    createDatos(input: $input, condition: $condition) {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
export const updateDatos = /* GraphQL */ `
  mutation UpdateDatos(
    $input: UpdateDatosInput!
    $condition: ModelDatosConditionInput
  ) {
    updateDatos(input: $input, condition: $condition) {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
export const deleteDatos = /* GraphQL */ `
  mutation DeleteDatos(
    $input: DeleteDatosInput!
    $condition: ModelDatosConditionInput
  ) {
    deleteDatos(input: $input, condition: $condition) {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
