import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../../app/store";
import { SET_APP_CONFIG_STATE } from "../../../app/slices/appConfig/appConfigSlice";
import { useEffect } from "react";

// export const useFeatureNavItems = () => {
//     try {
//         console.log("====Calling extractFeatureNavitemBaseonPath====");

//         const location=useLocation()
//         const appConfig = useSelector((state: any) => state.appConfig?.config);
//         const rootPath = location.pathname.split('/')[1];
//         console.log(appConfig);

//         console.log("rootPath",rootPath);

//         if(appConfig && appConfig.config && appConfig.config.featueListBaseOnURL){
//             const feature=appConfig['config']['featueListBaseOnURL'][rootPath] || []
//             console.log("feature",feature);

//             if(feature && feature.length>0){
//                 return feature['items']
//             }
//         }
//         return []
//     } catch (err) {

//         return [];
//     }
// };


// Custom hook to extract navigation items based on the current path
export const GetNavMenuConfig = () => {
  console.log("%c===EXECUTE GETNAVCONFIG====", "color:red");
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const appConfig = useSelector((state: RootState) => state.app?.appConfig);
  const rootPath = location.pathname.split('/')[1];
  console.log("rootPath", appConfig);


  // Safe access to appConfig and its properties
  const featureItems = () => {
    if (appConfig && appConfig.config && appConfig.config.featueListBaseOnURL) {

      const feature: any = appConfig.config.featueListBaseOnURL[rootPath];
      if (feature) {
        const {
          MENU: FEATURE = [],
          SHOW_TOP_NAV_MENU = false,
          SHOW_SIDE_NAV_MENU = false
        } = feature;
        return {
          FEATURE,
          DISPLAY_TYPE: {
            SHOW_TOP_NAV_MENU,
            SHOW_SIDE_NAV_MENU
          }
        };
      }
      return {
        FEATURE: [],
        DISPLAY_TYPE: {
          SHOW_TOP_NAV_MENU: false,
          SHOW_SIDE_NAV_MENU: false
        }
      };
    }
    return {
      FEATURE: [],
      DISPLAY_TYPE: {
        SHOW_TOP_NAV_MENU: false,
        SHOW_SIDE_NAV_MENU: false
      }
    };
  };
  const loadedFeature: any = featureItems()
  // Dispatch action whenever the path changes
  useEffect(() => {
    console.log("Loaded", loadedFeature);
    console.log("%c====SET APP_SIDEBAR_CONFIG====", "color:green");
    dispatch(SET_APP_CONFIG_STATE(loadedFeature));
  }, [rootPath, loadedFeature, dispatch]);
};