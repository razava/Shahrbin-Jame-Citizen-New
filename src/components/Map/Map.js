import React, { useContext, useRef, useState } from "react";
import { api } from "../../services/http";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import TextInput from "../TextInput/TextInput";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import { CN } from "../../utils/functions";
import useClick from "../../hooks/useClick";
import marker from "../../assets/images/location.svg";
import { AppStore } from "../../store/AppContext";

const MapContainer = ReactMapboxGl({
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  zoom: 9,
});

const Map = ({
  selectable = true,
  searchable = true,
  coords = {},
  address = "",
  zoom = 15,
  height = 400,
  width = "100%",
  containerStyle = {},
  onSave = (f) => f,
}) => {
  // refs
  const searchResultsRef = useRef(null);
  const searchInputRef = useRef(null);

  // store
  const [store] = useContext(AppStore);
  const defaultCoords = {
    latitude: store.instance?.latitude || process.env.REACT_APP_LATITUDE,
    longitude: store.instance?.longitude || process.env.REACT_APP_LONGITUDE,
  };

  // states
  const [coordinates, setCoordinates] = useState(
    !coords.latitude || !coords.longitude ? defaultCoords : coords
  );
  const [searchText, setSearchText] = useState(address);
  const [searchResults, setSearchResults] = useState([]);

  // hooks
  const [isSearchResultOpened, toggleSearchResults] = useClick({
    element: searchResultsRef,
    whitelists: [searchInputRef],
  });

  //   functions
  const onMapClicked = (_, e) => {
    const coordinates = {
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    };
    setCoordinates(coordinates);
    getAddressByCoordinates(coordinates);
  };

  const getAddressByCoordinates = async ({ longitude, latitude } = {}) => {
    const { success, data } = await api.map({
      tail: "backward",
      id: `${longitude}/${latitude}`,
      isPerInstance: false,
    });
    if (success) {
      setSearchText(data.address);
    }
  };

  const getCoordinatesByAddress = async (address = "") => {
    setSearchText(address);
    const { success, data } = await api.map({
      tail: "forward",
      id: `${address}`,
      showMessageOnError: false,
      isPerInstance: false,
    });
    if (success) {
      setSearchResults(data.results);
      toggleSearchResults(true);
    }
  };

  const goToLocation = ({ description, geo_location }) => {
    setCoordinates({
      latitude: geo_location.center.lat,
      longitude: geo_location.center.lng,
    });
    setSearchText(description);
    toggleSearchResults(false);
  };

  const onSearchInputFocus = () => {
    toggleSearchResults(true);
  };

  const onSearchInputBlur = () => {
    toggleSearchResults(false);
  };

  //   renders
  const renderSearchResults = () => {
    if (searchResults.length > 0)
      return (
        <ul
          className={CN.join(
            styles.searchResults,
            isSearchResultOpened ? styles.open : ""
          )}
          ref={searchResultsRef}
        >
          {searchResults.map((r, i) => (
            <li
              key={`s-r-${i}`}
              className={styles.searchResult}
              onClick={() => goToLocation(r)}
            >
              {r.description}
            </li>
          ))}
        </ul>
      );
  };

  const renderSaveButton = () => {
    const visible = coordinates.latitude && coordinates.longitude && searchText;
    return (
      <Button
        className={CN.join(styles.saveButton, visible ? styles.visible : "")}
        onClick={() => onSave({ details: searchText, coordinates })}
      >
        ثبت آدرس
      </Button>
    );
  };
  return (
    <>
      <MapContainer
        zoom={[zoom]}
        center={[coordinates.longitude, coordinates.latitude]}
        containerStyle={{ height, width, ...containerStyle }}
        onClick={selectable ? onMapClicked : undefined}
        style={`https://api.parsimap.ir/styles/parsimap-streets-v11?key=${process.env.REACT_APP_PMI_TOKEN}`}
      >
        {selectable && (
          <Marker coordinates={[coordinates.longitude, coordinates.latitude]}>
            <div className={styles.selectedAddress}>
              <p>{searchText || "آدرس خود را انتخاب کنید."}</p>
              <div className={styles.caret}></div>
            </div>
          </Marker>
        )}
        {!selectable && (
          <Marker coordinates={[coordinates.longitude, coordinates.latitude]}>
            <img src={marker} />
          </Marker>
        )}
        {renderSaveButton()}
        {searchable && (
          <TextInput
            placeholder="جستجو"
            classNames={{ wrapper: styles.searchWrapper }}
            onChange={getCoordinatesByAddress}
            value={searchText}
            renderAfterInput={renderSearchResults}
            onFocus={onSearchInputFocus}
            onBlur={onSearchInputBlur}
            forwardInputRef={searchInputRef}
          />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
