import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from "./useAppState";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    //사용자가 처음 앱을 사용할 시, 초기에 위치 권한을 허용하지 않을 경우 이동할 위치가 없음, 명지대 자연캠퍼스로 설정했음
    latitude: 37.222691,
    longitude: 127.190167,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeBack} = useAppState();
  //지금 현재의 위치를 구한 후 지도를 현재의 위치로 옮기기, 첫 렌더링 시에 보여주기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        console.log('latitude, longitude', latitude, longitude);
        setIsUserLocationError(false);
      }, //appstate 추가
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeBack]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
