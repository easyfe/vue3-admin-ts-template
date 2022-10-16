import Big, { BigSource } from "big.js";
/**
 * 浮点运算
 */
const floatHelper = {
    /**
     * 加法
     * @param nums
     * @returns
     */
    plus(...nums: BigSource[]): number {
        let all = new Big(0);
        nums.forEach((v) => {
            all = all.plus(new Big(v));
        });
        return all.toNumber();
    },
    /**
     * 减法
     * @param nums
     * @returns
     */
    min(...nums: BigSource[]): number {
        let all = new Big(0);
        nums.forEach((v, index) => {
            if (index === 0) {
                all = new Big(v);
            } else {
                all = all.minus(new Big(v));
            }
        });
        return all.toNumber();
    },
    /**
     * 乘法
     * @param nums
     * @returns
     */
    tim(...nums: BigSource[]): number {
        let all = new Big(0);
        nums.forEach((v, index) => {
            if (index === 0) {
                all = new Big(v);
            } else {
                all = all.times(new Big(v));
            }
        });
        return all.toNumber();
    },
    /**
     * 除法
     * @param nums
     * @returns
     */
    div(...nums: BigSource[]): number {
        let all = new Big(0);
        nums.forEach((v, index) => {
            if (index === 0) {
                all = new Big(v);
            } else {
                all = all.div(new Big(v));
            }
        });
        return all.toNumber();
    },
    /**
     * 取余数
     * @param num1
     * @param num2
     * @returns
     */
    mod(num1: BigSource, num2: BigSource): number {
        return new Big(num1).mod(new Big(num2)).toNumber();
    },
    /**
     * 取绝对值
     * @param num
     * @returns
     */
    abs(num: BigSource): number {
        return new Big(num).abs().toNumber();
    },
    /**
     * 补全小数点位数
     * @param num
     * @param point
     * @returns
     */
    fix(num: BigSource, point: number): string {
        return new Big(num).toFixed(point);
    }
};

export default floatHelper;
