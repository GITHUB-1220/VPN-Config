// Tuyo KYC - Loon
const body = $response && $response.body;

try {
    console.log("[Tuyo KYC] triggered");

    if (!body) {
        console.log("[Tuyo KYC] empty response body");
        $done({});
    } else {
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
            console.log("[Tuyo KYC] URL: " + url);

            $notification.post(
                "Tuyo KYC",
                "已获取 Persona KYC 验证链接",
                url
            );
        } else {
            console.log("[Tuyo KYC] Persona URL not found");
        }

        $done({});
    }
} catch (e) {
    console.log("[Tuyo KYC] error: " + e);
    $done({});
}
