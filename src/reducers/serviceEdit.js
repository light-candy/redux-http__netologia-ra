import { CHANGE_SERVICE_FIELD,
         FETCH_SERVICE_REQUEST,
         FETCH_SERVICE_SUCCESS,
         FETCH_SERVICE_FAILURE,
         SAVE_SERVICE_REQUEST,
         SAVE_SERVICE_SUCCESS,
         SAVE_SERVICE_FAILURE
       } from '../actions/actionTypes';

const initialState = {
  item: {
    id:"",
    name: "",
    price: "",
    content: "",
    loading: false,
  },
  loading: false,
  error:null
};

export default function serviceEditReducer (state = initialState, action) {
    switch (action.type) {
      case CHANGE_SERVICE_FIELD:
        const { name, value }  = action.payload;
        return { ...state, item: {...state.item, [name]: value } };
      case FETCH_SERVICE_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SERVICE_SUCCESS:
        const { item } = action.payload;
        return { ...state, loading: false, item };
      case FETCH_SERVICE_FAILURE:
        return {...state, loading: false, error:action.payload.error};
      case SAVE_SERVICE_REQUEST:
        return { ...state, item:{ ...state.item, loading:true }, error:null };
      case SAVE_SERVICE_SUCCESS:
        return { ...initialState };
      case SAVE_SERVICE_FAILURE:
        return { ...state, item:{...state.item, loading:false}, error:action.payload.error };
      default:
        return state;
    }   
};
