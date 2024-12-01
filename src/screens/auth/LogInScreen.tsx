import React, {useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import useForm from "../../hooks/useForm";
import {validateLogin} from "../../utils";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import useAuth from "../../hooks/queries/useAuth";


function LogInScreen() {
    const passwordRef = useRef<TextInput | null>(null);
    const {loginMutation} = useAuth();

    const login = useForm({
        initialValue: {
            username: '',
            password: '',
        },
        validate: validateLogin,
    });

    const handleSubmit = () => {
        loginMutation.mutate(login.values);
    }

    return (
        <DismissKeyboardView>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <InputField
                        autoFocus={true}
                        placeholder="아이디"
                        error={login.errors.username}
                        touched={login.touched.username}
                        inputMode="email"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        {...login.getTextInputProps('username')}
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
