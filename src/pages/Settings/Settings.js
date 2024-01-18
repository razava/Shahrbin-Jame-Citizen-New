import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAuthenticate";
import { URI } from "../../utils/functions";
import { appRoutes } from "../../utils/variables";
import SettingCard from "./SettingCard";
import SocialMedia from "./SocialMedia";
import Staggered from "../../components/Animated/Staggered";
import styles from "./styles.module.css";

const Settings = () => {
  //   hooks
  const navigate = useNavigate();
  const { logout } = useAuthenticate();

  return (
    <>
      <section className={styles.wrapper}>
        <Staggered>
          <SettingCard
            title="ویرایش نمایه"
            icon={"user"}
            onClick={() => navigate(appRoutes.profile)}
          />
          <SettingCard
            title="تغییر رمز عبور"
            icon={"key"}
            onClick={() => navigate(appRoutes.password)}
          />
          <SettingCard
            title="درباره ما"
            icon={"info"}
            onClick={() => URI.open("https://shahrbinapp.com")}
          />
          <SettingCard
            title="سوالات متداول"
            icon={"question-circle"}
            onClick={() => navigate(appRoutes.FAQ)}
          />
          <SettingCard
            title="حریم خصوصی"
            icon={"lock"}
            onClick={() => navigate(appRoutes.pnpUser)}
          />
          <SettingCard
            title="خروج از حساب کاربری"
            icon={"sign-out-alt"}
            onClick={logout}
          />
        </Staggered>

        <SocialMedia />
      </section>
    </>
  );
};

export default Settings;
