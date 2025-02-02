
import { useState, useEffect } from "react";
import Load from "../../components/Load";
import Uploader from "../../components/Uploader";

const Admin = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [book, setBook] = useState(false);
  const [cover, setCoverImage] = useState(null);
  const [pdf, setPdfFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [reader, setReader]=useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      console.log("my token admin os", localStorage.getItem("admin"));
      try {
        const result = await fetch("https://book-tracking-website-2.onrender.com/auth/all-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        });
        const response = await result.json();
        if (!response) {
          console.log("Something went wrong with the server, please try again");
        }
        console.log("response", response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    const getAllBooks=async ()=>{
      try{
        setLoading(true);
        const result=await fetch('https://book-tracking-website-2.onrender.com/book/show', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin')}`
          }
        })
        const response=await result.json();
        if(!response){
          alert("Something went wrong, We couldnt fetch the books correctly, Please try again")
          console.log("Error loading books no response")
        }
        setReader(response);

      }catch(error){
        setLoading(false);
        alert("Error loading books, Please try again")
        console.log(error);
      }
      finally{
        setLoading(false);

      }
    }
    getAllUsers();
    getAllBooks();
  }, []);

  const userEdit = async (_id:any) => {
    const result = await fetch("https://book-tracking-website-2.onrender.com/auth/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
      body: JSON.stringify({
        email: email,
        id: _id,
      }),
    });
    const response = await result.json();
    if (!response) {
      console.log("Something went wrong,Please try again");
    }
    alert("Email updated Successfully");
  };

  async function deleteUser(_id:any) {
    const result = await fetch("https://book-tracking-website-2.onrender.com/auth/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
      body: JSON.stringify({
        id: _id,
      }),
    });
    const response = await result.json();
    if (!response) {
      console.log("Something went wrong, Please try again");
    }
    alert("User deleted Successfully");
    setEdit(false);
  }

  const bookUpload = async () => {
    try {
      setLoading(true);
      const formdata = new FormData();
      if (cover != null && pdf != null) {
        formdata.append("file", cover);
        formdata.append("pdf", pdf);
        formdata.append("title", title);
        formdata.append("description", description);
      }

      const result = await fetch("https://book-tracking-website-2.onrender.com/book/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin")}`,
        },
        body: formdata,
      });

      const response = await result.json();
      if (!response) {
        console.log("Something went wrong, Please try again");
      }
      alert("Book uploaded Successfully");
      setBook(false); // Close the modal after upload
    } catch (error) {
      setLoading(false);
      alert("Something went wrong when uploading the book, Please try again");
      console.log("Something went wrong, Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e:any, type:any) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "cover") {
        setCoverImage(file);
      } else if (type === "pdf") {
        setPdfFile(file);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <div className="min-h-screen min-w-screen mycolor flex flex-col">
          <h1 className="flex justify-center font-extrabold text-xl pt-3">Admin DashBoard</h1>
          <div>
            <div className="w-full h-7 text-[10px] min-w-screen">
              <h1 className="flex justify-center font-extrabold text-lg italic">Users</h1>
              {data.map((user:any) => (
                <div key={user._id} className="flex h-7 min-w-screen gap-7">
                  <div className=" flex p-4 m-2 bg-blue-300 shadow-md rounded w-full pb-9 gap-7 justify-around">
                    <p className="font-bold">User ID: {user._id}</p>
                    <p>{user.email}</p>
                    <img
                      src="edit.png"
                      className="w-5 h-5 cursor-pointer hover:bg-blue-600"
                      onClick={() => setEdit(!edit)}
                    />
                    <img
                      src="remove.png"
                      className="w-[13px] h-[13px] cursor-pointer hover:bg-red-950"
                      onClick={() => deleteUser(user._id)}
                    />
                  </div>
                  {edit && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                              type="email"
                              className="w-full p-2 border rounded"
                              defaultValue={user.email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                              onClick={() => userEdit(user._id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="bg-gray-500 text-white px-4 py-2 rounded"
                              onClick={() => setEdit(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-72" onClick={() => setBook(true)}>
              <button className="border-2 border-green-500 hover:bg-green-500 font-extrabold px-4 py-2 rounded">
                Add Books
              </button>
            </div>

            {/* Uploader Component */}
            <Uploader
              book={book}
              setBook={setBook}
              handleFileChange={handleFileChange}
              bookUpload={bookUpload}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
          <div className="flex flex-wrap justify-start">
  {reader.map((book: any) => (
    <div key={book._id} className="flex flex-col p-4 m-2 bg-blue-100 shadow-md rounded w-64">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-sm mb-2">{book.description}</p>
      
      {/* Display the cover image */}
      {book.image && (
        <img
          src={book.image} // Assuming coverImage is a URL or path
          alt="Cover Image"
          className="w-32 h-40 object-cover mb-2"
        />
      )}
      
      {/* PDF download link */}
      {book.book && (
        <a
          href={book.book}
          download
          className="text-blue-500 underline"
        >
          Download PDF
        </a>
      )}
    </div>
  ))}
</div>

          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
