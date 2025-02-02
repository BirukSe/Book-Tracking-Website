import home from '../../assets/home.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Shelf = () => {
    const navigate=useNavigate();
    const [hamburger, setHamburger]=useState(false);
    const [books, setBook]=useState([]);
    //  const [selectedBook, setSelectedBook] = useState(null);
    useEffect(()=>{
        const fetchBooks=async ()=>{
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/book/show', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response=await result.json();
                if(!response){
                    navigate('/shelf')
                    console.log("Something went wrong, Please try again");
                }
                setBook(response);

            }catch(error){
                console.log(error);
            }
        }
        fetchBooks();

    },[])
  return (
    <div className="min-h-screen w-full mycolor flex flex-col">
         <div className="flex gap-7 pt-3 justify-around">
            <h1 className="font-bold text-xl pl-3 pacifico">Booky</h1>
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
            <div className="gap-3 md:flex hidden">
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

            </div>
            

        </div>
        <div className="pt-7">
            <h1 className="font-extrabold text-4xl flex justify-center pacifico">Your Book Shelf</h1>
            <p className="text-[18px] flex justify-center">Dive into Your Library, Track Progress, and Explore the World of Books.</p>
        </div>
        {/* <div>
            <div className="flex justify-around mt-7">
                <div>
                    <img src="book3.png" className="h-52  hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book4.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book5.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
               



            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="flex justify-around">
                <div>
                    <img src="book3.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book4.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book5.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                



            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="flex justify-around">
                <div>
                    <img src="book3.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book4.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
                <div>
                    <img src="book5.png" className="h-52 hover:scale-105 rounded-xl"/>
                    <p>Intermezzo</p>

                </div>
               



            </div>
        </div> */}
        <div className="flex flex-wrap justify-around flex-grow">
        {books.map((book:any) => (
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
                >
                    Click to Read
                </a>
            </div>
        ))}
        </div>
        <footer className="footer h-30 mt-14 flex flex-col justify-center items-center">
    <h1 className="flex justify-center items-center font-bold text-white">Booky</h1>
    <div className="flex justify-center gap-3">
      <h1 className="text-white text-[10px]">About us</h1>
      <h1 className="text-white text-[10px]">Privacy</h1>
    </div>
    <hr />
    <p className="text-white flex justify-center text-[10px]">Copyright Booky Tracker</p>
  </footer>
     
      
    </div>
  )
}

export default Shelf
