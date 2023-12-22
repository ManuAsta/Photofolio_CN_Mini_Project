import React from 'react'
import styles from './Album.module.css';
export default function Album(props) {
  const {name}=props.album;
  return (
       <div className={styles.album} onClick={()=>props.getAlbum(props.album)}>
        <img src='album.png' alt='album' width={"100%"} height={"70%"}/>
        <h4>{name}</h4>
      </div>
  )
}
