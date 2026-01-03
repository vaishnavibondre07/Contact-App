const SortBar = ({ sort, setSort }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <label className="font-medium">Sort By:</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded p-2"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default SortBar;
