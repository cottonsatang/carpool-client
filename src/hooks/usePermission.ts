import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  Permission,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOs = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOs = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설명 화면에서 위치 권한을 허용해주세요',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요',
  },
} as const;

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
        case RESULTS.DENIED:
          await request(permission);
          break;
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
