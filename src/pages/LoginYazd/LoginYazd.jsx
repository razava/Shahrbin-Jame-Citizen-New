import React, { useState } from "react";
import { api } from "../../services/http";
import { appRoutes, httpMethods } from "../../utils/variables";
import useAuthenticate from "../../hooks/useAuthenticate";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const LoginYazd = () => {
  //   states
  const [error, setError] = useState(false);
  console.log("6666");
  // functions
  const getData = async () => {
    const searchParams = new URL(window.location.href).searchParams;
    const payload = {
      code: searchParams.get("code"),
      //   state: searchParams.get("state"),
    };
    // const payload = searchParams.get("code").code;
    console.log(payload);
    // console.log(payload);
    // const code = payload.code;
    // console.log(code);
    // cons;
    const { success, data } = await api.Authenticate({
      tail: "LoginMyYazd",
      payload,
      method: httpMethods.post,
    });
    if (success) {
      onSignInSuccess(data);
    } else {
      setError(data);
    }
  };

  // hooks
  const navigate = useNavigate();
  const { onSignInSuccess } = useAuthenticate();
  const {} = useFetch({ fn: getData, auto: true });

  return (
    <>
      <div className="w100 vh100 fcc f2 mx-auto">
        <span>{error ? error?.data?.message : "لطفا منتظر بمانید..."}</span>
        {error && (
          <Button className="py1" onClick={() => navigate(appRoutes.signin)}>
            بازگشت به صفحه ورود
          </Button>
        )}
      </div>
    </>
  );
};

export default LoginYazd;
