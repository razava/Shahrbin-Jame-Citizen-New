import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import styles from "./styles.module.css";
import marker from "../../assets/images/location.svg";
import useClick from "../../hooks/useClick";
import { CN } from "../../utils/functions";
import RequestCard from "../../components/Requests/RequestCard";
import { AppStore } from "../../store/AppContext";

const defaultCoords = {
  latitude: process.env.REACT_APP_LATITUDE,
  longitude: process.env.REACT_APP_LONGITUDE,
};

const MapContainer = ReactMapboxGl({
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  zoom: 9,
});

const OnMapRequests = () => {
  // store
  const [store] = useContext(AppStore);

  // refs
  const detailsRef = useRef(null);
  const wrappersRef = useRef(null);

  // states
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  // functions
  const getRequests = async (
    { pageNumber = 1, pageSize = 50 } = { pageNumber: 1, pageSize: 50 }
  ) => {
    const params = {
      pageNumber,
      pageSize,
    };
    const { success, data, headers } = await api.CitizenReport({
      params: params,
      // tail: "all",
    });
    if (success) {
      setData(data);
    }
  };

  //   variables
  const whitelists = Array.from(
    document.getElementsByClassName("mapboxgl-marker")
  ).map((w) => ({ current: w }));

  // hooks
  const { makeRequest, loading } = useFetch({ fn: getRequests });
  const [detailsClicked, setDetailsClicked] = useClick({
    element: detailsRef,
    // whitelists,
  });

  //   functions
  const showDetails = (request) => {
    setSelected(request);
    setDetailsClicked(true);
  };

  const onMapClicked = (e, x) => {
    setSelected(null);
  };

  //   effects
  useEffect(() => {
    makeRequest();
  }, []);

  //   renders
  const renderContent = () => {
    if (loading)
      return (
        <div className={styles.loader}>
          <Loader />
        </div>
      );
    else
      return (
        <MapContainer
          //   zoom={[10]}
          center={[
            store.instance?.longitude || defaultCoords.longitude,
            store.instance?.latitude || defaultCoords.latitude,
          ]}
          containerStyle={{ height: "100%", width: "100%", borderRadius: 20 }}
          style={`https://api.parsimap.ir/styles/parsimap-streets-v11?key=${process.env.REACT_APP_PMI_TOKEN}`}
          onClick={onMapClicked}
        >
          {/* {data.map((d) => (
            <Marker coordinates={[d.address.longitude, d.address.latitude]}>
              <img src={marker} onClick={() => showDetails(d)} />
            </Marker>
          ))} */}
          <Marker
            coordinates={[
              selected?.address?.longitude || defaultCoords.latitude,
              selected?.address?.latitude || defaultCoords.longitude,
            ]}
          >
            <div
              ref={detailsRef}
              className={CN.join("mapDetailsBox", selected ? "show" : "")}
              style={{ width: wrappersRef?.current?.offsetWidth - 20 || 200 }}
            >
              {selected && <RequestCard request={selected} />}
            </div>
          </Marker>
          <ZoomControl />
        </MapContainer>
      );
  };
  return (
    <>
      <section ref={wrappersRef} className={styles.requestsList}>
        {renderContent()}
      </section>
    </>
  );
};

export default OnMapRequests;
