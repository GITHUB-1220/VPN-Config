const body = $response && $response.body;

try {
    if (!body) {
        console.log("[Tuyo KYC] 没有 response body");
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

    if (url) {
        console.log("[Tuyo KYC] 找到链接: " + url);

        $notification.post(
            "Tuyo KYC",
            "发现 KYC 验证链接",
            url
        );
    } else {
        console.log("[Tuyo KYC] 没有找到 KYC 链接");
    }

} catch (e) {
    console.log("[Tuyo KYC] 解析失败: " + e);
}

$done({});
