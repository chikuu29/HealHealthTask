
export interface DISPLAY_TYPE {
    SHOW_TOP_NAV_MENU?: boolean
    SHOW_SIDE_NAV_MENU?: boolean
}

export interface APP_CONFIG_STATE {
    FEATURE: any[]
    DISPLAY_TYPE: DISPLAY_TYPE
}


export interface APP_LOADER{
    loaderText?:string,
    active:boolean
}