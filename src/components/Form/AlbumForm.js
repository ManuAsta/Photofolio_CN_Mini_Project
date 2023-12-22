import React from 'react'
import styles from './Form.module.css';
import {useRef } from 'react';
export default function AlbumForm(props) {
  const {addAlbum,clearForm}=props;
  const inputRef=useRef();
  return (
    <div className={styles["form-container"]}>
        <form>
            <h2>Create A New Album</h2>
            <div className={styles["form-input"]}>
                <input type='text' placeholder='Album Name' ref={inputRef}/>
                <button className={styles.clear} onClick={(e)=>{
                  e.preventDefault();
                  clearForm(inputRef);
                }}>Clear</button>
                <button className={styles.create} onClick={(e)=>addAlbum(e,inputRef)}>Create</button>
            </div>
        </form>
    </div>
  )
}
