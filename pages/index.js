import Head from 'next/head'
import styles from '../styles/TodoList.module.css'
import { useState, useEffect, useRef } from 'react'

export default function TodoList() {

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
    return [htmlElRef, setFocus]
  }
  const [inputRef, setInputFocus] = useFocus()
  const initialState = () => (typeof window !== "undefined" && window.localStorage.getItem("list") ? JSON.parse(window.localStorage.getItem("list")) : [])
  const [list, setlist] = useState(initialState)

  const addPromise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("¡Agregado!");
    }, 100);
  });

  const removePromise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("¡Eliminado!");
    }, 100);
  });

  const completePromise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("¡Done/Undone!");
    }, 100);
  });

  const _formSubmit = (e) => {
    e.preventDefault();
    if (e.target.item.value) {
      addPromise.then((data) => {
        console.log(data)
        const item = {
          name: e.target.item.value,
          done: false
        }
        setlist([...list, item])
        e.target.item.value = "";
        setInputFocus()
      })
    }
  };

  const _removeItem = (e, index) => {
    removePromise.then((data) => {
      console.log(data)
      setlist(list.filter((item, i) => (i !== index)))
    })
  };

  const _completeItem = (e, index) => {
    completePromise.then((data) => {
      console.log(data);
      setlist(list.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      ));
    })
  };

  useEffect(() => window.localStorage.setItem("list", JSON.stringify(list)), [list]);

  return (
    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          TODO LIST
        </h1>

        <p className={styles.description}>
          {list.length} articulo(s)
        </p>

        <form className={styles.form} onSubmit={_formSubmit}>
          <input className={styles.input} id="item" name="item" type="text" autoComplete="off" ref={inputRef} />
          <button className={styles.button} type="submit">Agregar</button>
        </form>

        <div className={styles.grid}>
          {list.map((item, i) => (
            <div className={styles.item} key={i}>
              <div className={item.done ? styles.itemComplete : styles.itemCreated} onClick={(e) => _completeItem(e, i)}>{item.name}</div>
              <div className={styles.delete} onClick={(e) => _removeItem(e, i)}>eliminar</div>
            </div>
          ))}
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/pnvdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}pnvdev
        </a>
      </footer>

    </div>
  )
}
