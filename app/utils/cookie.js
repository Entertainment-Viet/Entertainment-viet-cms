import {COOKIE_TOKEN,COOKIE_LOGINSTATE, COOKIE_EXPIRESDAYS} from 'constants/cookie';

// Cookie
export const setSecureCookie = (name,value, days = COOKIE_EXPIRESDAYS) => {
    setCookie(name,value, days, {secure: true, sameSite: true,});
}

export const  setCookie = (name,value, days = COOKIE_EXPIRESDAYS, options = {}) => {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    options = {
        path: '/',
        expires: expires,
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const eraseCookie = (name) => {
    setCookie(name, "", {
      'max-age': -999
    })
}

// Access Token
export const setAuthCookie = (value, days = COOKIE_EXPIRESDAYS) => {
    if(value){
        setCookie(COOKIE_TOKEN,value, days
        // ,{   
        //     httpOnly: true, 
        //     secure: true,
        //     sameSite: true,
        // }
    );
    }
}

export const getAuthCookie = () => {
    return getCookie(COOKIE_TOKEN);
}

export const eraseAuthCookie = () => {
    eraseCookie(COOKIE_TOKEN);
    eraseCookie(COOKIE_LOGINSTATE);
    
}