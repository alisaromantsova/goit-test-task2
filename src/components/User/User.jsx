import Logo from "../../img/Logo.svg";
import fone from "../../img/picture.png";
import css from "./User.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "https://6477a7559233e82dd53c001f.mockapi.io/";

export const User = ({ id, tweets, followers, isFollowed, avatar }) => {
  const [followingStatus, setFolowingStatus] = useState(isFollowed);
  const [followersNumber, setFollowersNumber] = useState(followers);
  const [onBtn, setOnBtn] = useState(false);

  const fetch = async (id, followers, isFollowed) => {
    try {
      const response = await axios.put(`/users/${id}`, { isFollowed: isFollowed, followers: followers });
      return response.data;
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (onBtn) {
      fetch(id, followersNumber, followingStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBtn]);

  const onButtonClick = () => {
    followingStatus ? setFolowingStatus(false) : setFolowingStatus(true);
    followingStatus ? setFollowersNumber(followersNumber - 1) : setFollowersNumber(followersNumber + 1);
    setOnBtn(true);
  };

  return (
    <li className={css.userCard}>
      <img className={css.cardLogo} src={Logo} alt="" />
      <img className={css.cardFone} src={fone} alt="" />
      <div className={css.cardLine}></div>
      <img className={css.cardAvatar} src={avatar} alt="" />
      <div className={css.description}>
        <Link to="/tweets" className={css.cardLink}>
          {tweets} Tweets
        </Link>
        <p className={css.cardText}>{`${followersNumber.toString().slice(0, 3)},${followersNumber.toString().slice(3, 6)}`} Followers</p>
      </div>
      {!followingStatus && (
        <button onClick={onButtonClick} className={css.cardButton}>
          Follow
        </button>
      )}
      {followingStatus && (
        <button onClick={onButtonClick} className={css.cardButtonFollowed}>
          Following
        </button>
      )}
    </li>
  );
};
