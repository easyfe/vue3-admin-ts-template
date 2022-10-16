/**
 * 睡眠
 * @param duration 睡眠时间，毫秒
 * @returns
 */
export default function (duration: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, duration);
    });
}
