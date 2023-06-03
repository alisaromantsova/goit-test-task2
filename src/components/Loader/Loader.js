import { createPortal } from "react-dom";
import { Audio } from "react-loader-spinner";
import css from "./Loader.module.css";
export const Loader = () => {
  return createPortal(
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" margin="auto" />
      </div>
    </div>,
    document.querySelector("#popup-root")
  );
};
