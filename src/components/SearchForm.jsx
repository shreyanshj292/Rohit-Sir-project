import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [queryValue, setQueryValue] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\s+$/.test(queryValue) || queryValue === "") {
      return;
    }
    navigate({ pathname: "/search", search: `query=${queryValue}` });
    setQueryValue("");
  };

  return (
    <form onSubmit={handleSubmit} id="search" className="search">
      <input
        onChange={(e) => setQueryValue(e.target.value)}
        type="search"
        placeholder="Search for a title..."
        value={queryValue}
      />
      <div className="searchResults"></div>
    </form>
  );
};

export default SearchForm;
