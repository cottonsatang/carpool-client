import {useEffect, useRef, useState} from "react";
import {AppState} from "react-native";

function useAppState() {
    const appState = useRef(AppState.currentState);
    const [appStateVisibility, setAppStateVisibility] = useState(appState.current);
    const [isComeBack, setIsComeBack] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if(appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setIsComeBack(true);
            }
            if(appState.current.match(/active/) && nextAppState === 'background') {
                setIsComeBack(false);
            }
            appState.current = nextAppState;
            setAppStateVisibility(appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return {isComeBack, appStateVisibility};
}

export default useAppState;
