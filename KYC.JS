// Tuyo KYC - Loon
const body = $response && $response.body;

try {
    if (!body) {
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
            const old = $persistentStore.read("TuyoKYC_LastURL");

            if (old !== url) {
                $persistentStore.write(url, "TuyoKYC_LastURL");

                $notification.post(
                    "Tuyo KYC",
                    "已获取 Persona KYC 验证链接",
                    url
                );
            }
        }

        $done({});
    }
} catch (e) {
    console.log("[Tuyo KYC] error: " + e);
    $done({});
}
