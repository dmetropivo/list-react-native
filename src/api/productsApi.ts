import {axiosInstance} from './instance';
import {IGetProductsData} from '../Interfaces/api';

export const getProductsElastic = (data: IGetProductsData) => {
  const params: IGetProductsData = {
    limit: data?.limit || 20,
    p: data?.p || 1,
    q: data?.q ? data?.q : null,
    world: data?.world || 'de',
  };
  return axiosInstance
    .get('/api/v1/elastic', {params})
    .then(value => value.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw error.request;
      } else {
        throw error.message;
      }
    });
};
