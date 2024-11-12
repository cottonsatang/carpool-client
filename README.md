This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

이거 npx react-native@0.72.6 init CarPoolApp --version 0.72.6로 
최신버전 설치하면 안됨 

https://reactnavigation.org/docs/getting-started/

에뮬레이터 기기 - Pixel 5 API 33 기준으로 작성됨 

```
android/app/srd/main/AndroidManifest.xml 세팅 

android:usesCleartextTraffic="true" (http 통신 기반 api라서 세팅해줘야함 
이런식으로 
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <application
            android:usesCleartextTraffic="true"
            android:name=".MainApplication"
            android:label="@string/app_name"
            android:icon="@mipmap/ic_launcher"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:allowBackup="false"
            android:theme="@style/AppTheme"
            >
        <!-- Google Maps API Key -->
        <activity
                android:name=".MainActivity"
                android:label="@string/app_name"
                android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
                android:launchMode="singleTask"
                android:windowSoftInputMode="adjustResize"
                android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

    </application>
</manifest>

```

````
android/gradle.properties 세팅 

# Project-wide Gradle settings.

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true

# AndroidX package structure to make it clearer which packages are bundled with the
# Android operating system, and which are packaged with your app's APK
# https://developer.android.com/topic/libraries/support-library/androidx-rn
android.useAndroidX=true
# Automatically convert third-party libraries to use AndroidX
android.enableJetifier=true

# Version of flipper SDK to use with React Native
FLIPPER_VERSION=0.182.0

# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
newArchEnabled=false

# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

android.disableAutomaticComponentCreation=true
````

````
"react-native-reanimated": "^3.5.4" 기준으로 
종속성 문제 생길 수도 있으므로 리소스/종속성 관련 오류가 나면 

node_modules/react-native-reanimated/build.gradle에서 
android {
    compileSdkVersion safeExtGet("compileSdkVersion", 30)

    def agpVersion = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION
    if (agpVersion.tokenize('.')[0].toInteger() >= 7) {
        namespace "com.swmansion.reanimated"
    }
이런식으로 SdkVersion 명시하기 
````

```
react navigation 관련으로 

android/app/src/main/java/<your package name>/ 에 

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
} 랑 

상단에 

import android.os.Bundle; 명시하기 
https://reactnavigation.org/docs/getting-started <- 공식문서 참조 
```

## 안드로이드 네이티브 기능 권한 관련 문서 
https://developer.android.com/develop/sensors-and-location/location/permissions?hl=ko
이거 참고해서 추후에 app 폴더 내에 AndroidManifest.xml 조정하기 

## 패키지 의존성 관련 
네이티브 파일들 관련 건드릴 경우 
android 폴더로 넘어가서 (root dir 기준 cd android)
./gradlew clean으로 build 관련 캐시 지우기 

또한 환경변수(혹은 기타 의존성 관련 모듈)들도 라이브러리 코드 변경하거나 직접 수정할 경우
npm run android --clean-cache로 실행 전에 꼭 캐시 지우기 

필요할 때는 ./gradlew build로 네이티브 코드들 빌드하기 

api_key들은 민감한 개인 정보니깐 절대 유출 금지, react-native-config 설치했으므로 .env로 관리하기(.env.example에 예시 있으므로 따라하기)
추후에 네이티브 폴더에 환경변수 적용할 경우, build.gradle에서 dependencies 꼭 확인하기 \


지도 위치권한 앱 실행시 꼭 하기
https://github.com/zoontek/react-native-permissions -> 이 레포지토리에서 권한 관련 read.me 읽기
지도, 사진 같은 경우는 특히나 권한 설정에 민감함 

```
아이콘 관련 
https://oblador.github.io/react-native-vector-icons/
react-native-vector 라이브러리로 아이콘을 이용할건데 필요한거 있다면 여기서 목록 보셔서 고르시는걸 추천합니다
android/app/build.gradle에서 
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] <-여기에 원하는 목록 넣기 
]
네이티브 코드 수정하면 그래들 관련 캐시 작업 꼭 하기 

```

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
