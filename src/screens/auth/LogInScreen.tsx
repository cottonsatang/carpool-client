import React, {useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import useForm from "../../hooks/useForm";
import {validateLogin} from "../../utils";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import useAuth from "../../hooks/queries/useAuth";
import { useNotifications } from '../../context/NotificationProvider'; // 알림 관리

function LogInScreen() {
    const passwordRef = useRef<TextInput | null>(null);
    const {loginMutation} = useAuth();
    const { addNotification } = useNotifications(); // 알림

    const login = useForm({
        initialValue: {
            name: '',
            password: '',
        },
        validate: validateLogin,
    });
    // 알림 관련 수정
    const handleSubmit = () => {
        loginMutation.mutate(login.values, {
            onSuccess: () => {
                addNotification('로그인했습니다'); // 로그인 성공 시 알림 추가
            },
            onError: (error) => {
                console.log(error); // 로그인 실패 시 에러 처리
            }
        });
    };


    return (
        <DismissKeyboardView>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <InputField
                        autoFocus={true}
                        placeholder="아이디"
                        error={login.errors.name}
                        touched={login.touched.name}
                        inputMode="email"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        {...login.getTextInputProps('name')}
                    />
                    <InputField
                        ref={passwordRef}
                        placeholder="비밀번호"
                        error={login.errors.password}
                        touched={login.touched.password}
                        secureTextEntry={true}
                        returnKeyType="join"
                        blurOnSubmit={false}
                        onSubmitEditing={handleSubmit}
                        {...login.getTextInputProps('password')}
                    />
                </View>
                <CustomButton
                    label='로그인'
                    variant="filled"
                    size='large'
                    onPress={handleSubmit}
                />
            </SafeAreaView>
        </DismissKeyboardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30
    }
});

export default LogInScreen;
