import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations} from '../../constants/navigations';
import CustomButton from "../../components/CustomButton";
import LogoComponent from "../../components/Logo";// 로고 컴포넌트 import

type AuthHomeScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps): JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <LogoComponent/>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    label="로그인하기"
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
                <CustomButton
                    label="회원가입하기"
                    variant="outlined"
                    onPress={() => navigation.navigate(authNavigations.SIGNUP)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 80, // 로고와 버튼 사이 간격
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
});

export default AuthHomeScreen;
