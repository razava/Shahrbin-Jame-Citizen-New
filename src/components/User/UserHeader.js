import React, { useContext } from "react";
import useMe from "../../hooks/useMe";
import { CN } from "../../utils/functions";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes, pageTitles } from "../../utils/variables";
import { menuItems } from "../../pages/Menu/constants";
import Avatar from "../Avatar/Avatar";
import DropDown from "../DropDown/DropDown";
import useInstance from "../../hooks/useInstance";
import { AppStore } from "../../store/AppContext";
import useResize from "../../hooks/useResize";

const UserHeader = ({ position }) => {
  // store
  const [store, dispatch] = useContext(AppStore);
  const { sideMenu } = store;

  //  hooks
  const { getUserFullName } = useMe();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentInstance, instances, setAppInstance } = useInstance();
  const { isDesktop } = useResize();

  // variables
  const isMenupage = appRoutes.menu === pathname;

  // functions
  const handleLeftIconClick = (e) => {
    e.stopPropagation();
    if (!isMenupage) {
      const isMenuItemPage = !!menuItems.find((item) => item.to === pathname);
      if (isMenuItemPage) {
        navigate(appRoutes.menu);
      } else {
        navigate(-1);
      }
    }
  };

  // renders
  const renderCurrentInstance = () => {
    return (
      <DropDown
        renderToggle={renderInstanceToggle}
        options={instances}
        nameKey="name"
        valueKey="id"
        scroll
        scrollHeight={200}
        position="bottom"
        searchable
        onChange={setAppInstance}
      />
    );
  };

  const renderInstanceToggle = () => {
    return (
      <div className={styles.userHeader_card}>
        <div className={styles.instanceToggle}>
          <p>{currentInstance.name}</p>
          <Icon name="angle-down" />
        </div>
      </div>
    );
  };
  return (
    <>
      <div className={CN.join(styles.userHeader, sideMenu ? styles.open : "")}>
        <div>
          <p className={styles.userHeaderPageTitle}>
            {isMenupage ? "" : pageTitles[pathname]}
          </p>
        </div>

        <div>
          <div className={styles.userHeader_card}>
            <Icon
              name={"bell"}
              type="far"
              className={styles.userHeaderIcon}
              onClick={() => navigate(appRoutes.notifications)}
            />
          </div>

          {renderCurrentInstance()}

          <div className={styles.userHeader_card}>
            <span
              className={styles.userHeader_currentUser}
              onClick={() => navigate(appRoutes.profile)}
            >
              <Avatar size={1} />
              <span
                className={CN.join(styles.userHeaderUserInfo, styles[position])}
              >
                {getUserFullName()}
              </span>
            </span>
          </div>

          {!isDesktop && !isMenupage && (
            <Icon
              name={"angle-left"}
              type="far"
              className={styles.userHeaderIcon}
              onClick={handleLeftIconClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(UserHeader);
