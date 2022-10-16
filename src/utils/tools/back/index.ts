//TODO:可能会导致懒加载失效，需要验证
import router from "@/packages/vue-router";
const back = (): void => {
    router.back();
};

export default back;
