import { useEffect, useState } from "react";

import axios from "axios";
import css from "./Tweets.module.css";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";
axios.defaults.baseURL = "https://6477a7559233e82dd53c001f.mockapi.io/";

export const Tweets = () => {
  const [tweetsArray, setTweetsArray] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      const response = await axios.get("/tweets");

      setTweetsArray(response.data);
      setLoader(false);
    };
    fetch();
  }, []);

  return (
    <div className={css.div}>
      {loader && <Loader />}
      <Link to="/" className={css.back}>
        Go back
      </Link>
      <ul className={css.container}>
        {tweetsArray.map((tweet) => (
          <li className={css.tweet} key={tweet.id}>
            <p className={css.name}>Name: {tweet.name}</p>
            <p className={css.text}>
              Tweet: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus placeat modi veniam! Quae nemo quaerat pariatur qui
              aliquid nobis ea.
            </p>
            <p className={css.date}>Created: {tweet.createdAt.slice(0, 10)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
