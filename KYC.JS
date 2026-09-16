const body = $response && $response.body;

try {
    if (!body) {
        console.log("[Tuyo KYC] 没有 response body");
        $done({});
        return;
    }

    const data = JSON.parse(String(body));
    let inquiryId = "";

    // 从响应中寻找 Inquiry ID
    if (data && typeof data.id === "string" && /^inq_[A-Za-z0-9]+$/.test(data.id)) {
        inquiryId = data.id;
    }

    if (!inquiryId && data && Array.isArray(data.requirements)) {
        for (const item of data.requirements) {
            if (item && typeof item.id === "string" &&
                /^inq_[A-Za-z0-9]+$/.test(item.id)) {
                inquiryId = item.id;
                break;
            }
        }
    }

    if (inquiryId) {
        console.log("[Tuyo KYC] Inquiry ID: " + inquiryId);

        // 每次发现都通知，不去重
        $notification.post(
            "Tuyo KYC",
            "发现 Inquiry ID",
            inquiryId
        );
    } else {
        console.log("[Tuyo KYC] 没有找到 Inquiry ID");
    }

} catch (e) {
    console.log("[Tuyo KYC] 解析失败: " + e);
}

$done({});
