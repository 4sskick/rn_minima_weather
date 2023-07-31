import Geolocation from 'react-native-geolocation-service';
import {Alert, Linking, PermissionsAndroid} from 'react-native';

export const checkPermissionLocation = () => {
  return new Promise(async (resolve, reject) => {
    PermissionsAndroid.requestMultiple([
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
    ]).then((result) => {
      const isFineLocation =
        result['android.permission.ACCESS_FINE_LOCATION'] === 'granted';
      const isCoarseLocation =
        result['android.permission.ACCESS_COARSE_LOCATION'] === 'granted';
      if (isFineLocation && isCoarseLocation) {
        Geolocation.getCurrentPosition(
          (success) => {
            console.log(`current location: ${JSON.stringify(success)}`);
            resolve(success);
          },
          (error) => {
            console.log(`get geo location error: ${error} `);
            reject();
          },
          {
            enableHighAccuracy: false,
            timeout: 3000,
            maximumAge: 1000,
          },
        );
      } else {
        Alert.alert(
          'Additional Permission Required',
          `Application need to access location permission.\nPlease enable for advance use`,
          [
            {
              text: 'OK',
              onPress: () => {
                // openSettings().catch((errOpenSetting) => {
                Linking.openSettings();
                console.log(`Error cannot open setting: __`);
                reject();
                // });
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                reject();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  });
};
