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
  }, [onBtn, id, followersNumber, followingStatus]);

  const onButtonClick = () => {
    followingStatus ? setFolowingStatus(false) : setFolowingStatus(true);
    followingStatus ? setFollowersNumber(followersNumber - 1) : setFollowersNumber(followersNumber + 1);
    setOnBtn(true);
  };

  return (
    <li className={css.userCard}>
      <img width="76" height="22" className={css.cardLogo} src={Logo} alt="GoIT Logo" />
      <img width="308" height="168" className={css.cardFone} src={fone} alt="Background" />
      <div className={css.cardLine}></div>
      <img width="80" height="80" className={css.cardAvatar} src={avatar} alt="Avatar" />
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
        <button type="button" onClick={onButtonClick} className={css.cardButtonFollowed}>
          Following
        </button>
      )}
    </li>
  );
};
