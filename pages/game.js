import React, { useState, useEffect } from "react";
import axios from "axios";
import { Newspaper, Search, ImageFill, PlayBtn, JournalBookmarkFill } from "react-bootstrap-icons";
import styles from "../styles/Home.module.css";

function Games() {
  useEffect(()=> {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser')
      setKeys(localStorage.getItem("E"))
    } else {
      alert('You are on the server')
    }
  },[])

  const [Keys, setKeys] = useState("");  
  const [seachKey, setSearchKey] = useState("");
  const [spanId, setSpanId] = useState("search");
  const [data, setData] = useState({results: [], image_results: []});
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    GoSearch();
  },[])
  const GoSearch = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: `https://google-search3.p.rapidapi.com/api/v1/${spanId}/q=${seachKey || Keys}`,
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': 'efaf29dac1mshcda546702fcb3d4p1c21f2jsnec987af5c603'
      },
    };

    axios.request(options).then(function (response) {
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    });
  };
  const GetValue=(e)=> {
    setSpanId(e.target.id);
    GoSearch();
  }
  return (
    <div className={styles.GameBox}>
      <div className={styles.Header}>
        <h1>Google</h1>
        <input
          type={"search"}
          defaultValue={Keys}
          onKeyUp={(e)=> {
            setSearchKey(e.target.value)
            if (e.keyCode == 13) {
              GoSearch()
             }
          }}
          placeholder={"Search"}
        />
      </div>
      <div className={styles.Main}> 
        <span onClick={(e)=> GetValue(e)} id={'search'}> <Search/> All </span>
        <span onClick={(e)=> GetValue(e)} id={'images'}> <ImageFill/> Image </span>
        <span onClick={(e)=> GetValue(e)} id={'news'}> <Newspaper/> News </span>
        <span onClick={(e)=> GetValue(e)} id={'scholar'}> <PlayBtn/> Video </span>
        <span onClick={(e)=> GetValue(e)} id={'crawl'}> <JournalBookmarkFill/> Book </span>
      </div>
      <div className={styles.resuldTime}>
        {
          data ? <span>
                  Результатов: примерно {data.total} ({parseInt(data.ts)}сек.) 
                 </span> : ''
        }
      </div>
      {
        loading ? 
        <div>
          <div className="lds-spinner">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div> : 
        <div>
          <div className={styles.Resuld}>
          {
            data.results.map((item, index) => (
              <div key={index} className={styles.ResuldBlock}>
                <div key={index}>
                  <a href={item.link}>
                    {item.link}
                  </a>
                  <h3> <a href={item.link}>{item.title}</a> </h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.ResuldImage}>
          {(
            data.image_results.map((item, index) => (
              <span className={styles.ImageBlock} key={index}>
                <img src={item.image.src} alt="Google Image" />
                <p>{item.link.title}</p>
              </span>
            ))
          )}
        </div>
        </div>
      }
    </div>
  );
}

export default Games;

