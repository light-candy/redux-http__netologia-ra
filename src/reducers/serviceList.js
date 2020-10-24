
import { FETCH_SERVICES_REQUEST,
         FETCH_SERVICES_SUCCESS,
         FETCH_SERVICES_FAILURE,
         REMOVE_SERVICE_REQUEST,
         REMOVE_SERVICE_SUCCESS,
         REMOVE_SERVICE_FAILURE
       } from '../actions/actionTypes';

const initialState ={
  loading: false,
  error: null,
  items: []
};

export default function serviceListReducer(state = initialState, action) {
    switch(action.type){
      case FETCH_SERVICES_REQUEST:
        return { ...state, loading:true, error:null };
      case FETCH_SERVICES_SUCCESS:
        const { items } = action.payload;
        return { ...state, loading:false, items };
      case FETCH_SERVICES_FAILURE:
        return { ...state, loading:false, error:action.payload.error };
      case REMOVE_SERVICE_REQUEST:
        return { ...state, items: [ ...state.items.map(o => ((o.id === action.payload.id) ? {...o, loading: true } : o ))],  error:null };
      case REMOVE_SERVICE_SUCCESS:
        return { ...state,  items: [ ...state.items.map(o => ((o.id === action.payload.id) ? {...o, loading:false } : o)) ], error:null };
      case REMOVE_SERVICE_FAILURE:
        return { ...state,  items: [ ...state.items.map(o => ((o.id === action.payload.id) ? { ...o, loading:false } : o)) ], error: action.payload.error };
      default:
        return state;
    }
};
