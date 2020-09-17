import { useState, useEffect } from 'react';



const useFetch = (url, DependenciesArray) => {
  const [data, setData] = useState();

  useEffect(() => {

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setData(data)
    })
  

  }, DependenciesArray);

  return data;
}

export default useFetch;