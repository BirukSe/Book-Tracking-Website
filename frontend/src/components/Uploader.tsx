

const Uploader = ({ setBook, book, handleFileChange, bookUpload, title, setTitle, description, setDescription }:any) => {
  return (
    <>
      {book && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Book</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Upload Cover Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Upload Book</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleFileChange(e, "pdf")}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={bookUpload}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setBook(false)} // Close modal on cancel
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Uploader;
