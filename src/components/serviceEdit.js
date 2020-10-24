import React, { useCallback, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField,
         saveServiceRequest,
         saveServiceSuccess,
         saveServiceFailure,
         fetchServiceRequest,
         fetchServiceSuccess,
         fetchServiceFailure
       } from '../actions/actionCreators';
import { fetchServices } from './serviceList';

const selectServiceEdit = (state) => state.serviceEdit;

export function ServiceEdit() {
  const { item, loading, error } = useSelector(selectServiceEdit);
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchService = async(dispatch) => {
      dispatch(fetchServiceRequest());
      try {
        const response = await fetch(`http://localhost:7070/api/services/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const service = await response.json();
        dispatch(fetchServiceSuccess(service));
      } catch(error) {
         dispatch(fetchServiceFailure(error.message));
      }
    };
    fetchService(dispatch);
  }, [dispatch, id]);
   
  const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch(changeServiceField(name, value));
        },
        [dispatch]
  );

  const handleSubmit = useCallback(
         async (event) => {
            event.preventDefault();
            dispatch(saveServiceRequest());
            try {
              const response = await fetch('http://localhost:7070/api/services', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(item)
              });
              if (!response.ok) {
                  throw new Error(response.statusText);
              }
              dispatch(saveServiceSuccess());
              fetchServices(dispatch);
              history.replace("/services");
            } catch(error) {
               dispatch(saveServiceFailure(error.message));
            };

         },
         [item, dispatch, history]
  );

  if (loading) {
      return (<div className="loader"></div>);
  };
  if (error) {
      return (<div className="error">Произошла ошибка!</div>);
  };

  return(
      <form onSubmit={handleSubmit} >
         <label htmlFor="name">Название</label>
         <input name="name"
                onChange={handleChange}
                value={item.name}
                disabled={item.loading}
         />
         <label htmlFor="price">Цена</label>
         <input name="price"
                onChange={handleChange}
                value={item.price}
                disabled={item.loading}
         />
         <label htmlFor="content">Описание</label>
         <input name="content"
                onChange={handleChange}
                value={item.content}
                disabled={item.loading}
         />
        <div className="buttons">
          <button type="submit" disabled={item.loading} className="button">
            {item.loading ?
            <div className="loader_button"></div>
             : "Сохранить"}
          </button>
          <Link to="/services" className="button">Отмена</Link>
        </div>
      </form>
  );
}
