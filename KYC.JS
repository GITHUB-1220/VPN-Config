(function () {
    try {
        var url = $request.url || "";

        console.log("[KYC] SCRIPT RUN");
        console.log("[KYC] URL: " + url);

        var match = url.match(/inq_[A-Za-z0-9]+/i);

        if (!match) {
            console.log("[KYC] Inquiry ID not found");

            $notification.post(
                "Persona KYC",
                "脚本已执行",
                "没有找到 Inquiry ID"
            );

            $done({});
            return;
        }

        var inquiryId = match[0];

        var inquiryUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            encodeURIComponent(inquiryId);

        console.log("[KYC] ID: " + inquiryId);
        console.log("[KYC] URL: " + inquiryUrl);

        $persistentStore.write(
            inquiryId,
            "persona_inquiry_id"
        );

        $persistentStore.write(
            inquiryUrl,
            "persona_inquiry_url"
        );

        $notification.post(
            "Persona KYC",
            inquiryId,
            inquiryUrl
        );

    } catch (e) {
        console.log("[KYC] ERROR: " + e);

        $notification.post(
            "Persona KYC",
            "脚本错误",
            String(e)
        );
    }

    $done({});
})();
