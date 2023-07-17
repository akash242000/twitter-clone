import { createContext, useContext, useEffect, useState } from "react";
import db from './components/firebaseApp'
import { getDocs,getDoc, deleteDoc , collection, doc, setDoc,query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const PostsContex= createContext([]);

export function usePosts(){
    return useContext(PostsContex);
}
const postsCollection =  collection(db, 'posts');
const profilesCollection = collection(db, 'profiles');


export function PostsContexProvider({children}){

    const [posts, setPosts] = useState([]);
    const [profiles, setProfiles] = useState([]);

    useEffect(()=>{
        
    },[posts]);

    const [tweetPopup, setTweetPopup] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [editValues, setEditValues] = useState({id:"",caption:"",image:""})


    async function getPosts(){
        const querySnapshot  =await getDocs(query(postsCollection, orderBy('createdAt', "desc")));
        const docs=[];

        querySnapshot .forEach((doc)=>{
            docs.push({...doc.data(), id:doc.id});
        });
        setPosts(prevPosts=> prevPosts=docs);
      
        return  docs;

    }



    async function addPost(post){

        const newID= uuidv4();

        const newPost ={
            name: "Akash Sathawane",
            avatar:"https://scontent.fnag5-1.fna.fbcdn.net/v/t1.6435-9/81451880_2482503601987780_6307375596930334720_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Z12iI1WyrskAX-Hv1Yv&_nc_ht=scontent.fnag5-1.fna&oh=00_AfAJXWjQN9jUAEYLYFGdYPXMXTG7nBQRQvfsXU2VraCj7w&oe=64CDF432",
            username:'akashsathawane',
            verified: true,
            caption:post.caption,
            image:post.image,
            liked: false,
            likes:0,
            createdAt:serverTimestamp(),
            id:newID,
            userID:"XWbY0SaECyg0HKbujeO9",
            views:147
        }

        await setDoc(doc(db, "posts", newID), newPost );
        setPosts((prevPosts)=> [newPost,...prevPosts ])  ;

        const docRef = doc(db, 'profiles', "XWbY0SaECyg0HKbujeO9");

        const curretnDoc= await getDoc(docRef);
        const TweetPosts = curretnDoc.data().postIDs;

        TweetPosts.push(newID);
        await updateDoc(docRef,{postIDs: TweetPosts})
    
    }


      async function handleLiked(id){
        
        const post= posts.find((post)=>post.id===id);
        let postLikes=await post.likes;
        const likedvalue= !(await post.liked);

        const updatedLikes = likedvalue?postLikes+1: postLikes-1;

        const updatedPosts = posts.map((post)=>{
            if(post.id===id){
                return {
                    ...post,
                    likes: updatedLikes,
                    liked: likedvalue
                };
            }
            return post;
        });

        setPosts(updatedPosts);

        const docRef= doc(db,'posts',id );
        const oldViews = (await getDoc(docRef)).data().views

        await updateDoc(docRef,{liked:likedvalue, likes:updatedLikes, views:oldViews+Math.floor(Math.random() * (200-100) + 1)});

        const profileDocRef= doc(db, 'profiles', "XWbY0SaECyg0HKbujeO9");
        const profileDoc = await getDoc(profileDocRef);
        const likedPosts= profileDoc.data().likedPosts;

        if(likedvalue && !likedPosts.includes(id)){
            likedPosts.push(id);
            await updateDoc(profileDocRef,{likedPosts:likedPosts})
        }else if(!likedvalue && likedPosts.includes(id)){
            const updatedLikedPosts= likedPosts.filter((likedId)=> likedId!=id);
            await updateDoc(profileDocRef,{likedPosts:updatedLikedPosts})
        }
  
    }

    async function handleDelete(id){

        setPosts((prevPosts)=>{
            return (prevPosts.filter((post)=> post.id!=id));
        })
        const docRef =  doc(db, 'posts', id);
        const profileRef= doc(db,'profiles',"XWbY0SaECyg0HKbujeO9");
        const myProfile= await getDoc(profileRef);
        let likedPosts= myProfile.data().likedPosts;

        if(likedPosts.includes(id)){
            likedPosts = likedPosts.filter((likedID)=>likedID!==id);
            await updateDoc(profileRef,{likedPosts:likedPosts})
        }
        let tweetPosts = myProfile.data().postIDs;
        tweetPosts=tweetPosts.filter((tIDs)=>tIDs!==id);
        await updateDoc(profileRef,{postIDs:tweetPosts})

        await deleteDoc(docRef);

    }

    async function handleEdit(id,newCaption,newImage){
        const docRef= doc(db,'posts', id);


        await updateDoc(docRef,{caption:newCaption, image:newImage} );
        setEditMode(false)
    }

    async function getProfiles(){
        const profilesSnap = await getDocs(profilesCollection);
        const profiles=profilesSnap.docs.map(doc=> doc.data());
        setProfiles(profiles);
    }

    async function getProfileWithID(id){
        const docRef=  doc(db,'profiles', id);
        const profile= await getDoc(docRef);
        return profile.data();
    }

    async function handleFollowed(id, followed){
        const profileDoc = doc(db, 'profiles', id);

        

        setProfiles((prevProfile)=>{
            return prevProfile.map((profile=>{
                if(profile.id==id){
                    return {...profile, followed:!followed}
                }
                return profile
            }))
        })
        
        
        await updateDoc(profileDoc, {followed:!followed})
    }





    return(
        <PostsContex.Provider value={{posts, profiles, getPosts, addPost,handleLiked,getProfiles,getProfileWithID,handleDelete,tweetPopup,setTweetPopup,setEditMode,editMode,editValues, setEditValues,handleEdit,handleFollowed}}>
            {children}
        </PostsContex.Provider>
    )
}