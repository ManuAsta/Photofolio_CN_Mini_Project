import React from 'react'
import styles from './Form.module.css';
import { useRef,useEffect } from 'react';
export default function PhotoForm(props) {
const {addPhoto,name,clearForm,edit}=props;
const titleRef=useRef();
const urlRef=useRef();

useEffect(() => {
  if(edit!==null){
    titleRef.current.value=edit.title;
    urlRef.current.value=edit.url;
  }
}, [edit])

  return (
    <div className={styles["form-container"]}>
        <form>
            <h2>Add Images to {name} album</h2>
            <div className={styles["photo-form-input"]}>
                <input type="url" placeholder='Image url' required ref={urlRef}/>
                <input type='text' placeholder='Image title' required ref={titleRef}/>
                <div className={styles["photo-form-button-container"]}>
                <button className={styles.clear} onClick={(e)=>{
                  e.preventDefault();
                  clearForm(urlRef,titleRef);
                }}>Clear</button>
                <button className={styles.create} onClick={(e)=>{
                  e.preventDefault();
                  addPhoto(urlRef,titleRef);
                }}>{edit? "Update":"Create"}</button>
                </div>
            </div>
            
        </form>
    </div>
  )
}
