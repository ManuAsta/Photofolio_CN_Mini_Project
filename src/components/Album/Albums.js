import React from 'react';
import styles from './Album.module.css';
import Album from './Album'
import AlbumForm from '../Form/AlbumForm';
import { useState,useEffect } from 'react';

//since we add albums here, we need the database
import db from '../../firebaseinit';
import { collection, addDoc , getDocs,onSnapshot} from "firebase/firestore";
//for notifications, react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Albums(props) {

    //toggling form for adding an album
    const [showForm,setShowForm]=useState(false);
    const [albums,setAlbums]=useState([]); //initially and empty array
    //at the starting of the application, get all the albums
    const [showMessage,setShowMessage]=useState("Loading.......");

    useEffect(() => {
      async function getAllDocs(){
  
        /******************************************************************************************* */
        //using getDocs()
        // const albums=[];
        // const querySnapshot = await getDocs(collection(db, "photofolio_app"));
        // querySnapshot.forEach((doc) => {
        //   // console.log(doc.id, " => ", doc.data());
        //   albums.unshift({id:doc.id,...doc.data()});
        // });
        /******************************************************************************************* */
  
  
        //Real time updates
          const unsub =  onSnapshot(collection(db,"photofolio-albums"), (snapShot) => {
            const albums = snapShot.docs.map((doc) => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
                //console.log(albums);
                setAlbums(albums);
        })
      }
      getAllDocs();

      setTimeout(()=>{
        if(albums.length===0){
          setShowMessage("No Albums to Show. Create one!")
        }
      },1000);
    }, []);

    
  
  
    //for adding a new album
    const addAlbum=async (e,inputRef)=>{
      e.preventDefault();
      const albumName= inputRef.current.value.trim();
      if(!albumName || albumName===""){
        alert("Enter album Name");
        return;
      }
      //if the name is too big
      if(albumName.length>20){
        alert("The name is too big, max length is 20 characters");
        return;
      }
  
      //console.log(albums);
      //if the album already exists, ask to change name
      const albumExists=albums.some((album)=>album.name===albumName);
      // console.log(albumExists);
      if(albumExists){
        // alert("Album with the name already exists");
        toast.warning("Album with the name already in use !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
  
  
       await addDoc(collection(db, "photofolio-albums"), {
        name: albumName,
        type:"album",
        images:[]
      });
      //console.log("Document written with ID: ", docRef.id);
      toast.success("Album added");
      clearForm(inputRef);
    }
  
    //for clearing the input form
    const clearForm=(inputRef)=>{
      //clear the input
      inputRef.current.value="";
    }


  return (
    <div className={styles["album-layout"]}>
      <ToastContainer/>
      {showForm && <AlbumForm addAlbum={addAlbum} clearForm={clearForm}/>}
      <div className={styles.headingBar}>
        <h2>Your Albums</h2>
        <button className={showForm? styles.cancel:styles.addButton} onClick={()=>setShowForm(!showForm)}>{showForm? "Cancel":"Add Album"}</button>
      </div>
      {/**If there are albums, show them or else show no Albums */}
       <div className={styles.albumContainer}>  
        {albums.length>0? <>
          {albums.map((album)=><Album key={album.id} album={album} getAlbum={props.getAlbum}/>)}
        </> : <h2 style={{width:"500px"}}>{showMessage}</h2>}
        
      </div> 
   </div>
  )
}
