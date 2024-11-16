import {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import {alerts} from "../constants";

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOs = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOs = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const permission = androidPermissions[type];
      const checked = await check(permission);
      console.log(checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };
      switch (checked) {
        case RESULTS.DENIED:{
          await request(permission);
          return;
        }
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정
}

export default usePermission;
