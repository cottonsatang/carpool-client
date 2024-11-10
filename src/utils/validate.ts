type UserInformation = {
    name: string;
    password: string;
};

type SignUpFormValues = UserInformation & {
    email: string;
    passwordConfirm: string;
    phoneNumber: string;
    role?: 'driver' | 'passenger';
    vehicleModel?: string;
    licensePlate?: string;
    seatingCapacity?: number;
};

function validateUserInformation(values: UserInformation): Record<keyof UserInformation, string> {
    const errors: Record<keyof UserInformation, string> = {
        name: '',
        password: '',
    };
    if (values.name.length < 4 || values.name.length > 20) {
        errors.name = '아이디는 4~20자 사이여야 합니다.';
    }

    if (!/^[a-zA-Z0-9]*$/.test(values.password)) {
        errors.password = '비밀번호는 영문과 숫자여야만 합니다';
    }
    return errors;
}

function validateLogin(values: UserInformation): Record<keyof UserInformation, string> {
    return validateUserInformation(values);
}

function validateSignUp(values: SignUpFormValues): Record<keyof SignUpFormValues, string> {
    const errors = validateUserInformation(values);
    const signUpErrors: Record<keyof SignUpFormValues, string> = {
        ...errors,
        email: '',
        passwordConfirm: '',
        phoneNumber: '',
        role: '',
        vehicleModel: '',
        licensePlate: '',
        seatingCapacity: '',
    };

    if (values.password !== values.passwordConfirm) {
        signUpErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (values.phoneNumber && values.phoneNumber.length < 8) {
        signUpErrors.phoneNumber = '핸드폰 번호는 8자리 숫자입니다.'
    }

    if (values.role === 'driver') {
        if (!values.vehicleModel) {
            signUpErrors.vehicleModel = '차량 모델을 입력해주세요.';
        }
        if (!values.licensePlate) {
            signUpErrors.licensePlate = '차량 번호를 입력해주세요.';
        }
        if (values.seatingCapacity && (isNaN(values.seatingCapacity) || values.seatingCapacity < 1)) {
            signUpErrors.seatingCapacity = '좌석 수는 1 이상이어야 합니다.';
        }
    }

    return signUpErrors;
}

export {validateLogin, validateSignUp};
