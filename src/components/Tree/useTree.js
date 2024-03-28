import { useContext, useEffect, useState } from "react";
import { AppStore } from "../../store/AppContext";
import { appActions } from "../../utils/variables";

const useTree = ({
  data = {},
  keys = { tree: "children", value: "id", title: "title" },
  config,
  name = "",
  type = "set",
  onLastLevelReached = (f) => f,
  onFirstLevelReached = (f) => f,
} = {}) => {
  // store
  const [{ createRequest = {} } = {}, dispatch] = useContext(AppStore);

  // hooks

  //   states
  const [nodes, setNodes] = useState([]); // stores all nodes of the tree object

  // variables
  const {
    currentLevel,
    currentNodes = [],
    navigationStack = [],
    tracks = [],
  } = createRequest[name] || {};

  // functions
  // converts tree object to an array list
  const getAllNodes = (tree = {}) => {
    const children = [];
    tree[keys.tree]?.forEach((child) => {
      children.push(child);
      children.push(...getAllNodes(child));
    });
    return children;
  };

  const getCurrentNodes = (tracks, navigationStack) => {
    const lastTrack = tracks.slice(-1)?.[0];
    const lastStack = navigationStack.slice(-1)?.[0];
    if (lastTrack)
      return lastStack.find(
        (n) => String(n[keys.value]) === String(lastTrack[keys.value])
      )?.[keys.tree];
    else return data[keys.tree];
  };
  // let tk;
  // if (localStorage.getItem("tracks")) {
  //   tk = localStorage.getItem("tracks");
  // } else {
  //   tk = tracks;
  // }
  // sets the current nodes and level after clicking on a node
  const goIntoNextLevel = (node) => {
    console.log(node);
    localStorage.setItem("tracks", JSON.stringify(tracks));
    const newTracks = [...tracks, node];
    console.log(tracks);
    console.log(newTracks);
    const newNavigationStack = [...navigationStack, currentNodes];
    console.log(newNavigationStack);
    const newCurrentLevel = newTracks.length + 1;
    const newCurrentNodes =
      getCurrentNodes(newTracks, newNavigationStack) || [];
    console.log(newCurrentNodes);
    if (newCurrentNodes.length === 0) {
      return onLastLevelReached({
        tracks: newTracks,
        navigationStack,
        currentLevel,
        currentNodes,
      });
    }
    localStorage.setItem("tracks", newTracks);
    const payload = {
      [name]: {
        currentLevel: newCurrentLevel,
        tracks: newTracks,
        navigationStack: newNavigationStack,
        currentNodes: newCurrentNodes,
      },
    };
    console.log(payload);
    dispatch({
      type: appActions.SET_CREATE_REQUEST,
      payload,
    });
  };

  // gets and sets prevoius level nodes
  const goBack = () => {
    const newTracks = tracks.filter((t, i) => i < tracks.length - 1);
    const newNavigationStack = navigationStack.filter(
      (s, i) => i < navigationStack.length - 1
    );
    const newCurrentLevel = currentLevel - 1;
    const newCurrentNodes = getCurrentNodes(newTracks, newNavigationStack);
    console.log(newCurrentLevel);
    if (newCurrentLevel === 0) {
      return onFirstLevelReached();
    }
    const payload = {
      [name]: {
        currentLevel: newCurrentLevel,
        currentNodes: newCurrentNodes,
        tracks: newTracks,
        navigationStack: newNavigationStack,
      },
    };
    console.log(payload);
    // dispatch({
    //   type: appActions.SET_CREATE_REQUEST,
    //   payload,
    // });
  };

  // sets the current nodes according to the given level
  const goIntoSpecificLevel = (level) => {
    const newTracks = tracks.slice(0, level - 1);
    const newNavigationStack = navigationStack.slice(0, level - 1);
    const newCurrentLevel = level;
    const newCurrentNodes =
      getCurrentNodes(newTracks, newNavigationStack) || [];
    dispatch({
      type: appActions.SET_CREATE_REQUEST,
      payload: {
        [name]: {
          currentLevel: newCurrentLevel,
          currentNodes: newCurrentNodes,
          tracks: newTracks,
          navigationStack: newNavigationStack,
        },
      },
    });
  };

  const searchTree = (node, searchText, results) => {
    if (String(node[keys.title]).includes(searchText)) {
      results.push(node);
    } else if (node[keys.tree] != null && node[keys.tree].length > 0) {
      var i;
      for (i = 0; i < node[keys.tree].length; i++) {
        searchTree(node[keys.tree][i], searchText, results);
      }
    }
    return results;
  };

  // searchs and filters in the flattned tree nodes
  const onSearch = async (searchText) => {
    if (searchText === "") {
      const currentNodes = getCurrentNodes(tracks, navigationStack);
      // dispatch({type: appActions.SET_CREATE_REQUEST, payload: {currentNodes}});
      return;
    }
    let results = [];
    searchTree(data, searchText, results);
    dispatch({
      type: appActions.SET_CREATE_REQUEST,
      payload: {
        [name]: {
          currentNodes: results,
          tracks,
          navigationStack,
          currentLevel,
        },
      },
    });
  };

  // effects
  useEffect(() => {
    if (type !== "set") return;
    if (!config) {
      const currentNodes = getCurrentNodes(
        tracks,
        navigationStack,
        currentLevel
      );
      console.log(currentNodes);
      const nodes = getAllNodes(data);
      dispatch({
        type: appActions.SET_CREATE_REQUEST,
        payload: { [name]: { ...createRequest[name], currentNodes } },
      });
      setNodes(nodes);
    } else {
      // dispatch({
      //   type: appActions.SET_CREATE_REQUEST,
      //   payload: { [name]: config },
      // });
    }

    return () => {
      dispatch({
        type: appActions.SET_CREATE_REQUEST,
        payload: {
          currentStep: 1,
          [name]: {
            currentLevel: 1,
            currentNodes: [],
            navigationStack: [],
            tracks: [],
          },
        },
      });
    };
  }, []);

  return {
    nodes,
    currentLevel,
    currentNodes,
    navigationStack,
    tracks,
    goIntoNextLevel,
    goBack,
    goIntoSpecificLevel,
    onSearch,
  };
};

export default useTree;
