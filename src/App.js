import React, { useState } from "react";
import "./tailwind.css";
import Loader from "./assets/loading.png";
import SearchIcon from "./assets/search-icon.png";

const App = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = async (param) => {
    setLoading(true);
    const controller = new AbortController();
    // const url = 'https://puppesearch.herokuapp.com/'

    fetch(`https://puppesearch.herokuapp.com/ssr?q=${param}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <div className=" bg-slate-300 w-screen min-h-screen flex items-center justify-center flex-col">
        <div className="flex w-2/5 mb-6">
          <input
            className="shadow-md w-full  py-6 px-4 rounded-tl-sm rounded-br-sm"
            type="text"
            placeholder="search"
            onChange={(e) =>
              setTimeout(() => {
                setSearch(e.target.value);
              }, 1000)
            }
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(search) : {})}
          />
          <button
            onClick={() => handleSearch(search)}
            className="py-6 px-4 bg-white border-none shadow-md rounded-tl-none rounded-bl-none"
          >
            <img src={SearchIcon} alt="icon" />
          </button>
        </div>
        {loading && (
          <div className="flex w-full items-center justify-center">
            <img
              src={Loader}
              alt="loader"
              className="motion-safe animate-spin"
              width={64}
              height={64}
            />
          </div>
        )}

        {!loading && data && data.length ? (
          <div className="flex flex-col w-full justify-center items-center">
            {data.map((e, i) => {
              if (!!e)
                return (
                  <div
                    key={i}
                    className={`w-2/5 bg-white rounded-md p-6 flex mb-4`}
                  >
                    <img className="w-32  h-32 mr-4" alt="img" src={e.img} />
                    <div className="flex flex-col justify-center ">
                      <span className="mb-3 text-lg">{e.title}</span>
                      <span className="font-semibold">Precio: ${e.price}</span>
                    </div>
                  </div>
                );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
