import React, { useState } from 'react'
import Albums from '../Album/Albums'
import PhotosList from '../Photos/PhotosList';
export default function TogglePage() {

  const [album,setAlbum] = useState(null);

  //function to set album
  const getAlbum=(album)=>{
   // console.log("Clicked");
   //console.log(album);
   setAlbum(album);
  };

  return (<>
        {album? <PhotosList getAlbum={getAlbum} albumId={album.id}/> :<Albums getAlbum={getAlbum}/>}
    </>
  )
}
