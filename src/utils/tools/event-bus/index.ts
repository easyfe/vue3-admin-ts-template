import mitt, { Emitter } from "mitt";
import _dush from "dush";

type Events = {
    KSH_CHANGE: void;
    [key: string]: void;
};

const eventBus: Emitter<Events> = mitt<Events>();

/** 业务中台 首页可视化-兑换列表组件触底加载 */
export const KSH_EVENT_EXCHANGE_LIST = "ksh-exchange-list";
/** 业务中台 首页可视化-商品列表组件触底加载 */
export const KSH_EVENT_COMMODITY_LIST = "ksh-commodity-list";
/** 业务中台 首页可视化-商品分页组件触底加载 */
export const KSH_EVENT_COMMODITY_PAGE = "ksh-commodity-page";

export default eventBus;

export const dush = _dush();
