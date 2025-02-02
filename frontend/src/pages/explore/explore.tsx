import home from '../../assets/home.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Explore = () => {
    const navigate=useNavigate();
    const [hamburger, setHamburger]=useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any>([]);
    const apiKey = 'AIzaSyC4mtYOTrDcPA44GHzr1gYELInpHg-sEKs';

  
    const handleClick = async () => {
      try {
        const result = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}&maxResults=30`
        );
        const data = await result.json();
        console.log(data.items);
        setData(data.items);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="min-h-screen w-full mycolor">
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

            </div>
            

        </div>
        <div className="pt-7">
            <h1 className="font-extrabold text-4xl flex justify-center pacifico">Your Book Explorer</h1>
            <p className="text-[18px] flex justify-center">Dive into Your Library, Track Progress, and Explore the World of Books.</p>
        </div>
        <div className="h-screen w-full mycolor">
      <div className="flex flex-col justify-center items-center gap-7">
        <h1 className="font-extrabold  text-green-500 flex justify-center mt-7 text-sm">
          Book Search
        </h1>
        <div className="flex gap-3 text-sm">
          <input
            placeholder="Search the internet..."
            className="flex justify-center border-4 border-green-500 rounded-xl text-sm font-extrabold placeholder:ml-7"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={handleClick}
            className="font-extrabold text-2xl bg-green-500 rounded-xl hover:bg-green-800 text-white w-40"
          >
            Search Book
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-7">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {data.map((book:any) => (
            <div
              key={book.id}
              className="flex flex-col items-center bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 hover:bg-green-500"
            >
              <a target="_blank" href={book.volumeInfo.previewLink} rel="noopener noreferrer">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                  alt={book.volumeInfo.title}
                  className="w-40 h-60 rounded-md mb-4"
                />
              </a>
              <h2 className="text-white text-lg font-semibold text-center">
                {book.volumeInfo.title}
              </h2>
              <p className="text-gray-400 text-sm text-center">
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
            </div>
          ))}
        </div>
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

export default Explore
