const body = $response && $response.body;

try {
    if (!body) {
        $done({});
        return;
    }

    const data = JSON.parse(String(body));
    let url = "";

    if (Array.isArray(data.requirements)) {
        for (const item of data.requirements) {
            if (
                item &&
                typeof item.url === "string" &&
                /tuyo\.withpersona\.com\/verify/i.test(item.url)
            ) {
                url = item.url;
                break;
            }
        }
    }

    // 找到链接就通知，不去重
    if (url) {
        $notification.post(
            "Tuyo KYC",
            "发现 KYC 验证链接",
            url
        );
    }
} catch (e) {
    // 错误静默，不通知
}

$done({});
