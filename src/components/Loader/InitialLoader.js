import React, { useEffect, useState } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";
import useInitialData from "../../hooks/useInitialData";
import Button from "../Button/Button";
import DualRingLoader from "./DualRingLoader";
import styles from "./styles.module.css";
import useInstance from "../../hooks/useInstance";
import { CN } from "../../utils/functions";

const InitialLoader = ({ children }) => {
  // states
  const [loader, setLoader] = useState(false);
  const [close, setClose] = useState(false);

  //   hooks
  const { done, error, getInitialData } = useInitialData();
  const { isSuccess, currentInstance, getInstances } = useInstance();
  const { logout } = useAuthenticate();

  // variables
  const isComplete = done && loader && !error && isSuccess;
  console.log(error);
  //   functions
  const onAnimationEnd = () => {
    setClose(true);
    setTimeout(() => {
      setLoader(true);
    }, 1000);
  };

  const onTryAgain = () => {
    setLoader(true);
    getInitialData();
    getInstances();
  };

  // effects
  useEffect(() => {
    getInstances();
  }, []);

  useEffect(() => {
    if (currentInstance?.id) getInitialData();
  }, [currentInstance]);
  return (
    <>
      <section
        className={[
          styles.initialLoaderWrapper,
          isComplete ? styles.hide : "",
        ].join(" ")}
      >
        <section
          className={[
            styles.initialLaoder,
            styles.left,
            close ? styles.hide : "",
          ].join(" ")}
        ></section>
        <section
          className={[
            styles.initialLaoder,
            styles.right,
            close ? styles.hide : "",
          ].join(" ")}
        ></section>

        {loader && !error && (
          <DualRingLoader
            style={{
              position: "absolute",
              top: "calc(50% + 100px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        {error && (
          <div className={styles.errorWrapper}>
            <p>مشکلی در بارگذاری به وجود آمد.</p>
            <div className={styles.actions}>
              <Button className={styles.tryAgainBtn} onClick={onTryAgain}>
                تلاش مجدد
              </Button>
              <Button className={styles.logoutBtn} onClick={logout}>
                خروج
              </Button>
            </div>
          </div>
        )}

        <svg
          width="370"
          height="113"
          viewBox="0 0 370 113"
          className={[styles.initialLaoderSvg, close ? styles.hide : ""].join(
            " "
          )}
          fill="none"
        >
          <mask
            id="path-1-outside-1_7_102"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="371"
            height="113"
            fill="black"
          >
            <rect fill="white" width="371" height="113" />
            <path d="M299.928 6.42565C294.905 8.18049 292.309 14.9385 294.598 20.2403C296.17 23.8993 299.074 25.8408 302.832 25.8035C306.386 25.7662 309.016 24.086 310.725 20.7257C311.579 19.0082 311.716 18.3361 311.716 15.9466C311.716 12.7729 311.032 10.9434 309.085 8.85255C306.83 6.38832 302.935 5.34288 299.928 6.42565Z" />
            <path d="M30.6934 15.1625C24.5093 17.3654 17.1976 23.5259 12.9609 30.1346C7.73335 38.2367 5 47.7202 5 57.3905C5.03417 83.377 24.7484 103.502 47.811 101.075C53.0727 100.515 56.9336 99.3571 61.2727 96.9302C72.7528 90.6576 80.7137 78.7845 83.9937 63.1777C84.5745 60.5268 84.882 59.668 85.0528 60.1908C85.1895 60.6015 85.5654 61.7589 85.907 62.767C87.342 67.1354 89.9729 70.309 93.7996 72.2506C95.5421 73.1093 96.1912 73.2587 99.0271 73.2213C101.76 73.2213 102.546 73.072 104.152 72.2506C109.004 69.7863 113.445 64.6338 116.452 57.9505C117.375 55.9343 118.195 54.4782 118.263 54.7769C120.45 62.5056 124.652 68.7036 129.333 71.1305C131.041 71.9892 131.725 72.1386 134.39 72.1012C136.747 72.1012 137.909 71.8772 139.276 71.2798C148.33 67.2101 154.958 56.4571 156.393 43.5758C156.837 39.6928 156.632 36.9299 155.71 33.9803C153.831 28.0064 147.817 22.9286 139.993 20.7257C136.03 19.6056 135.722 19.8669 136.611 23.2272C138.763 31.516 139.105 40.8503 137.465 47.8696C136.269 52.9474 132.716 59.108 130.085 60.5641C126.839 62.431 123.696 59.5187 121.68 52.7234C120.86 49.9978 120.791 48.9897 120.586 41.5223C120.45 36.1085 120.211 33.0095 119.937 32.4868C119.254 31.18 117.716 30.0599 111.156 26.2515C104.289 22.2192 103.264 21.9578 103.366 24.1607C104.015 36.3325 103.81 41.2983 102.375 47.2722C100.701 54.3662 97.3529 59.2573 93.7654 59.8174C91.8179 60.1534 89.6995 59.4814 88.2304 58.0626C86.112 56.009 85.9412 55.2996 85.8387 48.0563C85.702 41.1116 85.0187 35.6231 83.5495 29.7612C82.5928 25.9528 82.3878 25.8408 78.2878 27.3343C73.7436 29.0145 72.0353 30.9933 72.0353 34.6897C72.0353 35.8471 72.2061 37.2659 72.4111 37.8633C74.427 43.5758 75.3836 57.1665 74.2561 64.5218C73.0945 72.1385 70.327 79.0085 66.5003 83.713C63.2203 87.708 57.9244 91.2177 52.9019 92.7112C49.7244 93.6446 42.3785 93.6819 38.8935 92.7112C35.5793 91.8524 30.6593 89.2388 28.4043 87.1853C22.9034 82.1822 19.2476 73.8187 18.8376 65.2312C18.4959 57.8385 20.5459 51.6406 24.7143 47.3469C27.2426 44.7706 28.9168 43.7252 31.8893 42.8291C33.9393 42.1944 33.9393 42.1944 34.3493 40.3649C35.8868 33.7936 36.741 20.9497 35.8526 17.552C35.4426 15.9466 34.1101 14.4531 33.1193 14.4904C32.8118 14.4904 31.7185 14.7891 30.6934 15.1625Z" />
            <path d="M288.448 26.6996C285.851 27.6703 284.382 29.1265 282.981 32.0014C282.059 33.9803 282.093 38.4234 283.084 40.4395C286.74 47.9443 295.999 47.9443 299.45 40.5142C301.91 35.2497 299.176 28.2677 294.017 26.5876C291.796 25.8782 290.6 25.8782 288.448 26.6996Z" />
            <path d="M309.939 26.6996C307.376 27.7077 305.941 29.0891 304.746 31.6654C302.422 36.7432 304.062 42.4184 308.606 44.9947C311.032 46.3761 314.415 46.4135 316.772 45.0693C319.984 43.2772 321.761 40.1035 321.795 36.0711C321.795 29.2758 315.747 24.4594 309.939 26.6996Z" />
            <path d="M351.349 33.3455C350.632 33.8683 348.445 36.0338 346.429 38.162C334.949 50.4085 323.981 57.7265 311.886 61.2362C308.128 62.319 307.65 62.3936 300.782 62.3936C294.017 62.431 293.402 62.3563 290.02 61.4229C282.64 59.2947 276.524 56.121 267.504 49.6991C257.834 42.7544 252.88 40.4769 247.755 40.4769C236.959 40.5516 228.348 50.2592 223.941 67.3594C223.36 69.6743 222.813 71.5785 222.711 71.5785C222.608 71.5785 221.925 69.9357 221.208 67.9195C219.499 63.3644 214.613 52.6487 212.768 49.5124C210.821 46.2268 205.628 40.7009 202.689 38.7967C198.453 36.0338 196.847 35.5484 191.79 35.5484C186.802 35.5484 184.547 36.1458 180.344 38.61C171.324 43.9119 161.552 56.6064 156.154 70.1597C154.001 75.5362 153.216 79.2699 153.455 82.9663C153.728 86.5506 154.172 88.4548 156.667 96.7809C159.707 106.974 159.776 107.123 160.767 106.974C161.518 106.862 161.757 106.451 162.748 103.091C165.55 93.6819 172.042 80.502 178.294 71.3918C187.075 58.6226 194.968 53.6941 202.006 56.6438C203.475 57.2411 207.268 60.1161 209.044 61.9456C213.076 66.09 215.809 70.3464 221.993 82.0328C226.196 89.9482 227.153 91.5164 228.212 92.1138C229.784 93.0472 230.023 92.5245 232.927 82.8542C237.984 65.9406 242.562 57.9506 248.985 54.6649C250.83 53.7315 251.616 53.5075 253.769 53.5075C257.356 53.5075 260.568 54.7022 268.665 59.1453C273.585 61.8336 273.62 61.8709 282.23 67.3594C291.352 73.184 297.195 75.7976 305.258 77.5897C310.212 78.6725 320.018 78.9712 325.143 78.1498C335.222 76.507 343.457 72.8853 352.032 66.2767C355.278 63.7751 364.606 53.9928 364.982 52.6487C365.255 51.7526 362.419 43.1278 360.54 38.9834C357.807 33.0842 354.458 31.0307 351.349 33.3455Z" />
            <path d="M41.9685 53.8435C35.8185 56.009 33.7685 65.0446 38.2785 70.085C40.1235 72.1759 42.276 73.184 44.8727 73.184C50.3052 73.184 54.2686 68.4049 53.8586 62.4683C53.5852 58.8093 51.8086 55.897 48.8019 54.2169C47.2985 53.3581 43.8135 53.1714 41.9685 53.8435Z" />
            <path d="M80.3037 87.372C78.7662 87.8947 76.272 90.359 75.3495 92.2631C74.7687 93.4579 74.5978 94.4287 74.5978 96.7809C74.5978 99.3571 74.7345 99.9919 75.5203 101.523C79.4153 108.691 88.7087 108.243 91.8179 100.701C92.7404 98.4984 92.7746 94.7647 91.8862 92.6365C91.0662 90.695 89.0504 88.4921 87.2737 87.596C85.702 86.812 82.1829 86.6999 80.3037 87.372Z" />
            <path d="M99.8813 87.7827C94.3121 90.6203 93.0137 98.9464 97.3871 103.763C99.3004 105.816 100.872 106.488 103.81 106.488C107.808 106.488 110.234 104.846 112.079 100.925C113.172 98.6851 113.138 94.802 112.01 92.3751C109.79 87.5214 104.357 85.4678 99.8813 87.7827Z" />
            <path d="M131.315 87.3347C129.777 87.9321 127.761 89.6869 126.873 91.0684C123.832 96.0715 125.404 102.904 130.29 105.63C131.041 106.04 132.613 106.488 133.775 106.601C143.068 107.422 147.066 93.9806 139.241 88.3801C137.704 87.2973 137.157 87.1106 134.902 86.9986C133.501 86.9613 131.896 87.0733 131.315 87.3347Z" />
          </mask>
          <path
            d="M299.928 6.42565C294.905 8.18049 292.309 14.9385 294.598 20.2403C296.17 23.8993 299.074 25.8408 302.832 25.8035C306.386 25.7662 309.016 24.086 310.725 20.7257C311.579 19.0082 311.716 18.3361 311.716 15.9466C311.716 12.7729 311.032 10.9434 309.085 8.85255C306.83 6.38832 302.935 5.34288 299.928 6.42565Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M30.6934 15.1625C24.5093 17.3654 17.1976 23.5259 12.9609 30.1346C7.73335 38.2367 5 47.7202 5 57.3905C5.03417 83.377 24.7484 103.502 47.811 101.075C53.0727 100.515 56.9336 99.3571 61.2727 96.9302C72.7528 90.6576 80.7137 78.7845 83.9937 63.1777C84.5745 60.5268 84.882 59.668 85.0528 60.1908C85.1895 60.6015 85.5654 61.7589 85.907 62.767C87.342 67.1354 89.9729 70.309 93.7996 72.2506C95.5421 73.1093 96.1912 73.2587 99.0271 73.2213C101.76 73.2213 102.546 73.072 104.152 72.2506C109.004 69.7863 113.445 64.6338 116.452 57.9505C117.375 55.9343 118.195 54.4782 118.263 54.7769C120.45 62.5056 124.652 68.7036 129.333 71.1305C131.041 71.9892 131.725 72.1386 134.39 72.1012C136.747 72.1012 137.909 71.8772 139.276 71.2798C148.33 67.2101 154.958 56.4571 156.393 43.5758C156.837 39.6928 156.632 36.9299 155.71 33.9803C153.831 28.0064 147.817 22.9286 139.993 20.7257C136.03 19.6056 135.722 19.8669 136.611 23.2272C138.763 31.516 139.105 40.8503 137.465 47.8696C136.269 52.9474 132.716 59.108 130.085 60.5641C126.839 62.431 123.696 59.5187 121.68 52.7234C120.86 49.9978 120.791 48.9897 120.586 41.5223C120.45 36.1085 120.211 33.0095 119.937 32.4868C119.254 31.18 117.716 30.0599 111.156 26.2515C104.289 22.2192 103.264 21.9578 103.366 24.1607C104.015 36.3325 103.81 41.2983 102.375 47.2722C100.701 54.3662 97.3529 59.2573 93.7654 59.8174C91.8179 60.1534 89.6995 59.4814 88.2304 58.0626C86.112 56.009 85.9412 55.2996 85.8387 48.0563C85.702 41.1116 85.0187 35.6231 83.5495 29.7612C82.5928 25.9528 82.3878 25.8408 78.2878 27.3343C73.7436 29.0145 72.0353 30.9933 72.0353 34.6897C72.0353 35.8471 72.2061 37.2659 72.4111 37.8633C74.427 43.5758 75.3836 57.1665 74.2561 64.5218C73.0945 72.1385 70.327 79.0085 66.5003 83.713C63.2203 87.708 57.9244 91.2177 52.9019 92.7112C49.7244 93.6446 42.3785 93.6819 38.8935 92.7112C35.5793 91.8524 30.6593 89.2388 28.4043 87.1853C22.9034 82.1822 19.2476 73.8187 18.8376 65.2312C18.4959 57.8385 20.5459 51.6406 24.7143 47.3469C27.2426 44.7706 28.9168 43.7252 31.8893 42.8291C33.9393 42.1944 33.9393 42.1944 34.3493 40.3649C35.8868 33.7936 36.741 20.9497 35.8526 17.552C35.4426 15.9466 34.1101 14.4531 33.1193 14.4904C32.8118 14.4904 31.7185 14.7891 30.6934 15.1625Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M288.448 26.6996C285.851 27.6703 284.382 29.1265 282.981 32.0014C282.059 33.9803 282.093 38.4234 283.084 40.4395C286.74 47.9443 295.999 47.9443 299.45 40.5142C301.91 35.2497 299.176 28.2677 294.017 26.5876C291.796 25.8782 290.6 25.8782 288.448 26.6996Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M309.939 26.6996C307.376 27.7077 305.941 29.0891 304.746 31.6654C302.422 36.7432 304.062 42.4184 308.606 44.9947C311.032 46.3761 314.415 46.4135 316.772 45.0693C319.984 43.2772 321.761 40.1035 321.795 36.0711C321.795 29.2758 315.747 24.4594 309.939 26.6996Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M351.349 33.3455C350.632 33.8683 348.445 36.0338 346.429 38.162C334.949 50.4085 323.981 57.7265 311.886 61.2362C308.128 62.319 307.65 62.3936 300.782 62.3936C294.017 62.431 293.402 62.3563 290.02 61.4229C282.64 59.2947 276.524 56.121 267.504 49.6991C257.834 42.7544 252.88 40.4769 247.755 40.4769C236.959 40.5516 228.348 50.2592 223.941 67.3594C223.36 69.6743 222.813 71.5785 222.711 71.5785C222.608 71.5785 221.925 69.9357 221.208 67.9195C219.499 63.3644 214.613 52.6487 212.768 49.5124C210.821 46.2268 205.628 40.7009 202.689 38.7967C198.453 36.0338 196.847 35.5484 191.79 35.5484C186.802 35.5484 184.547 36.1458 180.344 38.61C171.324 43.9119 161.552 56.6064 156.154 70.1597C154.001 75.5362 153.216 79.2699 153.455 82.9663C153.728 86.5506 154.172 88.4548 156.667 96.7809C159.707 106.974 159.776 107.123 160.767 106.974C161.518 106.862 161.757 106.451 162.748 103.091C165.55 93.6819 172.042 80.502 178.294 71.3918C187.075 58.6226 194.968 53.6941 202.006 56.6438C203.475 57.2411 207.268 60.1161 209.044 61.9456C213.076 66.09 215.809 70.3464 221.993 82.0328C226.196 89.9482 227.153 91.5164 228.212 92.1138C229.784 93.0472 230.023 92.5245 232.927 82.8542C237.984 65.9406 242.562 57.9506 248.985 54.6649C250.83 53.7315 251.616 53.5075 253.769 53.5075C257.356 53.5075 260.568 54.7022 268.665 59.1453C273.585 61.8336 273.62 61.8709 282.23 67.3594C291.352 73.184 297.195 75.7976 305.258 77.5897C310.212 78.6725 320.018 78.9712 325.143 78.1498C335.222 76.507 343.457 72.8853 352.032 66.2767C355.278 63.7751 364.606 53.9928 364.982 52.6487C365.255 51.7526 362.419 43.1278 360.54 38.9834C357.807 33.0842 354.458 31.0307 351.349 33.3455Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M41.9685 53.8435C35.8185 56.009 33.7685 65.0446 38.2785 70.085C40.1235 72.1759 42.276 73.184 44.8727 73.184C50.3052 73.184 54.2686 68.4049 53.8586 62.4683C53.5852 58.8093 51.8086 55.897 48.8019 54.2169C47.2985 53.3581 43.8135 53.1714 41.9685 53.8435Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M80.3037 87.372C78.7662 87.8947 76.272 90.359 75.3495 92.2631C74.7687 93.4579 74.5978 94.4287 74.5978 96.7809C74.5978 99.3571 74.7345 99.9919 75.5203 101.523C79.4153 108.691 88.7087 108.243 91.8179 100.701C92.7404 98.4984 92.7746 94.7647 91.8862 92.6365C91.0662 90.695 89.0504 88.4921 87.2737 87.596C85.702 86.812 82.1829 86.6999 80.3037 87.372Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M99.8813 87.7827C94.3121 90.6203 93.0137 98.9464 97.3871 103.763C99.3004 105.816 100.872 106.488 103.81 106.488C107.808 106.488 110.234 104.846 112.079 100.925C113.172 98.6851 113.138 94.802 112.01 92.3751C109.79 87.5214 104.357 85.4678 99.8813 87.7827Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
          <path
            d="M131.315 87.3347C129.777 87.9321 127.761 89.6869 126.873 91.0684C123.832 96.0715 125.404 102.904 130.29 105.63C131.041 106.04 132.613 106.488 133.775 106.601C143.068 107.422 147.066 93.9806 139.241 88.3801C137.704 87.2973 137.157 87.1106 134.902 86.9986C133.501 86.9613 131.896 87.0733 131.315 87.3347Z"
            fill="var(--white)"
            stroke="var(--blue)"
            strokeWidth={3}
            onAnimationEnd={onAnimationEnd}
          />
        </svg>

        <div className={CN.join(styles.infoText, close ? styles.hide : "")}>
          <p>سامانه جامع شهروندی شهربین</p>
        </div>
      </section>

      {isComplete && children}
    </>
  );
};

export default InitialLoader;
