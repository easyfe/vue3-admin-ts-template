/**
 * 获取经纬度，longitude：经度，latitude：纬度
 * @returns
 */
import { getLocalByLatitude } from "@/config/apis/common";
import session from "@/utils/tools/session";
import { GeoLocationType } from "types";
export default function geoLocation(): Promise<GeoLocationType> {
    return new Promise((resolve, reject) => {
        const tmpGeoLocation = session.getGeoLocation();
        if (tmpGeoLocation) {
            resolve(tmpGeoLocation);
            return;
        }
        if (!navigator.geolocation) {
            reject("浏览器不支持定位");
            return;
        }
        const successCallback = (location: { coords: { latitude: number; longitude: number } }): void => {
            const { latitude, longitude } = location.coords;
            let loc: GeoLocationType = { latlng: { lat: latitude, lng: longitude } };
            getLocalByLatitude(latitude, longitude)
                .then((res) => {
                    loc = {
                        cityname: res.city,
                        poiname: res.street_number,
                        poiaddress: res.city + res.district + res.street_number,
                        latlng: {
                            lat: latitude,
                            lng: longitude
                        }
                    };
                    console.log("loc:", res);
                })
                .finally(() => {
                    session.setGeoLocation(loc);
                    resolve(loc);
                });
        };
        const errorCallback = (error: any): void => {
            switch (error.code) {
                case error.TIMEOUT:
                    reject("获取地理位置超时！");
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject("内部错误！无法获取地理位置！");
                    break;
                case error.PERMISSION_DENIED:
                    reject("没有权限获取地理位置！");
                    break;
                default:
                    reject(`获取地理位置异常：${error}`);
                    break;
            }
        };
        // const PositionOptions = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 3000
        // };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });
}
