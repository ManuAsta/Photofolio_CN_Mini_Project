import React from 'react'
import styles from './Photo.module.css';
export default function Photo(props) {
  const {deletePhoto,editPhoto,showModel,index}=props;
  return (
    <div className={styles.photo} onClick={()=>showModel(index)}>
      <img src={props.image.url} alt="memory" width={"90%"} height={"70%"}/>
      <h3>{props.image.title}</h3>
      <div className={styles.options}>
        <img src='pencil.png' alt='edit' onClick={(e)=>{
                                                 e.stopPropagation();
                                                 editPhoto(index);
                                                 }} className={styles["option-button"]}/>
        <img src='trash.png' alt='delete' onClick={(e)=>{
                                                e.stopPropagation();
                                                deletePhoto(index)}} className={styles["option-button"]}/>
      </div>
    </div>
  )
}
