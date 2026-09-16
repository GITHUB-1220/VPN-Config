const body = $response.body;

try {
    const data = JSON.parse(body);

    if (Array.isArray(data.requirements)) {
        const item = data.requirements.find(x =>
            x &&
            typeof x.url === "string" &&
            x.url.includes("tuyo.withpersona.com/verify")
        );

        if (item && item.url) {
            const key = "TuyoKYC_LastURL";
            const old = $persistentStore.read(key);

            if (old !== item.url) {
                $persistentStore.write(item.url, key);
                $notification.post(
                    "Tuyo KYC",
                    "已获取 KYC 链接",
                    item.url
                );
                console.log("Tuyo KYC URL: " + item.url);
            }
        }
    }
} catch (e) {
    console.log("TuyoKYC Error: " + e);
}

$done({});
