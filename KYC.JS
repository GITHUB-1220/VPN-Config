(function () {

    try {

        console.log("[KYC] ===== SCRIPT START =====");

        var url = "";

        if ($request && $request.url) {
            url = $request.url;
        }

        console.log("[KYC] URL = " + url);

        // 提取任何 inq_ 开头的 ID
        var match = url.match(/inq_[A-Za-z0-9]+/i);

        if (!match) {

            console.log("[KYC] 没有找到 Inquiry ID");

            $notification.post(
                "Persona KYC",
                "脚本已执行",
                "但是没有找到 Inquiry ID"
            );

            $done({});
            return;
        }

        var inquiryId = match[0];

        console.log(
            "[KYC] Inquiry ID = " + inquiryId
        );

        var inquiryUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            encodeURIComponent(inquiryId);

        console.log(
            "[KYC] Inquiry URL = " + inquiryUrl
        );

        // 保存 ID
        $persistentStore.write(
            inquiryId,
            "persona_inquiry_id"
        );

        // 保存 URL
        $persistentStore.write(
            inquiryUrl,
            "persona_inquiry_url"
        );

        // 通知
        $notification.post(
            "Persona Inquiry",
            inquiryId,
            inquiryUrl
        );

        console.log(
            "[KYC] ===== SUCCESS ====="
        );

    } catch (e) {

        console.log(
            "[KYC] ERROR = " + e
        );

        $notification.post(
            "Persona KYC Error",
            "脚本执行异常",
            String(e)
        );
    }

    $done({});

})();
