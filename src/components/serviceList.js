import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeServiceRequest,
         removeServiceSuccess,
         removeServiceFailure,
         fetchServicesSuccess,
         fetchServicesRequest,
         fetchServicesFailure
       } from '../actions/actionCreators';

export const fetchServices = async(dispatch) => {
          dispatch(fetchServicesRequest());
          try {
            const response = await fetch('http://localhost:7070/api/services');
            if (!response.ok) {
               throw new Error(response.statusText);
            }
            const services = await response.json();
            dispatch(fetchServicesSuccess(services));
          } catch(error) {
              dispatch(fetchServicesFailure(error.message));
          }
};

export function ServiceList(){
    const { items, loading, error } = useSelector((state) => state.serviceList);
    const dispatch = useDispatch();

    useEffect(() => {
       fetchServices(dispatch);
    }, [dispatch]);


    const handleRemove = useCallback(
           async (id) => {
              dispatch(removeServiceRequest(id));
              try {
                const response = await fetch(`http://localhost:7070/api/services/${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                dispatch(removeServiceSuccess(id));
                fetchServices(dispatch);
              }  catch(error) {
                  dispatch(removeServiceFailure(error.message, id));
              }
           },
           [dispatch]
    );


    if (loading) {
        return(<div className="loader"></div>);
    };
    if (error) {
        return(<div className="error">Произошла ошибка!</div>);
    };
   
    return(
       <ul>
         {items.map((item) => (
             <li key={item.id}>
           {`${item.name} ${item.price}`}
           {item.loading ?
           <button className="button" disabled>
             <div className="loader_button"></div>
           </button> :
           <div>
             <Link to={`/services/${item.id}`} className="button button_list">
               <span className="material-icons">
                 create
               </span>
             </Link>
             <button onClick={() => handleRemove(item.id)} className="button button_list">
               <span className="material-icons">
                 close
               </span>
             </button>
           </div>}
         </li>
         ))}
        </ul>
    );
}
