
var userAgent = (function (ua) {
    var tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join('/') + " markayoly/2.1.0  " + navigator.appName + " " + navigator.platform + "/" + navigator.vendor;
})(navigator.userAgent);

var timer;

const Util = {
    setCookie: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    eraseCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },


    getSession: (key) => {
        let ans;
        if (typeof (Storage) !== "undefined") {
            ans = sessionStorage.getItem(key);
            try {
                ans = ans ? JSON.parse(decodeURIComponent(ans)) : ans;
            } catch (err) { console.log(err); }
        };
        return ans;
    },
    setSession: (key, value) => {
        let ans;
        if (typeof (Storage) !== "undefined") {
            ans = sessionStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
        };
        return ans;
    },

    getNestedChildren: function (arr, parent_id, depth = 0) {
        if (depth > 20) return;
        var out = []
        for (var i in arr) {
            if (arr[i].parent_id === parent_id) {
                var children = this.getNestedChildren(arr, arr[i].cat_id, depth + 1)
                if (children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
    },


    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    },

    getItem: (key) => {
        let ans;
        if (typeof (Storage) !== "undefined") {
            // Retrieve
            ans = localStorage.getItem(key);
        };
        return ans;
    },
    setItem: (key, value) => {
        let ans;
        if (typeof (Storage) !== "undefined") {
            // Store
            ans = localStorage.setItem(key, value);
        };
        return ans;
    },


    getDeviceId() {
        let device_id = this.getItem("device_id") || this.getCookie("device_id");
        if (!device_id) {
            device_id = this.uuidv4();
            this.setItem("device_id", device_id);
            this.setCookie("device_id", device_id, 92);
        }

        return device_id;
    },

    offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },

    moveElementToBasket(image, afterImageLoad) {
        try {
            let main = document.getElementById("afc320936d"),
                endPoint = document.getElementById("k9e7ede"),
                { top, left } = this.offset(image),
                pos = this.offset(endPoint),
                imageRects = image.getBoundingClientRect();
            clearInterval(timer);
            main.style.display = 'block';
            main.innerHTML = '';
            main.style.position = 'absolute';
            main.style.zIndex = '9999';
            main.style.top = top + 'px';
            main.style.left = left + 'px';
            main.style.width = imageRects.width + 'px';
            main.style.height = imageRects.height + 'px';
            const clone = image.cloneNode(true);
            main.appendChild(clone);
            let percent = 0;
            clone.onload = function () {
                afterImageLoad(false);
                timer = setInterval(function () {
                    try {
                        if (percent > 100) {
                            clearInterval(timer);
                            main.style.display = 'none';
                        }
                        percent += 2;
                        main.style.top = top + ((pos.top - top) * percent / 100) + 'px';
                        main.style.left = left + ((pos.left - left) * percent / 100) + 'px';
                        main.style.width = imageRects.width - (imageRects.width - 30) * percent / 100 + 'px';
                        main.style.height = imageRects.height - (imageRects.height - 30) * percent / 100 + 'px';
                        main.style.opacity = 1 - (percent / 200);
                    } catch (err) { }
                }, 10)
            }
        } catch (err) { 
            afterImageLoad(false);
        }
    },


    getUserAgent(){
        return userAgent;
    },

    getRegions(){
        try{
            let regions = Util.getSession("a-regions-1")
            regions = JSON.parse(regions)
            if (Array.isArray(regions)) return regions
        }catch(err){}
        return [];
    },
    getAvailableHeight(){
        return window.innerHeight-document.getElementById("navbar").offsetHeight-document.getElementById("footer").offsetHeight
    },

    dateFormat(date, fstr, utc) {
        utc = utc ? "getUTC" : "get";
        return fstr.replace(/%[YmdHMS]/g, function (m) {
          switch (m) {
            case "%Y":
              return date[utc + "FullYear"](); // no leading zeros required
            case "%m":
              m = 1 + date[utc + "Month"]();
              break;
            case "%d":
              m = date[utc + "Date"]();
              break;
            case "%H":
              m = date[utc + "Hours"]();
              break;
            case "%M":
              m = date[utc + "Minutes"]();
              break;
            case "%S":
              m = date[utc + "Seconds"]();
              break;
            default:
              return m.slice(1); // unknown code, remove %
          }
          // add leading zero if required
          return ("0" + m).slice(-2);
        });
        // Util.dateFormat(new Date(order.created_at), '%Y-%m-%d %H:%M:%S', true)
      },
    
};

export default Util;