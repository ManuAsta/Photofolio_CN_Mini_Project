import React, { useEffect, useState } from 'react'
import Photo from './Photo';
import Modal from './Modal';
import PhotoForm from '../Form/PhotoForm';
//styles
import styles from './Photo.module.css';
//firebase
import db from '../../firebaseinit';
import { doc, onSnapshot, setDoc ,collection, getDoc } from "firebase/firestore";


//for notifications, react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function PhotosList(props) {
  //console.log(props);
  const {albumId,getAlbum}=props;
  const [album,setAlbum]=useState(null);
  //toggling form for adding a photo
  const [showForm,setShowForm]=useState(false);
  //for editing a photo via form
  const [edit,setEdit]=useState(null);
  //for viewing Modal
  const [modalIndex,setModalIndex]=useState(-1);
  
  //when the page is loaded, get the document with this id 
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "photofolio-albums", albumId), (doc) => {
      //console.log("Current data: ", doc.data());
      setAlbum(doc.data());
  });
  },[]);


  //for adding a photo
  const addPhoto=async (urlRef,titleRef)=>{
    const url=urlRef.current.value.trim();
    const title=titleRef.current.value.trim();
    //if url or title is empty
    if(url.length===0 || title.length===0){
      toast.info("Please Enter both url and title");
      return;
    }

    //url validation
    const urlRegex= /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if(!urlRegex.test(url)){
      toast.warning("Please Enter a valid Url");
      return;
    }
    //title validation
    if(title.length>50){
      toast.warning("Title can't be greater than 50 characters");
      return;
    }

    //if need to be edited
    if(edit!==null){
      console.log("Needs to be edited");
      //find the image with the edit url
      const image=album.images.find((image)=>image.url===edit.url);
     // console.log(image);

      //in case the user deleted the image while editing phase
      if(image===undefined){
        toast.warning("No Image to Edit");
        return;
      }
      image.url=url;
      image.title=title;
     // console.log(album);
      setAlbumInDb();
      toast.success("Image Updated!");
      clearForm(urlRef,titleRef);
      setEdit(null);
      return;
    }

    async function setAlbumInDb(){
      const albumRef=collection(db, "photofolio-albums");
      await setDoc(doc(albumRef,albumId),album);
    }




    //check if the image with the same url exists or not
    async function urlExists(){
      const albumFromDb=await getDoc(doc(db, "photofolio-albums", albumId));
      //console.log(albumFromDb.data());
      const images=albumFromDb.data().images;
     // console.log(images);
      return images.some((image)=>(image.url===url));
    }
    //console.log(await urlExists());
    if(await urlExists()){
       toast.error("Image already exists, add a new!");
       return;
    }else{
      //add the image
      //console.log(album.images);
     
      const image={
        title,url
      }
      album.images.unshift(image);
    //  console.log(album);
      //console.log(albumRef);
      // console.log(url," ",title);
      setAlbumInDb();
      toast.success("Photo Added!")
      clearForm(urlRef,titleRef);
    }
    
  }

  //for clearing the form
  const clearForm=(urlRef,titleRef)=>{
    titleRef.current.value="";
    urlRef.current.value="";
  }

  //for deleting a Photo
  const deletePhoto=async (index)=>{
   // console.log(index);
   album.images.splice(index,1);
   const albumRef=collection(db, "photofolio-albums");
   await setDoc(doc(albumRef,albumId),album);
  }

  //for editing a photo
  const editPhoto= (index)=>{
    setShowForm(true);
    const image=album.images[index];
   // console.log(image);
    setEdit(image);
  }

  //for showing modal and going through images
  const showModel=(index)=>{
    setModalIndex(index);
  }


  return (
    <>
      <ToastContainer/>
      {modalIndex>-1 && <Modal images={album["images"]} modalIndex={modalIndex} showModel={showModel}/>}
    {album &&  <div className={styles.layout}>
       {showForm && <PhotoForm addPhoto={addPhoto} edit={edit}  name={album.name} clearForm={clearForm}/>}
       <div className={styles["photo-form-heading"]}>
        <img src='reply.png' className={styles["hover"]} alt='previous-page' onClick={()=>getAlbum(null)}  width={"50px"}/>
          <h1>{album.name}</h1>
          <button className={showForm? styles.cancel:styles.addButton}  onClick={()=>{setShowForm(!showForm); setEdit(null)}}>{showForm? "Cancel":"Add Photo"}</button>
       </div>
       <div className={styles["photos-list"]}>
      
        {album  && album.images.length>0 ? <>{album.images.map((image,index)=><Photo key={index}  index={index} image={image} editPhoto={editPhoto} deletePhoto={deletePhoto} showModel={showModel}/>)}</>: <h1 style={{width:0.8*(window.innerWidth),textAlign:"center"}}>No Photos to Show!</h1>}
       </div>
    </div>}
   
    </>
  )
}

/**
 

<div className={styles["center"]}>
       
        {showForm && <PhotoForm addPhoto={addPhoto} name={album.name} clearForm={clearForm}/>}
        <div style={{marginTop:"100px"}}>
        <img src='go-back.png' className={styles["hover"]} alt='previous-page' onClick={()=>getAlbum(null)}  width={"50px"}/>
        </div>
        <button  className={showForm? styles.cancel:styles.addButton} onClick={()=>setShowForm(!showForm)}>{showForm? "Cancel":"Add Photo"}</button>
    </div>



 */