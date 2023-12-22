import React from 'react';
import styles from './Photo.module.css';
export default function Modal(props) {
  const {showModel,images,modalIndex}=props;
  console.log(images,modalIndex);
  const image=images[modalIndex];
  const size=images.length;
  const decreaseIndex=()=>{
    if(modalIndex-1===-1){
      showModel(size-1);
    }else{
      showModel(modalIndex-1);
    }
  }

  const increaseIndex=()=>{
    showModel((modalIndex+1)%size);
  }
  console.log(image.url);

  return (
    <div className={styles.modal}>
        <div className={styles["modal-heading"]}>
            <h1>{image.title}</h1>
            <a href={image.url} target='_blank' rel="noreferrer">
              <img src="download.png" alt='download' width={"50px"}/>
            </a>
            
            <img src='failed.png' alt='back' width={"50px"} onClick={()=>showModel(-1)}/>
        </div>
        <div className={styles["image-section"]}>
            <img src='back.png' alt='left' className={styles.arrows} onClick={decreaseIndex}/>
            <img className={styles["main-image"]} src={image.url} alt='main-img'/>
            <img src='next.png' alt='right' className={styles.arrows} onClick={increaseIndex}/>
        </div>
    </div>
  )
}
