"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var cookies_next_1 = require("cookies-next");
var react_1 = require("react");
var site_config_1 = require("site.config");
var queryKey_1 = require("src/constants/queryKey");
var useScheme = function () {
    var queryClient = react_query_1.useQueryClient();
    var followsSystemTheme = site_config_1.CONFIG.blog.scheme === "system";
    var data = react_query_1.useQuery({
        queryKey: queryKey_1.queryKey.scheme(),
        enabled: false,
        initialData: followsSystemTheme
            ? "dark"
            : site_config_1.CONFIG.blog.scheme
    }).data;
    var setScheme = function (scheme) {
        cookies_next_1.setCookie("scheme", scheme);
        queryClient.setQueryData(queryKey_1.queryKey.scheme(), scheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    react_1.useEffect(function () {
        if (!window)
            return;
        var cachedScheme = cookies_next_1.getCookie("scheme");
        var defaultScheme = followsSystemTheme
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : data;
        setScheme(cachedScheme || defaultScheme);
    }, []);
    return [data, setScheme];
};
exports["default"] = useScheme;
