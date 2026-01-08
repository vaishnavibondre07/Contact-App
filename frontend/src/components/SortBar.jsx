const SortBar = ({ sort, setSort }) => {
  return (

 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
    <label className="font-medium text-gray-700">Sort By:</label>

     <select
       value={sort}
       onChange={(e) => setSort(e.target.value)}
       className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="name">Name</option>
      </select>
  </div>

  );
};

export default SortBar;
