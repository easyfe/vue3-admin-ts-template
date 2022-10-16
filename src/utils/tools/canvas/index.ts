import html2canvas from "html2canvas";

export function htmlCanvas(domId: string): Promise<{ file: any }> {
    return new Promise((resolve, reject) => {
        const element = document.getElementById(domId);
        if (!element) {
            reject("htmlCanvas获取DOM元素失败");
            return;
        }
        html2canvas(element, {
            useCORS: true
        })
            .then((c) => {
                const url = c.toDataURL("image/png");
                const filename = "主页截图-" + new Date().getTime();
                const arr = url.split(",");
                const mime = arr[0].match(/:(.*?);/)?.[1];
                const suffix = mime?.split("/")[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const file_name = new File([u8arr], `${filename}.${suffix}`, {
                    type: mime
                });
                resolve({ file: file_name });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * promise加载远程图片
 * @param src 图片远程地址
 * @returns
 */
export function loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            const timestamp = new Date().getTime();
            img.setAttribute("crossOrigin", "anonymous");
            if (src.indexOf("data:image") !== -1) {
                img.src = src;
            } else {
                img.src = `${src}?${timestamp}`;
            }
            img.onload = (): void => {
                resolve(img);
            };
            img.onerror = (err): void => {
                console.error("海报资源图片加载失败：", img, err);
                reject("资源图片加载失败");
            };
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * 画带角度的图片
 * @param ctx canvas上下文
 * @param path 图片资源路径
 * @param width 图片宽度，直接填写设计稿大小
 * @param height 图片高度，直接填写设计稿大小
 * @param x 画布x轴，直接填写设计稿大小
 * @param y 画布y轴，直接填写设计稿大小
 * @param border 圆角大小，直接填写设计稿大小
 * @returns
 */
export function drawImagedWithRound(
    ctx: CanvasRenderingContext2D,
    path: string,
    width: number,
    height: number,
    x: number,
    y: number,
    border: number
): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            loadImg(path)
                .then((res) => {
                    // 绘制图片
                    ctx.save();
                    // 开始创建一个路径
                    ctx.beginPath();
                    // 画一个带border裁剪区域
                    // ctx.arc(img_x + img_border, img_y + img_border, img_border, 0, 2 * Math.PI)
                    ctx.arc(x + border, y + border, border, Math.PI, Math.PI * 1.5);
                    ctx.arc(x + width - border, y + border, border, Math.PI * 1.5, Math.PI * 2);
                    ctx.arc(x + width - border, y + height - border, border, 0, Math.PI * 0.5);
                    ctx.arc(x + border, y + height - border, border, Math.PI * 0.5, Math.PI);
                    ctx.closePath();
                    // 裁剪
                    ctx.clip();
                    // 绘制图片
                    ctx.drawImage(res as HTMLImageElement, x, y, width, height);
                    // 恢复之前保存的绘图上下文
                    ctx.restore();
                    resolve("success");
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * canvas文字换行
 * @param ctx canvas上下文
 * @param content 文字内容
 * @param drawX 画布x轴，直接填写设计稿大小
 * @param drawY 画布y轴，直接填写设计稿大小
 * @param lineMaxWidth 最大宽度，直接填写设计稿大小
 * @param lineHeight 行间距，根据实际字体大小填写，建议1.5倍
 * @param lineNum 最大行数
 * @returns
 */
export function textWrap(
    ctx: CanvasRenderingContext2D,
    content: string,
    drawX: number,
    drawY: number,
    lineMaxWidth: number,
    lineHeight: number,
    lineNum: number
): void {
    let drawTxt = ""; // 当前绘制的内容
    let drawLine = 1; // 第几行开始绘制
    let drawIndex = 0; // 当前绘制内容的索引
    if (ctx.measureText(content).width <= lineMaxWidth) {
        // 判断内容是否可以一行绘制完毕
        ctx.fillText(content, drawX, drawY);
        return;
    }
    for (let i = 0; i < content.length; i++) {
        // 需要换行
        drawTxt += content[i];
        if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
            if (drawLine >= lineNum) {
                ctx.fillText(`${content.substring(drawIndex, i)}..`, drawX, drawY);
                break;
            } else {
                ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
                drawIndex = i + 1;
                drawLine += 1;
                drawY += lineHeight;
                drawTxt = "";
            }
        } else {
            // 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
            if (i === content.length - 1) {
                ctx.fillText(content.substring(drawIndex), drawX, drawY);
            }
        }
    }
}
