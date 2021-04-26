import React from "react";
import classes from "./AccountSettingsNav.module.css";

type Props = {
  setButton: boolean;
  setShowChangePasswordContent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowManageSettingsContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountSettingsNav(props: Props) {
  return (
    <div>
      <button
        className={classes.accountSettingsButton}
        onClick={() => props.setShowChangePasswordContent(true)}
      >
        <div>
          <i className={classes.lock} />
          Change Name and Password
        </div>
        <i className={classes.arrowRight} />
      </button>

      <button
        disabled={props.setButton}
        className={classes.accountSettingsButton}
        onClick={() => props.setShowManageSettingsContent(true)}
      >
        <div>
          <i className={classes.userAdmin} />
          Manage Users
        </div>
        <i className={classes.arrowRight} />
      </button>
    </div>
  );
}
