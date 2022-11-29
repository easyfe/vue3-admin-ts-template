/* 我的模板列表 */
export interface MyTemplateItem {
    id: number;
    saas_id: number;
    code: string;
    type: number;
    status: number;
    classify_id: number;
    template_id: number;
    name: string;
    description: string;
    img: string | null;
    relation_num: number | null;
    relation_id: number | null;
}

/* 自定义页面 */
export interface CustomPageItem {
    id: number;
    saas_id: number;
    name: string;
    description: string;
    img: string | null;
    content: string | null;
    relation_num: number | null;
    relation_id: number | null;
    create_time: string;
    update_time: string;
    type: number | null;
}
