import Cookies from "js-cookie";

const cookie = {
    set: (key: string, value: any): void => {
        Cookies.set(key, value);
    },
    get: (key: string): string | undefined => {
        return Cookies.get(key);
    }
};

export default cookie;
