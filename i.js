const imagecontainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imagesloaded=0;
let totalimages=0;
let photosarray=[];
//Unsplash api
const count=30;
const apikey='bEXxZmC8Xat_jhpMSBIIUFcEvelng0o10r-SoJk7OWo';
const apiurl=`https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`; 
//check all images are loaded
function imageloaded()
{
    imagesloaded++;
    if(imagesloaded===totalimages)
    {
        ready=true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
}
//heelper function to set attributes
function setAttributes(element,attribute){
    for(const key in attribute){
        element.setAttribute(key,attribute[key]);
    }
}
//create elements for links and photos
function displayphotos(){
    imagesloaded=0;
    totalimages=photosarray.length;
    console.log('totalimages=',totalimages);
    //run function for each object in photosarray
    photosarray.forEach((photo)=>{
    //create <a>
     const item=document.createElement('a');
     /*item.setAttribute('href',photo.links.html);
     item.setAttribute('target','_blank');*/
     setAttributes(item,{
         href: photo.links.html,
         target:'_blank',
     });
     //create img for photo
     const img =document.createElement('img');
     /*img.setAttribute('src',photo.urls.regular);
     img.setAttribute('alt',photo.alt_description);
     img.setAttribute('title',photo.alt_description);*/
     setAttributes(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
     });
     //event listener,check when each is finish loading
     img.addEventListener('load',imageloaded);
     //put<img> inside<a>
     item.appendChild(img);
     imagecontainer.appendChild(item);
    });

}
//Get photos from unsplash api
async function getphotos(){
    try{
      const response=await fetch(apiurl);
       photosarray=await response.json();
      displayphotos();
    }catch(error){
     
    }
}
//scroll event
window.addEventListener('scroll',()=>{
if(window.innerHeight + window.scrollY>=document.body.offsetHeight-1000 && ready)
{
    ready=false;
    getphotos();
}
});
//onload
getphotos();