function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\u[a-zA-Z0-9]{4}|\[^u]|[^\"])*"(s*:)?|(true|false|null)|-?d+(?:.d*)?(?:[eE][+-]?d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

chrome.management.getAll(function(ExtensionInfoList) {
    for(i=0; i<ExtensionInfoList.length;i++){
        // alert(info[i].name)
        ExtensionInfoList[i].seg = "======================================"+i+"====================================="
    }
    console.log("extension list");
    console.log(ExtensionInfoList);
    let pre_info = JSON.stringify(ExtensionInfoList, null, 4)
    document.getElementById("management").innerHTML = "<pre>"+syntaxHighlight(pre_info)+"</pre>";;

})

chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(userProfile){
    email = userProfile.email;
    console.log(userProfile);
    document.getElementById("identity").value = JSON.stringify(userProfile);
});

chrome.enterprise.deviceAttributes.getDirectoryDeviceId(function(deviceId) {
    alert(deviceId);
})
