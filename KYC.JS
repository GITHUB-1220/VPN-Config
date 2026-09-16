/*
 * Tuyo KYC - Loon Response Script
 * 从 api.tuyo.com/account/verification 的 JSON 响应中提取 Persona KYC URL。
 */

(function () {
    const TAG = "[Tuyo KYC]";

    function log(message) {
        console.log(TAG + " " + message);
    }

    function notify(url) {
        // 同时保存到 Loon 持久化存储，并把链接放进通知附件。
        $persistentStore.write(url, "TuyoKYC_LastURL");

        $notification.post(
            "Tuyo KYC",
            "已获取 Persona 验证链接",
            url,
            {
                openUrl: url,
                clipboard: url
            }
        );
    }

    try {
        log("脚本已触发");

        const responseBody = $response && $response.body;
        if (!responseBody) {
            log("Response Body 为空");
            $done({});
            return;
        }

        const body = String(responseBody);
        log("Response Body 长度: " + body.length);

        let data;
        try {
            data = JSON.parse(body);
        } catch (e) {
            log("JSON 解析失败: " + e);
            $done({});
            return;
        }

        let kycUrl = null;

        // 主要结构：requirements[].url
        if (Array.isArray(data.requirements)) {
            for (const item of data.requirements) {
                if (
                    item &&
                    typeof item.url === "string" &&
                    /(?:https?:\/\/)?tuyo\.withpersona\.com\/verify/i.test(item.url)
                ) {
                    kycUrl = item.url;
                    break;
                }
            }
        }

        // 兼容少数情况下 requirements 是对象而不是数组。
        if (!kycUrl && data.requirements && typeof data.requirements === "object") {
            const values = Object.values(data.requirements);
            for (const item of values) {
                if (
                    item &&
                    typeof item.url === "string" &&
                    /(?:https?:\/\/)?tuyo\.withpersona\.com\/verify/i.test(item.url)
                ) {
                    kycUrl = item.url;
                    break;
                }
            }
        }

        if (!kycUrl) {
            log("没有找到 Persona verify URL");
            $done({});
            return;
        }

        log("找到 KYC URL: " + kycUrl);

        const oldUrl = $persistentStore.read("TuyoKYC_LastURL");

        // 新链接才通知；首次获取一定会通知。
        if (oldUrl !== kycUrl) {
            notify(kycUrl);
            log("已发送通知并写入剪贴板");
        } else {
            log("KYC URL 与上次相同，跳过重复通知");
        }

    } catch (e) {
        log("运行异常: " + e);
    }

    $done({});
})();
