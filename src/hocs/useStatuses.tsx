import {StatusConstants, UserStatusesKeys} from "../firebase/model/User";
import {useContext} from "react";
import {UserContext} from "../contexts";


export const useStatusCheck = (statusKey: UserStatusesKeys) => {
    const {userStatuses} = useContext(UserContext)

    const checkProgress = (statusKey: UserStatusesKeys, statusValue: StatusConstants): boolean => {
        return userStatuses && userStatuses[statusKey] === statusValue
    }
    const isComplete = () : boolean => {
        return checkProgress(statusKey, StatusConstants.COMPLETE)
    }
    const isStarted = () : boolean => {
        return checkProgress(statusKey, StatusConstants.STARTED)
    }
    const isNotStarted = () : boolean => {
        return !checkProgress(statusKey, StatusConstants.COMPLETE) && !checkProgress(statusKey, StatusConstants.STARTED)
    }
    return {
        isComplete,
        isStarted,
        isNotStarted
    }
}