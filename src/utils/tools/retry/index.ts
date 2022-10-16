type RetryData = {
    fn: (params?: any) => Promise<any>;
    params?: any;
    limit?: number;
    delay?: number;
};

export default function (data: RetryData): Promise<any> {
    !data.limit && (data.limit = 3);
    !data.delay && (data.delay = 50);
    return new Promise((resolve, reject) => {
        const attempt = async (): Promise<any> => {
            try {
                const res = await data.fn(data.params);
                resolve(res);
            } catch (e) {
                if (data.limit) {
                    data.limit--;
                }
                if (!data.limit) {
                    reject(e);
                } else {
                    setTimeout(() => {
                        attempt();
                    }, data.delay);
                }
            }
        };
        attempt();
    });
}
