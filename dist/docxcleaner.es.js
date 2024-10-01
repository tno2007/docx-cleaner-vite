const L = "\r", x = `
`, N = " ", E = " ", it = "​";
function P(e) {
  return e.nodeType === Node.COMMENT_NODE;
}
function C(e, t) {
  if (!t(e))
    return;
  let r = e.firstChild;
  for (; r; ) {
    const i = r, s = r.previousSibling;
    r = r.nextSibling, C(i, t), // An unwrap was made. Need to compute the next child again.
    !i.previousSibling && !i.nextSibling && !i.parentNode && r && s !== r.previousSibling && r.parentNode ? s ? r = s.nextSibling : r = e.firstChild : (
      // A list was created. Need to compute the next child again.
      !i.previousSibling && !i.nextSibling && !i.parentNode && r && !r.previousSibling && !r.nextSibling && !r.parentNode && (s ? s.nextSibling ? r = s.nextSibling.nextSibling : r = null : e.firstChild && (r = e.firstChild.nextSibling))
    );
  }
}
function st(e, t) {
  C(e, (n) => P(n) ? t(n) : !0);
}
function W(e, t, n) {
  function r(i) {
    return P(i) && i.data === n;
  }
  st(e, (i) => {
    if (i.data === t) {
      let s = i.nextSibling;
      for (i.remove(); s && !r(s); ) {
        const { nextSibling: u } = s;
        s.remove(), s = u;
      }
      s && r(s) && s.remove();
    }
    return !0;
  });
}
function at(e) {
  return e.nodeType === Node.ELEMENT_NODE;
}
function b(e, t) {
  C(e, (n) => at(n) ? t(n) : !0);
}
const ot = ["H1", "H2", "H3", "H4", "H5", "H6"];
function ut(e) {
  const t = e.cloneNode(!0);
  if (ot.includes(t.tagName)) {
    const n = document.createElement(t.tagName);
    n.innerHTML = t.innerHTML, t.innerHTML = n.outerHTML;
  }
  return W(t, "[if !supportLists]", "[endif]"), b(t, (n) => (n.getAttribute("style") === "mso-list:Ignore" && n.remove(), !0)), t.innerHTML;
}
function B(e) {
  const n = (e.getAttribute("style") || "").match(/level(\d+)/im);
  if (n && n.length >= 1) {
    const [, r] = n;
    return parseInt(r, 10);
  }
  return 1;
}
function lt(e) {
  return (e.getAttribute("style") || "").startsWith("mso-bookmark") && !e.textContent;
}
function G(e) {
  const t = e.getAttribute("style");
  return !t || !/mso-list:\s*l/gim.test(t) ? !1 : e.querySelector('[style="mso-list:Ignore"]') ? !0 : e.outerHTML.includes("<!--[if !supportLists]-->");
}
function ct(e) {
  return e.querySelector('[style="mso-list:Ignore"]') || e.querySelector("span[lang]");
}
function ft(e) {
  return /[0-9a-np-z]\S/g.test(e.toLowerCase());
}
function pt(e) {
  const t = ct(e);
  return t ? ft(t.textContent || "") : !1;
}
function dt(e) {
  const t = document.createElement("div");
  return t.innerHTML = e, t.firstElementChild;
}
function U(e) {
  const t = B(e);
  let n = "", r = e;
  for (; r; ) {
    if (lt(r)) {
      r = r.nextElementSibling;
      continue;
    }
    if (!G(r))
      break;
    const u = B(r);
    if (u < t)
      break;
    if (u > t) {
      const c = U(r);
      c.list && (n += c.list.outerHTML), r = c.nextSibling;
      continue;
    }
    n += `<li>${ut(r)}</li>`;
    const o = r;
    r = o.nextElementSibling, o.remove();
  }
  const i = pt(e) ? "ol" : "ul";
  return { list: dt(`<${i}>${n}</${i}>`), nextSibling: r };
}
function Q(e, t) {
  const n = document.createElement(t);
  n.innerHTML = e.innerHTML;
  for (const { name: r } of e.attributes) {
    const i = e.getAttribute(r);
    i && n.setAttribute(r, i);
  }
  return e.parentNode && e.parentNode.replaceChild(n, e), n;
}
function gt(e) {
  b(e, (t) => {
    if (t.tagName !== "BR")
      return !0;
    t.nextSibling && P(t.nextSibling) && t.nextSibling.data === "[if !supportLineBreakNewLine]" && W(
      t.nextSibling,
      "[if !supportLineBreakNewLine]",
      "[endif]"
    );
    const n = document.createTextNode(x);
    return t.parentElement && t.parentElement.replaceChild(n, t), !1;
  });
}
function mt(e) {
  return e.replace(/\r\n/gm, `
`).replace(/\r/gm, `
`);
}
const ht = ["BR", "IMG"];
function bt(e) {
  return !ht.includes(e.nodeName) && !e.innerHTML;
}
function z(e) {
  if (bt(e)) {
    const { parentElement: t } = e;
    e.remove(), t && z(t);
  }
}
function _t(e) {
  b(e, (t) => (z(t), !0));
}
function vt(e) {
  return e.nodeName === "O:P" && e.textContent === N;
}
function V(e) {
  return e.children.length === 1 && e.firstElementChild !== null && (vt(e.firstElementChild) || V(e.firstElementChild));
}
function Et(e) {
  return b(e, (t) => (t.tagName === "P" && V(t) && (t.innerHTML = ""), !0));
}
function yt(e) {
  b(e, (t) => (t.tagName === "FONT" && (t.textContent ? Q(t, "span") : t.remove()), !0));
}
function St(e) {
  return e.tagName === "SPAN" && e.classList.contains("MsoFootnoteReference");
}
function At(e) {
  return (e.textContent || "").trim().replace(/[[\]]/g, "");
}
function xt(e) {
  b(e, (t) => {
    if (St(t)) {
      const n = document.createElement("sup");
      return n.textContent = At(t), t.parentElement && t.parentElement.replaceChild(n, t), !0;
    }
    return !0;
  });
}
function Lt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var w = { exports: {} }, R = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function n(i) {
    "@babel/helpers - typeof";
    return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
      return typeof s;
    } : function(s) {
      return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
    }, n(i);
  }
  function r(i) {
    var s = typeof i == "string" || i instanceof String;
    if (!s) {
      var u = n(i);
      throw i === null ? u = "null" : u === "object" && (u = i.constructor.name), new TypeError("Expected a string but received a ".concat(u));
    }
  }
  e.exports = t.default, e.exports.default = t.default;
})(R, R.exports);
var q = R.exports, H = { exports: {} }, O = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = n;
  function n() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 ? arguments[1] : void 0;
    for (var s in i)
      typeof r[s] > "u" && (r[s] = i[s]);
    return r;
  }
  e.exports = t.default, e.exports.default = t.default;
})(O, O.exports);
var Z = O.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = u;
  var n = i(q), r = i(Z);
  function i(o) {
    return o && o.__esModule ? o : {
      default: o
    };
  }
  var s = {
    require_tld: !0,
    allow_underscores: !1,
    allow_trailing_dot: !1,
    allow_numeric_tld: !1,
    allow_wildcard: !1,
    ignore_max_length: !1
  };
  function u(o, c) {
    (0, n.default)(o), c = (0, r.default)(c, s), c.allow_trailing_dot && o[o.length - 1] === "." && (o = o.substring(0, o.length - 1)), c.allow_wildcard === !0 && o.indexOf("*.") === 0 && (o = o.substring(2));
    var d = o.split("."), g = d[d.length - 1];
    return c.require_tld && (d.length < 2 || !c.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(g) || /\s/.test(g)) || !c.allow_numeric_tld && /^\d+$/.test(g) ? !1 : d.every(function(h) {
      return !(h.length > 63 && !c.ignore_max_length || !/^[a-z_\u00a1-\uffff0-9-]+$/i.test(h) || /[\uff01-\uff5e]/.test(h) || /^-|-$/.test(h) || !c.allow_underscores && /_/.test(h));
    });
  }
  e.exports = t.default, e.exports.default = t.default;
})(H, H.exports);
var Ct = H.exports, F = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = d;
  var n = r(q);
  function r(g) {
    return g && g.__esModule ? g : {
      default: g
    };
  }
  var i = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])", s = "(".concat(i, "[.]){3}").concat(i), u = new RegExp("^".concat(s, "$")), o = "(?:[0-9a-fA-F]{1,4})", c = new RegExp("^(" + "(?:".concat(o, ":){7}(?:").concat(o, "|:)|") + "(?:".concat(o, ":){6}(?:").concat(s, "|:").concat(o, "|:)|") + "(?:".concat(o, ":){5}(?::").concat(s, "|(:").concat(o, "){1,2}|:)|") + "(?:".concat(o, ":){4}(?:(:").concat(o, "){0,1}:").concat(s, "|(:").concat(o, "){1,3}|:)|") + "(?:".concat(o, ":){3}(?:(:").concat(o, "){0,2}:").concat(s, "|(:").concat(o, "){1,4}|:)|") + "(?:".concat(o, ":){2}(?:(:").concat(o, "){0,3}:").concat(s, "|(:").concat(o, "){1,5}|:)|") + "(?:".concat(o, ":){1}(?:(:").concat(o, "){0,4}:").concat(s, "|(:").concat(o, "){1,6}|:)|") + "(?::((?::".concat(o, "){0,5}:").concat(s, "|(?::").concat(o, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
  function d(g) {
    var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return (0, n.default)(g), h = String(h), h ? h === "4" ? u.test(g) : h === "6" ? c.test(g) : !1 : d(g, 4) || d(g, 6);
  }
  e.exports = t.default, e.exports.default = t.default;
})(F, F.exports);
var Tt = F.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = et;
  var n = u(q), r = u(Ct), i = u(Tt), s = u(Z);
  function u(a) {
    return a && a.__esModule ? a : {
      default: a
    };
  }
  function o(a, l) {
    return X(a) || h(a, l) || d(a, l) || c();
  }
  function c() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function d(a, l) {
    if (a) {
      if (typeof a == "string") return g(a, l);
      var f = Object.prototype.toString.call(a).slice(8, -1);
      if (f === "Object" && a.constructor && (f = a.constructor.name), f === "Map" || f === "Set") return Array.from(a);
      if (f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f)) return g(a, l);
    }
  }
  function g(a, l) {
    (l == null || l > a.length) && (l = a.length);
    for (var f = 0, m = new Array(l); f < l; f++) m[f] = a[f];
    return m;
  }
  function h(a, l) {
    var f = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
    if (f != null) {
      var m, _, A, S, v = [], p = !0, y = !1;
      try {
        if (A = (f = f.call(a)).next, l !== 0) for (; !(p = (m = A.call(f)).done) && (v.push(m.value), v.length !== l); p = !0) ;
      } catch (T) {
        y = !0, _ = T;
      } finally {
        try {
          if (!p && f.return != null && (S = f.return(), Object(S) !== S)) return;
        } finally {
          if (y) throw _;
        }
      }
      return v;
    }
  }
  function X(a) {
    if (Array.isArray(a)) return a;
  }
  var Y = {
    protocols: ["http", "https", "ftp"],
    require_tld: !0,
    require_protocol: !1,
    require_host: !0,
    require_port: !1,
    require_valid_protocol: !0,
    allow_underscores: !1,
    allow_trailing_dot: !1,
    allow_protocol_relative_urls: !1,
    allow_fragments: !0,
    allow_query_components: !0,
    validate_length: !0
  }, J = /^\[([^\]]+)\](?::([0-9]+))?$/;
  function tt(a) {
    return Object.prototype.toString.call(a) === "[object RegExp]";
  }
  function D(a, l) {
    for (var f = 0; f < l.length; f++) {
      var m = l[f];
      if (a === m || tt(m) && m.test(a))
        return !0;
    }
    return !1;
  }
  function et(a, l) {
    if ((0, n.default)(a), !a || /[\s<>]/.test(a) || a.indexOf("mailto:") === 0 || (l = (0, s.default)(l, Y), l.validate_length && a.length >= 2083) || !l.allow_fragments && a.includes("#") || !l.allow_query_components && (a.includes("?") || a.includes("&")))
      return !1;
    var f, m, _, A, S, v, p, y;
    if (p = a.split("#"), a = p.shift(), p = a.split("?"), a = p.shift(), p = a.split("://"), p.length > 1) {
      if (f = p.shift().toLowerCase(), l.require_valid_protocol && l.protocols.indexOf(f) === -1)
        return !1;
    } else {
      if (l.require_protocol)
        return !1;
      if (a.slice(0, 2) === "//") {
        if (!l.allow_protocol_relative_urls)
          return !1;
        p[0] = a.slice(2);
      }
    }
    if (a = p.join("://"), a === "")
      return !1;
    if (p = a.split("/"), a = p.shift(), a === "" && !l.require_host)
      return !0;
    if (p = a.split("@"), p.length > 1) {
      if (l.disallow_auth || p[0] === "" || (m = p.shift(), m.indexOf(":") >= 0 && m.split(":").length > 2))
        return !1;
      var T = m.split(":"), $ = o(T, 2), rt = $[0], nt = $[1];
      if (rt === "" && nt === "")
        return !1;
    }
    A = p.join("@"), v = null, y = null;
    var I = A.match(J);
    if (I ? (_ = "", y = I[1], v = I[2] || null) : (p = A.split(":"), _ = p.shift(), p.length && (v = p.join(":"))), v !== null && v.length > 0) {
      if (S = parseInt(v, 10), !/^[0-9]+$/.test(v) || S <= 0 || S > 65535)
        return !1;
    } else if (l.require_port)
      return !1;
    return l.host_whitelist ? D(_, l.host_whitelist) : _ === "" && !l.require_host ? !0 : !(!(0, i.default)(_) && !(0, r.default)(_, l) && (!y || !(0, i.default)(y, 6)) || (_ = _ || y, l.host_blacklist && D(_, l.host_blacklist)));
  }
  e.exports = t.default, e.exports.default = t.default;
})(w, w.exports);
var It = w.exports;
const Mt = /* @__PURE__ */ Lt(It);
function Nt(e) {
  const [, t = ""] = e.split("bliptag"), n = t.split("}");
  if (n.length < 2)
    return null;
  const [r, i] = n;
  if (n.length > 2 && r.includes("blipuid"))
    return i.split(E).join("");
  const s = r.split(E);
  return s.length < 2 ? null : s.slice(1).join("");
}
function wt(e) {
  const [t] = e.split("bliptag");
  return t.includes("pngblip") ? "image/png" : t.includes("jpegblip") ? "image/jpeg" : null;
}
const Rt = ["\\", "{", L, x, E];
function Ht(e, t) {
  const r = Rt.map((u) => e.indexOf(u)).filter((u) => u !== -1), i = Math.min(e.length, ...r), s = e.substring(0, i);
  return s ? `${t}${s}` : null;
}
function k(e, t, n) {
  const [, ...r] = e.split(n);
  return r.reduce((i, s) => {
    const [, u = ""] = s.split("shplid"), o = Ht(u, t), c = wt(u), d = Nt(u);
    return o && c && d && i.push({ hex: d, mimeType: c, spid: o }), i;
  }, []);
}
function Ot(e) {
  const t = {}, n = k(e, "i", "\\shppict");
  for (const i of n)
    t[i.spid] = i;
  const r = k(e, "s", "\\shp");
  for (const i of r)
    t[i.spid] = i;
  return t;
}
function Ft() {
  return NodeFilter.FILTER_ACCEPT;
}
function Pt(e) {
  const t = [], n = document.createNodeIterator(e, NodeFilter.SHOW_COMMENT, { acceptNode: Ft });
  let r = n.nextNode();
  for (; r; )
    r.nodeValue && t.push(r.nodeValue), r = n.nextNode();
  return t;
}
const qt = new DOMParser();
function Dt(e) {
  return Pt(e).reduce((n, r) => {
    try {
      const i = qt.parseFromString(r, "text/html");
      Array.from(i.getElementsByTagName("V:SHAPE")).forEach((u) => {
        const { id: o } = u, c = u.getAttribute("o:spid");
        typeof o == "string" && typeof c == "string" && (n[o] = c);
      });
    } catch {
    }
    return n;
  }, {});
}
function M(e) {
  const [, , t] = e.split("_");
  return t;
}
function $t(e, t) {
  if (t.tagName === "IMG") {
    const r = t.getAttribute("v:shapes"), i = Dt(e);
    if (!r)
      return null;
    const s = i[r];
    return s ? M(s) : t.parentElement && t.parentElement.parentElement && t.parentElement.parentElement.innerHTML.indexOf("msEquation") >= 0 ? null : M(r);
  }
  if (!t.parentElement)
    return null;
  const n = t.parentElement.getAttribute("o:spid");
  return n && M(n);
}
function Bt(e) {
  const n = (e.match(/\w{2}/g) || []).map((r) => String.fromCharCode(parseInt(r, 16)));
  return btoa(n.join(""));
}
function kt(e, t, n) {
  t && b(n, (r) => {
    if (!["IMG", "V:IMAGEDATA"].includes(r.tagName))
      return !0;
    if (r.tagName === "IMG") {
      const c = r.getAttribute("src");
      if (!c || !c.startsWith("file://"))
        return !0;
      const d = r.getAttribute("alt");
      if (typeof d == "string" && Mt(d, { require_protocol: !0 }))
        return r.setAttribute("src", d), !0;
    }
    const i = $t(e, r);
    if (!i)
      return !0;
    const u = Ot(t)[i];
    if (!u)
      return r.remove(), !0;
    const o = `data:${u.mimeType};base64,${Bt(u.hex)}`;
    if (r.tagName === "IMG")
      r.setAttribute("src", o);
    else if (r.parentNode && r.parentNode.parentNode) {
      const c = e.createElement("img");
      c.setAttribute("src", o), r.parentNode.parentNode.replaceChild(c, r.parentNode);
    }
    return !0;
  });
}
function jt(e) {
  return e.startsWith("#");
}
function j(e) {
  e.outerHTML = e.innerHTML;
}
function Wt(e) {
  b(e, (t) => {
    if (t.tagName !== "A")
      return !0;
    const n = t.getAttribute("href");
    if ((!n || jt(n)) && j(t), n && t.querySelector("img"))
      for (const r of t.querySelectorAll("span"))
        r.innerText || j(r);
    return !0;
  });
}
function Gt(e) {
  b(e, (t) => {
    const n = t.getAttribute("style");
    return n && t.setAttribute(
      "style",
      n.replace(/mso-list:\s*Ignore/gim, "mso-list:Ignore")
    ), !0;
  }), b(e, (t) => {
    if (!G(t))
      return !0;
    const { parentElement: n, previousSibling: r } = t;
    if (!n)
      return !0;
    const { list: i } = U(t);
    if (!i)
      return !0;
    const s = r ? r.nextSibling : n.firstChild;
    return s ? n.insertBefore(i, s) : n.appendChild(i), !1;
  });
}
function Ut(e) {
  b(e, (t) => (t.parentNode && t.tagName === "P" && t.classList.contains("MsoQuote") && Q(t, "blockquote"), !0));
}
function K(e) {
  return Array.from({ length: e }, () => E).join("");
}
function Qt(e) {
  if (e.getAttribute("style") !== "mso-spacerun:yes")
    return;
  const n = (e.textContent || "").length, r = document.createTextNode(K(n));
  e.parentNode && e.parentNode.replaceChild(r, e);
}
function zt(e) {
  const t = e.getAttribute("style") || "";
  if (!t.startsWith("mso-tab-count:"))
    return;
  const [, n] = t.split(":"), r = parseInt(n, 10), i = document.createTextNode(K(r));
  e.parentNode && e.parentNode.replaceChild(i, e);
}
function Vt(e) {
  b(e, (t) => (t.nodeName !== "SPAN" || (Qt(t), zt(t)), !0));
}
function Zt(e) {
  return e.nodeType === Node.TEXT_NODE;
}
function Kt(e, t) {
  C(e, (n) => Zt(n) ? t(n) : !0);
}
function Xt(e) {
  Kt(e, (t) => {
    if (/^\n\s*$/.test(t.data) && (t.previousElementSibling || t.nextElementSibling))
      return t.remove(), !0;
    if (t.data = t.data.replace(/\n\s*/g, `
`), t.data.includes(L) || t.data.includes(x) || t.data.includes(N)) {
      const n = t.data.includes(E), r = /\S/.test(t.data), i = t.data.includes(x);
      if (!(n || r) && !i)
        return t.data === N ? (t.data = E, !0) : (t.remove(), !0);
      if (t.previousSibling && t.previousSibling.nodeName === "BR" && t.parentElement) {
        t.parentElement.removeChild(t.previousSibling);
        const s = t.data.match(/^[\r\n]+/), u = s ? s[0].length : 0;
        t.data = t.data.substring(u).replace(new RegExp(x, "g"), E).replace(new RegExp(L, "g"), E), t.data = `
${t.data}`;
      } else
        t.data = t.data.replace(new RegExp(x, "g"), E).replace(new RegExp(L, "g"), E);
    }
    return !0;
  });
}
function Yt(e) {
  let t = !1;
  return b(e, (n) => {
    const r = n.getAttribute("style") || "", i = Array.from(n.classList), s = r.includes("mso-") || i.some((u) => u.startsWith("Mso"));
    return t = t || s, !t;
  }), t;
}
function Jt(e) {
  return `<body>${e.trim().replace(new RegExp(it, "g"), "")}</body>`;
}
function te(e) {
  const t = e.indexOf("<html");
  return t === -1 ? e : e.substring(t);
}
function ee(e) {
  const t = e.lastIndexOf("</html>");
  return t === -1 ? e : e.substring(0, t + 7);
}
function re(e) {
  return te(ee(e));
}
const ne = [re, mt];
function ie(e) {
  return ne.reduce((t, n) => n(t), e);
}
const se = new DOMParser();
function ae(e, t) {
  const n = se.parseFromString(ie(e), "text/html"), { body: r } = n;
  return !t && !Yt(r) ? e : (xt(r), kt(n, t, r), _t(r), Et(r), Ut(r), Vt(r), Xt(r), gt(r), Wt(r), yt(r), Gt(r), Jt(r.innerHTML));
}
export {
  L as CARRIAGE_RETURN,
  x as LINE_FEED,
  N as NO_BREAK_SPACE,
  E as SPACE,
  it as ZERO_WIDTH_SPACE,
  U as buildList,
  Q as changeTagName,
  gt as cleanBrElements,
  mt as cleanCrLf,
  ae as cleanDocx,
  _t as cleanEmptyElements,
  Et as cleanEmptyParagraphs,
  yt as cleanFontElements,
  xt as cleanFootnotes,
  kt as cleanImageElements,
  Wt as cleanLinkElements,
  Gt as cleanListElements,
  Ut as cleanQuotes,
  Qt as cleanSpacerun,
  Vt as cleanSpans,
  zt as cleanTabCount,
  Xt as cleanTextNodes,
  K as generateSpaces,
  Pt as getComments,
  ut as getListContentHtml,
  B as getListLevel,
  ct as getListTypeNode,
  Nt as getRtfImageHex,
  wt as getRtfImageMimeType,
  Ht as getRtfImageSpid,
  k as getRtfImagesByType,
  Ot as getRtfImagesMap,
  $t as getVShapeSpid,
  Dt as getVShapes,
  Bt as hexToBase64,
  lt as isBookmark,
  P as isComment,
  Yt as isDocxContent,
  at as isElement,
  St as isFootnote,
  jt as isFragmentHref,
  G as isList,
  pt as isOrderedList,
  ft as isOrderedListSymbol,
  Zt as isText,
  dt as parseHtmlElement,
  Jt as postCleanHtml,
  ie as preCleanHtml,
  re as removeHtmlSurroundings,
  W as removeNodesBetweenComments,
  C as traverse,
  st as traverseComments,
  b as traverseElements,
  Kt as traverseTexts,
  j as unwrapElement
};
