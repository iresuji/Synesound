// Image data Extractor component

import axios from 'axios';




const API_KEY = '75980977d5msh3aa264572f31770p12b67cjsn503a854eac7f';


const API_HOST = 'regim3.p.rapidapi.com';

export default async function ImgExtractor(file) {
  console.log(file);
  const data = new FormData();
  data.append("file", file);

  const options = {
    method: 'POST',
    url: 'https://regim3.p.rapidapi.com/1.1/',
    params: { opts: 'colors,alg=2,closestColors,segmentation' },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,

    },
    data: data

  };

  const response = await axios.request(options);
  return response.data;
}


