const initialState = { email: "null", connected: false,
                      addressEmpty : true, dataAddress : [], nbAddress : 0,
                      annonceEmpty : true, dataAnnonce : [],
                      myOrdersEmpty : true, dataMyOrders : [] }

function connectionReducer(state = initialState, action){
  let nextState

  switch(action.type) {
    case 'annonce':
      nextState = {
        ...state,
        annonceEmpty : false,
        dataAnnonce: action.value
      }
      return nextState
    case 'myOrders':
      nextState = {
        ...state,
        myOrdersEmpty : false,
        dataMyOrders: action.value
      }
      return nextState
    case 'nbAddress':
      nextState = {
        ...state,
        nbAddress: action.value
      }
      return nextState
    case 'address':
      nextState = {
        ...state,
        addressEmpty : false,
        dataAddress: action.value
      }
      return nextState
    case 'login':
      nextState = {
        ...state,
        email: action.value,
        connected: true
      }
      return nextState
    case 'logoff':
      nextState = {
        ...state,
        email: "null",
        connected:false,
        dataAddress : [],
        addressEmpty : true,
        dataAnnonce : [],
        annonceEmpty : true,
        nbAddress : 0,
        dataMyOrders : [],
        myOrdersEmpty : true,
      }
      return nextState
    default:
      return state
  }
}

export default connectionReducer
