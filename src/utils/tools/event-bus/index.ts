// import mitt, { Emitter } from "mitt";

// type Events = {
//     KSH_CHANGE: void;
//     [key: string]: void;
// };

// const eventBus: Emitter<Events> = mitt<Events>();

// export default eventBus;

import dush from "dush";

const eventBus = dush();

export default eventBus;

export const EVENT_CHART_RESIZE = "EVENT_CHART_RESIZE";
