!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var r;
    (r =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (r.pathToRegexp = e());
  }
})(function () {
  return (function e(r, t, n) {
    function o(a, p) {
      if (!t[a]) {
        if (!r[a]) {
          var f = "function" == typeof require && require;
          if (!p && f) return f(a, !0);
          if (i) return i(a, !0);
          var u = new Error("Cannot find module '" + a + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var l = (t[a] = { exports: {} });
        r[a][0].call(
          l.exports,
          function (e) {
            var t = r[a][1][e];
            return o(t ? t : e);
          },
          l,
          l.exports,
          e,
          r,
          t,
          n
        );
      }
      return t[a].exports;
    }
    for (
      var i = "function" == typeof require && require, a = 0;
      a < n.length;
      a++
    )
      o(n[a]);
    return o;
  })(
    {
      1: [
        function (e, r, t) {
          function n(e, r) {
            for (
              var t,
                n = [],
                o = 0,
                i = 0,
                f = "",
                u = (r && r.delimiter) || "/",
                l = (r && r.delimiters) || "./",
                c = !1;
              null !== (t = g.exec(e));

            ) {
              var s = t[0],
                d = t[1],
                x = t.index;
              if (((f += e.slice(i, x)), (i = x + s.length), d))
                (f += d[1]), (c = !0);
              else {
                var h = "",
                  y = e[i],
                  m = t[2],
                  v = t[3],
                  w = t[4],
                  E = t[5];
                if (!c && f.length) {
                  var b = f.length - 1;
                  l.indexOf(f[b]) > -1 && ((h = f[b]), (f = f.slice(0, b)));
                }
                f && (n.push(f), (f = ""), (c = !1));
                var T = "" !== h && void 0 !== y && y !== h,
                  R = "+" === E || "*" === E,
                  $ = "?" === E || "*" === E,
                  j = h || u,
                  A = v || w;
                n.push({
                  name: m || o++,
                  prefix: h,
                  delimiter: j,
                  optional: $,
                  repeat: R,
                  partial: T,
                  pattern: A ? p(A) : "[^" + a(j) + "]+?",
                });
              }
            }
            return (f || i < e.length) && n.push(f + e.substr(i)), n;
          }
          function o(e, r) {
            return i(n(e, r));
          }
          function i(e) {
            for (var r = new Array(e.length), t = 0; t < e.length; t++)
              "object" == typeof e[t] &&
                (r[t] = new RegExp("^(?:" + e[t].pattern + ")$"));
            return function (t, n) {
              for (
                var o = "", i = (n && n.encode) || encodeURIComponent, a = 0;
                a < e.length;
                a++
              ) {
                var p = e[a];
                if ("string" != typeof p) {
                  var f,
                    u = t ? t[p.name] : void 0;
                  if (Array.isArray(u)) {
                    if (!p.repeat)
                      throw new TypeError(
                        'Expected "' + p.name + '" to not repeat, but got array'
                      );
                    if (0 === u.length) {
                      if (p.optional) continue;
                      throw new TypeError(
                        'Expected "' + p.name + '" to not be empty'
                      );
                    }
                    for (var l = 0; l < u.length; l++) {
                      if (((f = i(u[l])), !r[a].test(f)))
                        throw new TypeError(
                          'Expected all "' +
                            p.name +
                            '" to match "' +
                            p.pattern +
                            '"'
                        );
                      o += (0 === l ? p.prefix : p.delimiter) + f;
                    }
                  } else if (
                    "string" != typeof u &&
                    "number" != typeof u &&
                    "boolean" != typeof u
                  ) {
                    if (!p.optional)
                      throw new TypeError(
                        'Expected "' +
                          p.name +
                          '" to be ' +
                          (p.repeat ? "an array" : "a string")
                      );
                    p.partial && (o += p.prefix);
                  } else {
                    if (((f = i(String(u))), !r[a].test(f)))
                      throw new TypeError(
                        'Expected "' +
                          p.name +
                          '" to match "' +
                          p.pattern +
                          '", but got "' +
                          f +
                          '"'
                      );
                    o += p.prefix + f;
                  }
                } else o += p;
              }
              return o;
            };
          }
          function a(e) {
            return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
          }
          function p(e) {
            return e.replace(/([=!:$\/()])/g, "\\$1");
          }
          function f(e) {
            return e && e.sensitive ? "" : "i";
          }
          function u(e, r) {
            if (!r) return e;
            var t = e.source.match(/\((?!\?)/g);
            if (t)
              for (var n = 0; n < t.length; n++)
                r.push({
                  name: n,
                  prefix: null,
                  delimiter: null,
                  optional: !1,
                  repeat: !1,
                  partial: !1,
                  pattern: null,
                });
            return e;
          }
          function l(e, r, t) {
            for (var n = [], o = 0; o < e.length; o++)
              n.push(d(e[o], r, t).source);
            return new RegExp("(?:" + n.join("|") + ")", f(t));
          }
          function c(e, r, t) {
            return s(n(e, t), r, t);
          }
          function s(e, r, t) {
            t = t || {};
            for (
              var n = t.strict,
                o = t.end !== !1,
                i = a(t.delimiter || "/"),
                p = []
                  .concat(t.endsWith || [])
                  .map(a)
                  .concat("$")
                  .join("|"),
                u = "",
                l = 0;
              l < e.length;
              l++
            ) {
              var c = e[l];
              if ("string" == typeof c) u += a(c);
              else {
                var s = a(c.prefix),
                  d = "(?:" + c.pattern + ")";
                r && r.push(c),
                  c.repeat && (d += "(?:" + s + d + ")*"),
                  (d = c.optional
                    ? c.partial
                      ? s + "(" + d + ")?"
                      : "(?:" + s + "(" + d + "))?"
                    : s + "(" + d + ")"),
                  (u += d);
              }
            }
            return (
              n || (u += "(?:" + i + "(?=" + p + "))?"),
              (u += o
                ? "$" === p
                  ? p
                  : "(?=" + p + ")"
                : "(?=" + i + "|" + p + ")"),
              new RegExp("^" + u, f(t))
            );
          }
          function d(e, r, t) {
            return e instanceof RegExp
              ? u(e, r)
              : Array.isArray(e)
              ? l(e, r, t)
              : c(e, r, t);
          }
          (r.exports = d),
            (r.exports.parse = n),
            (r.exports.compile = o),
            (r.exports.tokensToFunction = i),
            (r.exports.tokensToRegExp = s);
          var g = new RegExp(
            [
              "(\\\\.)",
              "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?",
            ].join("|"),
            "g"
          );
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
