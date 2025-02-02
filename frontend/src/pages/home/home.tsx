
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import home from '../../assets/home.png'

import profile from '../../../public/profile.png';
import { useEffect } from 'react'
import { useState } from 'react'
const Home = () => {
    const [click, setClick]=useState(false);
    const [hamburger, setHamburger]=useState(false);
    const navigate=useNavigate();
    const [image, setImage]=useState("");
    const [islogged, setIsLogged]=useState(false);
    const [books, setBook]=useState([]);
    
    const [areRead, setAreRead]=useState<any>(null);
    const [read, setRead]=useState<any>([]);
    
    useEffect(()=>{
        const fetchProfilePicture=async()=>{
            console.log(localStorage.getItem('token'));
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/auth/profile',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }}
                );
                const response=await result.json();
                if(!response){
                    console.log("Something went wrong,please try again")
                }
                setImage(response.image);
            }catch(error){
                console.log(error);
            }
        }
        const isthereuserthere=async ()=>{
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/auth/isthere', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response=await result.json();
                if(!response){
                    setIsLogged(false);
                   
                    console.log("Error verifying user, Please refresh your page");
                    navigate('/login');
                }
                setIsLogged(true);

                

            }catch(error){
                console.log(error);
            }
        }
        const fetchBooks=async ()=>{
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/book/show', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response=await result.json();
                if(!response){
                    navigate('/');
                    console.log("Could not fetch books, Please try again")
                }
                setBook(response);

            }catch(error){
                console.log(error);
            }
        }
        const latestBook=async ()=>{
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/auth/latest',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response=await result.json();
                if(!response){
                    console.log("Something went wrong, Please try again")
                }
                setAreRead(response.latestBook);
                setRead(response.user.readbooks);
                console.log(read);


            }catch(error){
                console.log(error);
            }
        }
        isthereuserthere();
        fetchProfilePicture();
        fetchBooks();
        latestBook();
    },[])
    
    // const handleChange=async ()=>{
        
    //     try{
    //         console.log("My token is ", localStorage.getItem('token'));
          
    //         const response = await fetch('https://book-tracking-website-2.onrender.com/auth/user', {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const result=await response.json();
    //         if(!result){
    //             console.log("Something went wrong, Please try again")
    //         }
    //         localStorage.setItem('email', result.email);
           
    
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    const addBook = async (idd:any) => {
        console.log("sending id of", idd);
        try {
            const result = await fetch('https://book-tracking-website-2.onrender.com/auth/addbook', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',  // Add this header
                },
                body: JSON.stringify({
                    id: idd,  // Rename 'id' to 'bookId' to match the backend
                }),
            });
    
            const response = await result.json();
            if (!response) {
                navigate('/');
                console.log("Something went wrong with the request, Please try again");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <div className="min-h-screen mycolor min-w-screen w-full">
        <div className="flex gap-3 pt-3 justify-around">
            <h1 className="font-bold text-xl pl-3 pacifico ">Booky</h1>
            <div className="another flex justify-center rounded-xl h-8">
            <input placeholder="Search" className="text-sm pl-3 md:w-42 w-28"></input>
         
            
           

            </div>
            <div>
            <img src="/hamburger.png" className="h-10 w-10 md:hidden cursor-pointer" onClick={()=>setHamburger(!hamburger)}/>
            {hamburger?<div>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/')}>Home</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/shelf')}>Library</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/explore')}>Explore</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/goals')}>Goals</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/login')}>Login</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={()=>navigate('/signup')}>Signup</h1>
            </div>:null}

            </div>
            
            <div className="flex gap-3 md:flex hidden">
            <Link to={'/'} className="group">
            <img src={home} className="w-5 h-5 ml-1 group"/>
            <h4 className="font-bold text-[10px] :text-yellow-500 group-hover:text-yellow-500">Home</h4>
        </Link>
        <Link to={'/shelf'} className="group">
            <img src="book.png" className="w-5 h-5 ml-1"/>
            <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Library</h4>
            
        </Link>
        <Link to={'/explore'} className="group">
            <img src="loupe.png" className="w-5 h-5 ml-1"/>
            <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Explore</h4>
        </Link>
        <Link to={'/goals'} className="group">
            <img src="goal.png" className="w-5 h-5 ml-1"/>
            <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Goals</h4>
        </Link>
        {!islogged?
        <div className="md:flex gap-7 hidden">
            <div className="border-2 border-green-500 rounded-xl px-3 py-1 pl-7 cursor-pointer hover:bg-green-600 w-14 text-sm flex justify-center" onClick={()=>navigate('/login')}>
                <h1>Login</h1>
            </div>
            <div className="border-2 border-green-500 rounded-xl px-3 py-1 cursor-pointer hover:bg-green-600 w-14 text-sm flex justify-center" onClick={()=>navigate('/signup')}>
                <h1>Signup</h1>
            </div>
        </div>:null}
        <div className="md:hidden" onClick={()=>setClick(!click)}>
            <img src="user.png" className="w-10 h-10"/>
            {click?<div>
                <h1 className="border-2 border-green-500 rounded-xl hover:bg-green-800">Login</h1>
                <h1 className="border-2 border-green-500 rounded-xl hover:bg-green-800">Signup</h1>
            </div>:null}

        </div>
      
        {islogged && (
            <div className="w-10 h-10 rounded-[50%] bg-gray-500 cursor-pointer relative">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                const response = await fetch('https://book-tracking-website-2.onrender.com/auth/upload', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: formData
                                });

                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }

                                const result = await response.json();
                                
                                console.log("File uploaded successfully:", result);
                            } catch (error) {
                                console.error("Error uploading file:", error);
                            }
                        }
                    }}
                />
                
                <img src={image || profile} className="w-10 h-10 rounded-2xl" />
            </div>
        )}

            </div>
            

        </div>
        <div className="pt-7">
            <h1 className="font-extrabold text-2xl flex justify-center pacifico">Welcome to Booky Tracker</h1>
            <p className="text-[12px] flex justify-center">Dive into Your Library, Track Progress, and Explore the World of Books.</p>
        </div>
        {areRead &&
        <div className="another flex justify-center mt-7 p-1 gap-3">
            <img src={areRead.image} className="h-35"></img>
            <div>
                <h1 className="font-bold pacifico">{areRead.title}</h1>
                <p className="text-[12px]">by allison</p>
                <span className="bg-amber-500 rounded text-sm">   <a
                    href={`https://docs.google.com/gview?url=${areRead.book}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm mt-2 block"
                   
                >
                    Continue Reading
                </a></span>
            </div>

        </div>
}
        <div>
            <p className="mt-3 italic ml-3 mb-7">Recommended for you</p>
          
               <div className="flex justify-around">
               {books.slice(0.4).map((book:any) => (
            <div key={book._id}>
                <img
                    src={book.image}
                    className="h-52"
                    alt={book.title}
                    
                />
                <h1 className="text-sm italic">{book.title}</h1>

                {/* Link to open in a new tab */}
                <a
                    href={`https://docs.google.com/gview?url=${book.book}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm mt-2 block"
                    onClick={()=>addBook(book._id)}
                >
                    Click to Read
                </a>
            </div>
        ))}
            </div>
            <div className="flex justify-center">
           

            </div>

          
        </div>
        <div>
            <p className="italic pt-3 mb-7">Trending this week</p>
            <div className="flex justify-center pl-3 another gap-3">
                <img src="book3.png" className="h-52"/>
                <div>
                    <h1 className="flex justify-center font-bold">
                        The Stolen Quen by Fiona Davis
                    </h1>
                    <p className="flex justify-center text-sm">
                    The latest historical adventure from Fiona Davis (The Magnolia Palace) jumps from Egypt’s Valley of the Kings circa 1936 to NYC’s Met Gala in 1978. It seems an artifact is missing from the Met and an immortal female pharaoh may be, well, mad about that. An aging scholar and the new intern are about to discover the lethal side of Egyptology
                    </p>
                </div>

            </div>
        </div>
        <div>
            <p className="italic">Reading Challanges</p>
            <div className="flex another gap-7 justify-center items-center">
                <img src="book8.jpg" className="h-52"/>
                <div>
                    
                    <h1 className="font-bold">Read {read.length} out of 50 books</h1>
                    <p className="italic text-sm">You have 48 books to go</p>
                    <span className=" font-bold bg-yellow-200 rounded border-2 border-green-500 cursor-pointer" onClick={()=>window.location.reload()}>Update Progress</span>
                </div>


            </div>
        </div>
        <div className="">
            <p className="italic">Top Reviews</p>
            <div className="another">
                <div className="flex gap-3 ">
                    <img src="book4.png" className="rounded-[50%] h-10 w-10"/>
                    <h1 className="font-bold">Nadia</h1>

                </div>
                <div>
                    <p>*********</p>

                </div>
          
                    <h1 className="font-bold">"To kill a mockingbird"=By Harper Lee</h1>

                <p className="italic">
                One of the most recommended classics and one of the most innocently written, To kill a mockingbird revolves around a small family, the Finches. The narrator is a 9 year old girl who is still unaware of the injustice the world holds and still sees the world with her pure and curious gaze. The rumours of neighborhood always get the best of children and growing up they realise that their beliefs and their character need to go through a lot of worldly obstacles in order to be formed in a certain way, evil or good.
                </p>
            </div>
        </div>
        <footer className="footer h-30 mt-14 flex flex-col justify-center items-center">
            <h1 className="flex justify-center items-center font-bold text-white">Booky</h1>
            <div className="flex justify-center gap-3">
                <h1 className="text-white text-[10px]">About us</h1>
                <h1 className="text-white text-[10px]">Privacy</h1>

            </div>
            <hr></hr>
            <p className="text-white flex justify-center text-[10px]">Copyright Booky Tracker</p>
        </footer>

       
      
    </div>
  )
}

export default Home
