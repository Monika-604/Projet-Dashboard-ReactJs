export function parseJSON(response) {
    const statusCode = response.ok
    const json = response.json()
    return Promise.all([statusCode, json])
}
export function showError(textError) {
    return alert(textError);
}
export const call_api = ({ address_api, method_api, body, file }) => {
    let headers;
    if (file) {
        headers = {
            Accept: "application/json"
        };
    } else {
        headers = {
            Accept: "*/*",
            "Content-Type": "application/json"
        };
    }
    if (localStorage.getItem("Token")) {
        headers.Authorization = `JWT ${localStorage.getItem("Token")}`;
    } else if (localStorage.getItem("Token")) {
        headers.Authorization = `JWT ${localStorage.getItem("Token")}`;
    }
    // headers.Authorization = `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imhvc2VpbiIsImV4cCI6MTU3NzA5OTM3MywiZW1haWwiOiJob3NlaW5AbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU3NjkyNjU3M30.D5z6rrbERfGG5FUyTNPBleoudRkYFYnYJJgc7ir0_HY`;
    return fetch(address_api, {
        method: method_api,
        headers,
        body
    });
};

export function getDeviceId() {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    localStorage.setItem("deviceId", uid)
    return uid;
}
export function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n
        .toString()
        .replace(/\d/g, x => farsiDigits[x]);
}

export function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
export function persianNumbers(num) {
    var num_dic = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
    }
    return parseInt(num.replace(/[۰-۹]/g, function (w) {
        return num_dic[w]
    }));
}


export function  getMobileOperatingSystem (){
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        return "1";
    }

    if (/android/i.test(userAgent)) {
        return "2";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "3";
    }

    return "4";
}