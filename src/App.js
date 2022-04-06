import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import './app.css';

const App = () => {

  const [urlBase, setUrlBase] = useState('https://swapi.dev/api/people/?page=1')
  const [indexPage, setPage] = useState(1)
  const [arrayData, setArray] = useState();
  const [listIndexObject, setListObject] = useState([]);
  const { isLoading, error, data, isFetched } = useQuery(`page${indexPage}`, () =>
    axios.get(urlBase)
      .then(res => setArray(res.data))
  )
  const removeItemList = (index) => {
    const newListItemRemoved = listIndexObject.filter(item => item != index)
    // return newListItemRemoved
    setListObject(newListItemRemoved)
  }

  const removeAll = () => {
    setListObject([])
  }

  const addItemList = (index) => {
    setListObject([...listIndexObject, index])
  }

  const handleObjectDisplayOpen = (index) => {
    // setIndexClick(index);
    const isInclude = listIndexObject.includes(index)
    isInclude ? removeItemList(index) : addItemList(index)
  }

  const nextUrlBase = () => {
    setPage(state => state + 1);
    setUrlBase(arrayData.next)
    removeAll()
  }

  const backUrlBase = () => {
    setPage(state => state - 1);
    setUrlBase(arrayData.previous)
    removeAll()
  }

  if (isLoading) return 'Carregando...';
  if (error) return 'errro'

  return (
    <div>
    <div id="container">
    <h2>Clique no botão</h2>
      {arrayData.results.map((i, index) => {
        return (
         <div>
         <p onClick={() => handleObjectDisplayOpen(index)}>{i.name}</p>
          
              </div>
            )
          })
          }
        </div>
      <div >{
      indexPage > 1 && (
        <button onClick={backUrlBase} className="button">Back</button>
        )
      }
        <button onClick={nextUrlBase}className="button">Next</button>

      </div>
    </div>
  );
}

export default App;
