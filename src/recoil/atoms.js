import { atom } from "recoil";

export const userLoginState = atom({
    key: 'userLogin',
    default: {
        email: '',
        password: ''
    }
})

export const userDataState = atom({
    key: 'userDataState',
    default: {}
})