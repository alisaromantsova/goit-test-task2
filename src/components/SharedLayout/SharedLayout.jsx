import { Link, NavLink, Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
 color: #ebd8ff;
}

  &.active {
    color: #266894;
  }
`;
export const SharedLayout = () => {
  return (
    <div className={css.all}>
      <header className={css.header}>
        <div className={css.container}>
          <nav className={css.nav}>
            <Link className={css.logo} to="/">
              Users App
            </Link>
            <StyledLink className={css.link} to="/">
              Users
            </StyledLink>
            <StyledLink className={css.link} to="/tweets">
              Tweets
            </StyledLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={css.footer}></footer>
    </div>
  );
};
