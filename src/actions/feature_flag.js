import {featureFlagRef} from "../configs/firebase";
import {VALUE_KEY} from "../utils/common";
import { FETCH_FEATURE_FLAG} from "./types";

export const fetchFeatureFlagList = () => async dispatch => {
    featureFlagRef.on(VALUE_KEY, data => {
        dispatch({
            type: FETCH_FEATURE_FLAG,
            feature_flag: data.val()
        });
    });
};
