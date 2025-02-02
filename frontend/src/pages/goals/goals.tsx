import { Link } from "react-router-dom";
import home from '../../assets/home.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const goals = () => {
    const navigate=useNavigate();
    const [hamburger, setHamburger]=useState(false);
    const [data, setData]=useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const result=await fetch('https://book-tracking-website-2.onrender.com/auth/latest', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response=await result.json();
                if(!response){
                    alert("Error fetching your progress, Please try again")
                    console.log("Something went wrong, fetching data");
                }
                setData(response.user.readbooks);

            }catch(error){
                console.log("Something went wrong, Please try again")
            }
        }
        fetchData();

    },[])
  return (
    <div className="min-h-screen min-w-screen mycolor flex flex-col">
    {/* Header Section */}
    <div className="flex gap-7 pt-3 justify-around">
        <h1 className="font-bold text-xl pl-3 pacifico">Booky</h1>
        <div className="another flex justify-center rounded-xl h-8">
            <input placeholder="Search" className="text-sm pl-3 md:w-42 w-28" />
        </div>
        <div>
            <img src="/hamburger.png" className="h-10 w-10 md:hidden cursor-pointer" onClick={() => setHamburger(!hamburger)} />
            {hamburger ? <div>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/')}>Home</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/shelf')}>Library</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/explore')}>Explore</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/goals')}>Goals</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/login')}>Login</h1>
                <h1 className="border-2 border-green-500 hover:bg-green-700 rounded-xl" onClick={() => navigate('/signup')}>Signup</h1>
            </div> : null}
        </div>
        <div className="flex gap-3 md:flex hidden">
            <Link to={'/'} className="group">
                <img src={home} className="w-5 h-5 ml-1 group" />
                <h4 className="font-bold text-[10px] :text-yellow-500 group-hover:text-yellow-500">Home</h4>
            </Link>
            <Link to={'/shelf'} className="group">
                <img src={home} className="w-5 h-5 ml-1" />
                <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Library</h4>
            </Link>
            <Link to={'/explore'} className="group">
                <img src="loupe.png" className="w-5 h-5 ml-1" />
                <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Explore</h4>
            </Link>
            <Link to={'/goals'} className="group">
                <img src="goal.png" className="w-5 h-5 ml-1" />
                <h4 className="font-bold text-[10px] group-hover:text-yellow-500">Goals</h4>
            </Link>
        </div>
    </div>

    {/* Main Content */}
    <div className="pt-7 flex-grow">
        <h1 className="font-extrabold text-4xl flex justify-center pacifico">Reading Goals</h1>
        <p className="text-[18px] flex justify-center">Dive into Your Library, Track Progress, and Explore the World of Books.</p>
    </div>

    <div className="flex goal justify-around mt-7">
        <h1 className="font-bold pacifico">2024 Reading <br /> Challenges</h1>
        <img src="reader.png" className="w-[120px]" />
    </div>

    <div className="mr-32 bg-white h-[100px] w-full">
        <h1>{data.length} books completed</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-7">
            <div className="bg-blue-600 h-2.5 rounded-full " style={{ width: `${data.length}%` }}></div>
        </div>
    </div>

    {/* Footer Section */}
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

export default goals;
