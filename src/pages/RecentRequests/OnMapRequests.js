import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { api } from "../../services/http";
import styles from "./styles.module.css";
import marker from "../../assets/images/location.svg";
import useClick from "../../hooks/useClick";
import { CN, LS } from "../../utils/functions";
import RequestCard from "../../components/Requests/RequestCard";
import { AppStore } from "../../store/AppContext";
import useInstance from "../../hooks/useInstance";
import { appConstants } from "../../utils/variables";

const MapContainer = ReactMapboxGl({
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  zoom: 9,
});

const OnMapRequests = () => {
  // store
  const [store] = useContext(AppStore);
  const { currentInstance, instances, setAppInstance } = useInstance();

  const defaultCoords = {
    latitude: instances[0].latitude,
    longitude: instances[0].longitude,
  };

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
    const instance = LS.read(appConstants.SH_CT_INSTANCE);
    const params = {
      // pageNumber,
      // pageSize,
      instanceId: instance.id,
    };
    console.log(params);
    const { success, data, headers } = await api.CitizenReport({
      params: params,
      isPerInstance: false,
      // id: instance.id,
      tail: "Locations",
      // tail: "all",
    });
    if (success) {
      console.log(data.locations[0].locations);
      setData(data.locations[0].locations);
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
          style={`https://api.parsimap.ir/styles/parsimap-streets-v11?key=p18879615a54484eb98d403da218956ecaa2740c42}`}
         // style={`https://api.parsimap.ir/styles/parsimap-streets-v11?key=${process.env.REACT_APP_PMI_TOKEN}`}
          onClick={onMapClicked}
        >
          {data?.map((d) => (
            <Marker coordinates={[d.longitude, d.latitude]}>
              <img src={marker} onClick={() => showDetails(d)} />
            </Marker>
          ))}
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
