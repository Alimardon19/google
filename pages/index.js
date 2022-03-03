import styles from '../styles/Home.module.css'
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';



export default function Home() {
  const router = useRouter();
  const [Search, setSearch] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>www.google.com</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.Block}>
        <h1 className={styles.Google}>
          <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
        </h1>
        
        <div className={styles.Search}>
          <input 
          type={"text"} 
          placeholder={"Введите поисковый запрос или URL"}
          onKeyUp={(e)=> {
            setSearch(e.target.value)
            if (e.keyCode == 13) {
              localStorage.setItem("E", Search)
              router.push("./game")
             }
          }}
          />
        </div>
      </div>
    </div>
  )
}
