(function () {
    const URL_PREFIX =
        "https://tuyo.withpersona.com/inquiry?inquiry-id=";

    try {
        const requestUrl = $request.url || "";

        // 提取 Persona Inquiry ID
        const match = requestUrl.match(
            /\/inquiries\/(inq_[A-Za-z0-9]+)/i
        );

        if (!match) {
            console.log("[KYC] 未找到 Inquiry ID");
            $done({});
            return;
        }

        const inquiryId = match[1];

        // 生成 Tuyo 链接
        const inquiryUrl =
            URL_PREFIX + encodeURIComponent(inquiryId);

        // 保存 Inquiry ID
        $persistentStore.write(
            inquiryId,
            "persona_inquiry_id"
        );

        // 保存完整 URL
        $persistentStore.write(
            inquiryUrl,
            "persona_inquiry_url"
        );

        console.log("[KYC] Inquiry ID: " + inquiryId);
        console.log("[KYC] URL: " + inquiryUrl);

        // 通知 + 复制到剪贴板
        $notification.post(
            "KYC Inquiry",
            inquiryId,
            inquiryUrl,
            {
                clipboard: inquiryUrl
            }
        );

    } catch (error) {
        console.log("[KYC] Error: " + error);
    }

    $done({});
})();
