var status = $response.status;
var headers = $response.headers || {};
var body = $response.body;

var contentType =
    headers["Content-Type"] ||
    headers["content-type"] ||
    "";

var bodyText = body ? String(body) : "";
var bodyLength = bodyText.length;

console.log("========== TUYO KYC DEBUG ==========");
console.log("status = " + status);
console.log("content-type = " + contentType);
console.log("body length = " + bodyLength);
console.log("body = " + bodyText);
console.log("====================================");

if (bodyLength === 0) {

    $notification.post(
        "Tuyo KYC",
        "响应 Body 为空",
        "HTTP " + status + " / " + contentType
    );

    $done({});
    return;
}

try {

    var data = JSON.parse(bodyText);
    var kycUrl = null;

    if (Array.isArray(data.requirements)) {

        for (var i = 0; i < data.requirements.length; i++) {

            var item = data.requirements[i];

            if (
                item &&
                typeof item.url === "string" &&
                item.url.indexOf("tuyo.withpersona.com/verify") !== -1
            ) {
                kycUrl = item.url;
                break;
            }
        }
    }

    if (kycUrl) {

        // 测试阶段：每次都通知，不做去重
        $notification.post(
            "Tuyo KYC",
            "找到 KYC 链接",
            kycUrl
        );

        console.log("KYC URL = " + kycUrl);

    } else {

        $notification.post(
            "Tuyo KYC",
            "没有找到 Persona URL",
            "HTTP " + status +
            " / Body " + bodyLength + " 字节"
        );

        console.log(
            "requirements = " +
            JSON.stringify(data.requirements)
        );
    }

} catch (e) {

    $notification.post(
        "Tuyo KYC",
        "JSON 解析失败",
        String(e) + " / Body " + bodyLength + " 字节"
    );

    console.log("JSON ERROR = " + e);
}

$done({});
