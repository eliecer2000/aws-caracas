/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMensajesPrivados = /* GraphQL */ `
  subscription OnCreateMensajesPrivados($idUsuario: String) {
    onCreateMensajesPrivados(idUsuario: $idUsuario) {
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
export const onCreateGeoPoint = /* GraphQL */ `
  subscription OnCreateGeoPoint {
    onCreateGeoPoint {
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
export const onUpdateGeoPoint = /* GraphQL */ `
  subscription OnUpdateGeoPoint {
    onUpdateGeoPoint {
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
export const onDeleteGeoPoint = /* GraphQL */ `
  subscription OnDeleteGeoPoint {
    onDeleteGeoPoint {
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
export const onCreateUsuarios = /* GraphQL */ `
  subscription OnCreateUsuarios {
    onCreateUsuarios {
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
export const onUpdateUsuarios = /* GraphQL */ `
  subscription OnUpdateUsuarios {
    onUpdateUsuarios {
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
export const onDeleteUsuarios = /* GraphQL */ `
  subscription OnDeleteUsuarios {
    onDeleteUsuarios {
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
export const onCreateMensajes = /* GraphQL */ `
  subscription OnCreateMensajes {
    onCreateMensajes {
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
export const onUpdateMensajes = /* GraphQL */ `
  subscription OnUpdateMensajes {
    onUpdateMensajes {
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
export const onDeleteMensajes = /* GraphQL */ `
  subscription OnDeleteMensajes {
    onDeleteMensajes {
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
export const onCreateDatos = /* GraphQL */ `
  subscription OnCreateDatos {
    onCreateDatos {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDatos = /* GraphQL */ `
  subscription OnUpdateDatos {
    onUpdateDatos {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDatos = /* GraphQL */ `
  subscription OnDeleteDatos {
    onDeleteDatos {
      id
      descripcion
      monto
      rango
      createdAt
      updatedAt
    }
  }
`;
