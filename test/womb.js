(() => {
  // dist/mandarina.mjs
  var ho = Object.defineProperty;
  var u = (e, a) => ho(e, "name", { value: a, configurable: true });
  var Nr = Object.defineProperty;
  var lo = u((e, a, d) => a in e ? Nr(e, a, { enumerable: true, configurable: true, writable: true, value: d }) : e[a] = d, "to");
  var h = u((e, a) => Nr(e, "name", { value: a, configurable: true }), "l");
  var uo = u((e, a) => {
    for (var d in a)
      Nr(e, d, { get: a[d], enumerable: true });
  }, "no");
  var ft = u((e, a, d) => (lo(e, typeof a != "symbol" ? a + "" : a, d), d), "he");
  var co = (() => {
    for (var e = new Uint8Array(128), a = 0; a < 64; a++)
      e[a < 26 ? a + 65 : a < 52 ? a + 71 : a < 62 ? a - 4 : a * 4 - 205] = a;
    return (d) => {
      for (var l = d.length, E = new Uint8Array((l - (d[l - 1] == "=") - (d[l - 2] == "=")) * 3 / 4 | 0), F = 0, q = 0; F < l; ) {
        var A = e[d.charCodeAt(F++)], C = e[d.charCodeAt(F++)], N = e[d.charCodeAt(F++)], G = e[d.charCodeAt(F++)];
        E[q++] = A << 2 | C >> 4, E[q++] = C << 4 | N >> 2, E[q++] = N << 6 | G;
      }
      return E;
    };
  })();
  function At(e) {
    return e * Math.PI / 180;
  }
  u(At, "be");
  h(At, "deg2rad");
  function te(e) {
    return e * 180 / Math.PI;
  }
  u(te, "Je");
  h(te, "rad2deg");
  function Ct(e, a, d) {
    return a > d ? Ct(e, d, a) : Math.min(Math.max(e, a), d);
  }
  u(Ct, "Me");
  h(Ct, "clamp");
  function Et(e, a, d) {
    if (typeof e == "number" && typeof a == "number")
      return e + (a - e) * d;
    if (e instanceof V && a instanceof V || e instanceof k && a instanceof k)
      return e.lerp(a, d);
    throw new Error(`Bad value for lerp(): ${e}, ${a}. Only number, Vec2 and Color is supported.`);
  }
  u(Et, "Se");
  h(Et, "lerp");
  function Ne(e, a, d, l, E) {
    return l + (e - a) / (d - a) * (E - l);
  }
  u(Ne, "Ct");
  h(Ne, "map");
  function ys(e, a, d, l, E) {
    return Ct(Ne(e, a, d, l, E), l, E);
  }
  u(ys, "Qn");
  h(ys, "mapc");
  var at = u(class {
    x = 0;
    y = 0;
    constructor(e = 0, a = e) {
      this.x = e, this.y = a;
    }
    static fromAngle(e) {
      let a = At(e);
      return new at(Math.cos(a), Math.sin(a));
    }
    clone() {
      return new at(this.x, this.y);
    }
    add(...e) {
      let a = y(...e);
      return new at(this.x + a.x, this.y + a.y);
    }
    sub(...e) {
      let a = y(...e);
      return new at(this.x - a.x, this.y - a.y);
    }
    scale(...e) {
      let a = y(...e);
      return new at(this.x * a.x, this.y * a.y);
    }
    dist(...e) {
      let a = y(...e);
      return this.sub(a).len();
    }
    sdist(...e) {
      let a = y(...e);
      return this.sub(a).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new at(0) : this.scale(1 / e);
    }
    normal() {
      return new at(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    angle(...e) {
      let a = y(...e);
      return te(Math.atan2(this.y - a.y, this.x - a.x));
    }
    angleBetween(...e) {
      let a = y(...e);
      return te(Math.atan2(this.cross(a), this.dot(a)));
    }
    lerp(e, a) {
      return new at(Et(this.x, e.x, a), Et(this.y, e.y, a));
    }
    slerp(e, a) {
      let d = this.dot(e), l = this.cross(e), E = Math.atan2(l, d);
      return this.scale(Math.sin((1 - a) * E)).add(e.scale(Math.sin(a * E))).scale(1 / l);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new at(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new _(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  }, "oe");
  var V = at;
  h(V, "Vec2"), ft(V, "LEFT", new at(-1, 0)), ft(V, "RIGHT", new at(1, 0)), ft(V, "UP", new at(0, -1)), ft(V, "DOWN", new at(0, 1));
  function y(...e) {
    if (e.length === 1) {
      if (e[0] instanceof V)
        return new V(e[0].x, e[0].y);
      if (Array.isArray(e[0]) && e[0].length === 2)
        return new V(...e[0]);
    }
    return new V(...e);
  }
  u(y, "U");
  h(y, "vec2");
  var $ = u(class {
    r = 255;
    g = 255;
    b = 255;
    constructor(e, a, d) {
      this.r = Ct(e, 0, 255), this.g = Ct(a, 0, 255), this.b = Ct(d, 0, 255);
    }
    static fromArray(e) {
      return new $(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number")
        return new $(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return new $(parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(e, a, d) {
      if (a == 0)
        return new $(255 * d, 255 * d, 255 * d);
      let l = h((N, G, D) => (D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? N + (G - N) * 6 * D : D < 1 / 2 ? G : D < 2 / 3 ? N + (G - N) * (2 / 3 - D) * 6 : N), "hue2rgb"), E = d < 0.5 ? d * (1 + a) : d + a - d * a, F = 2 * d - E, q = l(F, E, e + 1 / 3), A = l(F, E, e), C = l(F, E, e - 1 / 3);
      return new $(Math.round(q * 255), Math.round(A * 255), Math.round(C * 255));
    }
    clone() {
      return new $(this.r, this.g, this.b);
    }
    lighten(e) {
      return new $(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new $(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new $(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, a) {
      return new $(Et(this.r, e.r, a), Et(this.g, e.g, a), Et(this.b, e.b, a));
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
  }, "ee");
  var k = $;
  h(k, "Color"), ft(k, "RED", new $(255, 0, 0)), ft(k, "GREEN", new $(0, 255, 0)), ft(k, "BLUE", new $(0, 0, 255)), ft(k, "YELLOW", new $(255, 255, 0)), ft(k, "MAGENTA", new $(255, 0, 255)), ft(k, "CYAN", new $(0, 255, 255)), ft(k, "WHITE", new $(255, 255, 255)), ft(k, "BLACK", new $(0, 0, 0));
  function Y(...e) {
    if (e.length === 0)
      return new k(255, 255, 255);
    if (e.length === 1) {
      if (e[0] instanceof k)
        return e[0].clone();
      if (typeof e[0] == "string")
        return k.fromHex(e[0]);
      if (Array.isArray(e[0]) && e[0].length === 3)
        return k.fromArray(e[0]);
    }
    return new k(...e);
  }
  u(Y, "j");
  h(Y, "rgb");
  var fo = h((e, a, d) => k.fromHSL(e, a, d), "hsl2rgb");
  var W = u(class {
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, a, d, l) {
      this.x = e, this.y = a, this.w = d, this.h = l;
    }
    scale(e) {
      return new W(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new V(this.x, this.y);
    }
    clone() {
      return new W(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  }, "X");
  h(W, "Quad");
  function Z(e, a, d, l) {
    return new W(e, a, d, l);
  }
  u(Z, "te");
  h(Z, "quad");
  var tt = u(class {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new tt([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new tt([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = At(-e);
      let a = Math.cos(e), d = Math.sin(e);
      return new tt([1, 0, 0, 0, 0, a, -d, 0, 0, d, a, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = At(-e);
      let a = Math.cos(e), d = Math.sin(e);
      return new tt([a, 0, d, 0, 0, 1, 0, 0, -d, 0, a, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = At(-e);
      let a = Math.cos(e), d = Math.sin(e);
      return new tt([a, -d, 0, 0, d, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = At(-e);
      let a = Math.cos(e), d = Math.sin(e), l = this.m[0], E = this.m[1], F = this.m[4], q = this.m[5];
      return this.m[0] = l * a + E * d, this.m[1] = -l * d + E * a, this.m[4] = F * a + q * d, this.m[5] = -F * d + q * a, this;
    }
    mult(e) {
      let a = [];
      for (let d = 0; d < 4; d++)
        for (let l = 0; l < 4; l++)
          a[d * 4 + l] = this.m[0 * 4 + l] * e.m[d * 4 + 0] + this.m[1 * 4 + l] * e.m[d * 4 + 1] + this.m[2 * 4 + l] * e.m[d * 4 + 2] + this.m[3 * 4 + l] * e.m[d * 4 + 3];
      return new tt(a);
    }
    multVec2(e) {
      return new V(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new V(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], a = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new V(a, e / a);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], a = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new V(e / a, a);
      } else
        return new V(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return te(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return te(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new V(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new V(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else
        return new V(0, 0);
    }
    invert() {
      let e = [], a = this.m[10] * this.m[15] - this.m[14] * this.m[11], d = this.m[9] * this.m[15] - this.m[13] * this.m[11], l = this.m[9] * this.m[14] - this.m[13] * this.m[10], E = this.m[8] * this.m[15] - this.m[12] * this.m[11], F = this.m[8] * this.m[14] - this.m[12] * this.m[10], q = this.m[8] * this.m[13] - this.m[12] * this.m[9], A = this.m[6] * this.m[15] - this.m[14] * this.m[7], C = this.m[5] * this.m[15] - this.m[13] * this.m[7], N = this.m[5] * this.m[14] - this.m[13] * this.m[6], G = this.m[4] * this.m[15] - this.m[12] * this.m[7], D = this.m[4] * this.m[14] - this.m[12] * this.m[6], ht = this.m[5] * this.m[15] - this.m[13] * this.m[7], R = this.m[4] * this.m[13] - this.m[12] * this.m[5], g = this.m[6] * this.m[11] - this.m[10] * this.m[7], Ht = this.m[5] * this.m[11] - this.m[9] * this.m[7], pt = this.m[5] * this.m[10] - this.m[9] * this.m[6], ee = this.m[4] * this.m[11] - this.m[8] * this.m[7], Pt = this.m[4] * this.m[10] - this.m[8] * this.m[6], It = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * a - this.m[6] * d + this.m[7] * l, e[4] = -(this.m[4] * a - this.m[6] * E + this.m[7] * F), e[8] = this.m[4] * d - this.m[5] * E + this.m[7] * q, e[12] = -(this.m[4] * l - this.m[5] * F + this.m[6] * q), e[1] = -(this.m[1] * a - this.m[2] * d + this.m[3] * l), e[5] = this.m[0] * a - this.m[2] * E + this.m[3] * F, e[9] = -(this.m[0] * d - this.m[1] * E + this.m[3] * q), e[13] = this.m[0] * l - this.m[1] * F + this.m[2] * q, e[2] = this.m[1] * A - this.m[2] * C + this.m[3] * N, e[6] = -(this.m[0] * A - this.m[2] * G + this.m[3] * D), e[10] = this.m[0] * ht - this.m[1] * G + this.m[3] * R, e[14] = -(this.m[0] * N - this.m[1] * D + this.m[2] * R), e[3] = -(this.m[1] * g - this.m[2] * Ht + this.m[3] * pt), e[7] = this.m[0] * g - this.m[2] * ee + this.m[3] * Pt, e[11] = -(this.m[0] * Ht - this.m[1] * ee + this.m[3] * It), e[15] = this.m[0] * pt - this.m[1] * Pt + this.m[2] * It;
      let Ae = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let Kt = 0; Kt < 4; Kt++)
        for (let wt = 0; wt < 4; wt++)
          e[Kt * 4 + wt] *= 1 / Ae;
      return new tt(e);
    }
    clone() {
      return new tt([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  }, "Y");
  h(tt, "Mat4");
  function Ur(e, a, d, l = Math.sin) {
    return e + (l(d) + 1) / 2 * (a - e);
  }
  u(Ur, "Wt");
  h(Ur, "wave");
  var po = 1103515245;
  var go = 12345;
  var es = 2147483648;
  var Or = u(class {
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (po * this.seed + go) % es, this.seed / es;
    }
    genNumber(e, a) {
      return e + this.gen() * (a - e);
    }
    genVec2(e, a) {
      return new V(this.genNumber(e.x, a.x), this.genNumber(e.y, a.y));
    }
    genColor(e, a) {
      return new k(this.genNumber(e.r, a.r), this.genNumber(e.g, a.g), this.genNumber(e.b, a.b));
    }
    genAny(...e) {
      if (e.length === 0)
        return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number")
          return this.genNumber(0, e[0]);
        if (e[0] instanceof V)
          return this.genVec2(y(0, 0), e[0]);
        if (e[0] instanceof k)
          return this.genColor(Y(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number")
          return this.genNumber(e[0], e[1]);
        if (e[0] instanceof V && e[1] instanceof V)
          return this.genVec2(e[0], e[1]);
        if (e[0] instanceof k && e[1] instanceof k)
          return this.genColor(e[0], e[1]);
      }
    }
  }, "Ke");
  h(Or, "RNG");
  var kr = new Or(Date.now());
  function Es(e) {
    return e != null && (kr.seed = e), kr.seed;
  }
  u(Es, "er");
  h(Es, "randSeed");
  function me(...e) {
    return kr.genAny(...e);
  }
  u(me, "ut");
  h(me, "rand");
  function Lr(...e) {
    return Math.floor(me(...e));
  }
  u(Lr, "Qt");
  h(Lr, "randi");
  function xs(e) {
    return me() <= e;
  }
  u(xs, "tr");
  h(xs, "chance");
  function bs(e) {
    return e[Lr(e.length)];
  }
  u(bs, "nr");
  h(bs, "choose");
  function Ss(e, a) {
    return e.pos.x + e.width > a.pos.x && e.pos.x < a.pos.x + a.width && e.pos.y + e.height > a.pos.y && e.pos.y < a.pos.y + a.height;
  }
  u(Ss, "rr");
  h(Ss, "testRectRect");
  function Rs(e, a) {
    if (e.p1.x === e.p2.x && e.p1.y === e.p2.y || a.p1.x === a.p2.x && a.p1.y === a.p2.y)
      return null;
    let d = (a.p2.y - a.p1.y) * (e.p2.x - e.p1.x) - (a.p2.x - a.p1.x) * (e.p2.y - e.p1.y);
    if (d === 0)
      return null;
    let l = ((a.p2.x - a.p1.x) * (e.p1.y - a.p1.y) - (a.p2.y - a.p1.y) * (e.p1.x - a.p1.x)) / d, E = ((e.p2.x - e.p1.x) * (e.p1.y - a.p1.y) - (e.p2.y - e.p1.y) * (e.p1.x - a.p1.x)) / d;
    return l < 0 || l > 1 || E < 0 || E > 1 ? null : l;
  }
  u(Rs, "oo");
  h(Rs, "testLineLineT");
  function _t(e, a) {
    let d = Rs(e, a);
    return d ? y(e.p1.x + d * (e.p2.x - e.p1.x), e.p1.y + d * (e.p2.y - e.p1.y)) : null;
  }
  u(_t, "Xe");
  h(_t, "testLineLine");
  function Ms(e, a) {
    if ($t(e, a.p1) || $t(e, a.p2))
      return true;
    let d = e.points();
    return !!_t(a, new yt(d[0], d[1])) || !!_t(a, new yt(d[1], d[2])) || !!_t(a, new yt(d[2], d[3])) || !!_t(a, new yt(d[3], d[0]));
  }
  u(Ms, "ir");
  h(Ms, "testRectLine");
  function $t(e, a) {
    return a.x > e.pos.x && a.x < e.pos.x + e.width && a.y > e.pos.y && a.y < e.pos.y + e.height;
  }
  u($t, "We");
  h($t, "testRectPoint");
  function Bs(e, a) {
    let d = a.sub(e.p1), l = e.p2.sub(e.p1);
    if (Math.abs(d.cross(l)) > Number.EPSILON)
      return false;
    let E = d.dot(l) / l.dot(l);
    return E >= 0 && E <= 1;
  }
  u(Bs, "sr");
  h(Bs, "testLinePoint");
  function qr(e, a) {
    let d = e.p2.sub(e.p1), l = d.dot(d), E = e.p1.sub(a.center), F = 2 * d.dot(E), q = E.dot(E) - a.radius * a.radius, A = F * F - 4 * l * q;
    if (l <= Number.EPSILON || A < 0)
      return false;
    if (A == 0) {
      let C = -F / (2 * l);
      if (C >= 0 && C <= 1)
        return true;
    } else {
      let C = (-F + Math.sqrt(A)) / (2 * l), N = (-F - Math.sqrt(A)) / (2 * l);
      if (C >= 0 && C <= 1 || N >= 0 && N <= 1)
        return true;
    }
    return qe(a, e.p1);
  }
  u(qr, "Zt");
  h(qr, "testLineCircle");
  function qe(e, a) {
    return e.center.sdist(a) < e.radius * e.radius;
  }
  u(qe, "St");
  h(qe, "testCirclePoint");
  function Ts(e, a) {
    let d = a.pts[a.pts.length - 1];
    for (let l of a.pts) {
      if (qr(new yt(d, l), e))
        return true;
      d = l;
    }
    return qe(e, a.pts[0]) ? true : Gr(a, e.center);
  }
  u(Ts, "or");
  h(Ts, "testCirclePolygon");
  function Gr(e, a) {
    let d = false, l = e.pts;
    for (let E = 0, F = l.length - 1; E < l.length; F = E++)
      l[E].y > a.y != l[F].y > a.y && a.x < (l[F].x - l[E].x) * (a.y - l[E].y) / (l[F].y - l[E].y) + l[E].x && (d = !d);
    return d;
  }
  u(Gr, "en");
  h(Gr, "testPolygonPoint");
  var yt = u(class {
    p1;
    p2;
    constructor(e, a) {
      this.p1 = e.clone(), this.p2 = a.clone();
    }
    transform(e) {
      return new yt(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return _.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new yt(this.p1, this.p2);
    }
  }, "de");
  h(yt, "Line");
  var _ = u(class {
    pos;
    width;
    height;
    constructor(e, a, d) {
      this.pos = e.clone(), this.width = a, this.height = d;
    }
    static fromPoints(e, a) {
      return new _(e.clone(), a.x - e.x, a.y - e.y);
    }
    center() {
      return new V(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new Yt(this.points().map((a) => e.multVec2(a)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new _(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let a = this.pos, d = this.pos.add(this.width, this.height), l = Math.max(a.x - e.x, 0, e.x - d.x), E = Math.max(a.y - e.y, 0, e.y - d.y);
      return l * l + E * E;
    }
  }, "K");
  h(_, "Rect");
  var ge = u(class {
    center;
    radius;
    constructor(e, a) {
      this.center = e.clone(), this.radius = a;
    }
    transform(e) {
      return new Oe(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return _.fromPoints(this.center.sub(y(this.radius)), this.center.add(y(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new ge(this.center, this.radius);
    }
  }, "Te");
  h(ge, "Circle");
  var Oe = u(class {
    center;
    radiusX;
    radiusY;
    constructor(e, a, d) {
      this.center = e.clone(), this.radiusX = a, this.radiusY = d;
    }
    transform(e) {
      return new Oe(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
    }
    bbox() {
      return _.fromPoints(this.center.sub(y(this.radiusX, this.radiusY)), this.center.add(y(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new Oe(this.center, this.radiusX, this.radiusY);
    }
  }, "Ie");
  h(Oe, "Ellipse");
  var Yt = u(class {
    pts;
    constructor(e) {
      if (e.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new Yt(this.pts.map((a) => e.multVec2(a)));
    }
    bbox() {
      let e = y(Number.MAX_VALUE), a = y(-Number.MAX_VALUE);
      for (let d of this.pts)
        e.x = Math.min(e.x, d.x), a.x = Math.max(a.x, d.x), e.y = Math.min(e.y, d.y), a.y = Math.max(a.y, d.y);
      return _.fromPoints(e, a);
    }
    area() {
      let e = 0, a = this.pts.length;
      for (let d = 0; d < a; d++) {
        let l = this.pts[d], E = this.pts[(d + 1) % a];
        e += l.x * E.y * 0.5, e -= E.x * l.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new Yt(this.pts.map((e) => e.clone()));
    }
  }, "ge");
  h(Yt, "Polygon");
  function Fs(e, a) {
    let d = Number.MAX_VALUE, l = y(0);
    for (let E of [e, a])
      for (let F = 0; F < E.pts.length; F++) {
        let q = E.pts[F], A = E.pts[(F + 1) % E.pts.length].sub(q).normal().unit(), C = Number.MAX_VALUE, N = -Number.MAX_VALUE;
        for (let R = 0; R < e.pts.length; R++) {
          let g = e.pts[R].dot(A);
          C = Math.min(C, g), N = Math.max(N, g);
        }
        let G = Number.MAX_VALUE, D = -Number.MAX_VALUE;
        for (let R = 0; R < a.pts.length; R++) {
          let g = a.pts[R].dot(A);
          G = Math.min(G, g), D = Math.max(D, g);
        }
        let ht = Math.min(N, D) - Math.max(C, G);
        if (ht < 0)
          return null;
        if (ht < Math.abs(d)) {
          let R = D - C, g = G - N;
          d = Math.abs(R) < Math.abs(g) ? R : g, l = A.scale(d);
        }
      }
    return l;
  }
  u(Fs, "ar");
  h(Fs, "sat");
  var Fe = 2.5949095;
  var rs = 1.70158 + 1;
  var ns = 2 * Math.PI / 3;
  var is = 2 * Math.PI / 4.5;
  var Ue = { linear: (e) => e, easeInSine: (e) => 1 - Math.cos(e * Math.PI / 2), easeOutSine: (e) => Math.sin(e * Math.PI / 2), easeInOutSine: (e) => -(Math.cos(Math.PI * e) - 1) / 2, easeInQuad: (e) => e * e, easeOutQuad: (e) => 1 - (1 - e) * (1 - e), easeInOutQuad: (e) => e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, easeInCubic: (e) => e * e * e, easeOutCubic: (e) => 1 - Math.pow(1 - e, 3), easeInOutCubic: (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, easeInQuart: (e) => e * e * e * e, easeOutQuart: (e) => 1 - Math.pow(1 - e, 4), easeInOutQuart: (e) => e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2, easeInQuint: (e) => e * e * e * e * e, easeOutQuint: (e) => 1 - Math.pow(1 - e, 5), easeInOutQuint: (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 - Math.pow(-2 * e + 2, 5) / 2, easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * e - 10), easeOutExpo: (e) => e === 1 ? 1 : 1 - Math.pow(2, -10 * e), easeInOutExpo: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2, easeInCirc: (e) => 1 - Math.sqrt(1 - Math.pow(e, 2)), easeOutCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)), easeInOutCirc: (e) => e < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2, easeInBack: (e) => rs * e * e * e - 1.70158 * e * e, easeOutBack: (e) => 1 + rs * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2), easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((Fe + 1) * 2 * e - Fe) / 2 : (Math.pow(2 * e - 2, 2) * ((Fe + 1) * (e * 2 - 2) + Fe) + 2) / 2, easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * ns), easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * ns) + 1, easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * is)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * is) / 2 + 1, easeInBounce: (e) => 1 - Ue.easeOutBounce(1 - e), easeOutBounce: (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, easeInOutBounce: (e) => e < 0.5 ? (1 - Ue.easeOutBounce(1 - 2 * e)) / 2 : (1 + Ue.easeOutBounce(2 * e - 1)) / 2 };
  var Ce = Ue;
  var Le = u(class extends Map {
    lastID;
    constructor(...e) {
      super(...e), this.lastID = 0;
    }
    push(e) {
      let a = this.lastID;
      return this.set(a, e), this.lastID++, a;
    }
    pushd(e) {
      let a = this.push(e);
      return () => this.delete(a);
    }
  }, "je");
  h(Le, "IDList");
  var Ft = u(class {
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let a = new Ft(() => e.forEach((d) => d.cancel()));
      return Object.defineProperty(a, "paused", { get: () => e[0].paused, set: (d) => e.forEach((l) => l.paused = d) }), a.paused = false, a;
    }
  }, "pe");
  h(Ft, "EventController");
  var ct = u(class {
    handlers = new Le();
    add(e) {
      let a = this.handlers.pushd((...l) => {
        d.paused || e(...l);
      }), d = new Ft(a);
      return d;
    }
    addOnce(e) {
      let a = this.add((...d) => {
        a.cancel(), e(...d);
      });
      return a;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((a) => a(...e));
    }
    numListeners() {
      return this.handlers.size;
    }
  }, "ae");
  h(ct, "Event");
  var qt = u(class {
    handlers = {};
    on(e, a) {
      return this.handlers[e] || (this.handlers[e] = new ct()), this.handlers[e].add(a);
    }
    onOnce(e, a) {
      let d = this.on(e, (...l) => {
        d.cancel(), a(...l);
      });
      return d;
    }
    next(e) {
      return new Promise((a) => {
        this.onOnce(e, (...d) => a(d[0]));
      });
    }
    trigger(e, ...a) {
      this.handlers[e] && this.handlers[e].trigger(...a);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  }, "ye");
  h(qt, "EventHandler");
  function Yr(e, a) {
    let d = typeof e, l = typeof a;
    if (d !== l)
      return false;
    if (d === "object" && l === "object" && e !== null && a !== null) {
      let E = Object.keys(e), F = Object.keys(a);
      if (E.length !== F.length)
        return false;
      for (let q of E) {
        let A = e[q], C = a[q];
        if (!(typeof A == "function" && typeof C == "function") && !Yr(A, C))
          return false;
      }
      return true;
    }
    return e === a;
  }
  u(Yr, "tn");
  h(Yr, "deepEq");
  function Cs(e) {
    let a = window.atob(e), d = a.length, l = new Uint8Array(d);
    for (let E = 0; E < d; E++)
      l[E] = a.charCodeAt(E);
    return l.buffer;
  }
  u(Cs, "ao");
  h(Cs, "base64ToArrayBuffer");
  function Ps(e) {
    return Cs(e.split(",")[1]);
  }
  u(Ps, "hr");
  h(Ps, "dataURLToArrayBuffer");
  function Ge(e, a) {
    let d = document.createElement("a");
    d.href = a, d.download = e, d.click();
  }
  u(Ge, "Ot");
  h(Ge, "download");
  function Hr(e, a) {
    Ge(e, "data:text/plain;charset=utf-8," + a);
  }
  u(Hr, "nn");
  h(Hr, "downloadText");
  function Is(e, a) {
    Hr(e, JSON.stringify(a));
  }
  u(Is, "dr");
  h(Is, "downloadJSON");
  function Dr(e, a) {
    let d = URL.createObjectURL(a);
    Ge(e, d), URL.revokeObjectURL(d);
  }
  u(Dr, "rn");
  h(Dr, "downloadBlob");
  var ss = h((e) => e.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var mo = h((e) => e.split(".").pop(), "getExt");
  var Ao = (() => {
    let e = 0;
    return () => e++;
  })();
  var Us = u(class {
    _items;
    _compareFn;
    constructor(e = (a, d) => a < d) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let e = this._items[0], a = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = a, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let a = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[a]) && this._items[e] >= this._items[a])
          break;
        this.swap(e, a), e = a;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let a = 2 * e + 1;
        if (a < this._items.length - 1 && !this._compareFn(this._items[a], this._items[a + 1]) && ++a, this._compareFn(this._items[e], this._items[a]))
          break;
        this.swap(e, a), e = a;
      }
    }
    swap(e, a) {
      [this._items[e], this._items[a]] = [this._items[a], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  }, "lt");
  h(Us, "BinaryHeap");
  var ks = u(class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((a, d) => a + d) / this.dts.length)), this.dts = []);
    }
  }, "Qe");
  h(ks, "FPSCounter");
  var ke = u(class {
    time;
    action;
    finished = false;
    paused = false;
    constructor(e, a) {
      this.time = e, this.action = a;
    }
    tick(e) {
      return this.finished || this.paused ? false : (this.time -= e, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
    }
    reset(e) {
      this.time = e, this.finished = false;
    }
  }, "De");
  h(ke, "Timer");
  var os = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "select", 10: "lstick", 16: "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "start", 10: "lstick", 16: "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var wo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Vo = {};
  uo(Vo, { default: () => Ds });
  var Ds = co("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var vo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABdRJREFUeJzt3d3N3TYMgGG16ADdoAhyl7UyV9bqXRB0g2zQXgRGDcOWSIoUaX3vAwQBknMk/4gWLcnHrQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDEb9kb8FH99eeXf6Wf/efn35ynDyj1pEsb6G6NUxOYZ7sdB/QtPdnWRnn29gbKMYDUspPs0SgPb22cHANo/JG9AZF6wWBp3JLgeir36bvff3x9LOvzp2/dbSFA97bk5I4a9VMD7TXOUcP0uJ+d6emu5d6V1QvMs5nj8FZPx37X/b2TFpzShtnafeP0DipJMFnLnN3/w1OQ7tZgP+pA4VVKcHo0TG36KNULKGt5XsHZmi1APS5WM2Vqg0i7vbsG6YcIznN9vRTxXHavgdxtv6Tc3vc1pAHqdaG6ipwKYprpf1sFp6aH0gRTrxxLubPB2avHu+c/l3mICvqnsr//+Cq+qGrK1Xw/wzbBaRkNvSv3yew9cq+cu89L6nu6F/cMzCgzF1ftANlbe+Otp1IkDVxyVfbo6Z481f3507dhvXfbrk3HpdtjKTNqKuio8678c7mzF6ns6arfMyrVNoA75wMfNU2hKSeCx3Fq7dc+SPfDc39H9Vqn2CT//4bsYeT1PecOJyGSJdh6PZOlbElPZz2PHtlD1cUeS4LT4z5IOihwfNaD5ERm9qxH/dZ7Vmt9M999CtCZbdLUP/p3r2zFQ0paG8lr4Eb6+ZWBcSeq/qhyK6bXUfXOSgtO7/tOb9eT1NveqKttpYbiyXu/euV51JV16/T6e86zyF5TUp731V5Sp+Z7M71h9QvFNWWuvr0Sy4LzLfNvrel6zRX1e+hN2VzrnNlfaYD0xhCs++851lDh3vNV95xe6YvHgb8bwbNcuc+f09wbaUj2dzYgjz93//5kh94t0quCM8OKK6glKKuM0EYHfhUZWd8WwenZa0rLsp6s2YY66o0k9WUvS4NManBaGuo1eDIHgUZ1ePdkntsfFaCz5VZJdStsxyt7ziMNXHEAK5yk1mqmhrMPf1fcp57Vqe3SqZTMEduZhqAZyaywFne0DVHngHTZ11bznE88l/1lBZ9meP8851plWkBCO7drmQvWnL/sY/fKtFaqN3iy6iofsQxNktJnTMgfPXJUz3w3VaP5vOQ7Iyszvy2DczSi+aYFET2jINUEqFcAS4+rV480WlwRWXe07dLa0YGvfl9kmbTvPZJ1TXGvn4t4yuRp+2aMgk27wkm63DIztU3vOVfueC8wK4zKWtK0M+nvJXmOdlt65MgFFCva06qsKz044SvjIiN5TjLaaHxhtNyyouXBGZ1WSn66Ivt+M7pRZAWoZsDq+t2emeM1am/WtHxFG9runrO1/n1CxLK7CilxJM/H4bwuTJJBvWtgvm0gcNu01uvpd8la1soLE7xkpYDea4Ot6W3GOSzRc3o/qHw2M9qmXWA+uw+jbd0hyO9Yz0+vJ9QGcO/8ZV2YUqYVPN8dImXp3aJ/w1XTGGYfKZN+P7IXiXqO1uINLzFOm/Pz+BV4C03PNEqpZl//ELXP1ro8nhLyKLPHMyAiXyvh4cMFZ2uyAJXc62gzgJl1nhrSLMEzcLx+5qQnIhgqv6qhTHC2Zmus1tUuowCVDkRU6j0jgiJqhLPSSq2q7wMtMSBkdbcQWjNCq2nMlRrTnajAPP/t+c5Sj3K8VNueQ+pGzaa2MyOb2sZseW2dpL6ZnjMzfeQFt/Fe3XP2WIfGvRY6a569jCJ9TaIlcCS9KQE5p1TP2VrMbwLNDlZEvpE5AkGxh9f2nLO/QOetytIwAnMf6SfS2ns+jaZ6B4i2sWvSvF0HWOAj/aRGNFAaPXbw2rS2Rzr0T/ChshKNM3qd4135BCaqK9VAKy+lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4DBC0k0jFtF9wAAAAASUVORK5CYII=";
  var yo = "data:image/png;base64,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";
  var Eo = "3000.0.0-beta.2";
  var as = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
  var xo = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]);
  var hs = ["left", "middle", "right", "back", "forward"];
  var ls = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var Pe = "topleft";
  var us = 64;
  var bo = "monospace";
  var Ie = "monospace";
  var So = 36;
  var ds = 64;
  var cs = 256;
  var fs = 2048;
  var ps = 2048;
  var gs = 2048;
  var ms = 2048;
  var As = 0.1;
  var Ro = 64;
  var ws = "nearest";
  var Mo = 1;
  var Ns = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var De = Ns.reduce((e, a) => e + a.size, 0);
  var Os = 2048;
  var Vs = Os * 4 * De;
  var vs = Os * 6;
  var Bo = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var To = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var Pr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var Ir = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var Fo = /* @__PURE__ */ new Set(["id", "require"]);
  var Co = /* @__PURE__ */ new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function Ls(e) {
    e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
  }
  u(Ls, "So");
  h(Ls, "enterFullscreen");
  function qs() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
  }
  u(qs, "To");
  h(qs, "exitFullscreen");
  function Gs() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }
  u(Gs, "Ao");
  h(Gs, "getFullscreenElement");
  function Gt(e) {
    switch (e) {
      case "topleft":
        return new V(-1, -1);
      case "top":
        return new V(0, -1);
      case "topright":
        return new V(1, -1);
      case "left":
        return new V(-1, 0);
      case "center":
        return new V(0, 0);
      case "right":
        return new V(1, 0);
      case "botleft":
        return new V(-1, 1);
      case "bot":
        return new V(0, 1);
      case "botright":
        return new V(1, 1);
      default:
        return e;
    }
  }
  u(Gt, "Ze");
  h(Gt, "anchorPt");
  function Ys(e) {
    switch (e) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  u(Ys, "Oo");
  h(Ys, "alignPt");
  function Hs(e) {
    return e.createBuffer(1, 1, 44100);
  }
  u(Hs, "Ro");
  h(Hs, "createEmptyAudioBuffer");
  var Tt = u(class {
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  }, "Ue");
  h(Tt, "ButtonState");
  var Ks = h((e = {}) => {
    let a = [], d = (() => {
      let t = e.root ?? document.body;
      t === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
      let r = e.canvas ?? (() => {
        let O = document.createElement("canvas");
        return t.appendChild(O), O;
      })(), n = e.scale ?? 1, s = e.width && e.height && !e.stretch && !e.letterbox;
      s ? (r.width = e.width * n, r.height = e.height * n) : (r.width = r.parentElement.offsetWidth, r.height = r.parentElement.offsetHeight);
      let o = r.width, i = r.height, c = e.pixelDensity || window.devicePixelRatio;
      r.width *= c, r.height *= c;
      let p = ["outline: none", "cursor: default"];
      s ? (p.push(`width: ${o}px`), p.push(`height: ${i}px`)) : (p.push("width: 100%"), p.push("height: 100%")), e.crisp && (p.push("image-rendering: pixelated"), p.push("image-rendering: crisp-edges")), r.style.cssText = p.join(";"), r.tabIndex = 0;
      let f = document.createElement("canvas");
      f.width = cs, f.height = cs;
      let m2 = f.getContext("2d", { willReadFrequently: true }), v = r.offsetWidth, B = r.offsetHeight;
      return new ResizeObserver((O) => {
        for (let P of O)
          if (P.target === r) {
            if (v === r.offsetWidth && B === r.offsetHeight)
              return;
            v = r.offsetWidth, B = r.offsetHeight, r.width = v * c, r.height = B * c, A.frameBuffer.free(), A.frameBuffer = new q(l.drawingBufferWidth, l.drawingBufferHeight), ar(), g.ev.onOnce("frameEnd", () => {
              g.ev.trigger("resize");
            });
          }
      }).observe(r), { canvas: r, pixelDensity: c, fontCacheCanvas: f, fontCacheCtx: m2, keyState: new Tt(), mouseState: new Tt(), virtualButtonState: new Tt(), gamepadButtonState: new Tt(), charInputted: [], isMouseMoved: false, mouseStarted: false, mousePos: new V(0, 0), mouseDeltaPos: new V(0, 0), time: 0, realTime: 0, skipTime: false, dt: 0, numFrames: 0, isTouchScreen: "ontouchstart" in window || navigator.maxTouchPoints > 0, loopID: null, stopped: false, paused: false, fpsCounter: new ks() };
    })(), l = d.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    class E {
      src = null;
      glTex;
      width;
      height;
      constructor(r, n, s = {}) {
        this.glTex = l.createTexture(), a.push(() => this.free()), this.bind(), r && n && l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, r, n, 0, l.RGBA, l.UNSIGNED_BYTE, null), this.width = r, this.height = n;
        let o = (() => {
          switch (s.filter ?? e.texFilter) {
            case "linear":
              return l.LINEAR;
            case "nearest":
              return l.NEAREST;
            default:
              return l.NEAREST;
          }
        })(), i = (() => {
          switch (s.wrap) {
            case "repeat":
              return l.REPEAT;
            case "clampToEdge":
              return l.CLAMP_TO_EDGE;
            default:
              return l.CLAMP_TO_EDGE;
          }
        })();
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, o), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, o), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, i), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, i), this.unbind();
      }
      static fromImage(r, n = {}) {
        let s = new E(0, 0, n);
        return s.bind(), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, l.RGBA, l.UNSIGNED_BYTE, r), s.width = r.width, s.height = r.height, s.unbind(), s.src = r, s;
      }
      update(r, n = 0, s = 0) {
        this.bind(), l.texSubImage2D(l.TEXTURE_2D, 0, n, s, l.RGBA, l.UNSIGNED_BYTE, r), this.unbind();
      }
      bind() {
        l.bindTexture(l.TEXTURE_2D, this.glTex);
      }
      unbind() {
        l.bindTexture(l.TEXTURE_2D, null);
      }
      free() {
        l.deleteTexture(this.glTex);
      }
    }
    u(E, "y"), h(E, "Texture");
    class F {
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(r, n) {
        this.canvas = document.createElement("canvas"), this.canvas.width = r, this.canvas.height = n, this.tex = E.fromImage(this.canvas), this.ctx = this.canvas.getContext("2d");
      }
      add(r) {
        if (r.width > this.canvas.width || r.height > this.canvas.height)
          throw new Error(`Texture size (${r.width} x ${r.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
        this.x + r.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + r.height > this.canvas.height && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = E.fromImage(this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
        let n = new V(this.x, this.y);
        return this.x += r.width, r.height > this.curHeight && (this.curHeight = r.height), r instanceof ImageData ? this.ctx.putImageData(r, n.x, n.y) : this.ctx.drawImage(r, n.x, n.y), this.tex.update(this.canvas), [this.tex, new W(n.x / this.canvas.width, n.y / this.canvas.height, r.width / this.canvas.width, r.height / this.canvas.height)];
      }
    }
    u(F, "A"), h(F, "TexPacker");
    class q {
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(r, n, s = {}) {
        this.tex = new E(r, n, s), this.glFrameBuffer = l.createFramebuffer(), this.glRenderBuffer = l.createRenderbuffer(), a.push(() => this.free()), this.bind(), l.renderbufferStorage(l.RENDERBUFFER, l.DEPTH_STENCIL, r, n), l.framebufferTexture2D(l.FRAMEBUFFER, l.COLOR_ATTACHMENT0, l.TEXTURE_2D, this.tex.glTex, 0), l.framebufferRenderbuffer(l.FRAMEBUFFER, l.DEPTH_STENCIL_ATTACHMENT, l.RENDERBUFFER, this.glRenderBuffer), this.unbind();
      }
      bind() {
        l.bindFramebuffer(l.FRAMEBUFFER, this.glFrameBuffer), l.bindRenderbuffer(l.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        l.bindFramebuffer(l.FRAMEBUFFER, null), l.bindRenderbuffer(l.RENDERBUFFER, null);
      }
      free() {
        l.deleteFramebuffer(this.glFrameBuffer), l.deleteRenderbuffer(this.glRenderBuffer);
      }
    }
    u(q, "N"), h(q, "FrameBuffer");
    let A = (() => {
      let t = we(Pr, Ir), r = E.fromImage(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), n = new q(l.drawingBufferWidth, l.drawingBufferHeight), s = null, o = 1;
      e.background && (s = k.fromArray(e.background), o = e.background[3] ?? 1, l.clearColor(s.r / 255, s.g / 255, s.b / 255, o)), l.enable(l.BLEND), l.enable(l.SCISSOR_TEST), l.blendFuncSeparate(l.SRC_ALPHA, l.ONE_MINUS_SRC_ALPHA, l.ONE, l.ONE_MINUS_SRC_ALPHA);
      let i = l.createBuffer();
      l.bindBuffer(l.ARRAY_BUFFER, i), l.bufferData(l.ARRAY_BUFFER, Vs * 4, l.DYNAMIC_DRAW), Ns.reduce((f, m2, v) => (l.vertexAttribPointer(v, m2.size, l.FLOAT, false, De * 4, f), l.enableVertexAttribArray(v), f + m2.size * 4), 0), l.bindBuffer(l.ARRAY_BUFFER, null);
      let c = l.createBuffer();
      l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, c), l.bufferData(l.ELEMENT_ARRAY_BUFFER, vs * 4, l.DYNAMIC_DRAW), l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null);
      let p = E.fromImage(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { drawCalls: 0, lastDrawCalls: 0, defShader: t, curShader: t, frameBuffer: n, postShader: null, postShaderUniform: null, defTex: r, curTex: r, curUniform: {}, vbuf: i, ibuf: c, vqueue: [], iqueue: [], transform: new tt(), transformStack: [], bgTex: p, bgColor: s, bgAlpha: o, width: e.width, height: e.height, viewport: { x: 0, y: 0, width: l.drawingBufferWidth, height: l.drawingBufferHeight } };
    })();
    class C {
      tex;
      frames = [new W(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(r, n, s = {}, o = null) {
        this.tex = r, n && (this.frames = n), this.anims = s, this.slice9 = o;
      }
      static from(r, n = {}) {
        return typeof r == "string" ? C.fromURL(r, n) : Promise.resolve(C.fromImage(r, n));
      }
      static fromImage(r, n = {}) {
        let [s, o] = R.packer.add(r), i = n.frames ? n.frames.map((c) => new W(o.x + c.x * o.w, o.y + c.y * o.h, c.w * o.w, c.h * o.h)) : Ye(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
        return new C(s, i, n.anims, n.slice9);
      }
      static fromURL(r, n = {}) {
        return wt(r).then((s) => C.fromImage(s, n));
      }
    }
    u(C, "B"), h(C, "SpriteData");
    class N {
      buf;
      constructor(r) {
        this.buf = r;
      }
      static fromArrayBuffer(r) {
        return new Promise((n, s) => G.ctx.decodeAudioData(r, n, s)).then((n) => new N(n));
      }
      static fromURL(r) {
        return ss(r) ? N.fromArrayBuffer(Ps(r)) : Kt(r).then((n) => N.fromArrayBuffer(n));
      }
    }
    u(N, "_"), h(N, "SoundData");
    let G = (() => {
      let t = new (window.AudioContext || window.webkitAudioContext)(), r = t.createGain();
      r.connect(t.destination);
      let n = new N(Hs(t));
      return t.decodeAudioData(Ds.buffer.slice(0)).then((s) => {
        n.buf = s;
      }).catch((s) => {
        console.error("Failed to load burp: ", s);
      }), { ctx: t, masterNode: r, burpSnd: n };
    })();
    class D {
      loaded = false;
      data = null;
      error = null;
      onLoadEvents = new ct();
      onErrorEvents = new ct();
      onFinishEvents = new ct();
      constructor(r) {
        r.then((n) => {
          this.data = n, this.onLoadEvents.trigger(n);
        }).catch((n) => {
          if (this.error = n, this.onErrorEvents.numListeners() > 0)
            this.onErrorEvents.trigger(n);
          else
            throw n;
        }).finally(() => {
          this.onFinishEvents.trigger(), this.loaded = true;
        });
      }
      static loaded(r) {
        let n = new D(Promise.resolve(r));
        return n.data = r, n.loaded = true, n;
      }
      onLoad(r) {
        return this.onLoadEvents.add(r), this;
      }
      onError(r) {
        return this.onErrorEvents.add(r), this;
      }
      onFinish(r) {
        return this.onFinishEvents.add(r), this;
      }
      then(r) {
        return this.onLoad(r);
      }
      catch(r) {
        return this.onError(r);
      }
      finally(r) {
        return this.onFinish(r);
      }
    }
    u(D, "k"), h(D, "Asset");
    class ht {
      assets = /* @__PURE__ */ new Map();
      lastUID = 0;
      add(r, n) {
        let s = r ?? this.lastUID++ + "", o = new D(n);
        return this.assets.set(s, o), o;
      }
      addLoaded(r, n) {
        let s = r ?? this.lastUID++ + "", o = D.loaded(n);
        return this.assets.set(s, o), o;
      }
      get(r) {
        return this.assets.get(r);
      }
      progress() {
        if (this.assets.size === 0)
          return 1;
        let r = 0;
        return this.assets.forEach((n) => {
          n.loaded && r++;
        }), r / this.assets.size;
      }
    }
    u(ht, "$"), h(ht, "AssetBucket");
    let R = { urlPrefix: "", sprites: new ht(), fonts: new ht(), bitmapFonts: new ht(), sounds: new ht(), shaders: new ht(), custom: new ht(), packer: new F(gs, ms), loaded: false }, g = { ev: new qt(), objEvents: new qt(), root: fr([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new V(1), angle: 0, shake: 0, transform: new tt() } };
    function Ht(t) {
      return R.custom.add(null, t);
    }
    u(Ht, "ie"), h(Ht, "load");
    function pt() {
      let t = [R.sprites, R.sounds, R.shaders, R.fonts, R.bitmapFonts, R.custom];
      return t.reduce((r, n) => r + n.progress(), 0) / t.length;
    }
    u(pt, "we"), h(pt, "loadProgress");
    function ee(t) {
      return t !== void 0 && (R.urlPrefix = t), R.urlPrefix;
    }
    u(ee, "ht"), h(ee, "loadRoot");
    function Pt(t) {
      let r = R.urlPrefix + t;
      return fetch(r).then((n) => {
        if (!n.ok)
          throw new Error(`Failed to fetch ${r}`);
        return n;
      });
    }
    u(Pt, "Ne"), h(Pt, "fetchURL");
    function It(t) {
      return Pt(t).then((r) => r.json());
    }
    u(It, "_e"), h(It, "fetchJSON");
    function Ae(t) {
      return Pt(t).then((r) => r.text());
    }
    u(Ae, "dt"), h(Ae, "fetchText");
    function Kt(t) {
      return Pt(t).then((r) => r.arrayBuffer());
    }
    u(Kt, "Dt"), h(Kt, "fetchArrayBuffer");
    function wt(t) {
      let r = new Image();
      return r.crossOrigin = "anonymous", r.src = ss(t) ? t : R.urlPrefix + t, new Promise((n, s) => {
        r.onload = () => n(r), r.onerror = () => s(new Error(`Failed to load image from "${t}"`));
      });
    }
    u(wt, "Ae"), h(wt, "loadImg");
    class jt {
      fontface;
      outline;
      filter;
      constructor(r, n = {}) {
        this.fontface = r, this.outline = n.outline ?? 0, this.filter = n.filter ?? ws;
      }
    }
    u(jt, "xe"), h(jt, "FontData");
    function Kr(t, r, n = {}) {
      let s = new FontFace(t, typeof r == "string" ? `url(${r})` : r);
      return document.fonts.add(s), R.fonts.add(t, s.load().catch((o) => {
        throw new Error(`Failed to load font from "${r}": ${o}`);
      }).then((o) => new jt(o, n)));
    }
    u(Kr, "Fr"), h(Kr, "loadFont");
    function jr(t, r, n, s, o = {}) {
      return R.bitmapFonts.add(t, wt(r).then((i) => en(E.fromImage(i, o), n, s, o.chars ?? ls)));
    }
    u(jr, "Lr"), h(jr, "loadBitmapFont");
    function Ye(t = 1, r = 1, n = 0, s = 0, o = 1, i = 1) {
      let c = [], p = o / t, f = i / r;
      for (let m2 = 0; m2 < r; m2++)
        for (let v = 0; v < t; v++)
          c.push(new W(n + v * p, s + m2 * f, p, f));
      return c;
    }
    u(Ye, "ln"), h(Ye, "slice");
    function He(t, r) {
      return Ht(typeof r == "string" ? new Promise((n, s) => {
        It(r).then((o) => {
          He(t, o).then(n).catch(s);
        });
      }) : C.from(t).then((n) => {
        let s = {};
        for (let o in r) {
          let i = r[o], c = n.frames[0], p = gs * c.w, f = ms * c.h, m2 = i.frames ? i.frames.map((B) => new W(c.x + (i.x + B.x) / p * c.w, c.y + (i.y + B.y) / f * c.h, B.w / p * c.w, B.h / f * c.h)) : Ye(i.sliceX || 1, i.sliceY || 1, c.x + i.x / p * c.w, c.y + i.y / f * c.h, i.width / p * c.w, i.height / f * c.h), v = new C(n.tex, m2, i.anims);
          R.sprites.addLoaded(o, v), s[o] = v;
        }
        return s;
      }));
    }
    u(He, "hn"), h(He, "loadSpriteAtlas");
    function Ke(t, r = {}) {
      let n = document.createElement("canvas"), s = t[0].width, o = t[0].height;
      n.width = s * t.length, n.height = o;
      let i = n.getContext("2d");
      t.forEach((p, f) => {
        p instanceof ImageData ? i.putImageData(p, f * s, 0) : i.drawImage(p, f * s, 0);
      });
      let c = i.getImageData(0, 0, t.length * s, o);
      return C.fromImage(c, { ...r, sliceX: t.length, sliceY: 1 });
    }
    u(Ke, "dn"), h(Ke, "createSpriteSheet");
    function Qt(t, r, n = { sliceX: 1, sliceY: 1, anims: {} }) {
      return Array.isArray(r) ? r.some((s) => typeof s == "string") ? R.sprites.add(t, Promise.all(r.map((s) => typeof s == "string" ? wt(s) : Promise.resolve(s))).then((s) => Ke(s, n))) : R.sprites.addLoaded(t, Ke(r, n)) : typeof r == "string" ? R.sprites.add(t, C.from(r, n)) : R.sprites.addLoaded(t, C.fromImage(r, n));
    }
    u(Qt, "et"), h(Qt, "loadSprite");
    function Qr(t, r) {
      return R.sprites.add(t, new Promise(async (n) => {
        let s = typeof r == "string" ? await It(r) : r, o = await Promise.all(s.frames.map(wt)), i = document.createElement("canvas");
        i.width = s.width, i.height = s.height * s.frames.length;
        let c = i.getContext("2d");
        o.forEach((f, m2) => {
          c.drawImage(f, 0, m2 * s.height);
        });
        let p = await Qt(null, i, { sliceY: s.frames.length, anims: s.anims });
        n(p);
      }));
    }
    u(Qr, "Gr"), h(Qr, "loadPedit");
    function zr(t, r, n) {
      typeof r == "string" && !n && (n = r.replace(new RegExp(`${mo(r)}$`), "json"));
      let s = typeof n == "string" ? It(n) : Promise.resolve(n);
      return R.sprites.add(t, s.then((o) => {
        let i = o.meta.size, c = o.frames.map((f) => new W(f.frame.x / i.w, f.frame.y / i.h, f.frame.w / i.w, f.frame.h / i.h)), p = {};
        for (let f of o.meta.frameTags)
          f.from === f.to ? p[f.name] = f.from : p[f.name] = { from: f.from, to: f.to, speed: 10, loop: true, pingpong: f.direction === "pingpong" };
        return C.from(r, { frames: c, anims: p });
      }));
    }
    u(zr, "Vr"), h(zr, "loadAseprite");
    function Jr(t, r, n) {
      return R.shaders.addLoaded(t, we(r, n));
    }
    u(Jr, "Ir"), h(Jr, "loadShader");
    function Xr(t, r, n) {
      let s = h((i) => i ? Ae(i) : Promise.resolve(null), "resolveUrl"), o = Promise.all([s(r), s(n)]).then(([i, c]) => we(i, c));
      return R.shaders.add(t, o);
    }
    u(Xr, "jr"), h(Xr, "loadShaderURL");
    function Zr(t, r) {
      return R.sounds.add(t, typeof r == "string" ? N.fromURL(r) : N.fromArrayBuffer(r));
    }
    u(Zr, "Nr"), h(Zr, "loadSound");
    function Wr(t = "bean") {
      return Qt(t, wo);
    }
    u(Wr, "_r"), h(Wr, "loadBean");
    function je(t) {
      return R.sprites.get(t);
    }
    u(je, "fn"), h(je, "getSprite");
    function Qe(t) {
      return R.sounds.get(t);
    }
    u(Qe, "mn"), h(Qe, "getSound");
    function ze(t) {
      return R.fonts.get(t);
    }
    u(ze, "pn"), h(ze, "getFont");
    function Je(t) {
      return R.bitmapFonts.get(t);
    }
    u(Je, "gn"), h(Je, "getBitmapFont");
    function Xe(t) {
      return R.shaders.get(t);
    }
    u(Xe, "wn"), h(Xe, "getShader");
    function Ze(t) {
      if (typeof t == "string") {
        let r = je(t);
        if (r)
          return r;
        if (pt() < 1)
          return null;
        throw new Error(`Sprite not found: ${t}`);
      } else {
        if (t instanceof C)
          return D.loaded(t);
        if (t instanceof D)
          return t;
        throw new Error(`Invalid sprite: ${t}`);
      }
    }
    u(Ze, "vn"), h(Ze, "resolveSprite");
    function _r(t) {
      if (typeof t == "string") {
        let r = Qe(t);
        if (r)
          return r.data ?? r;
        if (pt() < 1)
          return null;
        throw new Error(`Sound not found: ${t}`);
      } else {
        if (t instanceof N)
          return t;
        if (t instanceof D)
          return t.data ? t.data : t;
        throw new Error(`Invalid sound: ${t}`);
      }
    }
    u(_r, "kr"), h(_r, "resolveSound");
    function $r(t) {
      if (!t)
        return A.defShader;
      if (typeof t == "string") {
        let r = Xe(t);
        if (r)
          return r.data ?? r;
        if (pt() < 1)
          return null;
        throw new Error(`Shader not found: ${t}`);
      } else if (t instanceof D)
        return t.data ? t.data : t;
      return t;
    }
    u($r, "Hr"), h($r, "resolveShader");
    function We(t) {
      if (!t)
        return We(e.font ?? bo);
      if (typeof t == "string") {
        let r = Je(t), n = ze(t);
        if (r)
          return r.data ?? r;
        if (n)
          return n.data ?? n;
        if (document.fonts.check(`${ds}px ${t}`))
          return t;
        if (pt() < 1)
          return null;
        throw new Error(`Font not found: ${t}`);
      } else if (t instanceof D)
        return t.data ? t.data : t;
      return t;
    }
    u(We, "bn"), h(We, "resolveFont");
    function tn(t) {
      return t !== void 0 && (G.masterNode.gain.value = t), G.masterNode.gain.value;
    }
    u(tn, "qr"), h(tn, "volume");
    function _e(t, r = {}) {
      let n = _r(t), s = G.ctx, o = r.paused ?? false, i = s.createBufferSource(), c = new ct(), p = s.createGain(), f = r.seek ?? 0, m2 = 0, v = 0, B = false;
      i.loop = Boolean(r.loop), i.detune.value = r.detune ?? 0, i.playbackRate.value = r.speed ?? 1, i.connect(p), i.onended = () => {
        P() >= i.buffer?.duration && c.trigger();
      }, p.connect(G.masterNode), p.gain.value = r.volume ?? 1;
      let O = h((S) => {
        i.buffer = S.buf, o || (m2 = s.currentTime, i.start(0, f), B = true);
      }, "start");
      n instanceof D ? n.onLoad(O) : n instanceof N && O(n);
      let P = h(() => {
        if (!i.buffer)
          return 0;
        let S = o ? v - m2 : s.currentTime - m2, I = i.buffer.duration;
        return i.loop ? S % I : Math.min(S, I);
      }, "getTime"), K = h((S) => {
        let I = s.createBufferSource();
        return I.buffer = S.buffer, I.loop = S.loop, I.playbackRate.value = S.playbackRate.value, I.detune.value = S.detune.value, I.onended = S.onended, I.connect(p), I;
      }, "cloneNode");
      return { set paused(S) {
        if (o !== S)
          if (o = S, S)
            B && (i.stop(), B = false), v = s.currentTime;
          else {
            i = K(i);
            let I = v - m2;
            i.start(0, I), B = true, m2 = s.currentTime - I, v = 0;
          }
      }, get paused() {
        return o;
      }, play(S = 0) {
        this.seek(S), this.paused = false;
      }, seek(S) {
        i.buffer?.duration && (S > i.buffer.duration || (o ? (i = K(i), m2 = v - S) : (i.stop(), i = K(i), m2 = s.currentTime - S, i.start(0, S), B = true, v = 0)));
      }, set speed(S) {
        i.playbackRate.value = S;
      }, get speed() {
        return i.playbackRate.value;
      }, set detune(S) {
        i.detune.value = S;
      }, get detune() {
        return i.detune.value;
      }, set volume(S) {
        p.gain.value = S;
      }, get volume() {
        return p.gain.value;
      }, set loop(S) {
        i.loop = S;
      }, get loop() {
        return i.loop;
      }, duration() {
        return i.buffer?.duration ?? 0;
      }, time() {
        return P() % this.duration();
      }, onEnd(S) {
        return c.add(S);
      }, then(S) {
        return this.onEnd(S);
      } };
    }
    u(_e, "yn"), h(_e, "play");
    function $e(t) {
      return _e(G.burpSnd, t);
    }
    u($e, "Un"), h($e, "burp");
    function we(t = Pr, r = Ir) {
      let n = Bo.replace("{{user}}", t ?? Pr), s = To.replace("{{user}}", r ?? Ir), o = l.createShader(l.VERTEX_SHADER), i = l.createShader(l.FRAGMENT_SHADER);
      l.shaderSource(o, n), l.shaderSource(i, s), l.compileShader(o), l.compileShader(i);
      let c = l.createProgram();
      if (a.push(() => l.deleteProgram(c)), l.attachShader(c, o), l.attachShader(c, i), l.bindAttribLocation(c, 0, "a_pos"), l.bindAttribLocation(c, 1, "a_uv"), l.bindAttribLocation(c, 2, "a_color"), l.linkProgram(c), !l.getProgramParameter(c, l.LINK_STATUS)) {
        let p = h((B) => {
          let O = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/, P = B.match(O);
          return { line: Number(P.groups.line), msg: P.groups.msg.replace(/\n\0$/, "") };
        }, "formatShaderError"), f = l.getShaderInfoLog(o), m2 = l.getShaderInfoLog(i), v = "";
        if (f) {
          let B = p(f);
          v += `Vertex shader line ${B.line - 14}: ${B.msg}`;
        }
        if (m2) {
          let B = p(m2);
          v += `Fragment shader line ${B.line - 14}: ${B.msg}`;
        }
        throw new Error(v);
      }
      return l.deleteShader(o), l.deleteShader(i), { bind() {
        l.useProgram(c);
      }, unbind() {
        l.useProgram(null);
      }, free() {
        l.deleteProgram(c);
      }, send(p) {
        for (let f in p) {
          let m2 = p[f], v = l.getUniformLocation(c, f);
          typeof m2 == "number" ? l.uniform1f(v, m2) : m2 instanceof tt ? l.uniformMatrix4fv(v, false, new Float32Array(m2.m)) : m2 instanceof k ? l.uniform3f(v, m2.r, m2.g, m2.b) : m2 instanceof V && l.uniform2f(v, m2.x, m2.y);
        }
      } };
    }
    u(we, "Bt"), h(we, "makeShader");
    function en(t, r, n, s) {
      let o = t.width / r, i = {}, c = s.split("").entries();
      for (let [p, f] of c)
        i[f] = new W(p % o * r, Math.floor(p / o) * n, r, n);
      return { tex: t, map: i, size: n };
    }
    u(en, "$r"), h(en, "makeFont");
    function Ve(t, r, n, s = A.defTex, o = A.defShader, i = {}) {
      let c = $r(o);
      if (!c || c instanceof D)
        return;
      (s !== A.curTex || c !== A.curShader || !Yr(A.curUniform, i) || A.vqueue.length + t.length * De > Vs || A.iqueue.length + r.length > vs) && mt();
      let p = n ? A.transform : g.cam.transform.mult(A.transform);
      for (let f of t) {
        let m2 = on(p.multVec2(f.pos));
        A.vqueue.push(m2.x, m2.y, f.uv.x, f.uv.y, f.color.r / 255, f.color.g / 255, f.color.b / 255, f.opacity);
      }
      for (let f of r)
        A.iqueue.push(f + A.vqueue.length / De - t.length);
      A.curTex = s, A.curShader = c, A.curUniform = i;
    }
    u(Ve, "Ft"), h(Ve, "drawRaw");
    function mt() {
      !A.curTex || !A.curShader || A.vqueue.length === 0 || A.iqueue.length === 0 || (l.bindBuffer(l.ARRAY_BUFFER, A.vbuf), l.bufferSubData(l.ARRAY_BUFFER, 0, new Float32Array(A.vqueue)), l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, A.ibuf), l.bufferSubData(l.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(A.iqueue)), A.curShader.bind(), A.curShader.send(A.curUniform), A.curTex.bind(), l.drawElements(l.TRIANGLES, A.iqueue.length, l.UNSIGNED_SHORT, 0), A.curTex.unbind(), A.curShader.unbind(), l.bindBuffer(l.ARRAY_BUFFER, null), l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null), A.vqueue.length = 0, A.iqueue.length = 0, A.drawCalls++);
    }
    u(mt, "Ee"), h(mt, "flush");
    function rn() {
      l.clear(l.COLOR_BUFFER_BIT), A.frameBuffer.bind(), l.clear(l.COLOR_BUFFER_BIT), A.bgColor || gt(() => {
        Dt({ width: et(), height: J(), quad: new W(0, 0, et() / us, J() / us), tex: A.bgTex, fixed: true });
      }), A.drawCalls = 0, A.transformStack.length = 0, A.transform = new tt();
    }
    u(rn, "zr"), h(rn, "frameStart");
    function nn(t, r) {
      A.postShader = t, A.postShaderUniform = r ?? null;
    }
    u(nn, "Yr"), h(nn, "usePostEffect");
    function sn() {
      mt(), A.frameBuffer.unbind(), gt(() => {
        re({ flipY: true, tex: A.frameBuffer.tex, scale: new V(1 / d.pixelDensity), shader: A.postShader, uniform: typeof A.postShaderUniform == "function" ? A.postShaderUniform() : A.postShaderUniform, fixed: true });
      }), mt(), A.lastDrawCalls = A.drawCalls;
    }
    u(sn, "Xr"), h(sn, "frameEnd");
    function on(t) {
      return new V(t.x / et() * 2 - 1, -t.y / J() * 2 + 1);
    }
    u(on, "Kr"), h(on, "screen2ndc");
    function an(t) {
      A.transform = t.clone();
    }
    u(an, "Jr"), h(an, "pushMatrix");
    function z(...t) {
      if (t[0] === void 0)
        return;
      let r = y(...t);
      r.x === 0 && r.y === 0 || A.transform.translate(r);
    }
    u(z, "W"), h(z, "pushTranslate");
    function Ut(...t) {
      if (t[0] === void 0)
        return;
      let r = y(...t);
      r.x === 1 && r.y === 1 || A.transform.scale(r);
    }
    u(Ut, "ke"), h(Ut, "pushScale");
    function kt(t) {
      t && A.transform.rotate(t);
    }
    u(kt, "He"), h(kt, "pushRotate");
    function lt() {
      A.transformStack.push(A.transform.clone());
    }
    u(lt, "fe"), h(lt, "pushTransform");
    function st() {
      A.transformStack.length > 0 && (A.transform = A.transformStack.pop());
    }
    u(st, "ue"), h(st, "popTransform");
    function Dt(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0)
        return;
      let r = t.width, n = t.height, s = Gt(t.anchor || Pe).scale(new V(r, n).scale(-0.5)), o = t.quad || new W(0, 0, 1, 1), i = t.color || Y(255, 255, 255), c = t.opacity ?? 1, p = t.tex ? As / t.tex.width : 0, f = t.tex ? As / t.tex.height : 0, m2 = o.x + p, v = o.y + f, B = o.w - p * 2, O = o.h - f * 2;
      lt(), z(t.pos), kt(t.angle), Ut(t.scale), z(s), Ve([{ pos: new V(-r / 2, n / 2), uv: new V(t.flipX ? m2 + B : m2, t.flipY ? v : v + O), color: i, opacity: c }, { pos: new V(-r / 2, -n / 2), uv: new V(t.flipX ? m2 + B : m2, t.flipY ? v + O : v), color: i, opacity: c }, { pos: new V(r / 2, -n / 2), uv: new V(t.flipX ? m2 : m2 + B, t.flipY ? v + O : v), color: i, opacity: c }, { pos: new V(r / 2, n / 2), uv: new V(t.flipX ? m2 : m2 + B, t.flipY ? v : v + O), color: i, opacity: c }], [0, 1, 3, 1, 2, 3], t.fixed, t.tex, t.shader, t.uniform), st();
    }
    u(Dt, "qe"), h(Dt, "drawUVQuad");
    function re(t) {
      if (!t.tex)
        throw new Error('drawTexture() requires property "tex".');
      let r = t.quad ?? new W(0, 0, 1, 1), n = t.tex.width * r.w, s = t.tex.height * r.h, o = new V(1);
      if (t.tiled) {
        let i = Math.ceil((t.width || n) / n), c = Math.ceil((t.height || s) / s), p = Gt(t.anchor || Pe).add(new V(1, 1)).scale(0.5).scale(i * n, c * s);
        for (let f = 0; f < i; f++)
          for (let m2 = 0; m2 < c; m2++)
            Dt(Object.assign(t, { pos: (t.pos || new V(0)).add(new V(n * f, s * m2)).sub(p), scale: o.scale(t.scale || new V(1)), tex: t.tex, quad: r, width: n, height: s, anchor: "topleft" }));
      } else
        t.width && t.height ? (o.x = t.width / n, o.y = t.height / s) : t.width ? (o.x = t.width / n, o.y = o.x) : t.height && (o.y = t.height / s, o.x = o.y), Dt(Object.assign(t, { scale: o.scale(t.scale || new V(1)), tex: t.tex, quad: r, width: n, height: s }));
    }
    u(re, "ft"), h(re, "drawTexture");
    function hn(t) {
      if (!t.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let r = Ze(t.sprite);
      if (!r || !r.data)
        return;
      let n = r.data.frames[t.frame ?? 0];
      if (!n)
        throw new Error(`Frame not found: ${t.frame ?? 0}`);
      re(Object.assign(t, { tex: r.data.tex, quad: n.scale(t.quad ?? new W(0, 0, 1, 1)) }));
    }
    u(hn, "Wr"), h(hn, "drawSprite");
    function zt(t, r, n, s, o, i = 1) {
      s = At(s % 360), o = At(o % 360), o <= s && (o += Math.PI * 2);
      let c = [], p = Math.ceil((o - s) / At(8) * i), f = (o - s) / p;
      for (let m2 = s; m2 < o; m2 += f)
        c.push(t.add(r * Math.cos(m2), n * Math.sin(m2)));
      return c.push(t.add(r * Math.cos(o), n * Math.sin(o))), c;
    }
    u(zt, "tt"), h(zt, "getArcPts");
    function ot(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0)
        return;
      let r = t.width, n = t.height, s = Gt(t.anchor || Pe).add(1, 1).scale(new V(r, n).scale(-0.5)), o = [new V(0, 0), new V(r, 0), new V(r, n), new V(0, n)];
      if (t.radius) {
        let i = Math.min(Math.min(r, n) / 2, t.radius);
        o = [new V(i, 0), new V(r - i, 0), ...zt(new V(r - i, i), i, i, 270, 360), new V(r, i), new V(r, n - i), ...zt(new V(r - i, n - i), i, i, 0, 90), new V(r - i, n), new V(i, n), ...zt(new V(i, n - i), i, i, 90, 180), new V(0, n - i), new V(0, i), ...zt(new V(i, i), i, i, 180, 270)];
      }
      bt(Object.assign(t, { offset: s, pts: o, ...t.gradient ? { colors: t.horizontal ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]] : [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]] } : {} }));
    }
    u(ot, "ce"), h(ot, "drawRect");
    function Jt(t) {
      let { p1: r, p2: n } = t;
      if (!r || !n)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let s = t.width || 1, o = n.sub(r).unit().normal().scale(s * 0.5), i = [r.sub(o), r.add(o), n.add(o), n.sub(o)].map((c) => ({ pos: new V(c.x, c.y), uv: new V(0), color: t.color ?? k.WHITE, opacity: t.opacity ?? 1 }));
      Ve(i, [0, 1, 3, 1, 2, 3], t.fixed, A.defTex, t.shader, t.uniform);
    }
    u(Jt, "nt"), h(Jt, "drawLine");
    function tr(t) {
      let r = t.pts;
      if (!r)
        throw new Error('drawLines() requires property "pts".');
      if (!(r.length < 2))
        if (t.radius && r.length >= 3) {
          let n = r[0].sdist(r[1]);
          for (let o = 1; o < r.length - 1; o++)
            n = Math.min(r[o].sdist(r[o + 1]), n);
          let s = Math.min(t.radius, Math.sqrt(n) / 2);
          Jt(Object.assign(t, { p1: r[0], p2: r[1] }));
          for (let o = 1; o < r.length - 2; o++) {
            let i = r[o], c = r[o + 1];
            Jt(Object.assign(t, { p1: i, p2: c }));
          }
          Jt(Object.assign(t, { p1: r[r.length - 2], p2: r[r.length - 1] }));
        } else
          for (let n = 0; n < r.length - 1; n++)
            Jt(Object.assign(t, { p1: r[n], p2: r[n + 1] })), t.join !== "none" && xt(Object.assign(t, { pos: r[n], radius: t.width / 2 }));
    }
    u(tr, "xn"), h(tr, "drawLines");
    function er(t) {
      if (!t.p1 || !t.p2 || !t.p3)
        throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
      return bt(Object.assign(t, { pts: [t.p1, t.p2, t.p3] }));
    }
    u(er, "En"), h(er, "drawTriangle");
    function xt(t) {
      if (!t.radius)
        throw new Error('drawCircle() requires property "radius".');
      t.radius !== 0 && rr(Object.assign(t, { radiusX: t.radius, radiusY: t.radius, angle: 0 }));
    }
    u(xt, "Be"), h(xt, "drawCircle");
    function rr(t) {
      if (t.radiusX === void 0 || t.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (t.radiusX === 0 || t.radiusY === 0)
        return;
      let r = t.start ?? 0, n = t.end ?? 360, s = Gt(t.anchor ?? "center").scale(new V(-t.radiusX, -t.radiusY)), o = zt(s, t.radiusX, t.radiusY, r, n, t.resolution);
      o.unshift(s);
      let i = Object.assign(t, { pts: o, radius: 0, ...t.gradient ? { colors: [t.gradient[0], ...Array(o.length - 1).fill(t.gradient[1])] } : {} });
      if (n - r >= 360 && t.outline) {
        t.fill !== false && bt(Object.assign(i, { outline: null })), bt(Object.assign(i, { pts: o.slice(1), fill: false }));
        return;
      }
      bt(i);
    }
    u(rr, "Cn"), h(rr, "drawEllipse");
    function bt(t) {
      if (!t.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let r = t.pts.length;
      if (!(r < 3)) {
        if (lt(), z(t.pos), Ut(t.scale), kt(t.angle), z(t.offset), t.fill !== false) {
          let n = t.color ?? k.WHITE, s = t.pts.map((i, c) => ({ pos: new V(i.x, i.y), uv: new V(0, 0), color: t.colors ? t.colors[c] ?? n : n, opacity: t.opacity ?? 1 })), o = [...Array(r - 2).keys()].map((i) => [0, i + 1, i + 2]).flat();
          Ve(s, t.indices ?? o, t.fixed, A.defTex, t.shader, t.uniform);
        }
        t.outline && tr({ pts: [...t.pts, t.pts[0]], radius: t.radius, width: t.outline.width, color: t.outline.color, join: t.outline.join, uniform: t.uniform, fixed: t.fixed, opacity: t.opacity }), st();
      }
    }
    u(bt, "Fe"), h(bt, "drawPolygon");
    function nr(t, r, n) {
      mt(), l.clear(l.STENCIL_BUFFER_BIT), l.enable(l.STENCIL_TEST), l.stencilFunc(l.NEVER, 1, 255), l.stencilOp(l.REPLACE, l.REPLACE, l.REPLACE), r(), mt(), l.stencilFunc(n, 1, 255), l.stencilOp(l.KEEP, l.KEEP, l.KEEP), t(), mt(), l.disable(l.STENCIL_TEST);
    }
    u(nr, "Sn"), h(nr, "drawStenciled");
    function ln(t, r) {
      nr(t, r, l.EQUAL);
    }
    u(ln, "Qr"), h(ln, "drawMasked");
    function un(t, r) {
      nr(t, r, l.NOTEQUAL);
    }
    u(un, "Zr"), h(un, "drawSubtracted");
    function ir() {
      return (A.viewport.width + A.viewport.height) / (A.width + A.height);
    }
    u(ir, "Tn"), h(ir, "getViewportScale");
    function gt(t) {
      mt();
      let r = A.width, n = A.height;
      A.width = A.viewport.width, A.height = A.viewport.height, t(), mt(), A.width = r, A.height = n;
    }
    u(gt, "ve"), h(gt, "drawUnscaled");
    function sr(t, r) {
      r.pos && (t.pos = t.pos.add(r.pos)), r.scale && (t.scale = t.scale.scale(y(r.scale))), r.angle && (t.angle += r.angle), r.color && (t.color = t.color.mult(r.color)), r.opacity && (t.opacity *= r.opacity);
    }
    u(sr, "An"), h(sr, "applyCharTransform");
    let dn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function cn(t) {
      let r = {}, n = t.replace(dn, "$2"), s = 0;
      for (let o of t.matchAll(dn)) {
        let i = o.index - s;
        for (let c = 0; c < o.groups.text.length; c++)
          r[c + i] = [o.groups.style];
        s += o[0].length - o.groups.text.length;
      }
      return { charStyleMap: r, text: n };
    }
    u(cn, "ei"), h(cn, "compileStyledText");
    let or = {};
    function St(t) {
      if (t.text === void 0)
        throw new Error('formatText() requires property "text".');
      let r = We(t.font);
      if (t.text === "" || r instanceof D || !r)
        return { width: 0, height: 0, chars: [], opt: t };
      let { charStyleMap: n, text: s } = cn(t.text + ""), o = s.split("");
      if (r instanceof jt || typeof r == "string") {
        let U = r instanceof jt ? r.fontface.family : r, j = r instanceof jt ? { outline: r.outline, filter: r.filter } : { outline: 0, filter: ws }, T = or[U] ?? { font: { tex: new E(fs, ps, { filter: j.filter }), map: {}, size: ds }, cursor: new V(0), outline: j.outline };
        or[U] || (or[U] = T), r = T.font;
        for (let dt of o)
          if (!T.font.map[dt]) {
            let w = d.fontCacheCtx;
            w.clearRect(0, 0, d.fontCacheCanvas.width, d.fontCacheCanvas.height), w.font = `${r.size}px ${U}`, w.textBaseline = "top", w.textAlign = "left", w.fillStyle = "#ffffff";
            let b = w.measureText(dt), x = Math.ceil(b.width), M = r.size;
            T.outline && (w.lineJoin = "round", w.lineWidth = T.outline * 2, w.strokeStyle = "#000000", w.strokeText(dt, T.outline, T.outline), x += T.outline * 2, M += T.outline * 3), w.fillText(dt, T.outline, T.outline);
            let L = w.getImageData(0, 0, x, M);
            if (T.cursor.x + x > fs && (T.cursor.x = 0, T.cursor.y += M, T.cursor.y > ps))
              throw new Error("Font atlas exceeds character limit");
            r.tex.update(L, T.cursor.x, T.cursor.y), r.map[dt] = new W(T.cursor.x, T.cursor.y, x, M), T.cursor.x += x;
          }
      }
      let i = t.size || r.size, c = y(t.scale ?? 1).scale(i / r.size), p = t.lineSpacing ?? 0, f = t.letterSpacing ?? 0, m2 = 0, v = 0, B = 0, O = [], P = [], K = 0, S = null, I = null;
      for (; K < o.length; ) {
        let U = o[K];
        if (U === `
`)
          B += i + p, O.push({ width: m2 - f, chars: P }), S = null, I = null, m2 = 0, P = [];
        else {
          let j = r.map[U];
          if (j) {
            let T = j.w * c.x;
            t.width && m2 + T > t.width && (B += i + p, S != null && (K -= P.length - S, U = o[K], j = r.map[U], T = j.w * c.x, P = P.slice(0, S - 1), m2 = I), S = null, I = null, O.push({ width: m2 - f, chars: P }), m2 = 0, P = []), P.push({ tex: r.tex, width: j.w, height: j.h, quad: new W(j.x / r.tex.width, j.y / r.tex.height, j.w / r.tex.width, j.h / r.tex.height), ch: U, pos: new V(m2, B), opacity: t.opacity ?? 1, color: t.color ?? k.WHITE, scale: y(c), angle: 0 }), U === " " && (S = P.length, I = m2), m2 += T, v = Math.max(v, m2), m2 += f;
          }
        }
        K++;
      }
      O.push({ width: m2 - f, chars: P }), B += i, t.width && (v = t.width);
      let it = [];
      for (let U of O) {
        let j = (v - U.width) * Ys(t.align ?? "left");
        for (let T of U.chars) {
          let dt = r.map[T.ch], w = it.length;
          if (T.pos = T.pos.add(j, 0).add(dt.w * c.x * 0.5, dt.h * c.y * 0.5), t.transform) {
            let b = typeof t.transform == "function" ? t.transform(w, T.ch) : t.transform;
            b && sr(T, b);
          }
          if (n[w]) {
            let b = n[w];
            for (let x of b) {
              let M = t.styles[x], L = typeof M == "function" ? M(w, T.ch) : M;
              L && sr(T, L);
            }
          }
          it.push(T);
        }
      }
      return { width: v, height: B, chars: it, opt: t };
    }
    u(St, "Le"), h(St, "formatText");
    function ne(t) {
      Rt(St(t));
    }
    u(ne, "mt"), h(ne, "drawText");
    function Rt(t) {
      lt(), z(t.opt.pos), kt(t.opt.angle), z(Gt(t.opt.anchor ?? "topleft").add(1, 1).scale(t.width, t.height).scale(-0.5)), t.chars.forEach((r) => {
        Dt({ tex: r.tex, width: r.width, height: r.height, pos: r.pos, scale: r.scale, angle: r.angle, color: r.color, opacity: r.opacity, quad: r.quad, anchor: "center", uniform: t.opt.uniform, shader: t.opt.shader, fixed: t.opt.fixed });
      }), st();
    }
    u(Rt, "Ge"), h(Rt, "drawFormattedText");
    function ar() {
      let t = d.pixelDensity, r = l.drawingBufferWidth / t, n = l.drawingBufferHeight / t;
      if (ur()) {
        let o = window.innerWidth, i = window.innerHeight, c = o / i, p = r / n;
        if (c > p) {
          let f = window.innerHeight * p;
          A.viewport = { x: (o - f) / 2, y: 0, width: f, height: i };
        } else {
          let f = window.innerWidth / p;
          A.viewport = { x: 0, y: (i - f) / 2, width: o, height: f };
        }
        return;
      }
      if (e.letterbox) {
        if (!e.width || !e.height)
          throw new Error("Letterboxing requires width and height defined.");
        let o = r / n, i = e.width / e.height;
        if (o > i) {
          e.stretch || (A.width = n * i, A.height = n);
          let c = n * i, p = n, f = (r - c) / 2;
          l.scissor(f * t, 0, c * t, p * t), l.viewport(f * t, 0, c * t, n * t), A.viewport = { x: f, y: 0, width: c, height: n };
        } else {
          e.stretch || (A.width = r, A.height = r / i);
          let c = r, p = r / i, f = (n - p) / 2;
          l.scissor(0, f * t, c * t, p * t), l.viewport(0, f * t, r * t, p * t), A.viewport = { x: 0, y: f, width: r, height: p };
        }
        return;
      }
      if (e.stretch) {
        if (!e.width || !e.height)
          throw new Error("Stretching requires width and height defined.");
        l.viewport(0, 0, r * t, n * t), A.viewport = { x: 0, y: 0, width: r, height: n };
        return;
      }
      let s = e.scale ?? 1;
      A.width = r / s, A.height = n / s, l.viewport(0, 0, r * t, n * t), A.viewport = { x: 0, y: 0, width: r, height: n };
    }
    u(ar, "Rn"), h(ar, "updateViewport");
    function et() {
      return A.width;
    }
    u(et, "ne"), h(et, "width");
    function J() {
      return A.height;
    }
    u(J, "Q"), h(J, "height");
    let nt = {}, ie = {}, Mt = {};
    function Xt(t) {
      return new V((t.x - A.viewport.x) * et() / A.viewport.width, (t.y - A.viewport.y) * J() / A.viewport.height);
    }
    u(Xt, "it"), h(Xt, "windowToContent");
    function fn(t) {
      return new V(t.x * A.viewport.width / A.width, t.y * A.viewport.height / A.height);
    }
    u(fn, "ti"), h(fn, "contentToView");
    function ve(t, r) {
      let n = Xt(new V(t, r));
      d.mousePos = n, d.mouseStarted = true, d.isMouseMoved = true;
    }
    u(ve, "Gt"), h(ve, "setMousePos"), nt.mousemove = (t) => {
      let [r, n] = [t.offsetX, t.offsetY], [s, o] = [t.movementX, t.movementY];
      g.ev.onOnce("input", () => {
        ve(r, n), d.mouseDeltaPos = y(s, o), g.ev.trigger("mouseMove");
      });
    }, nt.mousedown = (t) => {
      g.ev.onOnce("input", () => {
        let r = hs[t.button];
        r && d.mouseState.press(r), g.ev.trigger("mousePress", r);
      });
    }, nt.mouseup = (t) => {
      g.ev.onOnce("input", () => {
        let r = hs[t.button];
        r && d.mouseState.release(r), g.ev.trigger("mouseRelease", r);
      });
    }, nt.keydown = (t) => {
      xo.has(t.key) && t.preventDefault(), g.ev.onOnce("input", () => {
        let r = as[t.key] || t.key.toLowerCase();
        r.length === 1 ? (g.ev.trigger("charInput", r), d.charInputted.push(r)) : r === "space" && (g.ev.trigger("charInput", " "), d.charInputted.push(" ")), t.repeat ? (d.keyState.pressRepeat(r), g.ev.trigger("keyPressRepeat", r)) : (d.keyState.press(r), g.ev.trigger("keyPressRepeat", r), g.ev.trigger("keyPress", r));
      });
    }, nt.keyup = (t) => {
      g.ev.onOnce("input", () => {
        let r = as[t.key] || t.key.toLowerCase();
        d.keyState.release(r), g.ev.trigger("keyRelease", r);
      });
    }, nt.touchstart = (t) => {
      t.preventDefault(), g.ev.onOnce("input", () => {
        let r = [...t.changedTouches];
        r.forEach((n) => {
          g.ev.trigger("touchStart", Xt(new V(n.clientX, n.clientY)), n);
        }), e.touchToMouse !== false && (ve(r[0].clientX, r[0].clientY), d.mouseState.press("left"), g.ev.trigger("mousePress", "left"));
      });
    }, nt.touchmove = (t) => {
      t.preventDefault(), g.ev.onOnce("input", () => {
        let r = [...t.changedTouches];
        r.forEach((n) => {
          g.ev.trigger("touchMove", Xt(new V(n.clientX, n.clientY)), n);
        }), e.touchToMouse !== false && (g.ev.trigger("mouseMove"), ve(r[0].clientX, r[0].clientY));
      });
    }, nt.touchend = (t) => {
      g.ev.onOnce("input", () => {
        [...t.changedTouches].forEach((r) => {
          g.ev.trigger("touchEnd", Xt(new V(r.clientX, r.clientY)), r);
        }), e.touchToMouse !== false && (d.mouseState.release("left"), g.ev.trigger("mouseRelease", "left"));
      });
    }, nt.touchcancel = (t) => {
      g.ev.onOnce("input", () => {
        [...t.changedTouches].forEach((r) => {
          g.ev.trigger("touchEnd", Xt(new V(r.clientX, r.clientY)), r);
        }), e.touchToMouse !== false && (d.mouseState.release("left"), g.ev.trigger("mouseRelease", "left"));
      });
    }, nt.wheel = (t) => {
      t.preventDefault(), g.ev.onOnce("input", () => {
        g.ev.trigger("scroll", new V(t.deltaX, t.deltaY));
      });
    }, nt.contextmenu = (t) => t.preventDefault(), ie.visibilitychange = () => {
      switch (document.visibilityState) {
        case "visible":
          d.skipTime = true, Q.paused || G.ctx.resume();
          break;
        case "hidden":
          d.keyState = new Tt(), d.mouseState = new Tt(), d.virtualButtonState = new Tt(), e.backgroundAudio || G.ctx.suspend();
          break;
      }
    }, Mt.error = (t) => {
      t.error ? Me(t.error) : Me(new Error(t.message));
    }, Mt.gamepadconnected = (t) => {
      g.ev.onOnce("input", () => {
        g.ev.trigger("gamepadConnect", t.gamepad);
      });
    }, Mt.gamepaddisconnected = (t) => {
      g.ev.onOnce("input", () => {
        g.ev.trigger("gamepadDisconnect", t.gamepad);
      });
    }, Mt.unhandledrejection = (t) => Me(t.reason);
    for (let t in nt)
      d.canvas.addEventListener(t, nt[t]);
    for (let t in ie)
      document.addEventListener(t, ie[t]);
    for (let t in Mt)
      window.addEventListener(t, Mt[t]);
    function Nt() {
      return d.mousePos.clone();
    }
    u(Nt, "$e"), h(Nt, "mousePos");
    function hr() {
      return d.mouseDeltaPos.clone();
    }
    u(hr, "Pn"), h(hr, "mouseDeltaPos");
    function se(t = "left") {
      return d.mouseState.pressed.has(t);
    }
    u(se, "pt"), h(se, "isMousePressed");
    function pn(t = "left") {
      return d.mouseState.down.has(t);
    }
    u(pn, "ni"), h(pn, "isMouseDown");
    function ye(t = "left") {
      return d.mouseState.released.has(t);
    }
    u(ye, "Vt"), h(ye, "isMouseReleased");
    function gn() {
      return d.isMouseMoved;
    }
    u(gn, "ri"), h(gn, "isMouseMoved");
    function mn(t) {
      return t === void 0 ? d.keyState.pressed.size > 0 : d.keyState.pressed.has(t);
    }
    u(mn, "ii"), h(mn, "isKeyPressed");
    function An(t) {
      return t === void 0 ? d.keyState.pressedRepeat.size > 0 : d.keyState.pressedRepeat.has(t);
    }
    u(An, "si"), h(An, "isKeyPressedRepeat");
    function wn(t) {
      return t === void 0 ? d.keyState.down.size > 0 : d.keyState.down.has(t);
    }
    u(wn, "oi"), h(wn, "isKeyDown");
    function Vn(t) {
      return t === void 0 ? d.keyState.released.size > 0 : d.keyState.released.has(t);
    }
    u(Vn, "ai"), h(Vn, "isKeyReleased");
    function vn(t) {
      return d.virtualButtonState.pressed.has(t);
    }
    u(vn, "ui"), h(vn, "isVirtualButtonPressed");
    function yn(t) {
      return d.virtualButtonState.down.has(t);
    }
    u(yn, "ci"), h(yn, "isVirtualButtonDown");
    function En(t) {
      return d.virtualButtonState.released.has(t);
    }
    u(En, "li"), h(En, "isVirtualButtonReleased");
    function xn(t) {
      return t === void 0 ? d.gamepadButtonState.pressed.size > 0 : d.gamepadButtonState.pressed.has(t);
    }
    u(xn, "hi"), h(xn, "isGamepadButtonPressed");
    function bn(t) {
      return t === void 0 ? d.gamepadButtonState.down.size > 0 : d.gamepadButtonState.down.has(t);
    }
    u(bn, "di"), h(bn, "isGamepadButtonDown");
    function Sn(t) {
      return t === void 0 ? d.gamepadButtonState.released.size > 0 : d.gamepadButtonState.released.has(t);
    }
    u(Sn, "fi"), h(Sn, "isGamepadButtonReleased");
    function Rn() {
      return [...d.charInputted];
    }
    u(Rn, "mi"), h(Rn, "charInputted");
    function Ee() {
      return d.time;
    }
    u(Ee, "It"), h(Ee, "time");
    function Mn() {
      return d.canvas.toDataURL();
    }
    u(Mn, "pi"), h(Mn, "screenshot");
    function lr(t) {
      d.canvas.style.cursor = t;
    }
    u(lr, "Mn"), h(lr, "setCursor");
    function Bn() {
      return d.canvas.style.cursor;
    }
    u(Bn, "gi"), h(Bn, "getCursor");
    function Tn(t) {
      if (t)
        try {
          let r = d.canvas.requestPointerLock();
          r.catch && r.catch((n) => console.error(n));
        } catch (r) {
          console.error(r);
        }
      else
        document.exitPointerLock();
    }
    u(Tn, "wi"), h(Tn, "setCursorLocked");
    function Fn() {
      return !!document.pointerLockElement;
    }
    u(Fn, "vi"), h(Fn, "isCursorLocked");
    function Cn(t = true) {
      t ? Ls(d.canvas) : qs();
    }
    u(Cn, "bi"), h(Cn, "setFullscreen");
    function ur() {
      return Boolean(Gs());
    }
    u(ur, "Dn"), h(ur, "isFullscreen");
    function dr() {
      return d.isTouchScreen;
    }
    u(dr, "Bn"), h(dr, "isTouchScreen");
    let Q = { inspect: false, timeScale: 1, showLog: true, fps: () => d.fpsCounter.fps, numFrames: () => d.numFrames, stepFrame: Rr, drawCalls: () => A.drawCalls, clearLog: () => g.logs = [], log: (t) => {
      let r = e.logMax ?? Mo, n = t instanceof Error ? "error" : "info";
      g.logs.unshift(`${`[time]${Ee().toFixed(2)}[/time] `}[${n}]${t?.toString ? t.toString() : t}[/${n}]`), g.logs.length > r && (g.logs = g.logs.slice(0, r));
    }, error: (t) => Q.log(new Error(t.toString ? t.toString() : t)), curRecording: null, get paused() {
      return d.paused;
    }, set paused(t) {
      d.paused = t, t ? G.ctx.suspend() : G.ctx.resume();
    } };
    function ut() {
      return d.dt * Q.timeScale;
    }
    u(ut, "me"), h(ut, "dt");
    function Pn(...t) {
      return t.length > 0 && (g.cam.pos = y(...t)), g.cam.pos ? g.cam.pos.clone() : de();
    }
    u(Pn, "yi"), h(Pn, "camPos");
    function In(...t) {
      return t.length > 0 && (g.cam.scale = y(...t)), g.cam.scale.clone();
    }
    u(In, "Ui"), h(In, "camScale");
    function Un(t) {
      return t !== void 0 && (g.cam.angle = t), g.cam.angle;
    }
    u(Un, "xi"), h(Un, "camRot");
    function kn(t = 12) {
      g.cam.shake = t;
    }
    u(kn, "Ei"), h(kn, "shake");
    function xe(t) {
      return g.cam.transform.multVec2(t);
    }
    u(xe, "jt"), h(xe, "toScreen");
    function cr(t) {
      return g.cam.transform.invert().multVec2(t);
    }
    u(cr, "Fn"), h(cr, "toWorld");
    function oe(t) {
      let r = new tt();
      return t.pos && r.translate(t.pos), t.scale && r.scale(t.scale), t.angle && r.rotate(t.angle), t.parent ? r.mult(t.parent.transform) : r;
    }
    u(oe, "gt"), h(oe, "calcTransform");
    function fr(t) {
      let r = /* @__PURE__ */ new Map(), n = {}, s = new qt(), o = { id: Ao(), hidden: false, paused: false, transform: new tt(), children: [], parent: null, add(i) {
        let c = (() => {
          if (Array.isArray(i))
            return fr(i);
          if (i.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return i;
        })();
        return c.parent = this, c.transform = oe(c), this.children.push(c), c.trigger("add", c), g.ev.trigger("add", c), c;
      }, readd(i) {
        let c = this.children.indexOf(i);
        return c !== -1 && (this.children.splice(c, 1), this.children.push(i)), i;
      }, remove(i) {
        let c = this.children.indexOf(i);
        c !== -1 && (i.trigger("destroy"), g.ev.trigger("destroy", i), i.parent = null, this.children.splice(c, 1));
      }, removeAll(i) {
        this.get(i).forEach((c) => this.remove(c));
      }, update() {
        this.paused || (this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.update()), this.trigger("update"));
      }, draw() {
        this.hidden || (lt(), z(this.pos), Ut(this.scale), kt(this.angle), this.trigger("draw"), this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.draw()), st());
      }, drawInspect() {
        this.hidden || (lt(), z(this.pos), Ut(this.scale), kt(this.angle), this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.drawInspect()), this.trigger("drawInspect"), st());
      }, use(i) {
        if (!i)
          return;
        if (typeof i == "string")
          return this.use({ id: i });
        let c = [];
        i.id && (this.unuse(i.id), n[i.id] = [], c = n[i.id], r.set(i.id, i));
        for (let f in i) {
          if (Fo.has(f))
            continue;
          let m2 = Object.getOwnPropertyDescriptor(i, f);
          if (typeof m2.value == "function" && (i[f] = i[f].bind(this)), m2.set && Object.defineProperty(i, f, { set: m2.set.bind(this) }), m2.get && Object.defineProperty(i, f, { get: m2.get.bind(this) }), Co.has(f))
            c.push(this.on(f, i[f]).cancel);
          else if (this[f] === void 0)
            Object.defineProperty(this, f, { get: () => i[f], set: (v) => i[f] = v, configurable: true, enumerable: true }), c.push(() => delete this[f]);
          else
            throw new Error(`Duplicate component property: "${f}"`);
        }
        let p = h(() => {
          if (i.require) {
            for (let f of i.require)
              if (!this.c(f))
                throw new Error(`Component "${i.id}" requires component "${f}"`);
          }
        }, "checkDeps");
        i.destroy && c.push(i.destroy.bind(this)), this.exists() ? (p(), i.add && i.add.call(this)) : i.require && c.push(this.on("add", p).cancel);
      }, unuse(i) {
        n[i] && (n[i].forEach((c) => c()), delete n[i]), r.has(i) && r.delete(i);
      }, c(i) {
        return r.get(i);
      }, get(i, c = {}) {
        let p = c.recursive ? this.children.flatMap((f) => [f, ...f.children]) : this.children;
        if (p = p.filter((f) => i ? f.is(i) : true), c.liveUpdate) {
          let f = h((m2) => c.recursive ? this.isAncestorOf(m2) : m2.parent === this, "isChild");
          be((m2) => {
            f(m2) && m2.is(i) && p.push(m2);
          }), gr((m2) => {
            if (f(m2) && m2.is(i)) {
              let v = p.findIndex((B) => B.id === m2.id);
              v !== -1 && p.splice(v, 1);
            }
          });
        }
        return p;
      }, isAncestorOf(i) {
        return i.parent ? i.parent === this || this.isAncestorOf(i.parent) : false;
      }, exists() {
        return g.root.isAncestorOf(this);
      }, is(i) {
        if (i === "*")
          return true;
        if (Array.isArray(i)) {
          for (let c of i)
            if (!this.c(c))
              return false;
          return true;
        } else
          return this.c(i) != null;
      }, on(i, c) {
        return s.on(i, c.bind(this));
      }, trigger(i, ...c) {
        s.trigger(i, ...c), g.objEvents.trigger(i, this, ...c);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let i = {};
        for (let [c, p] of r)
          i[c] = p.inspect ? p.inspect() : null;
        return i;
      }, onAdd(i) {
        return this.on("add", i);
      }, onUpdate(i) {
        return this.on("update", i);
      }, onDraw(i) {
        return this.on("draw", i);
      }, onDestroy(i) {
        return this.on("destroy", i);
      }, clearEvents() {
        s.clear();
      } };
      for (let i of t)
        o.use(i);
      return o;
    }
    u(fr, "Ln"), h(fr, "make");
    function Vt(t, r, n) {
      return g.objEvents[t] || (g.objEvents[t] = new Le()), g.objEvents.on(t, (s, ...o) => {
        s.is(r) && n(s, ...o);
      });
    }
    u(Vt, "Re"), h(Vt, "on");
    let pr = h((t, r) => {
      if (typeof t == "function" && r === void 0) {
        let n = ce([{ update: t }]);
        return { get paused() {
          return n.paused;
        }, set paused(s) {
          n.paused = s;
        }, cancel: () => n.destroy() };
      } else if (typeof t == "string")
        return Vt("update", t, r);
    }, "onUpdate"), Xs = h((t, r) => {
      if (typeof t == "function" && r === void 0) {
        let n = ce([{ draw: t }]);
        return { get paused() {
          return n.hidden;
        }, set paused(s) {
          n.hidden = s;
        }, cancel: () => n.destroy() };
      } else if (typeof t == "string")
        return Vt("draw", t, r);
    }, "onDraw");
    function be(t, r) {
      if (typeof t == "function" && r === void 0)
        return g.ev.on("add", t);
      if (typeof t == "string")
        return Vt("add", t, r);
    }
    u(be, "_t"), h(be, "onAdd");
    function gr(t, r) {
      if (typeof t == "function" && r === void 0)
        return g.ev.on("destroy", t);
      if (typeof t == "string")
        return Vt("destroy", t, r);
    }
    u(gr, "Gn"), h(gr, "onDestroy");
    function Dn(t, r, n) {
      return Vt("collide", t, (s, o, i) => o.is(r) && n(s, o, i));
    }
    u(Dn, "Si"), h(Dn, "onCollide");
    function Nn(t, r, n) {
      return Vt("collideUpdate", t, (s, o, i) => o.is(r) && n(s, o, i));
    }
    u(Nn, "Ti"), h(Nn, "onCollideUpdate");
    function On(t, r, n) {
      return Vt("collideEnd", t, (s, o, i) => o.is(r) && n(s, o, i));
    }
    u(On, "Ai"), h(On, "onCollideEnd");
    function ae(t, r) {
      Li(t).forEach(r), be(t, r);
    }
    u(ae, "wt"), h(ae, "forAllCurrentAndFuture");
    function Ln(t, r) {
      if (typeof t == "function")
        return mr(t);
      {
        let n = [];
        return ae(t, (s) => {
          if (!s.area)
            throw new Error("onClick() requires the object to have area() component");
          n.push(s.onClick(() => r(s)));
        }), Ft.join(n);
      }
    }
    u(Ln, "Oi"), h(Ln, "onClick");
    function qn(t, r) {
      let n = [];
      return ae(t, (s) => {
        if (!s.area)
          throw new Error("onHover() requires the object to have area() component");
        n.push(s.onHover(() => r(s)));
      }), Ft.join(n);
    }
    u(qn, "Ri"), h(qn, "onHover");
    function Gn(t, r) {
      let n = [];
      return ae(t, (s) => {
        if (!s.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        n.push(s.onHoverUpdate(() => r(s)));
      }), Ft.join(n);
    }
    u(Gn, "Pi"), h(Gn, "onHoverUpdate");
    function Yn(t, r) {
      let n = [];
      return ae(t, (s) => {
        if (!s.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        n.push(s.onHoverEnd(() => r(s)));
      }), Ft.join(n);
    }
    u(Yn, "Mi"), h(Yn, "onHoverEnd");
    function he(t, r) {
      let n = 0, s = [];
      r && s.push(r);
      let o = pr(() => {
        n += ut(), n >= t && (o.cancel(), s.forEach((i) => i()));
      });
      return { paused: o.paused, cancel: o.cancel, onEnd(i) {
        s.push(i);
      }, then(i) {
        return this.onEnd(i), this;
      } };
    }
    u(he, "vt"), h(he, "wait");
    function Hn(t, r) {
      let n = null, s = h(() => {
        n = he(t, s), r();
      }, "newAction");
      return n = he(0, s), { get paused() {
        return n.paused;
      }, set paused(o) {
        n.paused = o;
      }, cancel: () => n.cancel() };
    }
    u(Hn, "Di"), h(Hn, "loop");
    let Zs = h((t, r) => {
      if (typeof t == "function")
        return g.ev.on("keyDown", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("keyDown", (n) => n === t && r(t));
    }, "onKeyDown"), Bt = h((t, r) => {
      if (typeof t == "function")
        return g.ev.on("keyPress", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("keyPress", (n) => n === t && r(t));
    }, "onKeyPress"), Ws = h((t, r) => {
      if (typeof t == "function")
        return g.ev.on("keyPressRepeat", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("keyPressRepeat", (n) => n === t && r(t));
    }, "onKeyPressRepeat"), _s = h((t, r) => {
      if (typeof t == "function")
        return g.ev.on("keyRelease", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("keyRelease", (n) => n === t && r(t));
    }, "onKeyRelease");
    function Kn(t, r) {
      return typeof t == "function" ? g.ev.on("mouseDown", (n) => t(n)) : g.ev.on("mouseDown", (n) => n === t && r(n));
    }
    u(Kn, "Gi"), h(Kn, "onMouseDown");
    function mr(t, r) {
      return typeof t == "function" ? g.ev.on("mousePress", (n) => t(n)) : g.ev.on("mousePress", (n) => n === t && r(n));
    }
    u(mr, "Vn"), h(mr, "onMousePress");
    function jn(t, r) {
      return typeof t == "function" ? g.ev.on("mouseRelease", (n) => t(n)) : g.ev.on("mouseRelease", (n) => n === t && r(n));
    }
    u(jn, "Vi"), h(jn, "onMouseRelease");
    function Qn(t) {
      return g.ev.on("mouseMove", () => t(Nt(), hr()));
    }
    u(Qn, "Ii"), h(Qn, "onMouseMove");
    function zn(t) {
      return g.ev.on("charInput", t);
    }
    u(zn, "ji"), h(zn, "onCharInput");
    function Jn(t) {
      return g.ev.on("touchStart", t);
    }
    u(Jn, "Ni"), h(Jn, "onTouchStart");
    function Xn(t) {
      return g.ev.on("touchMove", t);
    }
    u(Xn, "_i"), h(Xn, "onTouchMove");
    function Zn(t) {
      return g.ev.on("touchEnd", t);
    }
    u(Zn, "ki"), h(Zn, "onTouchEnd");
    function Wn(t) {
      return g.ev.on("scroll", t);
    }
    u(Wn, "Hi"), h(Wn, "onScroll");
    function _n(t, r) {
      return g.ev.on("virtualButtonDown", (n) => n === t && r());
    }
    u(_n, "qi"), h(_n, "onVirtualButtonDown");
    function $n(t, r) {
      return g.ev.on("virtualButtonPress", (n) => n === t && r());
    }
    u($n, "$i"), h($n, "onVirtualButtonPress");
    function ti(t, r) {
      return g.ev.on("virtualButtonRelease", (n) => n === t && r());
    }
    u(ti, "zi"), h(ti, "onVirtualButtonRelease");
    function ei(t, r) {
      if (typeof t == "function")
        return g.ev.on("gamepadButtonDown", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("gamepadButtonDown", (n) => n === t && r(t));
    }
    u(ei, "Yi"), h(ei, "onGamepadButtonDown");
    function ri(t, r) {
      if (typeof t == "function")
        return g.ev.on("gamepadButtonPress", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("gamepadButtonPress", (n) => n === t && r(t));
    }
    u(ri, "Xi"), h(ri, "onGamepadButtonPress");
    function ni(t, r) {
      if (typeof t == "function")
        return g.ev.on("gamepadButtonRelease", t);
      if (typeof t == "string" && typeof r == "function")
        return g.ev.on("gamepadButtonRelease", (n) => n === t && r(t));
    }
    u(ni, "Ki"), h(ni, "onGamepadButtonRelease");
    function ii(t, r) {
      return g.ev.on("gamepadStick", (n, s) => n === t && r(s));
    }
    u(ii, "Ji"), h(ii, "onGamepadStick");
    function Ar() {
      Bt("f1", () => {
        Q.inspect = !Q.inspect;
      }), Bt("f2", () => {
        Q.clearLog();
      }), Bt("f8", () => {
        Q.paused = !Q.paused;
      }), Bt("f7", () => {
        Q.timeScale = Zt(Ct(Q.timeScale - 0.2, 0, 2), 1);
      }), Bt("f9", () => {
        Q.timeScale = Zt(Ct(Q.timeScale + 0.2, 0, 2), 1);
      }), Bt("f10", () => {
        Q.stepFrame();
      });
    }
    u(Ar, "In"), h(Ar, "enterDebugMode");
    function wr() {
      Bt("b", () => $e());
    }
    u(wr, "jn"), h(wr, "enterBurpMode");
    function si(t) {
      g.gravity = t;
    }
    u(si, "Wi"), h(si, "setGravity");
    function oi() {
      return g.gravity;
    }
    u(oi, "Qi"), h(oi, "getGravity");
    function ai(...t) {
      t.length === 1 || t.length === 2 ? (A.bgColor = Y(t[0]), t[1] && (A.bgAlpha = t[1])) : (t.length === 3 || t.length === 4) && (A.bgColor = Y(t[0], t[1], t[2]), t[3] && (A.bgAlpha = t[3])), l.clearColor(A.bgColor.r / 255, A.bgColor.g / 255, A.bgColor.b / 255, A.bgAlpha);
    }
    u(ai, "Zi"), h(ai, "setBackground");
    function hi() {
      return A.bgColor.clone();
    }
    u(hi, "es"), h(hi, "getBackground");
    function li() {
      return navigator.getGamepads().filter((t) => t !== null);
    }
    u(li, "ts"), h(li, "getGamepads");
    function le(...t) {
      return { id: "pos", pos: y(...t), moveBy(...r) {
        this.pos = this.pos.add(y(...r));
      }, move(...r) {
        this.moveBy(y(...r).scale(ut()));
      }, moveTo(...r) {
        if (typeof r[0] == "number" && typeof r[1] == "number")
          return this.moveTo(y(r[0], r[1]), r[2]);
        let n = r[0], s = r[1];
        if (s === void 0) {
          this.pos = y(n);
          return;
        }
        let o = n.sub(this.pos);
        if (o.len() <= s * ut()) {
          this.pos = y(n);
          return;
        }
        this.move(o.unit().scale(s));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        return this.fixed ? this.pos : xe(this.pos);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        xt({ color: Y(255, 0, 0), radius: 4 / ir() });
      } };
    }
    u(le, "bt"), h(le, "pos");
    function ue(...t) {
      return t.length === 0 ? ue(1) : { id: "scale", scale: y(...t), scaleTo(...r) {
        this.scale = y(...r);
      }, scaleBy(...r) {
        this.scale.scale(y(...r));
      }, inspect() {
        return `(${Zt(this.scale.x, 2)}, ${Zt(this.scale.y, 2)})`;
      } };
    }
    u(ue, "yt"), h(ue, "scale");
    function ui(t) {
      return { id: "rotate", angle: t ?? 0, rotateBy(r) {
        this.angle += r;
      }, rotateTo(r) {
        this.angle = r;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      } };
    }
    u(ui, "ns"), h(ui, "rotate");
    function di(...t) {
      return { id: "color", color: Y(...t), inspect() {
        return this.color.toString();
      } };
    }
    u(di, "rs"), h(di, "color");
    function Zt(t, r) {
      return Number(t.toFixed(r));
    }
    u(Zt, "st"), h(Zt, "toFixed");
    function ci(t) {
      return { id: "opacity", opacity: t ?? 1, inspect() {
        return `${Zt(this.opacity, 1)}`;
      }, fadeOut(r = 1, n = Ce.linear) {
        return Be(this.opacity, 0, r, (s) => this.opacity = s, n);
      } };
    }
    u(ci, "is"), h(ci, "opacity");
    function Se(t) {
      if (!t)
        throw new Error("Please define an anchor");
      return { id: "anchor", anchor: t, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      } };
    }
    u(Se, "kt"), h(Se, "anchor");
    function fi(t) {
      return { id: "z", z: t, inspect() {
        return `${this.z}`;
      } };
    }
    u(fi, "ss"), h(fi, "z");
    function pi(t, r) {
      return { id: "follow", require: ["pos"], follow: { obj: t, offset: r ?? y(0) }, add() {
        t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      } };
    }
    u(pi, "os"), h(pi, "follow");
    function gi(t, r) {
      let n = typeof t == "number" ? V.fromAngle(t) : t.unit();
      return { id: "move", require: ["pos"], update() {
        this.move(n.scale(r));
      } };
    }
    u(gi, "as"), h(gi, "move");
    let $s = 200;
    function mi(t = {}) {
      let r = t.distance ?? $s, n = false;
      return { id: "offscreen", require: ["pos"], isOffScreen() {
        let s = xe(this.pos), o = new _(y(0), et(), J());
        return !$t(o, s) && o.sdistToPoint(s) > r * r;
      }, onExitScreen(s) {
        return this.on("exitView", s);
      }, onEnterScreen(s) {
        return this.on("enterView", s);
      }, update() {
        this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), t.hide && (this.hidden = true), t.pause && (this.paused = true), t.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), t.hide && (this.hidden = false), t.pause && (this.paused = false));
      } };
    }
    u(mi, "cs"), h(mi, "offscreen");
    function Ai(t = {}) {
      let r = [], n = {}, s = /* @__PURE__ */ new Set();
      return { id: "area", collisionIgnore: t.collisionIgnore ?? [], add() {
        this.area.cursor && r.push(this.onHover(() => lr(this.area.cursor))), r.push(this.onCollideUpdate((o, i) => {
          n[o.id] || this.trigger("collide", o, i), n[o.id] = i, s.add(o.id);
        }));
      }, update() {
        for (let o in n)
          s.has(Number(o)) || (this.trigger("collideEnd", n[o].target), delete n[o]);
        s.clear();
      }, drawInspect() {
        let o = this.localArea();
        lt(), Ut(this.area.scale), z(this.area.offset);
        let i = { outline: { width: 4 / ir(), color: Y(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: this.fixed };
        o instanceof _ ? ot({ ...i, pos: o.pos, width: o.width, height: o.height }) : o instanceof Yt ? bt({ ...i, pts: o.pts }) : o instanceof ge && xt({ ...i, pos: o.center, radius: o.radius }), st();
      }, destroy() {
        r.forEach((o) => o.cancel());
      }, area: { shape: t.shape ?? null, scale: t.scale ? y(t.scale) : y(1), offset: t.offset ?? y(0), cursor: t.cursor ?? null }, isClicked() {
        return se() && this.isHovering();
      }, isHovering() {
        let o = this.fixed ? Nt() : cr(Nt());
        return this.hasPoint(o);
      }, checkCollision(o) {
        return n[o.id] ?? null;
      }, getCollisions() {
        return Object.values(n);
      }, isColliding(o) {
        return Boolean(n[o.id]);
      }, isOverlapping(o) {
        let i = n[o.id];
        return i && i.hasOverlap();
      }, onClick(o) {
        return this.onUpdate(() => {
          this.isClicked() && o();
        });
      }, onHover(o) {
        let i = false;
        return this.onUpdate(() => {
          i ? i = this.isHovering() : this.isHovering() && (i = true, o());
        });
      }, onHoverUpdate(o) {
        return this.onUpdate(() => {
          this.isHovering() && o();
        });
      }, onHoverEnd(o) {
        let i = false;
        return this.onUpdate(() => {
          i ? this.isHovering() || (i = false, o()) : i = this.isHovering();
        });
      }, onCollide(o, i) {
        if (typeof o == "function" && i === void 0)
          return this.on("collide", o);
        if (typeof o == "string")
          return this.onCollide((c, p) => {
            c.is(o) && i(c, p);
          });
      }, onCollideUpdate(o, i) {
        if (typeof o == "function" && i === void 0)
          return this.on("collideUpdate", o);
        if (typeof o == "string")
          return this.on("collideUpdate", (c, p) => c.is(o) && i(c, p));
      }, onCollideEnd(o, i) {
        if (typeof o == "function" && i === void 0)
          return this.on("collideEnd", o);
        if (typeof o == "string")
          return this.on("collideEnd", (c) => c.is(o) && i(c));
      }, hasPoint(o) {
        return Gr(this.worldArea(), o);
      }, resolveCollision(o) {
        let i = this.checkCollision(o);
        i && !i.resolved && (this.pos = this.pos.add(i.displacement), i.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        let o = this.localArea();
        if (!(o instanceof Yt || o instanceof _))
          throw new Error("Only support polygon and rect shapes for now");
        let i = this.transform.clone().scale(y(this.area.scale ?? 1)).translate(this.area.offset);
        if (o instanceof _) {
          let c = Gt(this.anchor || Pe).add(1, 1).scale(-0.5).scale(o.width, o.height);
          i.translate(c);
        }
        return o.transform(i);
      }, screenArea() {
        let o = this.worldArea();
        return this.fixed ? o : o.transform(g.cam.transform);
      } };
    }
    u(Ai, "ls"), h(Ai, "area");
    function Ot(t) {
      return { color: t.color, opacity: t.opacity, anchor: t.anchor, outline: t.outline, fixed: t.fixed, shader: t.shader, uniform: t.uniform };
    }
    u(Ot, "ze"), h(Ot, "getRenderProps");
    function Re(t, r = {}) {
      let n = null, s = null, o = new ct();
      if (!t)
        throw new Error("Please pass the resource name or data to sprite()");
      let i = h((c, p, f, m2) => {
        let v = y(1, 1);
        return f && m2 ? (v.x = f / (c.width * p.w), v.y = m2 / (c.height * p.h)) : f ? (v.x = f / (c.width * p.w), v.y = v.x) : m2 && (v.y = m2 / (c.height * p.h), v.x = v.y), v;
      }, "calcTexScale");
      return { id: "sprite", width: 0, height: 0, frame: r.frame || 0, quad: r.quad || new W(0, 0, 1, 1), animSpeed: r.animSpeed ?? 1, flipX: r.flipX ?? false, flipY: r.flipY ?? false, draw() {
        if (!n)
          return;
        let c = n.frames[this.frame ?? 0];
        if (!c)
          throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (n.slice9) {
          let { left: p, right: f, top: m2, bottom: v } = n.slice9, B = n.tex.width * c.w, O = n.tex.height * c.h, P = this.width - p - f, K = this.height - m2 - v, S = p / B, I = f / B, it = 1 - S - I, U = m2 / O, j = v / O, T = 1 - U - j, dt = [Z(0, 0, S, U), Z(S, 0, it, U), Z(S + it, 0, I, U), Z(0, U, S, T), Z(S, U, it, T), Z(S + it, U, I, T), Z(0, U + T, S, j), Z(S, U + T, it, j), Z(S + it, U + T, I, j), Z(0, 0, p, m2), Z(p, 0, P, m2), Z(p + P, 0, f, m2), Z(0, m2, p, K), Z(p, m2, P, K), Z(p + P, m2, f, K), Z(0, m2 + K, p, v), Z(p, m2 + K, P, v), Z(p + P, m2 + K, f, v)];
          for (let w = 0; w < 9; w++) {
            let b = dt[w], x = dt[w + 9];
            re(Object.assign(Ot(this), { pos: x.pos(), tex: n.tex, quad: c.scale(b), flipX: this.flipX, flipY: this.flipY, tiled: r.tiled, width: x.w, height: x.h }));
          }
        } else
          re(Object.assign(Ot(this), { tex: n.tex, quad: c, flipX: this.flipX, flipY: this.flipY, tiled: r.tiled, width: this.width, height: this.height }));
      }, update() {
        if (!n) {
          let p = Ze(t);
          if (!p || !p.data)
            return;
          let f = p.data.frames[0].clone();
          r.quad && (f = f.scale(r.quad));
          let m2 = i(p.data.tex, f, r.width, r.height);
          this.width = p.data.tex.width * f.w * m2.x, this.height = p.data.tex.height * f.h * m2.y, r.anim && this.play(r.anim), n = p.data, o.trigger(n);
        }
        if (!s)
          return;
        let c = n.anims[s.name];
        if (typeof c == "number") {
          this.frame = c;
          return;
        }
        if (c.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        s.timer += ut() * this.animSpeed, s.timer >= 1 / s.speed && (s.timer = 0, c.from > c.to ? (this.frame--, this.frame < c.to && (s.loop ? this.frame = c.from : (this.frame++, s.onEnd(), this.stop()))) : (this.frame++, this.frame > c.to && (s.loop ? this.frame = c.from : (this.frame--, s.onEnd(), this.stop()))));
      }, play(c, p = {}) {
        if (!n) {
          o.add(() => this.play(c, p));
          return;
        }
        let f = n.anims[c];
        if (!f)
          throw new Error(`Anim not found: ${c}`);
        s && this.stop(), s = typeof f == "number" ? { name: c, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        } } : { name: c, timer: 0, loop: p.loop ?? f.loop ?? false, pingpong: p.pingpong ?? f.pingpong ?? false, speed: p.speed ?? f.speed ?? 10, onEnd: p.onEnd ?? (() => {
        }) }, this.frame = typeof f == "number" ? f : f.from, this.trigger("animStart", c);
      }, stop() {
        if (!s)
          return;
        let c = s.name;
        s = null, this.trigger("animEnd", c);
      }, numFrames() {
        return n?.frames.length ?? 0;
      }, curAnim() {
        return s?.name;
      }, onAnimEnd(c) {
        return this.on("animEnd", c);
      }, onAnimStart(c) {
        return this.on("animStart", c);
      }, renderArea() {
        return new _(y(0), this.width, this.height);
      }, inspect() {
        if (typeof t == "string")
          return `"${t}"`;
      } };
    }
    u(Re, "Ht"), h(Re, "sprite");
    function wi(t, r = {}) {
      function n(s) {
        let o = St(Object.assign(Ot(s), { text: s.text + "", size: s.textSize, font: s.font, width: r.width && s.width, align: s.align, letterSpacing: s.letterSpacing, lineSpacing: s.lineSpacing, transform: s.textTransform, styles: s.textStyles }));
        return r.width || (s.width = o.width / (s.scale?.x || 1)), s.height = o.height / (s.scale?.y || 1), o;
      }
      return u(n, "n"), h(n, "update"), { id: "text", text: t, textSize: r.size ?? So, font: r.font, width: r.width, height: 0, align: r.align, lineSpacing: r.lineSpacing, letterSpacing: r.letterSpacing, textTransform: r.transform, textStyles: r.styles, add() {
        yr(() => n(this));
      }, draw() {
        Rt(n(this));
      }, renderArea() {
        return new _(y(0), this.width, this.height);
      } };
    }
    u(wi, "hs"), h(wi, "text");
    function Vi(t, r, n = {}) {
      return { id: "rect", width: t, height: r, radius: n.radius || 0, draw() {
        ot(Object.assign(Ot(this), { width: this.width, height: this.height, radius: this.radius }));
      }, renderArea() {
        return new _(y(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    u(Vi, "ds"), h(Vi, "rect");
    function vi(t, r) {
      return { id: "rect", width: t, height: r, draw() {
        Dt(Object.assign(Ot(this), { width: this.width, height: this.height }));
      }, renderArea() {
        return new _(y(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    u(vi, "fs"), h(vi, "uvquad");
    function yi(t) {
      return { id: "circle", radius: t, draw() {
        xt(Object.assign(Ot(this), { radius: this.radius }));
      }, renderArea() {
        return new _(new V(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      } };
    }
    u(yi, "ms"), h(yi, "circle");
    function Ei(t = 1, r = Y(0, 0, 0)) {
      return { id: "outline", outline: { width: t, color: r } };
    }
    u(Ei, "ps"), h(Ei, "outline");
    function Vr(t, r) {
      let n = new Le();
      return t && r && n.pushd(new ke(t, r)), { id: "timer", wait(s, o) {
        let i = [o], c = new ke(s, () => i.forEach((f) => f())), p = n.pushd(c);
        return { get paused() {
          return c.paused;
        }, set paused(f) {
          c.paused = f;
        }, cancel: p, onEnd(f) {
          i.push(f);
        }, then(f) {
          return this.onEnd(f), this;
        } };
      }, update() {
        n.forEach((s, o) => {
          s.tick(ut()) && n.delete(o);
        });
      } };
    }
    u(Vr, "Nn"), h(Vr, "timer");
    let to = 640, eo = 65536;
    function xi(t = {}) {
      let r = y(0), n = null, s = null, o = false, i = [];
      return { id: "body", require: ["pos", "area"], jumpForce: t.jumpForce ?? to, gravityScale: t.gravityScale ?? 1, isStatic: t.isStatic ?? false, mass: t.mass ?? 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        i.push(this.onCollideUpdate((c, p) => {
          if (c.is("body") && !p.resolved && (this.trigger("beforePhysicsResolve", p), c.trigger("beforePhysicsResolve", p.reverse()), !p.resolved && !(this.isStatic && c.isStatic))) {
            if (!this.isStatic && !c.isStatic) {
              let f = this.mass + c.mass;
              this.pos = this.pos.add(p.displacement.scale(c.mass / f)), c.pos = c.pos.add(p.displacement.scale(-this.mass / f)), this.transform = oe(this), c.transform = oe(c);
            } else {
              let f = !this.isStatic && c.isStatic ? p : p.reverse();
              f.source.pos = f.source.pos.add(f.displacement), f.source.transform = oe(f.source);
            }
            p.resolved = true, this.trigger("physicsResolve", p), c.trigger("physicsResolve", p.reverse());
          }
        })), i.push(this.onPhysicsResolve((c) => {
          g.gravity && (c.isBottom() && this.isFalling() ? (r.y = 0, n = c.target, s = c.target.pos, o ? o = false : this.trigger("ground", n)) : c.isTop() && this.isJumping() && (r.y = 0, this.trigger("headbutt", c.target)));
        }));
      }, update() {
        if (!g.gravity || this.isStatic)
          return;
        if (o && (n = null, s = null, this.trigger("fallOff"), o = false), n)
          if (!this.isColliding(n) || !n.exists() || !n.is("body"))
            o = true;
          else {
            !n.pos.eq(s) && t.stickToPlatform !== false && this.moveBy(n.pos.sub(s)), s = n.pos;
            return;
          }
        let c = r.y;
        r.y += g.gravity * this.gravityScale * ut(), r.y = Math.min(r.y, t.maxVelocity ?? eo), c < 0 && r.y >= 0 && this.trigger("fall"), this.move(r);
      }, destroy() {
        i.forEach((c) => c.cancel());
      }, onPhysicsResolve(c) {
        return this.on("physicsResolve", c);
      }, onBeforePhysicsResolve(c) {
        return this.on("beforePhysicsResolve", c);
      }, curPlatform() {
        return n;
      }, isGrounded() {
        return n !== null;
      }, isFalling() {
        return r.y > 0;
      }, isJumping() {
        return r.y < 0;
      }, jump(c) {
        n = null, s = null, r.y = -c || -this.jumpForce;
      }, onGround(c) {
        return this.on("ground", c);
      }, onFall(c) {
        return this.on("fall", c);
      }, onFallOff(c) {
        return this.on("fallOff", c);
      }, onHeadbutt(c) {
        return this.on("headbutt", c);
      } };
    }
    u(xi, "vs"), h(xi, "body");
    function bi(t = 2) {
      let r = t, n = [];
      return { id: "doubleJump", require: ["body"], numJumps: t, add() {
        n.push(this.onGround(() => {
          r = this.numJumps;
        }));
      }, destroy() {
        n.forEach((s) => s.cancel());
      }, doubleJump(s) {
        r <= 0 || (r < this.numJumps && this.trigger("doubleJump"), r--, this.jump(s));
      }, onDoubleJump(s) {
        return this.on("doubleJump", s);
      }, inspect() {
        return `${r}`;
      } };
    }
    u(bi, "bs"), h(bi, "doubleJump");
    function Si(t, r) {
      return { id: "shader", shader: t, ...typeof r == "function" ? { uniform: r(), update() {
        this.uniform = r();
      } } : { uniform: r } };
    }
    u(Si, "ys"), h(Si, "shader");
    function Ri() {
      return { id: "fixed", fixed: true };
    }
    u(Ri, "Us"), h(Ri, "fixed");
    function vr(t) {
      return { id: "stay", stay: true, scenesToStay: t };
    }
    u(vr, "_n"), h(vr, "stay");
    function Mi(t) {
      if (t == null)
        throw new Error("health() requires the initial amount of hp");
      return { id: "health", hurt(r = 1) {
        this.setHP(t - r), this.trigger("hurt");
      }, heal(r = 1) {
        this.setHP(t + r), this.trigger("heal");
      }, hp() {
        return t;
      }, setHP(r) {
        t = r, t <= 0 && this.trigger("death");
      }, onHurt(r) {
        return this.on("hurt", r);
      }, onHeal(r) {
        return this.on("heal", r);
      }, onDeath(r) {
        return this.on("death", r);
      }, inspect() {
        return `${t}`;
      } };
    }
    u(Mi, "xs"), h(Mi, "health");
    function Bi(t, r = {}) {
      if (t == null)
        throw new Error("lifespan() requires time");
      let n = r.fade ?? 0;
      return { id: "lifespan", async add() {
        await he(t), n > 0 && this.opacity && await Be(this.opacity, 0, n, (s) => this.opacity = s, Ce.linear), this.destroy();
      } };
    }
    u(Bi, "Es"), h(Bi, "lifespan");
    function Ti(t, r, n) {
      if (!t)
        throw new Error("state() requires an initial state");
      let s = {};
      function o(f) {
        s[f] || (s[f] = { enter: new ct(), end: new ct(), update: new ct(), draw: new ct() });
      }
      u(o, "c"), h(o, "initStateEvents");
      function i(f, m2, v) {
        return o(m2), s[m2][f].add(v);
      }
      u(i, "s"), h(i, "on");
      function c(f, m2, ...v) {
        o(m2), s[m2][f].trigger(...v);
      }
      u(c, "h"), h(c, "trigger");
      let p = false;
      return { id: "state", state: t, enterState(f, ...m2) {
        if (p = true, r && !r.includes(f))
          throw new Error(`State not found: ${f}`);
        let v = this.state;
        if (n) {
          if (!n?.[v])
            return;
          let B = typeof n[v] == "string" ? [n[v]] : n[v];
          if (!B.includes(f))
            throw new Error(`Cannot transition state from "${v}" to "${f}". Available transitions: ${B.map((O) => `"${O}"`).join(", ")}`);
        }
        c("end", v, ...m2), this.state = f, c("enter", f, ...m2), c("enter", `${v} -> ${f}`, ...m2);
      }, onStateTransition(f, m2, v) {
        return i("enter", `${f} -> ${m2}`, v);
      }, onStateEnter(f, m2) {
        return i("enter", f, m2);
      }, onStateUpdate(f, m2) {
        return i("update", f, m2);
      }, onStateDraw(f, m2) {
        return i("draw", f, m2);
      }, onStateEnd(f, m2) {
        return i("end", f, m2);
      }, update() {
        p || (c("enter", t), p = true), c("update", this.state);
      }, draw() {
        c("draw", this.state);
      }, inspect() {
        return this.state;
      } };
    }
    u(Ti, "Cs"), h(Ti, "state");
    function Fi(t = 1) {
      let r = 0, n = false;
      return { require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        n || (r += ut(), this.opacity = Ne(r, 0, t, 0, 1), r >= t && (this.opacity = 1, n = true));
      } };
    }
    u(Fi, "Ss"), h(Fi, "fadeIn");
    function yr(t) {
      R.loaded ? t() : g.ev.on("load", t);
    }
    u(yr, "kn"), h(yr, "onLoad");
    function Ci(t, r) {
      g.scenes[t] = r;
    }
    u(Ci, "Ts"), h(Ci, "scene");
    function Pi(t, ...r) {
      if (!g.scenes[t])
        throw new Error(`Scene not found: ${t}`);
      g.ev.onOnce("frameEnd", () => {
        g.ev = new qt(), g.objEvents = new qt(), [...g.root.children].forEach((n) => {
          (!n.stay || n.scenesToStay && !n.scenesToStay.includes(t)) && g.root.remove(n);
        }), g.root.clearEvents(), g.cam = { pos: null, scale: y(1), angle: 0, shake: 0, transform: new tt() }, g.scenes[t](...r), e.debug !== false && Ar(), e.burp && wr();
      });
    }
    u(Pi, "As"), h(Pi, "go");
    function Ii(t, r) {
      try {
        return JSON.parse(window.localStorage[t]);
      } catch {
        return r ? (Er(t, r), r) : null;
      }
    }
    u(Ii, "Os"), h(Ii, "getData");
    function Er(t, r) {
      window.localStorage[t] = JSON.stringify(r);
    }
    u(Er, "Hn"), h(Er, "setData");
    function xr(t) {
      let r = t(Wt);
      for (let n in r)
        Wt[n] = r[n], e.global !== false && (window[n] = r[n]);
      return Wt;
    }
    u(xr, "qn"), h(xr, "plug");
    function de() {
      return y(et() / 2, J() / 2);
    }
    u(de, "Ut"), h(de, "center");
    let ro;
    ((t) => (t[t.None = 0] = "None", t[t.Left = 1] = "Left", t[t.Top = 2] = "Top", t[t.LeftTop = 3] = "LeftTop", t[t.Right = 4] = "Right", t[t.Horizontal = 5] = "Horizontal", t[t.RightTop = 6] = "RightTop", t[t.HorizontalTop = 7] = "HorizontalTop", t[t.Bottom = 8] = "Bottom", t[t.LeftBottom = 9] = "LeftBottom", t[t.Vertical = 10] = "Vertical", t[t.LeftVertical = 11] = "LeftVertical", t[t.RightBottom = 12] = "RightBottom", t[t.HorizontalBottom = 13] = "HorizontalBottom", t[t.RightVertical = 14] = "RightVertical", t[t.All = 15] = "All"))(ro ||= {});
    function br(t = {}) {
      let r = y(0), n = t.isObstacle ?? false, s = t.cost ?? 0, o = t.edges ?? [], i = h(() => {
        let p = { left: 1, top: 2, right: 4, bottom: 8 };
        return o.map((f) => p[f] || 0).reduce((f, m2) => f | m2, 0);
      }, "getEdgeMask"), c = i();
      return { id: "tile", tilePosOffset: t.offset ?? y(0), set tilePos(p) {
        let f = this.getLevel();
        r = p.clone(), this.pos = y(this.tilePos.x * f.tileWidth(), this.tilePos.y * f.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return r;
      }, set isObstacle(p) {
        n !== p && (n = p, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return n;
      }, set cost(p) {
        s !== p && (s = p, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return s;
      }, set edges(p) {
        o = p, c = i(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return o;
      }, get edgeMask() {
        return c;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(y(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(y(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(y(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(y(0, 1));
      } };
    }
    u(br, "$n"), h(br, "tile");
    function Ui(t, r) {
      if (!r.tileWidth || !r.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let n = ce([le(r.pos ?? y(0))]), s = t.length, o = 0, i = null, c = null, p = null, f = null, m2 = h((w) => w.x + w.y * o, "tile2Hash"), v = h((w) => y(Math.floor(w % o), Math.floor(w / o)), "hash2Tile"), B = h(() => {
        i = [];
        for (let w of n.children)
          O(w);
      }, "createSpatialMap"), O = h((w) => {
        let b = m2(w.tilePos);
        i[b] ? i[b].push(w) : i[b] = [w];
      }, "insertIntoSpatialMap"), P = h((w) => {
        let b = m2(w.tilePos);
        if (i[b]) {
          let x = i[b].indexOf(w);
          x >= 0 && i[b].splice(x, 1);
        }
      }, "removeFromSpatialMap"), K = h(() => {
        let w = false;
        for (let b of n.children) {
          let x = n.pos2Tile(b.pos);
          (b.tilePos.x != x.x || b.tilePos.y != x.y) && (w = true, P(b), b.tilePos.x = x.x, b.tilePos.y = x.y, O(b));
        }
        w && n.trigger("spatial_map_changed");
      }, "updateSpatialMap"), S = h(() => {
        let w = n.getSpatialMap(), b = n.numRows() * n.numColumns();
        c ? c.length = b : c = new Array(b), c.fill(1, 0, b);
        for (let x = 0; x < w.length; x++) {
          let M = w[x];
          if (M) {
            let L = 0;
            for (let H of M)
              if (H.isObstacle) {
                L = 1 / 0;
                break;
              } else
                L += H.cost;
            c[x] = L || 1;
          }
        }
      }, "createCostMap"), I = h(() => {
        let w = n.getSpatialMap(), b = n.numRows() * n.numColumns();
        p ? p.length = b : p = new Array(b), p.fill(15, 0, b);
        for (let x = 0; x < w.length; x++) {
          let M = w[x];
          if (M) {
            let L = M.length, H = 15;
            for (let X = 0; X < L; X++)
              H |= M[X].edgeMask;
            p[x] = H;
          }
        }
      }, "createEdgeMap"), it = h(() => {
        let w = n.numRows() * n.numColumns(), b = h((M, L) => {
          let H = [];
          for (H.push(M); H.length > 0; ) {
            let X = H.pop();
            T(X).forEach((rt) => {
              f[rt] < 0 && (f[rt] = L, H.push(rt));
            });
          }
        }, "traverse");
        f ? f.length = w : f = new Array(w), f.fill(-1, 0, w);
        let x = 0;
        for (let M = 0; M < c.length; M++) {
          if (f[M] >= 0) {
            x++;
            continue;
          }
          b(M, x), x++;
        }
      }, "createConnectivityMap"), U = h((w, b) => c[b], "getCost"), j = h((w, b) => {
        let x = v(w), M = v(b);
        return x.dist(M);
      }, "getHeuristic"), T = h((w, b) => {
        let x = [], M = Math.floor(w % o), L = M > 0 && p[w] & 1 && c[w - 1] !== 1 / 0, H = w >= o && p[w] & 2 && c[w - o] !== 1 / 0, X = M < o - 1 && p[w] & 4 && c[w + 1] !== 1 / 0, rt = w < o * s - o - 1 && p[w] & 8 && c[w + o] !== 1 / 0;
        return b ? (L && (H && x.push(w - o - 1), x.push(w - 1), rt && x.push(w + o - 1)), H && x.push(w - o), X && (H && x.push(w - o + 1), x.push(w + 1), rt && x.push(w + o + 1)), rt && x.push(w + o)) : (L && x.push(w - 1), H && x.push(w - o), X && x.push(w + 1), rt && x.push(w + o)), x;
      }, "getNeighbours"), dt = { id: "level", tileWidth() {
        return r.tileWidth;
      }, tileHeight() {
        return r.tileHeight;
      }, spawn(w, ...b) {
        let x = y(...b), M = (() => {
          if (typeof w == "string") {
            if (r.tiles[w]) {
              if (typeof r.tiles[w] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return r.tiles[w](x);
            } else if (r.wildcardTile)
              return r.wildcardTile(w, x);
          } else {
            if (Array.isArray(w))
              return w;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!M)
          return null;
        let L = false, H = false;
        for (let rt of M)
          rt.id === "tile" && (H = true), rt.id === "pos" && (L = true);
        L || M.push(le()), H || M.push(br());
        let X = n.add(M);
        return L && (X.tilePosOffset = X.pos.clone()), X.tilePos = x, i && (O(X), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), X;
      }, numColumns() {
        return o;
      }, numRows() {
        return s;
      }, levelWidth() {
        return o * this.tileWidth();
      }, levelHeight() {
        return s * this.tileHeight();
      }, tile2Pos(...w) {
        return y(...w).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...w) {
        let b = y(...w);
        return y(Math.floor(b.x / this.tileWidth()), Math.floor(b.y / this.tileHeight()));
      }, getSpatialMap() {
        return i || B(), i;
      }, onSpatialMapChanged(w) {
        return this.on("spatial_map_changed", w);
      }, onNavigationMapInvalid(w) {
        return this.on("navigation_map_invalid", w);
      }, getAt(w) {
        i || B();
        let b = m2(w);
        return i[b] || [];
      }, update() {
        i && K();
      }, invalidateNavigationMap() {
        c = null, p = null, f = null;
      }, onNavigationMapChanged(w) {
        return this.on("navigation_map_changed", w);
      }, getTilePath(w, b, x = {}) {
        if (c || S(), p || I(), f || it(), w.x < 0 || w.x >= o || w.y < 0 || w.y >= s || b.x < 0 || b.x >= o || b.y < 0 || b.y >= s)
          return null;
        let M = m2(w), L = m2(b);
        if (c[L] === 1 / 0)
          return null;
        if (M === L)
          return [];
        if (f[M] != -1 && f[M] !== f[L])
          return null;
        let H = new Us((vt, Fr) => vt.cost < Fr.cost);
        H.insert({ cost: 0, node: M });
        let X = /* @__PURE__ */ new Map();
        X.set(M, M);
        let rt = /* @__PURE__ */ new Map();
        for (rt.set(M, 0); H.length !== 0; ) {
          let vt = H.remove()?.node;
          if (vt === L)
            break;
          let Fr = T(vt, x.allowDiagonals);
          for (let Lt of Fr) {
            let Cr = (rt.get(vt) || 0) + U(vt, Lt) + j(Lt, L);
            (!rt.has(Lt) || Cr < rt.get(Lt)) && (rt.set(Lt, Cr), H.insert({ cost: Cr, node: Lt }), X.set(Lt, vt));
          }
        }
        let Tr = [], pe = L, ao = v(pe);
        for (Tr.push(ao); pe !== M; ) {
          pe = X.get(pe);
          let vt = v(pe);
          Tr.push(vt);
        }
        return Tr.reverse();
      }, getPath(w, b, x = {}) {
        let M = this.tileWidth(), L = this.tileHeight(), H = this.getTilePath(this.pos2Tile(w), this.pos2Tile(b), x);
        return H ? [w, ...H.slice(1, -1).map((X) => X.scale(M, L).add(M / 2, L / 2)), b] : null;
      } };
      return n.use(dt), n.onNavigationMapInvalid(() => {
        n.invalidateNavigationMap(), n.trigger("navigation_map_changed");
      }), t.forEach((w, b) => {
        let x = w.split("");
        o = Math.max(x.length, o), x.forEach((M, L) => {
          n.spawn(M, y(L, b));
        });
      }), n;
    }
    u(Ui, "Ps"), h(Ui, "addLevel");
    function ki(t = {}) {
      let r = null, n = null, s = null, o = null;
      return { id: "agent", require: ["pos", "tile"], agentSpeed: t.speed ?? 100, allowDiagonals: t.allowDiagonals ?? true, getDistanceToTarget() {
        return r ? this.pos.dist(r) : 0;
      }, getNextLocation() {
        return n && s ? n[s] : null;
      }, getPath() {
        return n ? n.slice() : null;
      }, getTarget() {
        return r;
      }, isNavigationFinished() {
        return n ? s === null : true;
      }, isTargetReachable() {
        return n !== null;
      }, isTargetReached() {
        return r ? this.pos.eq(r) : true;
      }, setTarget(i) {
        r = i, n = this.getLevel().getPath(this.pos, r, { allowDiagonals: this.allowDiagonals }), s = n ? 0 : null, n ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
          n && s !== null && (n = this.getLevel().getPath(this.pos, r, { allowDiagonals: this.allowDiagonals }), s = n ? 0 : null, n ? this.trigger("navigation-next", this, n[s]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => o.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, n[s])) : this.trigger("navigation-ended", this);
      }, update() {
        if (n && s !== null) {
          if (this.pos.sdist(n[s]) < 2)
            if (s === n.length - 1) {
              this.pos = r.clone(), s = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              s++, this.trigger("navigation-next", this, n[s]);
          this.moveTo(n[s], this.agentSpeed);
        }
      }, onNavigationStarted(i) {
        return this.on("navigation-started", i);
      }, onNavigationNext(i) {
        return this.on("navigation-next", i);
      }, onNavigationEnded(i) {
        return this.on("navigation-ended", i);
      }, onTargetReached(i) {
        return this.on("target-reached", i);
      }, inspect() {
        return JSON.stringify({ target: JSON.stringify(r), path: JSON.stringify(n) });
      } };
    }
    u(ki, "Ms"), h(ki, "agent");
    function Di(t) {
      let r = d.canvas.captureStream(t), n = G.ctx.createMediaStreamDestination();
      G.masterNode.connect(n);
      let s = new MediaRecorder(r), o = [];
      return s.ondataavailable = (i) => {
        i.data.size > 0 && o.push(i.data);
      }, s.onerror = () => {
        G.masterNode.disconnect(n), r.getTracks().forEach((i) => i.stop());
      }, s.start(), { resume() {
        s.resume();
      }, pause() {
        s.pause();
      }, stop() {
        return s.stop(), G.masterNode.disconnect(n), r.getTracks().forEach((i) => i.stop()), new Promise((i) => {
          s.onstop = () => {
            i(new Blob(o, { type: "video/mp4" }));
          };
        });
      }, download(i = "kaboom.mp4") {
        this.stop().then((c) => Dr(i, c));
      } };
    }
    u(Di, "Ds"), h(Di, "record");
    function Ni() {
      return document.activeElement === d.canvas;
    }
    u(Ni, "Bs"), h(Ni, "isFocused");
    function Oi(t) {
      t.destroy();
    }
    u(Oi, "Fs"), h(Oi, "destroy");
    let ce = g.root.add.bind(g.root), no = g.root.readd.bind(g.root), io = g.root.removeAll.bind(g.root), Li = g.root.get.bind(g.root);
    function Sr(t = 2, r = 1) {
      let n = 0;
      return { id: "boom", require: ["scale"], update() {
        let s = Math.sin(n * t) * r;
        s < 0 && this.destroy(), this.scale = y(s), n += ut();
      } };
    }
    u(Sr, "Yn"), h(Sr, "boom");
    let so = Qt(null, vo), oo = Qt(null, yo);
    function qi(t, r = {}) {
      let n = ce([le(t), vr()]), s = (r.speed || 1) * 5, o = r.scale || 1;
      n.add([Re(oo), ue(0), Se("center"), Sr(s, o), ...r.comps ?? []]);
      let i = n.add([Re(so), ue(0), Se("center"), Vr(0.4 / s, () => i.use(Sr(s, o))), ...r.comps ?? []]);
      return i.onDestroy(() => n.destroy()), n;
    }
    u(qi, "js"), h(qi, "addKaboom");
    function Gi() {
      for (let t of navigator.getGamepads()) {
        if (!t)
          continue;
        let r = (e.gamepads ?? {})[t.id] ?? os[t.id] ?? os.default;
        for (let n = 0; n < t.buttons.length; n++)
          t.buttons[n].pressed ? (d.gamepadButtonState.down.has(r.buttons[n]) || (d.gamepadButtonState.press(r.buttons[n]), g.ev.trigger("gamepadButtonPress", r.buttons[n])), g.ev.trigger("gamepadButtonDown", r.buttons[n])) : d.gamepadButtonState.down.has(r.buttons[n]) && (d.gamepadButtonState.release(r.buttons[n]), g.ev.trigger("gamepadButtonRelease", r.buttons[n]));
        for (let n in r.sticks) {
          let s = r.sticks[n], o = t.axes[s.x], i = t.axes[s.y];
          g.ev.trigger("gamepadStick", n, new V(o, i));
        }
      }
    }
    u(Gi, "Ns"), h(Gi, "processGamepad");
    function Yi() {
      g.ev.trigger("input"), d.keyState.down.forEach((t) => g.ev.trigger("keyDown", t)), d.mouseState.down.forEach((t) => g.ev.trigger("mouseDown", t)), d.virtualButtonState.down.forEach((t) => g.ev.trigger("virtualButtonDown", t)), Gi();
    }
    u(Yi, "_s"), h(Yi, "inputFrame");
    function Rr() {
      g.root.update();
    }
    u(Rr, "Xn"), h(Rr, "updateFrame");
    class fe {
      source;
      target;
      displacement;
      resolved = false;
      constructor(r, n, s, o = false) {
        this.source = r, this.target = n, this.displacement = s, this.resolved = o;
      }
      reverse() {
        return new fe(this.target, this.source, this.displacement.scale(-1), this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    u(fe, "xt"), h(fe, "Collision");
    function Hi() {
      let t = {}, r = e.hashGridSize || Ro, n = new tt(), s = [];
      function o(i) {
        if (s.push(n.clone()), i.pos && n.translate(i.pos), i.scale && n.scale(i.scale), i.angle && n.rotate(i.angle), i.transform = n.clone(), i.c("area") && !i.paused) {
          let c = i, p = c.worldArea().bbox(), f = Math.floor(p.pos.x / r), m2 = Math.floor(p.pos.y / r), v = Math.ceil((p.pos.x + p.width) / r), B = Math.ceil((p.pos.y + p.height) / r), O = /* @__PURE__ */ new Set();
          for (let P = f; P <= v; P++)
            for (let K = m2; K <= B; K++)
              if (!t[P])
                t[P] = {}, t[P][K] = [c];
              else if (!t[P][K])
                t[P][K] = [c];
              else {
                let S = t[P][K];
                t:
                  for (let I of S) {
                    if (!I.exists() || O.has(I.id))
                      continue;
                    for (let U of c.collisionIgnore)
                      if (I.is(U))
                        continue t;
                    for (let U of I.collisionIgnore)
                      if (c.is(U))
                        continue t;
                    let it = Fs(c.worldArea(), I.worldArea());
                    if (it) {
                      let U = new fe(c, I, it);
                      c.trigger("collideUpdate", I, U);
                      let j = U.reverse();
                      j.resolved = U.resolved, I.trigger("collideUpdate", c, j);
                    }
                    O.add(I.id);
                  }
                S.push(c);
              }
        }
        i.children.forEach(o), n = s.pop();
      }
      u(o, "c"), h(o, "checkObj"), o(g.root);
    }
    u(Hi, "ks"), h(Hi, "checkFrame");
    function Ki() {
      let t = g.cam, r = V.fromAngle(me(0, 360)).scale(t.shake);
      t.shake = Et(t.shake, 0, 5 * ut()), t.transform = new tt().translate(de()).scale(t.scale).rotate(t.angle).translate((t.pos ?? de()).scale(-1).add(r)), g.root.draw(), mt();
    }
    u(Ki, "Hs"), h(Ki, "drawFrame");
    function ji() {
      let t = pt();
      g.ev.numListeners("loading") > 0 ? g.ev.trigger("loading", t) : gt(() => {
        let r = et() / 2, n = 24, s = y(et() / 2, J() / 2).sub(y(r / 2, n / 2));
        ot({ pos: y(0), width: et(), height: J(), color: Y(0, 0, 0) }), ot({ pos: s, width: r, height: n, fill: false, outline: { width: 4 } }), ot({ pos: s, width: r * t, height: n });
      });
    }
    u(ji, "qs"), h(ji, "drawLoadScreen");
    function Mr(t, r) {
      gt(() => {
        let n = y(8);
        lt(), z(t);
        let s = St({ text: r, font: Ie, size: 16, pos: n, color: Y(255, 255, 255), fixed: true }), o = s.width + n.x * 2, i = s.height + n.x * 2;
        t.x + o >= et() && z(y(-o, 0)), t.y + i >= J() && z(y(0, -i)), ot({ width: o, height: i, color: Y(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Rt(s), st();
      });
    }
    u(Mr, "Kn"), h(Mr, "drawInspectText");
    function Qi() {
      if (Q.inspect) {
        let t = null;
        for (let r of g.root.get("*", { recursive: true }))
          if (r.c("area") && r.isHovering()) {
            t = r;
            break;
          }
        if (g.root.drawInspect(), t) {
          let r = [], n = t.inspect();
          for (let s in n)
            n[s] ? r.push(`${s}: ${n[s]}`) : r.push(`${s}`);
          Mr(fn(Nt()), r.join(`
`));
        }
        Mr(y(8), `FPS: ${Q.fps()}`);
      }
      Q.paused && gt(() => {
        lt(), z(et(), 0), z(-8, 8);
        let t = 32;
        ot({ width: t, height: t, anchor: "topright", color: Y(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let r = 1; r <= 2; r++)
          ot({ width: 4, height: t * 0.6, anchor: "center", pos: y(-t / 3 * r, t * 0.5), color: Y(255, 255, 255), radius: 2, fixed: true });
        st();
      }), Q.timeScale !== 1 && gt(() => {
        lt(), z(et(), J()), z(-8, -8);
        let t = 8, r = St({ text: Q.timeScale.toFixed(1), font: Ie, size: 16, color: Y(255, 255, 255), pos: y(-t), anchor: "botright", fixed: true });
        ot({ width: r.width + t * 2 + t * 4, height: r.height + t * 2, anchor: "botright", color: Y(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let n = 0; n < 2; n++) {
          let s = Q.timeScale < 1;
          er({ p1: y(-r.width - t * (s ? 2 : 3.5), -t), p2: y(-r.width - t * (s ? 2 : 3.5), -t - r.height), p3: y(-r.width - t * (s ? 3.5 : 2), -t - r.height / 2), pos: y(-n * t * 1 + (s ? -t * 0.5 : 0), 0), color: Y(255, 255, 255), fixed: true });
        }
        Rt(r), st();
      }), Q.curRecording && gt(() => {
        lt(), z(0, J()), z(24, -24), xt({ radius: 12, color: Y(255, 0, 0), opacity: Ur(0, 1, Ee() * 4), fixed: true }), st();
      }), Q.showLog && g.logs.length > 0 && gt(() => {
        lt(), z(0, J()), z(8, -8);
        let t = 8, r = St({ text: g.logs.join(`
`), font: Ie, pos: y(t, -t), anchor: "botleft", size: 16, width: et() * 0.6, lineSpacing: t / 2, fixed: true, styles: { time: { color: Y(127, 127, 127) }, info: { color: Y(255, 255, 255) }, error: { color: Y(255, 0, 127) } } });
        ot({ width: r.width + t * 2, height: r.height + t * 2, anchor: "botleft", color: Y(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Rt(r), st();
      });
    }
    u(Qi, "$s"), h(Qi, "drawDebug");
    function zi() {
      let t = Nt(), r = h((s, o, i) => {
        xt({ radius: 80 / 2, pos: s, outline: { width: 4, color: Y(0, 0, 0) }, opacity: 0.5, fixed: true }), i && ne({ text: i, pos: s, color: Y(0, 0, 0), size: 40, anchor: "center", opacity: 0.5, fixed: true }), se("left") && qe(new ge(s, 80 / 2), t) && g.ev.onOnce("input", () => {
          d.virtualButtonState.press(o), g.ev.trigger("virtualButtonPress", o), d.keyState.press(o), g.ev.trigger("keyPress", o);
        }), ye("left") && g.ev.onOnce("input", () => {
          d.virtualButtonState.release(o), g.ev.trigger("virtualButtonRelease", o), d.keyState.release(o), g.ev.trigger("keyRelease", o);
        });
      }, "drawCircleButton"), n = h((s, o, i) => {
        ot({ width: 64, height: 64, pos: s, outline: { width: 4, color: Y(0, 0, 0) }, radius: 4, anchor: "center", opacity: 0.5, fixed: true }), i && ne({ text: i, pos: s, color: Y(0, 0, 0), size: 40, anchor: "center", opacity: 0.5, fixed: true }), se("left") && $t(new _(s.add(-64 / 2, -64 / 2), 64, 64), t) && g.ev.onOnce("input", () => {
          d.virtualButtonState.press(o), g.ev.trigger("virtualButtonPress", o), d.keyState.press(o), g.ev.trigger("keyPress", o);
        }), ye("left") && g.ev.onOnce("input", () => {
          d.virtualButtonState.release(o), g.ev.trigger("virtualButtonRelease", o), d.keyState.release(o), g.ev.trigger("keyRelease", o);
        });
      }, "drawSquareButton");
      gt(() => {
        r(y(et() - 80, J() - 160), "a"), r(y(et() - 160, J() - 80), "b"), n(y(60, J() - 124), "left"), n(y(188, J() - 124), "right"), n(y(124, J() - 188), "up"), n(y(124, J() - 60), "down");
      });
    }
    u(zi, "zs"), h(zi, "drawVirtualControls"), e.debug !== false && Ar(), e.burp && wr();
    function Ji(t) {
      g.ev.on("loading", t);
    }
    u(Ji, "Ys"), h(Ji, "onLoading");
    function Xi(t) {
      g.ev.on("resize", t);
    }
    u(Xi, "Xs"), h(Xi, "onResize");
    function Zi(t) {
      g.ev.on("gamepadConnect", t);
    }
    u(Zi, "Ks"), h(Zi, "onGamepadConnect");
    function Wi(t) {
      g.ev.on("gamepadDisconnect", t);
    }
    u(Wi, "Js"), h(Wi, "onGamepadDisconnect");
    function _i(t) {
      g.ev.on("error", t);
    }
    u(_i, "Ws"), h(_i, "onError");
    function Me(t) {
      Br(() => {
        gt(() => {
          let r = et(), n = J(), s = { size: 36, width: r - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Ie, fixed: true };
          ot({ width: r, height: n, color: Y(0, 0, 255), fixed: true });
          let o = St({ ...s, text: t.name, pos: y(32), color: Y(255, 128, 0), fixed: true });
          Rt(o), ne({ ...s, text: t.message, pos: y(32, 32 + o.height + 16), fixed: true }), st(), g.ev.trigger("error", t);
        });
      });
    }
    u(Me, "qt"), h(Me, "handleErr");
    function $i() {
      d.keyState.update(), d.mouseState.update(), d.virtualButtonState.update(), d.gamepadButtonState.update(), d.charInputted = [], d.isMouseMoved = false;
    }
    u($i, "Qs"), h($i, "resetInputState");
    function Br(t) {
      d.loopID !== null && cancelAnimationFrame(d.loopID);
      let r = h((n) => {
        if (d.stopped)
          return;
        if (document.visibilityState !== "visible") {
          d.loopID = requestAnimationFrame(r);
          return;
        }
        let s = n / 1e3, o = s - d.realTime;
        d.realTime = s, d.skipTime || (d.dt = o, d.time += ut(), d.fpsCounter.tick(d.dt)), d.skipTime = false, d.numFrames++, rn(), t(), sn(), $i(), g.ev.trigger("frameEnd"), d.loopID = requestAnimationFrame(r);
      }, "frame");
      r(0);
    }
    u(Br, "Jn"), h(Br, "run");
    function ts() {
      g.ev.onOnce("frameEnd", () => {
        d.stopped = true, l.clear(l.COLOR_BUFFER_BIT | l.DEPTH_BUFFER_BIT | l.STENCIL_BUFFER_BIT);
        let t = l.getParameter(l.MAX_TEXTURE_IMAGE_UNITS);
        for (let r = 0; r < t; r++)
          l.activeTexture(l.TEXTURE0 + r), l.bindTexture(l.TEXTURE_2D, null), l.bindTexture(l.TEXTURE_CUBE_MAP, null);
        l.bindBuffer(l.ARRAY_BUFFER, null), l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null), l.bindRenderbuffer(l.RENDERBUFFER, null), l.bindFramebuffer(l.FRAMEBUFFER, null), a.forEach((r) => r()), l.deleteBuffer(A.vbuf), l.deleteBuffer(A.ibuf);
        for (let r in nt)
          d.canvas.removeEventListener(r, nt[r]);
        for (let r in ie)
          document.removeEventListener(r, ie[r]);
        for (let r in Mt)
          window.removeEventListener(r, Mt[r]);
      });
    }
    u(ts, "Zs"), h(ts, "quit");
    function Be(t, r, n, s, o = Ce.linear) {
      let i = 0, c = [], p = pr(() => {
        i += ut();
        let f = Math.min(i / n, 1);
        s(Et(t, r, o(f))), f === 1 && (p.cancel(), s(r), c.forEach((m2) => m2()));
      });
      return { get paused() {
        return p.paused;
      }, set paused(f) {
        p.paused = f;
      }, onEnd(f) {
        c.push(f);
      }, then(f) {
        return this.onEnd(f), this;
      }, cancel() {
        p.cancel();
      }, finish() {
        p.cancel(), s(r), c.forEach((f) => f());
      } };
    }
    u(Be, "$t"), h(Be, "tween");
    let Te = true;
    Br(() => {
      R.loaded || pt() === 1 && !Te && (R.loaded = true, g.ev.trigger("load")), !R.loaded && e.loadingScreen !== false || Te ? ji() : (Yi(), Q.paused || Rr(), Hi(), Ki(), e.debug !== false && Qi(), e.virtualControls && dr() && zi()), Te && (Te = false);
    }), ar();
    let Wt = { VERSION: Eo, loadRoot: ee, loadProgress: pt, loadSprite: Qt, loadSpriteAtlas: He, loadSound: Zr, loadBitmapFont: jr, loadFont: Kr, loadShader: Jr, loadShaderURL: Xr, loadAseprite: zr, loadPedit: Qr, loadBean: Wr, load: Ht, getSprite: je, getSound: Qe, getFont: ze, getBitmapFont: Je, getShader: Xe, Asset: D, SpriteData: C, SoundData: N, width: et, height: J, center: de, dt: ut, time: Ee, screenshot: Mn, record: Di, isFocused: Ni, setCursor: lr, getCursor: Bn, setCursorLocked: Tn, isCursorLocked: Fn, setFullscreen: Cn, isFullscreen: ur, isTouchScreen: dr, onLoad: yr, onLoading: Ji, onResize: Xi, onGamepadConnect: Zi, onGamepadDisconnect: Wi, onError: _i, camPos: Pn, camScale: In, camRot: Un, shake: kn, toScreen: xe, toWorld: cr, setGravity: si, getGravity: oi, setBackground: ai, getBackground: hi, getGamepads: li, add: ce, destroy: Oi, destroyAll: io, get: Li, readd: no, pos: le, scale: ue, rotate: ui, color: di, opacity: ci, anchor: Se, area: Ai, sprite: Re, text: wi, rect: Vi, circle: yi, uvquad: vi, outline: Ei, body: xi, doubleJump: bi, shader: Si, timer: Vr, fixed: Ri, stay: vr, health: Mi, lifespan: Bi, z: fi, move: gi, offscreen: mi, follow: pi, state: Ti, fadeIn: Fi, tile: br, agent: ki, on: Vt, onUpdate: pr, onDraw: Xs, onAdd: be, onDestroy: gr, onClick: Ln, onCollide: Dn, onCollideUpdate: Nn, onCollideEnd: On, onHover: qn, onHoverUpdate: Gn, onHoverEnd: Yn, onKeyDown: Zs, onKeyPress: Bt, onKeyPressRepeat: Ws, onKeyRelease: _s, onMouseDown: Kn, onMousePress: mr, onMouseRelease: jn, onMouseMove: Qn, onCharInput: zn, onTouchStart: Jn, onTouchMove: Xn, onTouchEnd: Zn, onScroll: Wn, onVirtualButtonPress: $n, onVirtualButtonDown: _n, onVirtualButtonRelease: ti, onGamepadButtonDown: ei, onGamepadButtonPress: ri, onGamepadButtonRelease: ni, onGamepadStick: ii, mousePos: Nt, mouseDeltaPos: hr, isKeyDown: wn, isKeyPressed: mn, isKeyPressedRepeat: An, isKeyReleased: Vn, isMouseDown: pn, isMousePressed: se, isMouseReleased: ye, isMouseMoved: gn, isVirtualButtonPressed: vn, isVirtualButtonDown: yn, isVirtualButtonReleased: En, isGamepadButtonPressed: xn, isGamepadButtonDown: bn, isGamepadButtonReleased: Sn, charInputted: Rn, loop: Hn, wait: he, play: _e, volume: tn, burp: $e, audioCtx: G.ctx, Timer: ke, Line: yt, Rect: _, Circle: ge, Polygon: Yt, Vec2: V, Color: k, Mat4: tt, Quad: W, RNG: Or, rand: me, randi: Lr, randSeed: Es, vec2: y, rgb: Y, hsl2rgb: fo, quad: Z, choose: bs, chance: xs, lerp: Et, tween: Be, easings: Ce, map: Ne, mapc: ys, wave: Ur, deg2rad: At, rad2deg: te, testLineLine: _t, testRectRect: Ss, testRectLine: Ms, testRectPoint: $t, testCirclePolygon: Ts, testLinePoint: Bs, testLineCircle: qr, drawSprite: hn, drawText: ne, formatText: St, drawRect: ot, drawLine: Jt, drawLines: tr, drawTriangle: er, drawCircle: xt, drawEllipse: rr, drawUVQuad: Dt, drawPolygon: bt, drawFormattedText: Rt, drawMasked: ln, drawSubtracted: un, pushTransform: lt, popTransform: st, pushTranslate: z, pushScale: Ut, pushRotate: kt, pushMatrix: an, usePostEffect: nn, debug: Q, scene: Ci, go: Pi, addLevel: Ui, getData: Ii, setData: Er, download: Ge, downloadJSON: Is, downloadText: Hr, downloadBlob: Dr, plug: xr, ASCII_CHARS: ls, canvas: d.canvas, addKaboom: qi, LEFT: V.LEFT, RIGHT: V.RIGHT, UP: V.UP, DOWN: V.DOWN, RED: k.RED, GREEN: k.GREEN, BLUE: k.BLUE, YELLOW: k.YELLOW, MAGENTA: k.MAGENTA, CYAN: k.CYAN, WHITE: k.WHITE, BLACK: k.BLACK, quit: ts, Event: ct, EventHandler: qt, EventController: Ft };
    if (e.plugins && e.plugins.forEach(xr), e.global !== false)
      for (let t in Wt)
        window[t] = Wt[t];
    return d.canvas.focus(), Wt;
  }, "default");
  function Po(e) {
    return { id: "mandarina_textbox", require: [], write(a) {
    }, clear() {
    }, skip() {
    }, show() {
    }, hide() {
    } };
  }
  u(Po, "textboxComp");
  function js(e, a) {
    let d = e.k, l = { width: a?.width ?? d.width() - d.width() / 16, height: a?.height ?? 300, pos: a?.pos ?? d.vec2(0), sprite: a?.sprite ?? void 0, textAlign: a?.textAlign ?? "left", textSize: a?.textSize ?? 16, textFont: a?.textFont ?? "sans-serif", textColor: a?.textColor ?? "#000000" }, E = (l.sprite, l.width), F = (l.sprite, l.height);
    d.debug.log(F);
    let q = d.add([d.pos(d.center().x, d.height()), d.anchor("bot"), Po(d)]);
    return q.add([d.z(10), d.anchor("bot"), l.sprite ? d.sprite(l.sprite) : d.rect(l.width, l.height)]), q.text = q.add([d.pos(-E / 2, -F), d.z(20), d.text("Ponlo en automatico, semifanatico"), d.color(d.BLACK)]), q;
  }
  u(js, "addTextbox");
  function Qs(e) {
    let a = e.k;
    a.scene("mandarina_novel", () => {
      js(e, {}), a.onKeyDown("up", () => {
        a.camScale(a.camScale().add(a.vec2(a.dt())));
      }), a.onKeyDown("down", () => {
        a.camScale(a.camScale().sub(a.vec2(a.dt())));
      });
    });
  }
  u(Qs, "startNovel");
  function zs(e, a, d) {
    if (this.data.characters.has(e))
      throw new Error(`Character with id "${e}" already exists.`);
    this.data.characters.set(e, { id: e, name: a, opt: d });
  }
  u(zs, "addCharacter");
  function Js(e) {
    return { k: e, data: { chapters: /* @__PURE__ */ new Map(), characters: /* @__PURE__ */ new Map(), current: { chapter: 0, action: 0 } }, character: zs };
  }
  u(Js, "mandarinaPlugin");
  function Io() {
    let e = Ks({ plugins: [Js] }), a = { ...Js(e) };
    return Qs(a), a;
  }
  u(Io, "mandarina");

  // test/basement.ts
  var m = Io();
  m.character("dude", "Dude");
  m.k.go("mandarina_novel");
})();
