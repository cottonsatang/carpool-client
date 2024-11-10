declare module 'react-native-keyboard-aware-scrollview' {
    import * as React from 'react';
    import {ViewProps} from 'react-native';

    // Constructor 타입을 직접 정의
    type Constructor<T> = new (...args: any[]) => T;

    class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}

    const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
        Constructor<any>;

    class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}

    export {KeyboardAwareScrollView};
}
