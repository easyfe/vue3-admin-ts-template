import dayjs from "dayjs";
import typeHelper from "../type";

const dateHelper = {
    /**
     * 时间格式化
     * @param date 时间
     * @param format 格式,如：YYYY-MM-DD
     * @returns
     */
    formatDate: (date: number | string | Date | dayjs.Dayjs, format = "YYYY-MM-DD"): string => {
        let DATE = "";
        // 秒
        if (!Number.isNaN(Number(date)) && String(Number(date)).length === 10) {
            DATE = dayjs.unix(Number(date)).format(format);
        }
        // 毫秒
        else if (!Number.isNaN(Number(date)) && String(Number(date)).length === 13) {
            DATE = dayjs(Number(date)).format(format);
        } else {
            DATE = dayjs(date).format(format);
        }
        return DATE;
    },
    /**
     * 字符串时间转时间戳
     * https://dayjs.gitee.io/docs/zh-CN/parse/string-format
     * @param date 时间
     * @param format 为了保证结果一致，当解析除了 ISO 8601 格式以外的字符串时，您应该使用 String + Format
     * @returns
     */
    toUnix: (date: number | string | Date | dayjs.Dayjs, format?: string): number => {
        if (format) {
            return dayjs(date, format).unix();
        }
        return dayjs(date).unix();
    },
    /**
     * 转Date格式
     * https://dayjs.gitee.io/docs/zh-CN/parse/string-format
     * @param date
     * @param format 为了保证结果一致，当解析除了 ISO 8601 格式以外的字符串时，您应该使用 String + Format
     */
    toDate: (date: number | string | Date | dayjs.Dayjs, format?: string): Date => {
        let tmpDate = date;
        if (typeHelper.isString(tmpDate) || typeHelper.isNumber(tmpDate)) {
            if (tmpDate.toString().length === 10) {
                tmpDate = Number(tmpDate) * 1000;
            }
        }
        if (format) {
            return dayjs(tmpDate, format).toDate();
        }
        return dayjs(tmpDate).toDate();
    },
    /**
     * 转dayjs格式
     * @param date
     * @param format
     */
    toDayjs: (date: number | string | Date | dayjs.Dayjs, format?: string): dayjs.Dayjs => {
        const tmpDate = date;
        if (format) {
            return dayjs(tmpDate, format);
        }
        return dayjs(tmpDate);
    }
};

export default dateHelper;
