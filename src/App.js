import React, { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setFilteredData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const handleSearch = async (event) => {
    const filtered = items.filter((item) => {
      return item.show.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredData(filtered);
    if (event.target.value === " " || event.target.value === null) {
      setFilteredData(items);
    } 
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (items.length > 0 && isLoaded) {
    return (
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="logo">Campflix</div>
            <div className="search-name">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(event) => handleSearch(event)}
                />
                <div className="name">
                  <h4>Muhamad Hanif</h4>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="banner">
          <a href={items[0].show.url}>
            {" "}
            <img src={items[0].show.image.original} alt="" />
          </a>
        </div>

        <div className="show">
          {filteredData.map((item) => (
            <div className="card" key={item.show.id}>
              <a href={item.show.url}>
                <div className="image">
                  {item.show.image ? (
                    <img alt={item.show.id} src={item.show.image.medium} />
                  ) : (
                    <div className="img-img" />
                  )}
                </div>
                <div className="title">{item.show.name}</div>
              </a>
            </div>
          ))}
          
        </div>
      </div>
    );
  } else {
    return <div><h1>Please wait....</h1></div>;
  }
}

export default App;
