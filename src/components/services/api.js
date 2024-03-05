import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export const fetchImages = async (page, step) => {
  const { data } = await axios.get(
    `api/?q=cat&page=${page}&key=42111454-a6064c7507ecd0abc8356168a&image_type=photo&orientation=horizontal&per_page=${step}`
  );
  return data;
};

// export const fetchImagesByQuery = async configParams => {
//   const data = await axios.get();
// };
