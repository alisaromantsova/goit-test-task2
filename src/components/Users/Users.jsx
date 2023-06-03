import { useEffect, useState } from "react";

import { User } from "../User/User";
import axios from "axios";
import css from "./Users.module.css";
import { Loader } from "../Loader/Loader";

axios.defaults.baseURL = "https://6477a7559233e82dd53c001f.mockapi.io/";

export const Users = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  console.log(page);
  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      const response = await axios.get(`/users?page=${page}&limit=3`);

      setUsersArray([...usersArray, ...response.data]);
      setLoader(false);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClick = () => {
    setPage(page + 1);
  };

  const onSelect = (e) => {
    if (e.target.value === "true") {
      setSelectedValue(true);
    }
    if (e.target.value === "false") {
      setSelectedValue(false);
    }
    if (e.target.value === "All") {
      setSelectedValue("All");
    }
  };

  return (
    <div className={css.div}>
      <select value={selectedValue} onChange={onSelect} className={css.filter}>
        <option value="All">All</option>
        <option value={true}>Following</option>
        <option value={false}>Follow</option>
      </select>
      {loader && <Loader />}
      <ul className={css.container}>
        {selectedValue === "All" &&
          usersArray.map((user) => (
            <User tweets={user.tweets} followers={user.followers} key={user.id} isFollowed={user.isFollowed} id={user.id} avatar={user.avatar} />
          ))}
        {selectedValue !== "All" &&
          usersArray
            .filter((user) => user.isFollowed === selectedValue)
            .map((user) => (
              <User tweets={user.tweets} followers={user.followers} key={user.id} isFollowed={user.isFollowed} id={user.id} avatar={user.avatar} />
            ))}
      </ul>
      {page < 4 && (
        <button className={css.button} onClick={handleClick}>
          Add more
        </button>
      )}
    </div>
  );
};
