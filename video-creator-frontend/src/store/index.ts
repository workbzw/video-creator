import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'imgList',
    initialState: {
        ttsConfig: {
            appKey: "",
            accessKeyId: "",
            accessKeySecret: ""
        },
        video: {
            title: "",
            imgUrlList: Array(),
            subTitle: "",
            dubbing: "",
        },
    },
    reducers: {
        addImgUrlToList: (state, action: PayloadAction<string>) => {
            //新增控件
            state.video.imgUrlList.push(action.payload)
        },
        setTitle: (state, action: PayloadAction<string>) => {
            //设置标题
            state.video.title = action.payload
        },
        setSubTitle: (state, action: PayloadAction<string>) => {
            //设置副标题
            state.video.subTitle = action.payload
        },
        setDubbing: (state, action: PayloadAction<string>) => {
            //设置配音
            state.video.dubbing = action.payload
        },
        setAppKey: (state, action: PayloadAction<string>) => {
            //设置AppKey
            state.ttsConfig.appKey = action.payload
        },
        setAccessKeyId: (state, action: PayloadAction<string>) => {
            //设置AccessKeyId
            state.ttsConfig.accessKeyId = action.payload
        },
        setAccessKeySecret: (state, action: PayloadAction<string>) => {
            //设置AccessKeySecret
            state.ttsConfig.accessKeySecret = action.payload
        },
    }
})

export const store = configureStore({
    reducer: dataSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>
export const stateActions = dataSlice.actions;