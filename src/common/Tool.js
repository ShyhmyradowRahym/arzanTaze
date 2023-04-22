// Element to move, time in ms to animate
function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;
    debugger;
    setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
}

export default {
    scrollTo,
    getStd(lang, key, obj) {
        if (!obj && obj !== 0 && obj !== '0') return '';
        if (lang === 'tm') return obj[key];
        return obj[key + '_' + lang] || "";
    },
    isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom - 20 <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right - 20 <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            return "#000000";
        }
        let r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return '#' + String(r).padStart(2, '0') + String(g).padStart(2, '0') + String(b).padStart(2, '0');
    },
    
    getPercentage(sale_price, price){
        return parseInt(100 - (sale_price / price) * 100)
    },

    isValidPhone(phone = "") {
        return phone.match(/^\+9936[0-5][0-9]{6}$/);
    }
}