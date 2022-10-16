const ruleHelper = {
    require(message: string): any {
        return {
            required: true,
            message
        };
    },
    price(message: string): any {
        return {
            pattern: new RegExp(/^([1-9]\d*|0)(\.\d{1,2})?$/),
            message
        };
    },
    int(message: string): any {
        return {
            pattern: new RegExp(/^[1-9]\d*|0$/),
            message
        };
    }
};
export default ruleHelper;
