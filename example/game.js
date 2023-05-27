(() => {
  // dist/mandarina.mjs
  var Es = Object.defineProperty;
  var a = (e, n) => Es(e, "name", { value: n, configurable: true });
  var Xr = Object.defineProperty;
  var bs = a((e, n, d) => n in e ? Xr(e, n, { enumerable: true, configurable: true, writable: true, value: d }) : e[n] = d, "fi");
  var o = a((e, n) => Xr(e, "name", { value: n, configurable: true }), "o");
  var Ss = a((e, n) => {
    for (var d in n)
      Xr(e, d, { get: n[d], enumerable: true });
  }, "mi");
  var Re = a((e, n, d) => (bs(e, typeof n != "symbol" ? n + "" : n, d), d), "Ee");
  var Rs = (() => {
    for (var e = new Uint8Array(128), n = 0; n < 64; n++)
      e[n < 26 ? n + 65 : n < 52 ? n + 71 : n < 62 ? n - 4 : n * 4 - 205] = n;
    return (d) => {
      for (var w = d.length, S = new Uint8Array((w - (d[w - 1] == "=") - (d[w - 2] == "=")) * 3 / 4 | 0), B = 0, H = 0; B < w; ) {
        var k = e[d.charCodeAt(B++)], G = e[d.charCodeAt(B++)], Q = e[d.charCodeAt(B++)], he = e[d.charCodeAt(B++)];
        S[H++] = k << 2 | G >> 4, S[H++] = G << 4 | Q >> 2, S[H++] = Q << 6 | he;
      }
      return S;
    };
  })();
  function Fe(e) {
    return e * Math.PI / 180;
  }
  a(Fe, "Re");
  o(Fe, "deg2rad");
  function vt(e) {
    return e * 180 / Math.PI;
  }
  a(vt, "st");
  o(vt, "rad2deg");
  function je(e, n, d) {
    return n > d ? je(e, d, n) : Math.min(Math.max(e, n), d);
  }
  a(je, "Ne");
  o(je, "clamp");
  function Be(e, n, d) {
    if (typeof e == "number" && typeof n == "number")
      return e + (n - e) * d;
    if (e instanceof x && n instanceof x || e instanceof O && n instanceof O)
      return e.lerp(n, d);
    throw new Error(`Bad value for lerp(): ${e}, ${n}. Only number, Vec2 and Color is supported.`);
  }
  a(Be, "Me");
  o(Be, "lerp");
  function gr(e, n, d, w, S) {
    return w + (e - n) / (d - n) * (S - w);
  }
  a(gr, "$t");
  o(gr, "map");
  function Ii(e, n, d, w, S) {
    return je(gr(e, n, d, w, S), w, S);
  }
  a(Ii, "fr");
  o(Ii, "mapc");
  var Ve = a(class {
    x = 0;
    y = 0;
    constructor(e = 0, n = e) {
      this.x = e, this.y = n;
    }
    static fromAngle(e) {
      let n = Fe(e);
      return new Ve(Math.cos(n), Math.sin(n));
    }
    clone() {
      return new Ve(this.x, this.y);
    }
    add(...e) {
      let n = R(...e);
      return new Ve(this.x + n.x, this.y + n.y);
    }
    sub(...e) {
      let n = R(...e);
      return new Ve(this.x - n.x, this.y - n.y);
    }
    scale(...e) {
      let n = R(...e);
      return new Ve(this.x * n.x, this.y * n.y);
    }
    dist(...e) {
      let n = R(...e);
      return this.sub(n).len();
    }
    sdist(...e) {
      let n = R(...e);
      return this.sub(n).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new Ve(0) : this.scale(1 / e);
    }
    normal() {
      return new Ve(this.y, -this.x);
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
      let n = R(...e);
      return vt(Math.atan2(this.y - n.y, this.x - n.x));
    }
    angleBetween(...e) {
      let n = R(...e);
      return vt(Math.atan2(this.cross(n), this.dot(n)));
    }
    lerp(e, n) {
      return new Ve(Be(this.x, e.x, n), Be(this.y, e.y, n));
    }
    slerp(e, n) {
      let d = this.dot(e), w = this.cross(e), S = Math.atan2(w, d);
      return this.scale(Math.sin((1 - n) * S)).add(e.scale(Math.sin(n * S))).scale(1 / w);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new Ve(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new de(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  }, "be");
  var x = Ve;
  o(x, "Vec2"), Re(x, "LEFT", new Ve(-1, 0)), Re(x, "RIGHT", new Ve(1, 0)), Re(x, "UP", new Ve(0, -1)), Re(x, "DOWN", new Ve(0, 1));
  function R(...e) {
    if (e.length === 1) {
      if (e[0] instanceof x)
        return new x(e[0].x, e[0].y);
      if (Array.isArray(e[0]) && e[0].length === 2)
        return new x(...e[0]);
    }
    return new x(...e);
  }
  a(R, "S");
  o(R, "vec2");
  var oe = a(class {
    r = 255;
    g = 255;
    b = 255;
    constructor(e, n, d) {
      this.r = je(e, 0, 255), this.g = je(n, 0, 255), this.b = je(d, 0, 255);
    }
    static fromArray(e) {
      return new oe(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number")
        return new oe(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return new oe(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(e, n, d) {
      if (n == 0)
        return new oe(255 * d, 255 * d, 255 * d);
      let w = o((Q, he, E) => (E < 0 && (E += 1), E > 1 && (E -= 1), E < 1 / 6 ? Q + (he - Q) * 6 * E : E < 1 / 2 ? he : E < 2 / 3 ? Q + (he - Q) * (2 / 3 - E) * 6 : Q), "hue2rgb"), S = d < 0.5 ? d * (1 + n) : d + n - d * n, B = 2 * d - S, H = w(B, S, e + 1 / 3), k = w(B, S, e), G = w(B, S, e - 1 / 3);
      return new oe(Math.round(H * 255), Math.round(k * 255), Math.round(G * 255));
    }
    clone() {
      return new oe(this.r, this.g, this.b);
    }
    lighten(e) {
      return new oe(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new oe(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new oe(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, n) {
      return new oe(Be(this.r, e.r, n), Be(this.g, e.g, n), Be(this.b, e.b, n));
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
  }, "ae");
  var O = oe;
  o(O, "Color"), Re(O, "RED", new oe(255, 0, 0)), Re(O, "GREEN", new oe(0, 255, 0)), Re(O, "BLUE", new oe(0, 0, 255)), Re(O, "YELLOW", new oe(255, 255, 0)), Re(O, "MAGENTA", new oe(255, 0, 255)), Re(O, "CYAN", new oe(0, 255, 255)), Re(O, "WHITE", new oe(255, 255, 255)), Re(O, "BLACK", new oe(0, 0, 0));
  function X(...e) {
    if (e.length === 0)
      return new O(255, 255, 255);
    if (e.length === 1) {
      if (e[0] instanceof O)
        return e[0].clone();
      if (typeof e[0] == "string")
        return O.fromHex(e[0]);
      if (Array.isArray(e[0]) && e[0].length === 3)
        return O.fromArray(e[0]);
    }
    return new O(...e);
  }
  a(X, "W");
  o(X, "rgb");
  var Ms = o((e, n, d) => O.fromHSL(e, n, d), "hsl2rgb");
  var se = a(class {
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, n, d, w) {
      this.x = e, this.y = n, this.w = d, this.h = w;
    }
    scale(e) {
      return new se(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new x(this.x, this.y);
    }
    clone() {
      return new se(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  }, "Q");
  o(se, "Quad");
  function re(e, n, d, w) {
    return new se(e, n, d, w);
  }
  a(re, "ue");
  o(re, "quad");
  var ae = a(class {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new ae([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new ae([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = Fe(-e);
      let n = Math.cos(e), d = Math.sin(e);
      return new ae([1, 0, 0, 0, 0, n, -d, 0, 0, d, n, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = Fe(-e);
      let n = Math.cos(e), d = Math.sin(e);
      return new ae([n, 0, d, 0, 0, 1, 0, 0, -d, 0, n, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = Fe(-e);
      let n = Math.cos(e), d = Math.sin(e);
      return new ae([n, -d, 0, 0, d, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = Fe(-e);
      let n = Math.cos(e), d = Math.sin(e), w = this.m[0], S = this.m[1], B = this.m[4], H = this.m[5];
      return this.m[0] = w * n + S * d, this.m[1] = -w * d + S * n, this.m[4] = B * n + H * d, this.m[5] = -B * d + H * n, this;
    }
    mult(e) {
      let n = [];
      for (let d = 0; d < 4; d++)
        for (let w = 0; w < 4; w++)
          n[d * 4 + w] = this.m[0 * 4 + w] * e.m[d * 4 + 0] + this.m[1 * 4 + w] * e.m[d * 4 + 1] + this.m[2 * 4 + w] * e.m[d * 4 + 2] + this.m[3 * 4 + w] * e.m[d * 4 + 3];
      return new ae(n);
    }
    multVec2(e) {
      return new x(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new x(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new x(n, e / n);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new x(e / n, n);
      } else
        return new x(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return vt(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return vt(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new x(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new x(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else
        return new x(0, 0);
    }
    invert() {
      let e = [], n = this.m[10] * this.m[15] - this.m[14] * this.m[11], d = this.m[9] * this.m[15] - this.m[13] * this.m[11], w = this.m[9] * this.m[14] - this.m[13] * this.m[10], S = this.m[8] * this.m[15] - this.m[12] * this.m[11], B = this.m[8] * this.m[14] - this.m[12] * this.m[10], H = this.m[8] * this.m[13] - this.m[12] * this.m[9], k = this.m[6] * this.m[15] - this.m[14] * this.m[7], G = this.m[5] * this.m[15] - this.m[13] * this.m[7], Q = this.m[5] * this.m[14] - this.m[13] * this.m[6], he = this.m[4] * this.m[15] - this.m[12] * this.m[7], E = this.m[4] * this.m[14] - this.m[12] * this.m[6], ve = this.m[5] * this.m[15] - this.m[13] * this.m[7], c = this.m[4] * this.m[13] - this.m[12] * this.m[5], z = this.m[6] * this.m[11] - this.m[10] * this.m[7], Ce = this.m[5] * this.m[11] - this.m[9] * this.m[7], Me = this.m[5] * this.m[10] - this.m[9] * this.m[6], A = this.m[4] * this.m[11] - this.m[8] * this.m[7], $ = this.m[4] * this.m[10] - this.m[8] * this.m[6], ce = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * n - this.m[6] * d + this.m[7] * w, e[4] = -(this.m[4] * n - this.m[6] * S + this.m[7] * B), e[8] = this.m[4] * d - this.m[5] * S + this.m[7] * H, e[12] = -(this.m[4] * w - this.m[5] * B + this.m[6] * H), e[1] = -(this.m[1] * n - this.m[2] * d + this.m[3] * w), e[5] = this.m[0] * n - this.m[2] * S + this.m[3] * B, e[9] = -(this.m[0] * d - this.m[1] * S + this.m[3] * H), e[13] = this.m[0] * w - this.m[1] * B + this.m[2] * H, e[2] = this.m[1] * k - this.m[2] * G + this.m[3] * Q, e[6] = -(this.m[0] * k - this.m[2] * he + this.m[3] * E), e[10] = this.m[0] * ve - this.m[1] * he + this.m[3] * c, e[14] = -(this.m[0] * Q - this.m[1] * E + this.m[2] * c), e[3] = -(this.m[1] * z - this.m[2] * Ce + this.m[3] * Me), e[7] = this.m[0] * z - this.m[2] * A + this.m[3] * $, e[11] = -(this.m[0] * Ce - this.m[1] * A + this.m[3] * ce), e[15] = this.m[0] * Me - this.m[1] * $ + this.m[2] * ce;
      let ne = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let _ = 0; _ < 4; _++)
        for (let me = 0; me < 4; me++)
          e[_ * 4 + me] *= 1 / ne;
      return new ae(e);
    }
    clone() {
      return new ae([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  }, "J");
  o(ae, "Mat4");
  function Jr(e, n, d, w = Math.sin) {
    return e + (w(d) + 1) / 2 * (n - e);
  }
  a(Jr, "Mn");
  o(Jr, "wave");
  var Ts = 1103515245;
  var Ps = 12345;
  var wi = 2147483648;
  var _r = a(class {
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (Ts * this.seed + Ps) % wi, this.seed / wi;
    }
    genNumber(e, n) {
      return e + this.gen() * (n - e);
    }
    genVec2(e, n) {
      return new x(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
    }
    genColor(e, n) {
      return new O(this.genNumber(e.r, n.r), this.genNumber(e.g, n.g), this.genNumber(e.b, n.b));
    }
    genAny(...e) {
      if (e.length === 0)
        return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number")
          return this.genNumber(0, e[0]);
        if (e[0] instanceof x)
          return this.genVec2(R(0, 0), e[0]);
        if (e[0] instanceof O)
          return this.genColor(X(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number")
          return this.genNumber(e[0], e[1]);
        if (e[0] instanceof x && e[1] instanceof x)
          return this.genVec2(e[0], e[1]);
        if (e[0] instanceof O && e[1] instanceof O)
          return this.genColor(e[0], e[1]);
      }
    }
  }, "rt");
  o(_r, "RNG");
  var Zr = new _r(Date.now());
  function Ui(e) {
    return e != null && (Zr.seed = e), Zr.seed;
  }
  a(Ui, "pr");
  o(Ui, "randSeed");
  function Wt(...e) {
    return Zr.genAny(...e);
  }
  a(Wt, "xt");
  o(Wt, "rand");
  function $r(...e) {
    return Math.floor(Wt(...e));
  }
  a($r, "Dn");
  o($r, "randi");
  function Ni(e) {
    return Wt() <= e;
  }
  a(Ni, "gr");
  o(Ni, "chance");
  function Li(e) {
    return e[$r(e.length)];
  }
  a(Li, "wr");
  o(Li, "choose");
  function Oi(e, n) {
    return e.pos.x + e.width > n.pos.x && e.pos.x < n.pos.x + n.width && e.pos.y + e.height > n.pos.y && e.pos.y < n.pos.y + n.height;
  }
  a(Oi, "br");
  o(Oi, "testRectRect");
  function Gi(e, n) {
    if (e.p1.x === e.p2.x && e.p1.y === e.p2.y || n.p1.x === n.p2.x && n.p1.y === n.p2.y)
      return null;
    let d = (n.p2.y - n.p1.y) * (e.p2.x - e.p1.x) - (n.p2.x - n.p1.x) * (e.p2.y - e.p1.y);
    if (d === 0)
      return null;
    let w = ((n.p2.x - n.p1.x) * (e.p1.y - n.p1.y) - (n.p2.y - n.p1.y) * (e.p1.x - n.p1.x)) / d, S = ((e.p2.x - e.p1.x) * (e.p1.y - n.p1.y) - (e.p2.y - e.p1.y) * (e.p1.x - n.p1.x)) / d;
    return w < 0 || w > 1 || S < 0 || S > 1 ? null : w;
  }
  a(Gi, "bi");
  o(Gi, "testLineLineT");
  function At(e, n) {
    let d = Gi(e, n);
    return d ? R(e.p1.x + d * (e.p2.x - e.p1.x), e.p1.y + d * (e.p2.y - e.p1.y)) : null;
  }
  a(At, "nt");
  o(At, "testLineLine");
  function qi(e, n) {
    if (Xt(e, n.p1) || Xt(e, n.p2))
      return true;
    let d = e.points();
    return !!At(n, new Ne(d[0], d[1])) || !!At(n, new Ne(d[1], d[2])) || !!At(n, new Ne(d[2], d[3])) || !!At(n, new Ne(d[3], d[0]));
  }
  a(qi, "vr");
  o(qi, "testRectLine");
  function Xt(e, n) {
    return n.x > e.pos.x && n.x < e.pos.x + e.width && n.y > e.pos.y && n.y < e.pos.y + e.height;
  }
  a(Xt, "yt");
  o(Xt, "testRectPoint");
  function Ki(e, n) {
    let d = n.sub(e.p1), w = e.p2.sub(e.p1);
    if (Math.abs(d.cross(w)) > Number.EPSILON)
      return false;
    let S = d.dot(w) / w.dot(w);
    return S >= 0 && S <= 1;
  }
  a(Ki, "yr");
  o(Ki, "testLinePoint");
  function en(e, n) {
    let d = e.p2.sub(e.p1), w = d.dot(d), S = e.p1.sub(n.center), B = 2 * d.dot(S), H = S.dot(S) - n.radius * n.radius, k = B * B - 4 * w * H;
    if (w <= Number.EPSILON || k < 0)
      return false;
    if (k == 0) {
      let G = -B / (2 * w);
      if (G >= 0 && G <= 1)
        return true;
    } else {
      let G = (-B + Math.sqrt(k)) / (2 * w), Q = (-B - Math.sqrt(k)) / (2 * w);
      if (G >= 0 && G <= 1 || Q >= 0 && Q <= 1)
        return true;
    }
    return tn(n, e.p1);
  }
  a(en, "Gn");
  o(en, "testLineCircle");
  function tn(e, n) {
    return e.center.sdist(n) < e.radius * e.radius;
  }
  a(tn, "xr");
  o(tn, "testCirclePoint");
  function Yi(e, n) {
    let d = n.pts[n.pts.length - 1];
    for (let w of n.pts) {
      if (en(new Ne(d, w), e))
        return true;
      d = w;
    }
    return tn(e, n.pts[0]) ? true : rn(n, e.center);
  }
  a(Yi, "Ur");
  o(Yi, "testCirclePolygon");
  function rn(e, n) {
    let d = false, w = e.pts;
    for (let S = 0, B = w.length - 1; S < w.length; B = S++)
      w[S].y > n.y != w[B].y > n.y && n.x < (w[B].x - w[S].x) * (n.y - w[S].y) / (w[B].y - w[S].y) + w[S].x && (d = !d);
    return d;
  }
  a(rn, "Fn");
  o(rn, "testPolygonPoint");
  var Ne = a(class {
    p1;
    p2;
    constructor(e, n) {
      this.p1 = e.clone(), this.p2 = n.clone();
    }
    transform(e) {
      return new Ne(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return de.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new Ne(this.p1, this.p2);
    }
  }, "Se");
  o(Ne, "Line");
  var de = a(class {
    pos;
    width;
    height;
    constructor(e, n, d) {
      this.pos = e.clone(), this.width = n, this.height = d;
    }
    static fromPoints(e, n) {
      return new de(e.clone(), n.x - e.x, n.y - e.y);
    }
    center() {
      return new x(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new et(this.points().map((n) => e.multVec2(n)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new de(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let n = this.pos, d = this.pos.add(this.width, this.height), w = Math.max(n.x - e.x, 0, e.x - d.x), S = Math.max(n.y - e.y, 0, e.y - d.y);
      return w * w + S * S;
    }
  }, "ne");
  o(de, "Rect");
  var mr = a(class {
    center;
    radius;
    constructor(e, n) {
      this.center = e.clone(), this.radius = n;
    }
    transform(e) {
      return new wr(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return de.fromPoints(this.center.sub(R(this.radius)), this.center.add(R(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new mr(this.center, this.radius);
    }
  }, "ke");
  o(mr, "Circle");
  var wr = a(class {
    center;
    radiusX;
    radiusY;
    constructor(e, n, d) {
      this.center = e.clone(), this.radiusX = n, this.radiusY = d;
    }
    transform(e) {
      return new wr(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
    }
    bbox() {
      return de.fromPoints(this.center.sub(R(this.radiusX, this.radiusY)), this.center.add(R(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new wr(this.center, this.radiusX, this.radiusY);
    }
  }, "Ye");
  o(wr, "Ellipse");
  var et = a(class {
    pts;
    constructor(e) {
      if (e.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new et(this.pts.map((n) => e.multVec2(n)));
    }
    bbox() {
      let e = R(Number.MAX_VALUE), n = R(-Number.MAX_VALUE);
      for (let d of this.pts)
        e.x = Math.min(e.x, d.x), n.x = Math.max(n.x, d.x), e.y = Math.min(e.y, d.y), n.y = Math.max(n.y, d.y);
      return de.fromPoints(e, n);
    }
    area() {
      let e = 0, n = this.pts.length;
      for (let d = 0; d < n; d++) {
        let w = this.pts[d], S = this.pts[(d + 1) % n];
        e += w.x * S.y * 0.5, e -= S.x * w.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new et(this.pts.map((e) => e.clone()));
    }
  }, "Pe");
  o(et, "Polygon");
  function Hi(e, n) {
    let d = Number.MAX_VALUE, w = R(0);
    for (let S of [e, n])
      for (let B = 0; B < S.pts.length; B++) {
        let H = S.pts[B], k = S.pts[(B + 1) % S.pts.length].sub(H).normal().unit(), G = Number.MAX_VALUE, Q = -Number.MAX_VALUE;
        for (let c = 0; c < e.pts.length; c++) {
          let z = e.pts[c].dot(k);
          G = Math.min(G, z), Q = Math.max(Q, z);
        }
        let he = Number.MAX_VALUE, E = -Number.MAX_VALUE;
        for (let c = 0; c < n.pts.length; c++) {
          let z = n.pts[c].dot(k);
          he = Math.min(he, z), E = Math.max(E, z);
        }
        let ve = Math.min(Q, E) - Math.max(G, he);
        if (ve < 0)
          return null;
        if (ve < Math.abs(d)) {
          let c = E - G, z = he - Q;
          d = Math.abs(c) < Math.abs(z) ? c : z, w = k.scale(d);
        }
      }
    return w;
  }
  a(Hi, "Er");
  o(Hi, "sat");
  var nn = a(class extends Map {
    lastID;
    constructor(...e) {
      super(...e), this.lastID = 0;
    }
    push(e) {
      let n = this.lastID;
      return this.set(n, e), this.lastID++, n;
    }
    pushd(e) {
      let n = this.push(e);
      return () => this.delete(n);
    }
  }, "it");
  o(nn, "IDList");
  var He = a(class {
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let n = new He(() => e.forEach((d) => d.cancel()));
      return Object.defineProperty(n, "paused", { get: () => e[0].paused, set: (d) => e.forEach((w) => w.paused = d) }), n.paused = false, n;
    }
  }, "Ae");
  o(He, "EventController");
  var Se = a(class {
    handlers = new nn();
    add(e) {
      let n = this.handlers.pushd((...w) => {
        d.paused || e(...w);
      }), d = new He(n);
      return d;
    }
    addOnce(e) {
      let n = this.add((...d) => {
        n.cancel(), e(...d);
      });
      return n;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((n) => n(...e));
    }
    numListeners() {
      return this.handlers.size;
    }
  }, "ve");
  o(Se, "Event");
  var Vt = a(class {
    handlers = {};
    on(e, n) {
      return this.handlers[e] || (this.handlers[e] = new Se()), this.handlers[e].add(n);
    }
    onOnce(e, n) {
      let d = this.on(e, (...w) => {
        d.cancel(), n(...w);
      });
      return d;
    }
    next(e) {
      return new Promise((n) => {
        this.onOnce(e, (...d) => n(d[0]));
      });
    }
    trigger(e, ...n) {
      this.handlers[e] && this.handlers[e].trigger(...n);
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
  }, "De");
  o(Vt, "EventHandler");
  function sn(e, n) {
    let d = typeof e, w = typeof n;
    if (d !== w)
      return false;
    if (d === "object" && w === "object" && e !== null && n !== null) {
      let S = Object.keys(e), B = Object.keys(n);
      if (S.length !== B.length)
        return false;
      for (let H of S) {
        let k = e[H], G = n[H];
        if (!(typeof k == "function" && typeof G == "function") && !sn(k, G))
          return false;
      }
      return true;
    }
    return e === n;
  }
  a(sn, "Bn");
  o(sn, "deepEq");
  function ji(e) {
    let n = window.atob(e), d = n.length, w = new Uint8Array(d);
    for (let S = 0; S < d; S++)
      w[S] = n.charCodeAt(S);
    return w.buffer;
  }
  a(ji, "vi");
  o(ji, "base64ToArrayBuffer");
  function Qi(e) {
    return ji(e.split(",")[1]);
  }
  a(Qi, "Sr");
  o(Qi, "dataURLToArrayBuffer");
  function Ar(e, n) {
    let d = document.createElement("a");
    d.href = n, d.download = e, d.click();
  }
  a(Ar, "zt");
  o(Ar, "download");
  function on(e, n) {
    Ar(e, "data:text/plain;charset=utf-8," + n);
  }
  a(on, "Ln");
  o(on, "downloadText");
  function zi(e, n) {
    on(e, JSON.stringify(n));
  }
  a(zi, "Cr");
  o(zi, "downloadJSON");
  function Wr(e, n) {
    let d = URL.createObjectURL(n);
    Ar(e, d), URL.revokeObjectURL(d);
  }
  a(Wr, "In");
  o(Wr, "downloadBlob");
  var Ai = o((e) => e.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Fs = o((e) => e.split(".").pop(), "getExt");
  var Bs = (() => {
    let e = 0;
    return () => e++;
  })();
  var Ji = a(class {
    _items;
    _compareFn;
    constructor(e = (n, d) => n < d) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let e = this._items[0], n = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = n, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let n = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[n]) && this._items[e] >= this._items[n])
          break;
        this.swap(e, n), e = n;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let n = 2 * e + 1;
        if (n < this._items.length - 1 && !this._compareFn(this._items[n], this._items[n + 1]) && ++n, this._compareFn(this._items[e], this._items[n]))
          break;
        this.swap(e, n), e = n;
      }
    }
    swap(e, n) {
      [this._items[e], this._items[n]] = [this._items[n], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  }, "Ut");
  o(Ji, "BinaryHeap");
  var Vi = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "select", 10: "lstick", 16: "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "start", 10: "lstick", 16: "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var Zt = a(class {
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
  }, "Xe");
  o(Zt, "ButtonState");
  var Zi = a(class {
    buttonState = new Zt();
    stickState = /* @__PURE__ */ new Map();
  }, "Kt");
  o(Zi, "GamepadState");
  var Wi = a(class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((n, d) => n + d) / this.dts.length)), this.dts = []);
    }
  }, "Yt");
  o(Wi, "FPSCounter");
  var Cs = o((e) => {
    if (!e.canvas)
      throw new Error("Please provide a canvas");
    let n = { canvas: e.canvas, loopID: null, stopped: false, dt: 0, time: 0, realTime: 0, fpsCounter: new Wi(), timeScale: 1, skipTime: false, numFrames: 0, paused: false, mousePos: new x(0), mouseDeltaPos: new x(0), keyState: new Zt(), mouseState: new Zt(), mergedGamepadState: new Zi(), gamepadStates: /* @__PURE__ */ new Map(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: e.canvas.offsetWidth, lastHeight: e.canvas.offsetHeight, events: new Vt() };
    function d() {
      return n.canvas;
    }
    a(d, "c"), o(d, "canvas");
    function w() {
      return n.dt * n.timeScale;
    }
    a(w, "g"), o(w, "dt");
    function S() {
      return n.time;
    }
    a(S, "E"), o(S, "time");
    function B() {
      return n.fpsCounter.fps;
    }
    a(B, "M"), o(B, "fps");
    function H() {
      return n.numFrames;
    }
    a(H, "z"), o(H, "numFrames");
    function k() {
      return n.canvas.toDataURL();
    }
    a(k, "I"), o(k, "screenshot");
    function G(f) {
      n.canvas.style.cursor = f;
    }
    a(G, "k"), o(G, "setCursor");
    function Q() {
      return n.canvas.style.cursor;
    }
    a(Q, "Z"), o(Q, "getCursor");
    function he(f) {
      if (f)
        try {
          let V = n.canvas.requestPointerLock();
          V.catch && V.catch((b) => console.error(b));
        } catch (V) {
          console.error(V);
        }
      else
        document.exitPointerLock();
    }
    a(he, "ce"), o(he, "setCursorLocked");
    function E() {
      return !!document.pointerLockElement;
    }
    a(E, "U"), o(E, "isCursorLocked");
    function ve(f) {
      f.requestFullscreen ? f.requestFullscreen() : f.webkitRequestFullscreen && f.webkitRequestFullscreen();
    }
    a(ve, "X"), o(ve, "enterFullscreen");
    function c() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    a(c, "h"), o(c, "exitFullscreen");
    function z() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }
    a(z, "K"), o(z, "getFullscreenElement");
    function Ce(f = true) {
      f ? ve(n.canvas) : c();
    }
    a(Ce, "pe"), o(Ce, "setFullscreen");
    function Me() {
      return !!z();
    }
    a(Me, "Ge"), o(Me, "isFullscreen");
    function A() {
      n.stopped = true;
      for (let f in ue)
        n.canvas.removeEventListener(f, ue[f]);
      for (let f in Pe)
        document.removeEventListener(f, Pe[f]);
      for (let f in le)
        window.removeEventListener(f, le[f]);
      Nt.disconnect();
    }
    a(A, "w"), o(A, "quit");
    function $(f) {
      n.loopID !== null && cancelAnimationFrame(n.loopID);
      let V = 0, b = o((fe) => {
        if (n.stopped)
          return;
        if (n.paused || document.visibilityState !== "visible") {
          n.loopID = requestAnimationFrame(b);
          return;
        }
        let q = fe / 1e3, ie = q - n.realTime, xe = e.maxFPS ? 1 / e.maxFPS : 0;
        n.realTime = q, V += ie, V > xe && (n.skipTime || (n.dt = V, n.time += w(), n.fpsCounter.tick(n.dt)), V = 0, n.skipTime = false, n.numFrames++, lt(), f(), Dt()), n.loopID = requestAnimationFrame(b);
      }, "frame");
      b(0);
    }
    a($, "le"), o($, "run");
    function ce() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    a(ce, "ge"), o(ce, "isTouchscreen");
    function ne() {
      return n.mousePos.clone();
    }
    a(ne, "he"), o(ne, "mousePos");
    function _() {
      return n.mouseDeltaPos.clone();
    }
    a(_, "ie"), o(_, "mouseDeltaPos");
    function me(f = "left") {
      return n.mouseState.pressed.has(f);
    }
    a(me, "xe"), o(me, "isMousePressed");
    function U(f = "left") {
      return n.mouseState.down.has(f);
    }
    a(U, "B"), o(U, "isMouseDown");
    function M(f = "left") {
      return n.mouseState.released.has(f);
    }
    a(M, "T"), o(M, "isMouseReleased");
    function tt() {
      return n.isMouseMoved;
    }
    a(tt, "ct"), o(tt, "isMouseMoved");
    function Te(f) {
      return f === void 0 ? n.keyState.pressed.size > 0 : n.keyState.pressed.has(f);
    }
    a(Te, "Fe"), o(Te, "isKeyPressed");
    function xt(f) {
      return f === void 0 ? n.keyState.pressedRepeat.size > 0 : n.keyState.pressedRepeat.has(f);
    }
    a(xt, "en"), o(xt, "isKeyPressedRepeat");
    function Qe(f) {
      return f === void 0 ? n.keyState.down.size > 0 : n.keyState.down.has(f);
    }
    a(Qe, "lt"), o(Qe, "isKeyDown");
    function Le(f) {
      return f === void 0 ? n.keyState.released.size > 0 : n.keyState.released.has(f);
    }
    a(Le, "We"), o(Le, "isKeyReleased");
    function yt(f) {
      return f === void 0 ? n.mergedGamepadState.buttonState.pressed.size > 0 : n.mergedGamepadState.buttonState.pressed.has(f);
    }
    a(yt, "tn"), o(yt, "isGamepadButtonPressed");
    function Et(f) {
      return f === void 0 ? n.mergedGamepadState.buttonState.down.size > 0 : n.mergedGamepadState.buttonState.down.has(f);
    }
    a(Et, "nn"), o(Et, "isGamepadButtonDown");
    function Oe(f) {
      return f === void 0 ? n.mergedGamepadState.buttonState.released.size > 0 : n.mergedGamepadState.buttonState.released.has(f);
    }
    a(Oe, "Je"), o(Oe, "isGamepadButtonReleased");
    function bt(f) {
      return n.events.on("resize", f);
    }
    a(bt, "rn"), o(bt, "onResize");
    let Ge = o((f, V) => {
      if (typeof f == "function")
        return n.events.on("keyDown", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("keyDown", (b) => b === f && V(f));
    }, "onKeyDown"), $t = o((f, V) => {
      if (typeof f == "function")
        return n.events.on("keyPress", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("keyPress", (b) => b === f && V(f));
    }, "onKeyPress"), er = o((f, V) => {
      if (typeof f == "function")
        return n.events.on("keyPressRepeat", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("keyPressRepeat", (b) => b === f && V(f));
    }, "onKeyPressRepeat"), St = o((f, V) => {
      if (typeof f == "function")
        return n.events.on("keyRelease", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("keyRelease", (b) => b === f && V(f));
    }, "onKeyRelease");
    function rt(f, V) {
      return typeof f == "function" ? n.events.on("mouseDown", (b) => f(b)) : n.events.on("mouseDown", (b) => b === f && V(b));
    }
    a(rt, "St"), o(rt, "onMouseDown");
    function nt(f, V) {
      return typeof f == "function" ? n.events.on("mousePress", (b) => f(b)) : n.events.on("mousePress", (b) => b === f && V(b));
    }
    a(nt, "Ct"), o(nt, "onMousePress");
    function ke(f, V) {
      return typeof f == "function" ? n.events.on("mouseRelease", (b) => f(b)) : n.events.on("mouseRelease", (b) => b === f && V(b));
    }
    a(ke, "He"), o(ke, "onMouseRelease");
    function Rt(f) {
      return n.events.on("mouseMove", () => f(ne(), _()));
    }
    a(Rt, "an"), o(Rt, "onMouseMove");
    function Mt(f) {
      return n.events.on("charInput", f);
    }
    a(Mt, "un"), o(Mt, "onCharInput");
    function Tt(f) {
      return n.events.on("touchStart", f);
    }
    a(Tt, "cn"), o(Tt, "onTouchStart");
    function Pt(f) {
      return n.events.on("touchMove", f);
    }
    a(Pt, "ln"), o(Pt, "onTouchMove");
    function Ft(f) {
      return n.events.on("touchEnd", f);
    }
    a(Ft, "hn"), o(Ft, "onTouchEnd");
    function Bt(f) {
      return n.events.on("scroll", f);
    }
    a(Bt, "dn"), o(Bt, "onScroll");
    function it(f, V) {
      if (typeof f == "function")
        return n.events.on("gamepadButtonDown", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("gamepadButtonDown", (b) => b === f && V(f));
    }
    a(it, "Tt"), o(it, "onGamepadButtonDown");
    function st(f, V) {
      if (typeof f == "function")
        return n.events.on("gamepadButtonPress", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("gamepadButtonPress", (b) => b === f && V(f));
    }
    a(st, "At"), o(st, "onGamepadButtonPress");
    function ot(f, V) {
      if (typeof f == "function")
        return n.events.on("gamepadButtonRelease", f);
      if (typeof f == "string" && typeof V == "function")
        return n.events.on("gamepadButtonRelease", (b) => b === f && V(f));
    }
    a(ot, "Ot"), o(ot, "onGamepadButtonRelease");
    function at(f, V) {
      return n.events.on("gamepadStick", (b, fe) => b === f && V(fe));
    }
    a(at, "Pt"), o(at, "onGamepadStick");
    function ht(f) {
      n.events.on("gamepadConnect", f);
    }
    a(ht, "Rt"), o(ht, "onGamepadConnect");
    function Ct(f) {
      n.events.on("gamepadDisconnect", f);
    }
    a(Ct, "fn"), o(Ct, "onGamepadDisconnect");
    function ze(f) {
      return n.mergedGamepadState.stickState.get(f) || new x(0);
    }
    a(ze, "ht"), o(ze, "getGamepadStick");
    function kt() {
      return [...n.charInputted];
    }
    a(kt, "mn"), o(kt, "charInputted");
    function ut() {
      return [...n.gamepads];
    }
    a(ut, "Mt"), o(ut, "getGamepads");
    function lt() {
      n.events.trigger("input"), n.keyState.down.forEach((f) => n.events.trigger("keyDown", f)), n.mouseState.down.forEach((f) => n.events.trigger("mouseDown", f)), Ze();
    }
    a(lt, "Dt"), o(lt, "processInput");
    function Dt() {
      n.keyState.update(), n.mouseState.update(), n.mergedGamepadState.buttonState.update(), n.mergedGamepadState.stickState.forEach((f, V) => {
        n.mergedGamepadState.stickState.set(V, new x(0));
      }), n.charInputted = [], n.isMouseMoved = false, n.gamepadStates.forEach((f) => {
        f.buttonState.update(), f.stickState.forEach((V, b) => {
          f.stickState.set(b, new x(0));
        });
      });
    }
    a(Dt, "pn"), o(Dt, "resetInput");
    function Je(f) {
      let V = { index: f.index, isPressed: (b) => n.gamepadStates.get(f.index).buttonState.pressed.has(b), isDown: (b) => n.gamepadStates.get(f.index).buttonState.down.has(b), isReleased: (b) => n.gamepadStates.get(f.index).buttonState.released.has(b), getStick: (b) => n.gamepadStates.get(f.index).stickState.get(b) };
      return n.gamepads.push(V), n.gamepadStates.set(f.index, { buttonState: new Zt(), stickState: /* @__PURE__ */ new Map([["left", new x(0)], ["right", new x(0)]]) }), V;
    }
    a(Je, "dt"), o(Je, "registerGamepad");
    function dt(f) {
      n.gamepads = n.gamepads.filter((V) => V.index !== f.index), n.gamepadStates.delete(f.index);
    }
    a(dt, "Gt"), o(dt, "removeGamepad");
    function Ze() {
      for (let f of navigator.getGamepads())
        f && !n.gamepadStates.has(f.index) && Je(f);
      for (let f of n.gamepads) {
        let V = navigator.getGamepads()[f.index], b = (e.gamepads ?? {})[V.id] ?? Vi[V.id] ?? Vi.default, fe = n.gamepadStates.get(f.index);
        for (let q = 0; q < V.buttons.length; q++)
          V.buttons[q].pressed ? (fe.buttonState.down.has(b.buttons[q]) || (n.mergedGamepadState.buttonState.press(b.buttons[q]), fe.buttonState.press(b.buttons[q]), n.events.trigger("gamepadButtonPress", b.buttons[q])), n.events.trigger("gamepadButtonDown", b.buttons[q])) : fe.buttonState.down.has(b.buttons[q]) && (n.mergedGamepadState.buttonState.release(b.buttons[q]), fe.buttonState.release(b.buttons[q]), n.events.trigger("gamepadButtonRelease", b.buttons[q]));
        for (let q in b.sticks) {
          let ie = b.sticks[q], xe = new x(V.axes[ie.x], V.axes[ie.y]);
          fe.stickState.set(q, xe), n.mergedGamepadState.stickState.set(q, xe), n.events.trigger("gamepadStick", q, xe);
        }
      }
    }
    a(Ze, "ft"), o(Ze, "processGamepad");
    let ue = {}, Pe = {}, le = {};
    ue.mousemove = (f) => {
      let V = new x(f.offsetX, f.offsetY), b = new x(f.movementX, f.movementY);
      n.events.onOnce("input", () => {
        n.isMouseMoved = true, n.mousePos = V, n.mouseDeltaPos = b, n.events.trigger("mouseMove");
      });
    };
    let It = ["left", "middle", "right", "back", "forward"];
    ue.mousedown = (f) => {
      n.events.onOnce("input", () => {
        let V = It[f.button];
        V && (n.mouseState.press(V), n.events.trigger("mousePress", V));
      });
    }, ue.mouseup = (f) => {
      n.events.onOnce("input", () => {
        let V = It[f.button];
        V && (n.mouseState.release(V), n.events.trigger("mouseRelease", V));
      });
    };
    let tr = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), Ut = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    ue.keydown = (f) => {
      tr.has(f.key) && f.preventDefault(), n.events.onOnce("input", () => {
        let V = Ut[f.key] || f.key.toLowerCase();
        V.length === 1 ? (n.events.trigger("charInput", V), n.charInputted.push(V)) : V === "space" && (n.events.trigger("charInput", " "), n.charInputted.push(" ")), f.repeat ? (n.keyState.pressRepeat(V), n.events.trigger("keyPressRepeat", V)) : (n.keyState.press(V), n.events.trigger("keyPressRepeat", V), n.events.trigger("keyPress", V));
      });
    }, ue.keyup = (f) => {
      n.events.onOnce("input", () => {
        let V = Ut[f.key] || f.key.toLowerCase();
        n.keyState.release(V), n.events.trigger("keyRelease", V);
      });
    }, ue.touchstart = (f) => {
      f.preventDefault(), n.events.onOnce("input", () => {
        let V = [...f.changedTouches];
        V.forEach((b) => {
          n.events.trigger("touchStart", new x(b.clientX, b.clientY), b);
        }), e.touchToMouse !== false && (n.mousePos = new x(V[0].clientX, V[0].clientY), n.mouseState.press("left"), n.events.trigger("mousePress", "left"));
      });
    }, ue.touchmove = (f) => {
      f.preventDefault(), n.events.onOnce("input", () => {
        let V = [...f.changedTouches];
        V.forEach((b) => {
          n.events.trigger("touchMove", new x(b.clientX, b.clientY), b);
        }), e.touchToMouse !== false && (n.mousePos = new x(V[0].clientX, V[0].clientY), n.events.trigger("mouseMove"));
      });
    }, ue.touchend = (f) => {
      n.events.onOnce("input", () => {
        let V = [...f.changedTouches];
        V.forEach((b) => {
          n.events.trigger("touchEnd", new x(b.clientX, b.clientY), b);
        }), e.touchToMouse !== false && (n.mousePos = new x(V[0].clientX, V[0].clientY), n.mouseState.release("left"), n.events.trigger("mouseRelease", "left"));
      });
    }, ue.touchcancel = (f) => {
      n.events.onOnce("input", () => {
        let V = [...f.changedTouches];
        V.forEach((b) => {
          n.events.trigger("touchEnd", new x(b.clientX, b.clientY), b);
        }), e.touchToMouse !== false && (n.mousePos = new x(V[0].clientX, V[0].clientY), n.mouseState.release("left"), n.events.trigger("mouseRelease", "left"));
      });
    }, ue.wheel = (f) => {
      f.preventDefault(), n.events.onOnce("input", () => {
        n.events.trigger("scroll", new x(f.deltaX, f.deltaY));
      });
    }, ue.contextmenu = (f) => f.preventDefault(), Pe.visibilitychange = () => {
      document.visibilityState === "visible" && (n.skipTime = true);
    }, le.gamepadconnected = (f) => {
      let V = Je(f.gamepad);
      n.events.onOnce("input", () => {
        n.events.trigger("gamepadConnect", V);
      });
    }, le.gamepaddisconnected = (f) => {
      let V = ut().filter((b) => b.index === f.gamepad.index)[0];
      dt(f.gamepad), n.events.onOnce("input", () => {
        n.events.trigger("gamepadDisconnect", V);
      });
    };
    for (let f in ue)
      n.canvas.addEventListener(f, ue[f]);
    for (let f in Pe)
      document.addEventListener(f, Pe[f]);
    for (let f in le)
      window.addEventListener(f, le[f]);
    let Nt = new ResizeObserver((f) => {
      for (let V of f)
        if (V.target === n.canvas) {
          if (n.lastWidth === n.canvas.offsetWidth && n.lastHeight === n.canvas.offsetHeight)
            return;
          n.lastWidth = n.canvas.offsetWidth, n.lastHeight = n.canvas.offsetHeight, n.events.onOnce("input", () => {
            n.events.trigger("resize");
          });
        }
    });
    return Nt.observe(n.canvas), { dt: w, time: S, run: $, canvas: d, fps: B, numFrames: H, quit: A, setFullscreen: Ce, isFullscreen: Me, setCursor: G, screenshot: k, getGamepads: ut, getCursor: Q, setCursorLocked: he, isCursorLocked: E, isTouchscreen: ce, mousePos: ne, mouseDeltaPos: _, isKeyDown: Qe, isKeyPressed: Te, isKeyPressedRepeat: xt, isKeyReleased: Le, isMouseDown: U, isMousePressed: me, isMouseReleased: M, isMouseMoved: tt, isGamepadButtonPressed: yt, isGamepadButtonDown: Et, isGamepadButtonReleased: Oe, getGamepadStick: ze, charInputted: kt, onResize: bt, onKeyDown: Ge, onKeyPress: $t, onKeyPressRepeat: er, onKeyRelease: St, onMouseDown: rt, onMousePress: nt, onMouseRelease: ke, onMouseMove: Rt, onCharInput: Mt, onTouchStart: Tt, onTouchMove: Pt, onTouchEnd: Ft, onScroll: Bt, onGamepadButtonDown: it, onGamepadButtonPress: st, onGamepadButtonRelease: ot, onGamepadStick: at, onGamepadConnect: ht, onGamepadDisconnect: Ct, events: n.events, get paused() {
      return n.paused;
    }, set paused(f) {
      n.paused = f;
    } };
  }, "default");
  var lr = 2.5949095;
  var vi = 1.70158 + 1;
  var xi = 2 * Math.PI / 3;
  var yi = 2 * Math.PI / 4.5;
  var fr = { linear: (e) => e, easeInSine: (e) => 1 - Math.cos(e * Math.PI / 2), easeOutSine: (e) => Math.sin(e * Math.PI / 2), easeInOutSine: (e) => -(Math.cos(Math.PI * e) - 1) / 2, easeInQuad: (e) => e * e, easeOutQuad: (e) => 1 - (1 - e) * (1 - e), easeInOutQuad: (e) => e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, easeInCubic: (e) => e * e * e, easeOutCubic: (e) => 1 - Math.pow(1 - e, 3), easeInOutCubic: (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, easeInQuart: (e) => e * e * e * e, easeOutQuart: (e) => 1 - Math.pow(1 - e, 4), easeInOutQuart: (e) => e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2, easeInQuint: (e) => e * e * e * e * e, easeOutQuint: (e) => 1 - Math.pow(1 - e, 5), easeInOutQuint: (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 - Math.pow(-2 * e + 2, 5) / 2, easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * e - 10), easeOutExpo: (e) => e === 1 ? 1 : 1 - Math.pow(2, -10 * e), easeInOutExpo: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2, easeInCirc: (e) => 1 - Math.sqrt(1 - Math.pow(e, 2)), easeOutCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)), easeInOutCirc: (e) => e < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2, easeInBack: (e) => vi * e * e * e - 1.70158 * e * e, easeOutBack: (e) => 1 + vi * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2), easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((lr + 1) * 2 * e - lr) / 2 : (Math.pow(2 * e - 2, 2) * ((lr + 1) * (e * 2 - 2) + lr) + 2) / 2, easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * xi), easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * xi) + 1, easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * yi)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * yi) / 2 + 1, easeInBounce: (e) => 1 - fr.easeOutBounce(1 - e), easeOutBounce: (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, easeInOutBounce: (e) => e < 0.5 ? (1 - fr.easeOutBounce(1 - 2 * e)) / 2 : (1 + fr.easeOutBounce(2 * e - 1)) / 2 };
  var Jt = fr;
  var Xi = a(class {
    time;
    action;
    finished = false;
    paused = false;
    constructor(e, n) {
      this.time = e, this.action = n;
    }
    tick(e) {
      return this.finished || this.paused ? false : (this.time -= e, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
    }
    reset(e) {
      this.time = e, this.finished = false;
    }
  }, "at");
  o(Xi, "Timer");
  var ks = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Ds = {};
  Ss(Ds, { default: () => _i });
  var _i = Rs("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var Is = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABdRJREFUeJzt3d3N3TYMgGG16ADdoAhyl7UyV9bqXRB0g2zQXgRGDcOWSIoUaX3vAwQBknMk/4gWLcnHrQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDEb9kb8FH99eeXf6Wf/efn35ynDyj1pEsb6G6NUxOYZ7sdB/QtPdnWRnn29gbKMYDUspPs0SgPb22cHANo/JG9AZF6wWBp3JLgeir36bvff3x9LOvzp2/dbSFA97bk5I4a9VMD7TXOUcP0uJ+d6emu5d6V1QvMs5nj8FZPx37X/b2TFpzShtnafeP0DipJMFnLnN3/w1OQ7tZgP+pA4VVKcHo0TG36KNULKGt5XsHZmi1APS5WM2Vqg0i7vbsG6YcIznN9vRTxXHavgdxtv6Tc3vc1pAHqdaG6ipwKYprpf1sFp6aH0gRTrxxLubPB2avHu+c/l3mICvqnsr//+Cq+qGrK1Xw/wzbBaRkNvSv3yew9cq+cu89L6nu6F/cMzCgzF1ftANlbe+Otp1IkDVxyVfbo6Z481f3507dhvXfbrk3HpdtjKTNqKuio8678c7mzF6ns6arfMyrVNoA75wMfNU2hKSeCx3Fq7dc+SPfDc39H9Vqn2CT//4bsYeT1PecOJyGSJdh6PZOlbElPZz2PHtlD1cUeS4LT4z5IOihwfNaD5ERm9qxH/dZ7Vmt9M999CtCZbdLUP/p3r2zFQ0paG8lr4Eb6+ZWBcSeq/qhyK6bXUfXOSgtO7/tOb9eT1NveqKttpYbiyXu/euV51JV16/T6e86zyF5TUp731V5Sp+Z7M71h9QvFNWWuvr0Sy4LzLfNvrel6zRX1e+hN2VzrnNlfaYD0xhCs++851lDh3vNV95xe6YvHgb8bwbNcuc+f09wbaUj2dzYgjz93//5kh94t0quCM8OKK6glKKuM0EYHfhUZWd8WwenZa0rLsp6s2YY66o0k9WUvS4NManBaGuo1eDIHgUZ1ePdkntsfFaCz5VZJdStsxyt7ziMNXHEAK5yk1mqmhrMPf1fcp57Vqe3SqZTMEduZhqAZyaywFne0DVHngHTZ11bznE88l/1lBZ9meP8851plWkBCO7drmQvWnL/sY/fKtFaqN3iy6iofsQxNktJnTMgfPXJUz3w3VaP5vOQ7Iyszvy2DczSi+aYFET2jINUEqFcAS4+rV480WlwRWXe07dLa0YGvfl9kmbTvPZJ1TXGvn4t4yuRp+2aMgk27wkm63DIztU3vOVfueC8wK4zKWtK0M+nvJXmOdlt65MgFFCva06qsKz044SvjIiN5TjLaaHxhtNyyouXBGZ1WSn66Ivt+M7pRZAWoZsDq+t2emeM1am/WtHxFG9runrO1/n1CxLK7CilxJM/H4bwuTJJBvWtgvm0gcNu01uvpd8la1soLE7xkpYDea4Ot6W3GOSzRc3o/qHw2M9qmXWA+uw+jbd0hyO9Yz0+vJ9QGcO/8ZV2YUqYVPN8dImXp3aJ/w1XTGGYfKZN+P7IXiXqO1uINLzFOm/Pz+BV4C03PNEqpZl//ELXP1ro8nhLyKLPHMyAiXyvh4cMFZ2uyAJXc62gzgJl1nhrSLMEzcLx+5qQnIhgqv6qhTHC2Zmus1tUuowCVDkRU6j0jgiJqhLPSSq2q7wMtMSBkdbcQWjNCq2nMlRrTnajAPP/t+c5Sj3K8VNueQ+pGzaa2MyOb2sZseW2dpL6ZnjMzfeQFt/Fe3XP2WIfGvRY6a569jCJ9TaIlcCS9KQE5p1TP2VrMbwLNDlZEvpE5AkGxh9f2nLO/QOetytIwAnMf6SfS2ns+jaZ6B4i2sWvSvF0HWOAj/aRGNFAaPXbw2rS2Rzr0T/ChshKNM3qd4135BCaqK9VAKy+lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4DBC0k0jFtF9wAAAAASUVORK5CYII=";
  var Us = "data:image/png;base64,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";
  var Ns = "3000.0.2";
  var Ei = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var dr = "topleft";
  var bi = 64;
  var Ls = "monospace";
  var cr = "monospace";
  var Os = 36;
  var Si = 64;
  var Ri = 256;
  var Mi = 2048;
  var Ti = 2048;
  var Pi = 2048;
  var Fi = 2048;
  var Bi = 0.1;
  var Gs = 64;
  var Ci = "nearest";
  var qs = 1;
  var $i = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var pr = $i.reduce((e, n) => e + n.size, 0);
  var es = 2048;
  var ki = es * 4 * pr;
  var Di = es * 6;
  var Ks = `
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
  var Ys = `
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
  var Qr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var zr = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var Hs = /* @__PURE__ */ new Set(["id", "require"]);
  var js = /* @__PURE__ */ new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function $e(e) {
    switch (e) {
      case "topleft":
        return new x(-1, -1);
      case "top":
        return new x(0, -1);
      case "topright":
        return new x(1, -1);
      case "left":
        return new x(-1, 0);
      case "center":
        return new x(0, 0);
      case "right":
        return new x(1, 0);
      case "botleft":
        return new x(-1, 1);
      case "bot":
        return new x(0, 1);
      case "botright":
        return new x(1, 1);
      default:
        return e;
    }
  }
  a($e, "ut");
  o($e, "anchorPt");
  function ts(e) {
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
  a(ts, "Bi");
  o(ts, "alignPt");
  function rs(e) {
    return e.createBuffer(1, 1, 44100);
  }
  a(rs, "Li");
  o(rs, "createEmptyAudioBuffer");
  var ns = o((e = {}) => {
    let n = e.root ?? document.body;
    n === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let d = e.canvas ?? (() => {
      let t = document.createElement("canvas");
      return n.appendChild(t), t;
    })(), w = e.scale ?? 1, S = e.width && e.height && !e.stretch && !e.letterbox;
    S ? (d.width = e.width * w, d.height = e.height * w) : (d.width = d.parentElement.offsetWidth, d.height = d.parentElement.offsetHeight);
    let B = d.width, H = d.height, k = e.pixelDensity || window.devicePixelRatio;
    d.width *= k, d.height *= k;
    let G = ["outline: none", "cursor: default"];
    S ? (G.push(`width: ${B}px`), G.push(`height: ${H}px`)) : (G.push("width: 100%"), G.push("height: 100%")), e.crisp && (G.push("image-rendering: pixelated"), G.push("image-rendering: crisp-edges")), d.style.cssText = G.join(";"), d.tabIndex = 0;
    let Q = document.createElement("canvas");
    Q.width = Ri, Q.height = Ri;
    let he = Q.getContext("2d", { willReadFrequently: true }), E = Cs({ canvas: d, touchToMouse: e.touchToMouse, gamepads: e.gamepads, pixelDensity: e.pixelDensity, maxFPS: e.maxFPS }), ve = [], c = E.canvas().getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    class z {
      src = null;
      glTex;
      width;
      height;
      constructor(r, i, s = {}) {
        this.glTex = c.createTexture(), ve.push(() => this.free()), this.bind(), r && i && c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, r, i, 0, c.RGBA, c.UNSIGNED_BYTE, null), this.width = r, this.height = i;
        let h = (() => {
          switch (s.filter ?? e.texFilter) {
            case "linear":
              return c.LINEAR;
            case "nearest":
              return c.NEAREST;
            default:
              return c.NEAREST;
          }
        })(), l = (() => {
          switch (s.wrap) {
            case "repeat":
              return c.REPEAT;
            case "clampToEdge":
              return c.CLAMP_TO_EDGE;
            default:
              return c.CLAMP_TO_EDGE;
          }
        })();
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, h), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, h), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, l), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, l), this.unbind();
      }
      static fromImage(r, i = {}) {
        let s = new z(0, 0, i);
        return s.bind(), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, r), s.width = r.width, s.height = r.height, s.unbind(), s.src = r, s;
      }
      update(r, i = 0, s = 0) {
        this.bind(), c.texSubImage2D(c.TEXTURE_2D, 0, i, s, c.RGBA, c.UNSIGNED_BYTE, r), this.unbind();
      }
      bind() {
        c.bindTexture(c.TEXTURE_2D, this.glTex);
      }
      unbind() {
        c.bindTexture(c.TEXTURE_2D, null);
      }
      free() {
        c.deleteTexture(this.glTex);
      }
    }
    a(z, "K"), o(z, "Texture");
    class Ce {
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(r, i) {
        this.canvas = document.createElement("canvas"), this.canvas.width = r, this.canvas.height = i, this.tex = z.fromImage(this.canvas), this.ctx = this.canvas.getContext("2d");
      }
      add(r) {
        if (r.width > this.canvas.width || r.height > this.canvas.height)
          throw new Error(`Texture size (${r.width} x ${r.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
        this.x + r.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + r.height > this.canvas.height && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = z.fromImage(this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
        let i = new x(this.x, this.y);
        return this.x += r.width, r.height > this.curHeight && (this.curHeight = r.height), r instanceof ImageData ? this.ctx.putImageData(r, i.x, i.y) : this.ctx.drawImage(r, i.x, i.y), this.tex.update(this.canvas), [this.tex, new se(i.x / this.canvas.width, i.y / this.canvas.height, r.width / this.canvas.width, r.height / this.canvas.height)];
      }
    }
    a(Ce, "pe"), o(Ce, "TexPacker");
    class Me {
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(r, i, s = {}) {
        this.tex = new z(r, i, s), this.glFrameBuffer = c.createFramebuffer(), this.glRenderBuffer = c.createRenderbuffer(), ve.push(() => this.free()), this.bind(), c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, r, i), c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, this.tex.glTex, 0), c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_STENCIL_ATTACHMENT, c.RENDERBUFFER, this.glRenderBuffer), this.unbind();
      }
      get width() {
        return this.tex.width;
      }
      get height() {
        return this.tex.height;
      }
      bind() {
        c.bindFramebuffer(c.FRAMEBUFFER, this.glFrameBuffer), c.bindRenderbuffer(c.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        c.bindFramebuffer(c.FRAMEBUFFER, null), c.bindRenderbuffer(c.RENDERBUFFER, null);
      }
      free() {
        c.deleteFramebuffer(this.glFrameBuffer), c.deleteRenderbuffer(this.glRenderBuffer), this.tex.free();
      }
    }
    a(Me, "Ge"), o(Me, "FrameBuffer");
    let A = (() => {
      let t = Ze(Qr, zr), r = z.fromImage(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), i = e.width && e.height ? new Me(e.width * k, e.height * k) : new Me(c.drawingBufferWidth / w, c.drawingBufferHeight / w), s = null, h = 1;
      e.background && (s = O.fromArray(e.background), h = e.background[3] ?? 1, c.clearColor(s.r / 255, s.g / 255, s.b / 255, h)), c.enable(c.BLEND), c.enable(c.SCISSOR_TEST), c.blendFuncSeparate(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA, c.ONE, c.ONE_MINUS_SRC_ALPHA);
      let l = c.createBuffer();
      c.bindBuffer(c.ARRAY_BUFFER, l), c.bufferData(c.ARRAY_BUFFER, ki * 4, c.DYNAMIC_DRAW), $i.reduce((p, m2, y) => (c.vertexAttribPointer(y, m2.size, c.FLOAT, false, pr * 4, p), c.enableVertexAttribArray(y), p + m2.size * 4), 0), c.bindBuffer(c.ARRAY_BUFFER, null);
      let u = c.createBuffer();
      c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, u), c.bufferData(c.ELEMENT_ARRAY_BUFFER, Di * 4, c.DYNAMIC_DRAW), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null);
      let g = z.fromImage(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { drawCalls: 0, lastDrawCalls: 0, defShader: t, curShader: t, frameBuffer: i, postShader: null, postShaderUniform: null, defTex: r, curTex: r, curUniform: {}, vbuf: l, ibuf: u, vqueue: [], iqueue: [], transform: new ae(), transformStack: [], bgTex: g, bgColor: s, bgAlpha: h, width: e.width ?? c.drawingBufferWidth / k / w, height: e.height ?? c.drawingBufferHeight / k / w, viewport: { x: 0, y: 0, width: c.drawingBufferWidth, height: c.drawingBufferHeight } };
    })();
    class $ {
      tex;
      frames = [new se(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(r, i, s = {}, h = null) {
        this.tex = r, i && (this.frames = i), this.anims = s, this.slice9 = h;
      }
      static from(r, i = {}) {
        return typeof r == "string" ? $.fromURL(r, i) : Promise.resolve($.fromImage(r, i));
      }
      static fromImage(r, i = {}) {
        let [s, h] = U.packer.add(r), l = i.frames ? i.frames.map((u) => new se(h.x + u.x * h.w, h.y + u.y * h.h, u.w * h.w, u.h * h.h)) : St(i.sliceX || 1, i.sliceY || 1, h.x, h.y, h.w, h.h);
        return new $(s, l, i.anims, i.slice9);
      }
      static fromURL(r, i = {}) {
        return Oe(r).then((s) => $.fromImage(s, i));
      }
    }
    a($, "le"), o($, "SpriteData");
    class ce {
      buf;
      constructor(r) {
        this.buf = r;
      }
      static fromArrayBuffer(r) {
        return new Promise((i, s) => ne.ctx.decodeAudioData(r, i, s)).then((i) => new ce(i));
      }
      static fromURL(r) {
        return Ai(r) ? ce.fromArrayBuffer(Qi(r)) : Et(r).then((i) => ce.fromArrayBuffer(i));
      }
    }
    a(ce, "ge"), o(ce, "SoundData");
    let ne = (() => {
      let t = new (window.AudioContext || window.webkitAudioContext)(), r = t.createGain();
      r.connect(t.destination);
      let i = new ce(rs(t));
      return t.decodeAudioData(_i.buffer.slice(0)).then((s) => {
        i.buf = s;
      }).catch((s) => {
        console.error("Failed to load burp: ", s);
      }), { ctx: t, masterNode: r, burpSnd: i };
    })();
    class _ {
      loaded = false;
      data = null;
      error = null;
      onLoadEvents = new Se();
      onErrorEvents = new Se();
      onFinishEvents = new Se();
      constructor(r) {
        r.then((i) => {
          this.data = i, this.onLoadEvents.trigger(i);
        }).catch((i) => {
          if (this.error = i, this.onErrorEvents.numListeners() > 0)
            this.onErrorEvents.trigger(i);
          else
            throw i;
        }).finally(() => {
          this.onFinishEvents.trigger(), this.loaded = true;
        });
      }
      static loaded(r) {
        let i = new _(Promise.resolve(r));
        return i.data = r, i.loaded = true, i;
      }
      onLoad(r) {
        return this.loaded && this.data ? r(this.data) : this.onLoadEvents.add(r), this;
      }
      onError(r) {
        return this.loaded && this.error ? r(this.error) : this.onErrorEvents.add(r), this;
      }
      onFinish(r) {
        return this.loaded ? r() : this.onFinishEvents.add(r), this;
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
    a(_, "ie"), o(_, "Asset");
    class me {
      assets = /* @__PURE__ */ new Map();
      lastUID = 0;
      add(r, i) {
        let s = r ?? this.lastUID++ + "", h = new _(i);
        return this.assets.set(s, h), h;
      }
      addLoaded(r, i) {
        let s = r ?? this.lastUID++ + "", h = _.loaded(i);
        return this.assets.set(s, h), h;
      }
      get(r) {
        return this.assets.get(r);
      }
      progress() {
        if (this.assets.size === 0)
          return 1;
        let r = 0;
        return this.assets.forEach((i) => {
          i.loaded && r++;
        }), r / this.assets.size;
      }
    }
    a(me, "xe"), o(me, "AssetBucket");
    let U = { urlPrefix: "", sprites: new me(), fonts: new me(), bitmapFonts: new me(), sounds: new me(), shaders: new me(), custom: new me(), packer: new Ce(Pi, Fi), loaded: false }, M = { events: new Vt(), objEvents: new Vt(), root: Pr([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new x(1), angle: 0, shake: 0, transform: new ae() } };
    function tt(t) {
      return U.custom.add(null, t);
    }
    a(tt, "ct"), o(tt, "load");
    function Te() {
      let t = [U.sprites, U.sounds, U.shaders, U.fonts, U.bitmapFonts, U.custom];
      return t.reduce((r, i) => r + i.progress(), 0) / t.length;
    }
    a(Te, "Fe"), o(Te, "loadProgress");
    function xt(t) {
      return t !== void 0 && (U.urlPrefix = t), U.urlPrefix;
    }
    a(xt, "en"), o(xt, "loadRoot");
    function Qe(t) {
      let r = U.urlPrefix + t;
      return fetch(r).then((i) => {
        if (!i.ok)
          throw new Error(`Failed to fetch ${r}`);
        return i;
      });
    }
    a(Qe, "lt"), o(Qe, "fetchURL");
    function Le(t) {
      return Qe(t).then((r) => r.json());
    }
    a(Le, "We"), o(Le, "fetchJSON");
    function yt(t) {
      return Qe(t).then((r) => r.text());
    }
    a(yt, "tn"), o(yt, "fetchText");
    function Et(t) {
      return Qe(t).then((r) => r.arrayBuffer());
    }
    a(Et, "nn"), o(Et, "fetchArrayBuffer");
    function Oe(t) {
      let r = new Image();
      return r.crossOrigin = "anonymous", r.src = Ai(t) ? t : U.urlPrefix + t, new Promise((i, s) => {
        r.onload = () => i(r), r.onerror = () => s(new Error(`Failed to load image from "${t}"`));
      });
    }
    a(Oe, "Je"), o(Oe, "loadImg");
    function bt(t, r) {
      return U.custom.add(t, Le(r));
    }
    a(bt, "rn"), o(bt, "loadJSON");
    class Ge {
      fontface;
      outline;
      filter;
      constructor(r, i = {}) {
        this.fontface = r, this.outline = i.outline ?? 0, this.filter = i.filter ?? Ci;
      }
    }
    a(Ge, "_e"), o(Ge, "FontData");
    function $t(t, r, i = {}) {
      let s = new FontFace(t, typeof r == "string" ? `url(${r})` : r);
      return document.fonts.add(s), U.fonts.add(t, s.load().catch((h) => {
        throw new Error(`Failed to load font from "${r}": ${h}`);
      }).then((h) => new Ge(h, i)));
    }
    a($t, "sn"), o($t, "loadFont");
    function er(t, r, i, s, h = {}) {
      return U.bitmapFonts.add(t, Oe(r).then((l) => ue(z.fromImage(l, h), i, s, h.chars ?? Ei)));
    }
    a(er, "on"), o(er, "loadBitmapFont");
    function St(t = 1, r = 1, i = 0, s = 0, h = 1, l = 1) {
      let u = [], g = h / t, p = l / r;
      for (let m2 = 0; m2 < r; m2++)
        for (let y = 0; y < t; y++)
          u.push(new se(i + y * g, s + m2 * p, g, p));
      return u;
    }
    a(St, "Et"), o(St, "slice");
    function rt(t, r) {
      return tt(typeof r == "string" ? new Promise((i, s) => {
        Le(r).then((h) => {
          rt(t, h).then(i).catch(s);
        });
      }) : $.from(t).then((i) => {
        let s = {};
        for (let h in r) {
          let l = r[h], u = i.frames[0], g = Pi * u.w, p = Fi * u.h, m2 = l.frames ? l.frames.map((D) => new se(u.x + (l.x + D.x) / g * u.w, u.y + (l.y + D.y) / p * u.h, D.w / g * u.w, D.h / p * u.h)) : St(l.sliceX || 1, l.sliceY || 1, u.x + l.x / g * u.w, u.y + l.y / p * u.h, l.width / g * u.w, l.height / p * u.h), y = new $(i.tex, m2, l.anims);
          U.sprites.addLoaded(h, y), s[h] = y;
        }
        return s;
      }));
    }
    a(rt, "St"), o(rt, "loadSpriteAtlas");
    function nt(t, r = {}) {
      let i = document.createElement("canvas"), s = t[0].width, h = t[0].height;
      i.width = s * t.length, i.height = h;
      let l = i.getContext("2d");
      t.forEach((g, p) => {
        g instanceof ImageData ? l.putImageData(g, p * s, 0) : l.drawImage(g, p * s, 0);
      });
      let u = l.getImageData(0, 0, t.length * s, h);
      return $.fromImage(u, { ...r, sliceX: t.length, sliceY: 1 });
    }
    a(nt, "Ct"), o(nt, "createSpriteSheet");
    function ke(t, r, i = { sliceX: 1, sliceY: 1, anims: {} }) {
      return Array.isArray(r) ? r.some((s) => typeof s == "string") ? U.sprites.add(t, Promise.all(r.map((s) => typeof s == "string" ? Oe(s) : Promise.resolve(s))).then((s) => nt(s, i))) : U.sprites.addLoaded(t, nt(r, i)) : typeof r == "string" ? U.sprites.add(t, $.from(r, i)) : U.sprites.addLoaded(t, $.fromImage(r, i));
    }
    a(ke, "He"), o(ke, "loadSprite");
    function Rt(t, r) {
      return U.sprites.add(t, new Promise(async (i) => {
        let s = typeof r == "string" ? await Le(r) : r, h = await Promise.all(s.frames.map(Oe)), l = document.createElement("canvas");
        l.width = s.width, l.height = s.height * s.frames.length;
        let u = l.getContext("2d");
        h.forEach((p, m2) => {
          u.drawImage(p, 0, m2 * s.height);
        });
        let g = await ke(null, l, { sliceY: s.frames.length, anims: s.anims });
        i(g);
      }));
    }
    a(Rt, "an"), o(Rt, "loadPedit");
    function Mt(t, r, i) {
      typeof r == "string" && !i && (i = r.replace(new RegExp(`${Fs(r)}$`), "json"));
      let s = typeof i == "string" ? Le(i) : Promise.resolve(i);
      return U.sprites.add(t, s.then((h) => {
        let l = h.meta.size, u = h.frames.map((p) => new se(p.frame.x / l.w, p.frame.y / l.h, p.frame.w / l.w, p.frame.h / l.h)), g = {};
        for (let p of h.meta.frameTags)
          p.from === p.to ? g[p.name] = p.from : g[p.name] = { from: p.from, to: p.to, speed: 10, loop: true, pingpong: p.direction === "pingpong" };
        return $.from(r, { frames: u, anims: g });
      }));
    }
    a(Mt, "un"), o(Mt, "loadAseprite");
    function Tt(t, r, i) {
      return U.shaders.addLoaded(t, Ze(r, i));
    }
    a(Tt, "cn"), o(Tt, "loadShader");
    function Pt(t, r, i) {
      let s = o((l) => l ? yt(l) : Promise.resolve(null), "resolveUrl"), h = Promise.all([s(r), s(i)]).then(([l, u]) => Ze(l, u));
      return U.shaders.add(t, h);
    }
    a(Pt, "ln"), o(Pt, "loadShaderURL");
    function Ft(t, r, i = {}) {
      return U.sounds.add(t, typeof r == "string" ? ce.fromURL(r) : ce.fromArrayBuffer(r));
    }
    a(Ft, "hn"), o(Ft, "loadSound");
    function Bt(t = "bean") {
      return ke(t, ks);
    }
    a(Bt, "dn"), o(Bt, "loadBean");
    function it(t) {
      return U.sprites.get(t);
    }
    a(it, "Tt"), o(it, "getSprite");
    function st(t) {
      return U.sounds.get(t);
    }
    a(st, "At"), o(st, "getSound");
    function ot(t) {
      return U.fonts.get(t);
    }
    a(ot, "Ot"), o(ot, "getFont");
    function at(t) {
      return U.bitmapFonts.get(t);
    }
    a(at, "Pt"), o(at, "getBitmapFont");
    function ht(t) {
      return U.shaders.get(t);
    }
    a(ht, "Rt"), o(ht, "getShader");
    function Ct(t) {
      return U.custom.get(t);
    }
    a(Ct, "fn"), o(Ct, "getAsset");
    function ze(t) {
      if (typeof t == "string") {
        let r = it(t);
        if (r)
          return r;
        if (Te() < 1)
          return null;
        throw new Error(`Sprite not found: ${t}`);
      } else {
        if (t instanceof $)
          return _.loaded(t);
        if (t instanceof _)
          return t;
        throw new Error(`Invalid sprite: ${t}`);
      }
    }
    a(ze, "ht"), o(ze, "resolveSprite");
    function kt(t) {
      if (typeof t == "string") {
        let r = st(t);
        if (r)
          return r;
        if (Te() < 1)
          return null;
        throw new Error(`Sound not found: ${t}`);
      } else {
        if (t instanceof ce)
          return _.loaded(t);
        if (t instanceof _)
          return t;
        throw new Error(`Invalid sound: ${t}`);
      }
    }
    a(kt, "mn"), o(kt, "resolveSound");
    function ut(t) {
      if (!t)
        return A.defShader;
      if (typeof t == "string") {
        let r = ht(t);
        if (r)
          return r.data ?? r;
        if (Te() < 1)
          return null;
        throw new Error(`Shader not found: ${t}`);
      } else if (t instanceof _)
        return t.data ? t.data : t;
      return t;
    }
    a(ut, "Mt"), o(ut, "resolveShader");
    function lt(t) {
      if (!t)
        return lt(e.font ?? Ls);
      if (typeof t == "string") {
        let r = at(t), i = ot(t);
        if (r)
          return r.data ?? r;
        if (i)
          return i.data ?? i;
        if (document.fonts.check(`${Si}px ${t}`))
          return t;
        if (Te() < 1)
          return null;
        throw new Error(`Font not found: ${t}`);
      } else if (t instanceof _)
        return t.data ? t.data : t;
      return t;
    }
    a(lt, "Dt"), o(lt, "resolveFont");
    function Dt(t) {
      return t !== void 0 && (ne.masterNode.gain.value = t), ne.masterNode.gain.value;
    }
    a(Dt, "pn"), o(Dt, "volume");
    function Je(t, r = {}) {
      let i = ne.ctx, s = r.paused ?? false, h = i.createBufferSource(), l = new Se(), u = i.createGain(), g = r.seek ?? 0, p = 0, m2 = 0, y = false;
      h.loop = !!r.loop, h.detune.value = r.detune ?? 0, h.playbackRate.value = r.speed ?? 1, h.connect(u), h.onended = () => {
        K() >= h.buffer?.duration && l.trigger();
      }, u.connect(ne.masterNode), u.gain.value = r.volume ?? 1;
      let D = o((F) => {
        h.buffer = F.buf, s || (p = i.currentTime, h.start(0, g), y = true);
      }, "start"), j = kt(t);
      j instanceof _ && j.onLoad(D);
      let K = o(() => {
        if (!h.buffer)
          return 0;
        let F = s ? m2 - p : i.currentTime - p, N = h.buffer.duration;
        return h.loop ? F % N : Math.min(F, N);
      }, "getTime"), Z = o((F) => {
        let N = i.createBufferSource();
        return N.buffer = F.buffer, N.loop = F.loop, N.playbackRate.value = F.playbackRate.value, N.detune.value = F.detune.value, N.onended = F.onended, N.connect(u), N;
      }, "cloneNode");
      return { set paused(F) {
        if (s !== F)
          if (s = F, F)
            y && (h.stop(), y = false), m2 = i.currentTime;
          else {
            h = Z(h);
            let N = m2 - p;
            h.start(0, N), y = true, p = i.currentTime - N, m2 = 0;
          }
      }, get paused() {
        return s;
      }, play(F = 0) {
        this.seek(F), this.paused = false;
      }, seek(F) {
        h.buffer?.duration && (F > h.buffer.duration || (s ? (h = Z(h), p = m2 - F) : (h.stop(), h = Z(h), p = i.currentTime - F, h.start(0, F), y = true, m2 = 0)));
      }, set speed(F) {
        h.playbackRate.value = F;
      }, get speed() {
        return h.playbackRate.value;
      }, set detune(F) {
        h.detune.value = F;
      }, get detune() {
        return h.detune.value;
      }, set volume(F) {
        u.gain.value = Math.max(F, 0);
      }, get volume() {
        return u.gain.value;
      }, set loop(F) {
        h.loop = F;
      }, get loop() {
        return h.loop;
      }, duration() {
        return h.buffer?.duration ?? 0;
      }, time() {
        return K() % this.duration();
      }, onEnd(F) {
        return l.add(F);
      }, then(F) {
        return this.onEnd(F);
      } };
    }
    a(Je, "dt"), o(Je, "play");
    function dt(t) {
      return Je(ne.burpSnd, t);
    }
    a(dt, "Gt"), o(dt, "burp");
    function Ze(t = Qr, r = zr) {
      let i = Ks.replace("{{user}}", t ?? Qr), s = Ys.replace("{{user}}", r ?? zr), h = c.createShader(c.VERTEX_SHADER), l = c.createShader(c.FRAGMENT_SHADER);
      c.shaderSource(h, i), c.shaderSource(l, s), c.compileShader(h), c.compileShader(l);
      let u = c.createProgram();
      if (ve.push(() => c.deleteProgram(u)), c.attachShader(u, h), c.attachShader(u, l), c.bindAttribLocation(u, 0, "a_pos"), c.bindAttribLocation(u, 1, "a_uv"), c.bindAttribLocation(u, 2, "a_color"), c.linkProgram(u), !c.getProgramParameter(u, c.LINK_STATUS)) {
        let g = o((D) => {
          let j = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/, K = D.match(j);
          return { line: Number(K.groups.line), msg: K.groups.msg.replace(/\n\0$/, "") };
        }, "formatShaderError"), p = c.getShaderInfoLog(h), m2 = c.getShaderInfoLog(l), y = "";
        if (p) {
          let D = g(p);
          y += `Vertex shader line ${D.line - 14}: ${D.msg}`;
        }
        if (m2) {
          let D = g(m2);
          y += `Fragment shader line ${D.line - 14}: ${D.msg}`;
        }
        throw new Error(y);
      }
      return c.deleteShader(h), c.deleteShader(l), { bind() {
        c.useProgram(u);
      }, unbind() {
        c.useProgram(null);
      }, free() {
        c.deleteProgram(u);
      }, send(g) {
        for (let p in g) {
          let m2 = g[p], y = c.getUniformLocation(u, p);
          typeof m2 == "number" ? c.uniform1f(y, m2) : m2 instanceof ae ? c.uniformMatrix4fv(y, false, new Float32Array(m2.m)) : m2 instanceof O ? c.uniform3f(y, m2.r, m2.g, m2.b) : m2 instanceof x && c.uniform2f(y, m2.x, m2.y);
        }
      } };
    }
    a(Ze, "ft"), o(Ze, "makeShader");
    function ue(t, r, i, s) {
      let h = t.width / r, l = {}, u = s.split("").entries();
      for (let [g, p] of u)
        l[p] = new se(g % h * r, Math.floor(g / h) * i, r, i);
      return { tex: t, map: l, size: i };
    }
    a(ue, "de"), o(ue, "makeFont");
    function Pe(t, r, i, s = A.defTex, h = A.defShader, l = {}) {
      let u = ut(h);
      if (!u || u instanceof _)
        return;
      (s !== A.curTex || u !== A.curShader || !sn(A.curUniform, l) || A.vqueue.length + t.length * pr > ki || A.iqueue.length + r.length > Di) && le();
      let g = i ? A.transform : M.cam.transform.mult(A.transform);
      for (let p of t) {
        let m2 = Nt(g.multVec2(p.pos));
        A.vqueue.push(m2.x, m2.y, p.uv.x, p.uv.y, p.color.r / 255, p.color.g / 255, p.color.b / 255, p.opacity);
      }
      for (let p of r)
        A.iqueue.push(p + A.vqueue.length / pr - t.length);
      A.curTex = s, A.curShader = u, A.curUniform = l;
    }
    a(Pe, "Be"), o(Pe, "drawRaw");
    function le() {
      !A.curTex || !A.curShader || A.vqueue.length === 0 || A.iqueue.length === 0 || (c.bindBuffer(c.ARRAY_BUFFER, A.vbuf), c.bufferSubData(c.ARRAY_BUFFER, 0, new Float32Array(A.vqueue)), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, A.ibuf), c.bufferSubData(c.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(A.iqueue)), A.curShader.bind(), A.curShader.send(A.curUniform), A.curTex.bind(), c.drawElements(c.TRIANGLES, A.iqueue.length, c.UNSIGNED_SHORT, 0), A.curTex.unbind(), A.curShader.unbind(), c.bindBuffer(c.ARRAY_BUFFER, null), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null), A.vqueue.length = 0, A.iqueue.length = 0, A.drawCalls++);
    }
    a(le, "fe"), o(le, "flush");
    function It() {
      c.clear(c.COLOR_BUFFER_BIT), A.frameBuffer.bind(), c.viewport(0, 0, A.frameBuffer.width, A.frameBuffer.height), c.clear(c.COLOR_BUFFER_BIT), A.bgColor || De(() => {
        xe({ width: ge(), height: we(), quad: new se(0, 0, ge() / bi, we() / bi), tex: A.bgTex, fixed: true });
      }), A.drawCalls = 0, A.transformStack.length = 0, A.transform = new ae();
    }
    a(It, "Ft"), o(It, "frameStart");
    function tr(t, r) {
      A.postShader = t, A.postShaderUniform = r ?? null;
    }
    a(tr, "gn"), o(tr, "usePostEffect");
    function Ut() {
      le(), A.frameBuffer.unbind(), c.viewport(0, 0, c.drawingBufferWidth, c.drawingBufferHeight), le();
      let t = A.width, r = A.height;
      A.width = c.drawingBufferWidth / k, A.height = c.drawingBufferHeight / k, Lt({ flipY: true, tex: A.frameBuffer.tex, pos: new x(A.viewport.x, A.viewport.y), width: A.viewport.width, height: A.viewport.height, shader: A.postShader, uniform: typeof A.postShaderUniform == "function" ? A.postShaderUniform() : A.postShaderUniform, fixed: true }), le(), A.width = t, A.height = r, A.lastDrawCalls = A.drawCalls;
    }
    a(Ut, "Bt"), o(Ut, "frameEnd");
    function Nt(t) {
      return new x(t.x / ge() * 2 - 1, -t.y / we() * 2 + 1);
    }
    a(Nt, "Lt"), o(Nt, "screen2ndc");
    function f(t) {
      A.transform = t.clone();
    }
    a(f, "d"), o(f, "pushMatrix");
    function V(...t) {
      if (t[0] === void 0)
        return;
      let r = R(...t);
      r.x === 0 && r.y === 0 || A.transform.translate(r);
    }
    a(V, "b"), o(V, "pushTranslate");
    function b(...t) {
      if (t[0] === void 0)
        return;
      let r = R(...t);
      r.x === 1 && r.y === 1 || A.transform.scale(r);
    }
    a(b, "C"), o(b, "pushScale");
    function fe(t) {
      t && A.transform.rotate(t);
    }
    a(fe, "ee"), o(fe, "pushRotate");
    function q() {
      A.transformStack.push(A.transform.clone());
    }
    a(q, "re"), o(q, "pushTransform");
    function ie() {
      A.transformStack.length > 0 && (A.transform = A.transformStack.pop());
    }
    a(ie, "V"), o(ie, "popTransform");
    function xe(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0)
        return;
      let r = t.width, i = t.height, s = $e(t.anchor || dr).scale(new x(r, i).scale(-0.5)), h = t.quad || new se(0, 0, 1, 1), l = t.color || X(255, 255, 255), u = t.opacity ?? 1, g = t.tex ? Bi / t.tex.width : 0, p = t.tex ? Bi / t.tex.height : 0, m2 = h.x + g, y = h.y + p, D = h.w - g * 2, j = h.h - p * 2;
      q(), V(t.pos), fe(t.angle), b(t.scale), V(s), Pe([{ pos: new x(-r / 2, i / 2), uv: new x(t.flipX ? m2 + D : m2, t.flipY ? y : y + j), color: l, opacity: u }, { pos: new x(-r / 2, -i / 2), uv: new x(t.flipX ? m2 + D : m2, t.flipY ? y + j : y), color: l, opacity: u }, { pos: new x(r / 2, -i / 2), uv: new x(t.flipX ? m2 : m2 + D, t.flipY ? y + j : y), color: l, opacity: u }, { pos: new x(r / 2, i / 2), uv: new x(t.flipX ? m2 : m2 + D, t.flipY ? y : y + j), color: l, opacity: u }], [0, 1, 3, 1, 2, 3], t.fixed, t.tex, t.shader, t.uniform), ie();
    }
    a(xe, "Oe"), o(xe, "drawUVQuad");
    function Lt(t) {
      if (!t.tex)
        throw new Error('drawTexture() requires property "tex".');
      let r = t.quad ?? new se(0, 0, 1, 1), i = t.tex.width * r.w, s = t.tex.height * r.h, h = new x(1);
      if (t.tiled) {
        let l = Math.ceil((t.width || i) / i), u = Math.ceil((t.height || s) / s), g = $e(t.anchor || dr).add(new x(1, 1)).scale(0.5).scale(l * i, u * s);
        for (let p = 0; p < l; p++)
          for (let m2 = 0; m2 < u; m2++)
            xe(Object.assign({}, t, { pos: (t.pos || new x(0)).add(new x(i * p, s * m2)).sub(g), scale: h.scale(t.scale || new x(1)), tex: t.tex, quad: r, width: i, height: s, anchor: "topleft" }));
      } else
        t.width && t.height ? (h.x = t.width / i, h.y = t.height / s) : t.width ? (h.x = t.width / i, h.y = h.x) : t.height && (h.y = t.height / s, h.x = h.y), xe(Object.assign({}, t, { scale: h.scale(t.scale || new x(1)), tex: t.tex, quad: r, width: i, height: s }));
    }
    a(Lt, "Ie"), o(Lt, "drawTexture");
    function an(t) {
      if (!t.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let r = ze(t.sprite);
      if (!r || !r.data)
        return;
      let i = r.data.frames[t.frame ?? 0];
      if (!i)
        throw new Error(`Frame not found: ${t.frame ?? 0}`);
      Lt(Object.assign({}, t, { tex: r.data.tex, quad: i.scale(t.quad ?? new se(0, 0, 1, 1)) }));
    }
    a(an, "Xr"), o(an, "drawSprite");
    function ct(t, r, i, s, h, l = 1) {
      s = Fe(s % 360), h = Fe(h % 360), h <= s && (h += Math.PI * 2);
      let u = [], g = Math.ceil((h - s) / Fe(8) * l), p = (h - s) / g;
      for (let m2 = s; m2 < h; m2 += p)
        u.push(t.add(r * Math.cos(m2), i * Math.sin(m2)));
      return u.push(t.add(r * Math.cos(h), i * Math.sin(h))), u;
    }
    a(ct, "mt"), o(ct, "getArcPts");
    function ye(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0)
        return;
      let r = t.width, i = t.height, s = $e(t.anchor || dr).add(1, 1).scale(new x(r, i).scale(-0.5)), h = [new x(0, 0), new x(r, 0), new x(r, i), new x(0, i)];
      if (t.radius) {
        let l = Math.min(Math.min(r, i) / 2, t.radius);
        h = [new x(l, 0), new x(r - l, 0), ...ct(new x(r - l, l), l, l, 270, 360), new x(r, l), new x(r, i - l), ...ct(new x(r - l, i - l), l, l, 0, 90), new x(r - l, i), new x(l, i), ...ct(new x(l, i - l), l, l, 90, 180), new x(0, i - l), new x(0, l), ...ct(new x(l, l), l, l, 180, 270)];
      }
      qe(Object.assign({}, t, { offset: s, pts: h, ...t.gradient ? { colors: t.horizontal ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]] : [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]] } : {} }));
    }
    a(ye, "Ce"), o(ye, "drawRect");
    function ft(t) {
      let { p1: r, p2: i } = t;
      if (!r || !i)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let s = t.width || 1, h = i.sub(r).unit().normal().scale(s * 0.5), l = [r.sub(h), r.add(h), i.add(h), i.sub(h)].map((u) => ({ pos: new x(u.x, u.y), uv: new x(0), color: t.color ?? O.WHITE, opacity: t.opacity ?? 1 }));
      Pe(l, [0, 1, 3, 1, 2, 3], t.fixed, A.defTex, t.shader, t.uniform);
    }
    a(ft, "pt"), o(ft, "drawLine");
    function vr(t) {
      let r = t.pts;
      if (!r)
        throw new Error('drawLines() requires property "pts".');
      if (!(r.length < 2))
        if (t.radius && r.length >= 3) {
          let i = r[0].sdist(r[1]);
          for (let h = 1; h < r.length - 1; h++)
            i = Math.min(r[h].sdist(r[h + 1]), i);
          let s = Math.min(t.radius, Math.sqrt(i) / 2);
          ft(Object.assign({}, t, { p1: r[0], p2: r[1] }));
          for (let h = 1; h < r.length - 2; h++) {
            let l = r[h], u = r[h + 1];
            ft(Object.assign({}, t, { p1: l, p2: u }));
          }
          ft(Object.assign({}, t, { p1: r[r.length - 2], p2: r[r.length - 1] }));
        } else
          for (let i = 0; i < r.length - 1; i++)
            ft(Object.assign({}, t, { p1: r[i], p2: r[i + 1] })), t.join !== "none" && We(Object.assign({}, t, { pos: r[i], radius: t.width / 2 }));
    }
    a(vr, "Hn"), o(vr, "drawLines");
    function xr(t) {
      if (!t.p1 || !t.p2 || !t.p3)
        throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
      return qe(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
    }
    a(xr, "qn"), o(xr, "drawTriangle");
    function We(t) {
      if (!t.radius)
        throw new Error('drawCircle() requires property "radius".');
      t.radius !== 0 && yr(Object.assign({}, t, { radiusX: t.radius, radiusY: t.radius, angle: 0 }));
    }
    a(We, "Qe"), o(We, "drawCircle");
    function yr(t) {
      if (t.radiusX === void 0 || t.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (t.radiusX === 0 || t.radiusY === 0)
        return;
      let r = t.start ?? 0, i = t.end ?? 360, s = $e(t.anchor ?? "center").scale(new x(-t.radiusX, -t.radiusY)), h = ct(s, t.radiusX, t.radiusY, r, i, t.resolution);
      h.unshift(s);
      let l = Object.assign({}, t, { pts: h, radius: 0, ...t.gradient ? { colors: [t.gradient[0], ...Array(h.length - 1).fill(t.gradient[1])] } : {} });
      if (i - r >= 360 && t.outline) {
        t.fill !== false && qe(Object.assign(l, { outline: null })), qe(Object.assign(l, { pts: h.slice(1), fill: false }));
        return;
      }
      qe(l);
    }
    a(yr, "$n"), o(yr, "drawEllipse");
    function qe(t) {
      if (!t.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let r = t.pts.length;
      if (!(r < 3)) {
        if (q(), V(t.pos), b(t.scale), fe(t.angle), V(t.offset), t.fill !== false) {
          let i = t.color ?? O.WHITE, s = t.pts.map((l, u) => ({ pos: new x(l.x, l.y), uv: new x(0, 0), color: t.colors ? t.colors[u] ?? i : i, opacity: t.opacity ?? 1 })), h = [...Array(r - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          Pe(s, t.indices ?? h, t.fixed, A.defTex, t.shader, t.uniform);
        }
        t.outline && vr({ pts: [...t.pts, t.pts[0]], radius: t.radius, width: t.outline.width, color: t.outline.color, join: t.outline.join, uniform: t.uniform, fixed: t.fixed, opacity: t.opacity }), ie();
      }
    }
    a(qe, "qe"), o(qe, "drawPolygon");
    function Er(t, r, i) {
      le(), c.clear(c.STENCIL_BUFFER_BIT), c.enable(c.STENCIL_TEST), c.stencilFunc(c.NEVER, 1, 255), c.stencilOp(c.REPLACE, c.REPLACE, c.REPLACE), r(), le(), c.stencilFunc(i, 1, 255), c.stencilOp(c.KEEP, c.KEEP, c.KEEP), t(), le(), c.disable(c.STENCIL_TEST);
    }
    a(Er, "zn"), o(Er, "drawStenciled");
    function hn(t, r) {
      Er(t, r, c.EQUAL);
    }
    a(hn, "Wr"), o(hn, "drawMasked");
    function un(t, r) {
      Er(t, r, c.NOTEQUAL);
    }
    a(un, "Jr"), o(un, "drawSubtracted");
    function br() {
      return (A.viewport.width + A.viewport.height) / (A.width + A.height);
    }
    a(br, "Kn"), o(br, "getViewportScale");
    function De(t) {
      le();
      let r = A.width, i = A.height;
      A.width = A.viewport.width, A.height = A.viewport.height, t(), le(), A.width = r, A.height = i;
    }
    a(De, "Ve"), o(De, "drawUnscaled");
    function Sr(t, r) {
      r.pos && (t.pos = t.pos.add(r.pos)), r.scale && (t.scale = t.scale.scale(R(r.scale))), r.angle && (t.angle += r.angle), r.color && (t.color = t.color.mult(r.color)), r.opacity && (t.opacity *= r.opacity);
    }
    a(Sr, "Yn"), o(Sr, "applyCharTransform");
    let ln = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function dn(t) {
      let r = {}, i = t.replace(ln, "$2"), s = 0;
      for (let h of t.matchAll(ln)) {
        let l = h.index - s;
        for (let u = 0; u < h.groups.text.length; u++)
          r[u + l] = [h.groups.style];
        s += h[0].length - h.groups.text.length;
      }
      return { charStyleMap: r, text: i };
    }
    a(dn, "Qr"), o(dn, "compileStyledText");
    let Rr = {};
    function Ke(t) {
      if (t.text === void 0)
        throw new Error('formatText() requires property "text".');
      let r = lt(t.font);
      if (t.text === "" || r instanceof _ || !r)
        return { width: 0, height: 0, chars: [], opt: t };
      let { charStyleMap: i, text: s } = dn(t.text + ""), h = s.split("");
      if (r instanceof Ge || typeof r == "string") {
        let L = r instanceof Ge ? r.fontface.family : r, W = r instanceof Ge ? { outline: r.outline, filter: r.filter } : { outline: 0, filter: Ci }, I = Rr[L] ?? { font: { tex: new z(Mi, Ti, { filter: W.filter }), map: {}, size: Si }, cursor: new x(0), outline: W.outline };
        Rr[L] || (Rr[L] = I), r = I.font;
        for (let be of h)
          if (!I.font.map[be]) {
            let v = he;
            v.clearRect(0, 0, Q.width, Q.height), v.font = `${r.size}px ${L}`, v.textBaseline = "top", v.textAlign = "left", v.fillStyle = "#ffffff";
            let P = v.measureText(be), T = Math.ceil(P.width), C = r.size;
            I.outline && (v.lineJoin = "round", v.lineWidth = I.outline * 2, v.strokeStyle = "#000000", v.strokeText(be, I.outline, I.outline), T += I.outline * 2, C += I.outline * 3), v.fillText(be, I.outline, I.outline);
            let Y = v.getImageData(0, 0, T, C);
            if (I.cursor.x + T > Mi && (I.cursor.x = 0, I.cursor.y += C, I.cursor.y > Ti))
              throw new Error("Font atlas exceeds character limit");
            r.tex.update(Y, I.cursor.x, I.cursor.y), r.map[be] = new se(I.cursor.x, I.cursor.y, T, C), I.cursor.x += T;
          }
      }
      let l = t.size || r.size, u = R(t.scale ?? 1).scale(l / r.size), g = t.lineSpacing ?? 0, p = t.letterSpacing ?? 0, m2 = 0, y = 0, D = 0, j = [], K = [], Z = 0, F = null, N = null;
      for (; Z < h.length; ) {
        let L = h[Z];
        if (L === `
`)
          D += l + g, j.push({ width: m2 - p, chars: K }), F = null, N = null, m2 = 0, K = [];
        else {
          let W = r.map[L];
          if (W) {
            let I = W.w * u.x;
            t.width && m2 + I > t.width && (D += l + g, F != null && (Z -= K.length - F, L = h[Z], W = r.map[L], I = W.w * u.x, K = K.slice(0, F - 1), m2 = N), F = null, N = null, j.push({ width: m2 - p, chars: K }), m2 = 0, K = []), K.push({ tex: r.tex, width: W.w, height: W.h, quad: new se(W.x / r.tex.width, W.y / r.tex.height, W.w / r.tex.width, W.h / r.tex.height), ch: L, pos: new x(m2, D), opacity: t.opacity ?? 1, color: t.color ?? O.WHITE, scale: R(u), angle: 0 }), L === " " && (F = K.length, N = m2), m2 += I, y = Math.max(y, m2), m2 += p;
          }
        }
        Z++;
      }
      j.push({ width: m2 - p, chars: K }), D += l, t.width && (y = t.width);
      let Ae = [];
      for (let L of j) {
        let W = (y - L.width) * ts(t.align ?? "left");
        for (let I of L.chars) {
          let be = r.map[I.ch], v = Ae.length;
          if (I.pos = I.pos.add(W, 0).add(be.w * u.x * 0.5, be.h * u.y * 0.5), t.transform) {
            let P = typeof t.transform == "function" ? t.transform(v, I.ch) : t.transform;
            P && Sr(I, P);
          }
          if (i[v]) {
            let P = i[v];
            for (let T of P) {
              let C = t.styles[T], Y = typeof C == "function" ? C(v, I.ch) : C;
              Y && Sr(I, Y);
            }
          }
          Ae.push(I);
        }
      }
      return { width: y, height: D, chars: Ae, opt: t };
    }
    a(Ke, "$e"), o(Ke, "formatText");
    function Mr(t) {
      Ye(Ke(t));
    }
    a(Mr, "Wn"), o(Mr, "drawText");
    function Ye(t) {
      q(), V(t.opt.pos), fe(t.opt.angle), V($e(t.opt.anchor ?? "topleft").add(1, 1).scale(t.width, t.height).scale(-0.5)), t.chars.forEach((r) => {
        xe({ tex: r.tex, width: r.width, height: r.height, pos: r.pos, scale: r.scale, angle: r.angle, color: r.color, opacity: r.opacity, quad: r.quad, anchor: "center", uniform: t.opt.uniform, shader: t.opt.shader, fixed: t.opt.fixed });
      }), ie();
    }
    a(Ye, "ze"), o(Ye, "drawFormattedText");
    function ge() {
      return A.width;
    }
    a(ge, "we"), o(ge, "width");
    function we() {
      return A.height;
    }
    a(we, "ye"), o(we, "height");
    let pt = {};
    function cn(t) {
      return new x((t.x - A.viewport.x) * ge() / A.viewport.width, (t.y - A.viewport.y) * we() / A.viewport.height);
    }
    a(cn, "Zr"), o(cn, "windowToContent");
    function fn(t) {
      return new x(t.x * A.viewport.width / A.width, t.y * A.viewport.height / A.height);
    }
    a(fn, "es"), o(fn, "contentToView");
    function Ot() {
      return cn(E.mousePos());
    }
    a(Ot, "It"), o(Ot, "mousePos"), pt.error = (t) => {
      t.error ? ar(t.error) : ar(new Error(t.message));
    }, pt.unhandledrejection = (t) => ar(t.reason);
    for (let t in pt)
      window.addEventListener(t, pt[t]);
    let ee = { inspect: false, timeScale: 1, showLog: true, fps: () => E.fps(), numFrames: () => E.numFrames(), stepFrame: Gr, drawCalls: () => A.drawCalls, clearLog: () => M.logs = [], log: (t) => {
      let r = e.logMax ?? qs, i = t instanceof Error ? "error" : "info";
      M.logs.unshift(`${`[time]${E.time().toFixed(2)}[/time] `}[${i}]${t?.toString ? t.toString() : t}[/${i}]`), M.logs.length > r && (M.logs = M.logs.slice(0, r));
    }, error: (t) => ee.log(new Error(t.toString ? t.toString() : t)), curRecording: null, get paused() {
      return E.paused;
    }, set paused(t) {
      E.paused = t, t ? ne.ctx.suspend() : ne.ctx.resume();
    } };
    function Ee() {
      return E.dt();
    }
    a(Ee, "Te"), o(Ee, "dt");
    function pn(...t) {
      return t.length > 0 && (M.cam.pos = R(...t)), M.cam.pos ? M.cam.pos.clone() : Ht();
    }
    a(pn, "ts"), o(pn, "camPos");
    function gn(...t) {
      return t.length > 0 && (M.cam.scale = R(...t)), M.cam.scale.clone();
    }
    a(gn, "ns"), o(gn, "camScale");
    function mn(t) {
      return t !== void 0 && (M.cam.angle = t), M.cam.angle;
    }
    a(mn, "rs"), o(mn, "camRot");
    function wn(t = 12) {
      M.cam.shake = t;
    }
    a(wn, "ss"), o(wn, "shake");
    function rr(t) {
      return M.cam.transform.multVec2(t);
    }
    a(rr, "bn"), o(rr, "toScreen");
    function Tr(t) {
      return M.cam.transform.invert().multVec2(t);
    }
    a(Tr, "Jn"), o(Tr, "toWorld");
    function Gt(t) {
      let r = new ae();
      return t.pos && r.translate(t.pos), t.scale && r.scale(t.scale), t.angle && r.rotate(t.angle), t.parent ? r.mult(t.parent.transform) : r;
    }
    a(Gt, "Vt"), o(Gt, "calcTransform");
    function Pr(t) {
      let r = /* @__PURE__ */ new Map(), i = {}, s = new Vt(), h = null, l = { id: Bs(), hidden: false, paused: false, transform: new ae(), children: [], parent: null, add(u) {
        let g = (() => {
          if (Array.isArray(u))
            return Pr(u);
          if (u.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return u;
        })();
        return g.parent = this, g.transform = Gt(g), this.children.push(g), g.trigger("add", g), M.events.trigger("add", g), g;
      }, readd(u) {
        let g = this.children.indexOf(u);
        return g !== -1 && (this.children.splice(g, 1), this.children.push(u)), u;
      }, remove(u) {
        let g = this.children.indexOf(u);
        g !== -1 && (u.trigger("destroy"), M.events.trigger("destroy", u), u.parent = null, this.children.splice(g, 1));
      }, removeAll(u) {
        this.get(u).forEach((g) => this.remove(g));
      }, update() {
        this.paused || (this.children.sort((u, g) => (u.z ?? 0) - (g.z ?? 0)).forEach((u) => u.update()), this.trigger("update"));
      }, draw() {
        this.hidden || (q(), V(this.pos), b(this.scale), fe(this.angle), this.trigger("draw"), this.children.sort((u, g) => (u.z ?? 0) - (g.z ?? 0)).forEach((u) => u.draw()), ie());
      }, drawInspect() {
        this.hidden || (q(), V(this.pos), b(this.scale), fe(this.angle), this.children.sort((u, g) => (u.z ?? 0) - (g.z ?? 0)).forEach((u) => u.drawInspect()), this.trigger("drawInspect"), ie());
      }, use(u) {
        if (!u)
          return;
        if (typeof u == "string")
          return this.use({ id: u });
        let g = [];
        u.id && (this.unuse(u.id), i[u.id] = [], g = i[u.id], r.set(u.id, u));
        for (let m2 in u) {
          if (Hs.has(m2))
            continue;
          let y = Object.getOwnPropertyDescriptor(u, m2);
          if (typeof y.value == "function" && (u[m2] = u[m2].bind(this)), y.set && Object.defineProperty(u, m2, { set: y.set.bind(this) }), y.get && Object.defineProperty(u, m2, { get: y.get.bind(this) }), js.has(m2)) {
            let D = m2 === "add" ? () => {
              h = o((j) => g.push(j), "onCurCompCleanup"), u[m2](), h = null;
            } : u[m2];
            g.push(this.on(m2, D).cancel);
          } else if (this[m2] === void 0)
            Object.defineProperty(this, m2, { get: () => u[m2], set: (D) => u[m2] = D, configurable: true, enumerable: true }), g.push(() => delete this[m2]);
          else
            throw new Error(`Duplicate component property: "${m2}"`);
        }
        let p = o(() => {
          if (u.require) {
            for (let m2 of u.require)
              if (!this.c(m2))
                throw new Error(`Component "${u.id}" requires component "${m2}"`);
          }
        }, "checkDeps");
        u.destroy && g.push(u.destroy.bind(this)), this.exists() ? (p(), u.add && (h = o((m2) => g.push(m2), "onCurCompCleanup"), u.add.call(this), h = null)) : u.require && g.push(this.on("add", p).cancel);
      }, unuse(u) {
        i[u] && (i[u].forEach((g) => g()), delete i[u]), r.has(u) && r.delete(u);
      }, c(u) {
        return r.get(u);
      }, get(u, g = {}) {
        let p = g.recursive ? this.children.flatMap((m2) => [m2, ...m2.children]) : this.children;
        if (p = p.filter((m2) => u ? m2.is(u) : true), g.liveUpdate) {
          let m2 = o((y) => g.recursive ? this.isAncestorOf(y) : y.parent === this, "isChild");
          nr((y) => {
            m2(y) && y.is(u) && p.push(y);
          }), Br((y) => {
            if (m2(y) && y.is(u)) {
              let D = p.findIndex((j) => j.id === y.id);
              D !== -1 && p.splice(D, 1);
            }
          });
        }
        return p;
      }, isAncestorOf(u) {
        return u.parent ? u.parent === this || this.isAncestorOf(u.parent) : false;
      }, exists() {
        return M.root.isAncestorOf(this);
      }, is(u) {
        if (u === "*")
          return true;
        if (Array.isArray(u)) {
          for (let g of u)
            if (!this.c(g))
              return false;
          return true;
        } else
          return this.c(u) != null;
      }, on(u, g) {
        let p = s.on(u, g.bind(this));
        return h && h(() => p.cancel()), p;
      }, trigger(u, ...g) {
        s.trigger(u, ...g), M.objEvents.trigger(u, this, ...g);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let u = {};
        for (let [g, p] of r)
          u[g] = p.inspect ? p.inspect() : null;
        return u;
      }, onAdd(u) {
        return this.on("add", u);
      }, onUpdate(u) {
        return this.on("update", u);
      }, onDraw(u) {
        return this.on("draw", u);
      }, onDestroy(u) {
        return this.on("destroy", u);
      }, clearEvents() {
        s.clear();
      } };
      for (let u of t)
        l.use(u);
      return l;
    }
    a(Pr, "Qn"), o(Pr, "make");
    function Ie(t, r, i) {
      return M.objEvents[t] || (M.objEvents[t] = new nn()), M.objEvents.on(t, (s, ...h) => {
        s.is(r) && i(s, ...h);
      });
    }
    a(Ie, "je"), o(Ie, "on");
    let Fr = o((t, r) => {
      if (typeof t == "function" && r === void 0) {
        let i = jt([{ update: t }]);
        return { get paused() {
          return i.paused;
        }, set paused(s) {
          i.paused = s;
        }, cancel: () => i.destroy() };
      } else if (typeof t == "string")
        return Ie("update", t, r);
    }, "onUpdate"), fs = o((t, r) => {
      if (typeof t == "function" && r === void 0) {
        let i = jt([{ draw: t }]);
        return { get paused() {
          return i.hidden;
        }, set paused(s) {
          i.hidden = s;
        }, cancel: () => i.destroy() };
      } else if (typeof t == "string")
        return Ie("draw", t, r);
    }, "onDraw");
    function nr(t, r) {
      if (typeof t == "function" && r === void 0)
        return M.events.on("add", t);
      if (typeof t == "string")
        return Ie("add", t, r);
    }
    a(nr, "yn"), o(nr, "onAdd");
    function Br(t, r) {
      if (typeof t == "function" && r === void 0)
        return M.events.on("destroy", t);
      if (typeof t == "string")
        return Ie("destroy", t, r);
    }
    a(Br, "Zn"), o(Br, "onDestroy");
    function An(t, r, i) {
      return Ie("collide", t, (s, h, l) => h.is(r) && i(s, h, l));
    }
    a(An, "os"), o(An, "onCollide");
    function Vn(t, r, i) {
      return Ie("collideUpdate", t, (s, h, l) => h.is(r) && i(s, h, l));
    }
    a(Vn, "as"), o(Vn, "onCollideUpdate");
    function vn(t, r, i) {
      return Ie("collideEnd", t, (s, h, l) => h.is(r) && i(s, h, l));
    }
    a(vn, "us"), o(vn, "onCollideEnd");
    function qt(t, r) {
      oi(t, { recursive: true }).forEach(r), nr(t, r);
    }
    a(qt, "jt"), o(qt, "forAllCurrentAndFuture");
    function xn(t, r) {
      if (typeof t == "function")
        return E.onMousePress(t);
      {
        let i = [];
        return qt(t, (s) => {
          if (!s.area)
            throw new Error("onClick() requires the object to have area() component");
          i.push(s.onClick(() => r(s)));
        }), He.join(i);
      }
    }
    a(xn, "cs"), o(xn, "onClick");
    function yn(t, r) {
      let i = [];
      return qt(t, (s) => {
        if (!s.area)
          throw new Error("onHover() requires the object to have area() component");
        i.push(s.onHover(() => r(s)));
      }), He.join(i);
    }
    a(yn, "ls"), o(yn, "onHover");
    function En(t, r) {
      let i = [];
      return qt(t, (s) => {
        if (!s.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        i.push(s.onHoverUpdate(() => r(s)));
      }), He.join(i);
    }
    a(En, "hs"), o(En, "onHoverUpdate");
    function bn(t, r) {
      let i = [];
      return qt(t, (s) => {
        if (!s.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        i.push(s.onHoverEnd(() => r(s)));
      }), He.join(i);
    }
    a(bn, "ds"), o(bn, "onHoverEnd");
    function gt(t, r) {
      let i = 0, s = [];
      r && s.push(r);
      let h = Fr(() => {
        i += Ee(), i >= t && (h.cancel(), s.forEach((l) => l()));
      });
      return { paused: h.paused, cancel: h.cancel, onEnd(l) {
        s.push(l);
      }, then(l) {
        return this.onEnd(l), this;
      } };
    }
    a(gt, "gt"), o(gt, "wait");
    function Sn(t, r) {
      let i = null, s = o(() => {
        i = gt(t, s), r();
      }, "newAction");
      return i = gt(0, s), { get paused() {
        return i.paused;
      }, set paused(h) {
        i.paused = h;
      }, cancel: () => i.cancel() };
    }
    a(Sn, "fs"), o(Sn, "loop");
    function Cr() {
      E.onKeyPress("f1", () => {
        ee.inspect = !ee.inspect;
      }), E.onKeyPress("f2", () => {
        ee.clearLog();
      }), E.onKeyPress("f8", () => {
        ee.paused = !ee.paused;
      }), E.onKeyPress("f7", () => {
        ee.timeScale = mt(je(ee.timeScale - 0.2, 0, 2), 1);
      }), E.onKeyPress("f9", () => {
        ee.timeScale = mt(je(ee.timeScale + 0.2, 0, 2), 1);
      }), E.onKeyPress("f10", () => {
        ee.stepFrame();
      });
    }
    a(Cr, "er"), o(Cr, "enterDebugMode");
    function kr() {
      E.onKeyPress("b", () => dt());
    }
    a(kr, "tr"), o(kr, "enterBurpMode");
    function Rn(t) {
      M.gravity = t;
    }
    a(Rn, "ms"), o(Rn, "setGravity");
    function Mn() {
      return M.gravity;
    }
    a(Mn, "ps"), o(Mn, "getGravity");
    function Tn(...t) {
      t.length === 1 || t.length === 2 ? (A.bgColor = X(t[0]), t[1] && (A.bgAlpha = t[1])) : (t.length === 3 || t.length === 4) && (A.bgColor = X(t[0], t[1], t[2]), t[3] && (A.bgAlpha = t[3])), c.clearColor(A.bgColor.r / 255, A.bgColor.g / 255, A.bgColor.b / 255, A.bgAlpha);
    }
    a(Tn, "gs"), o(Tn, "setBackground");
    function Pn() {
      return A.bgColor.clone();
    }
    a(Pn, "ws"), o(Pn, "getBackground");
    function Kt(...t) {
      return { id: "pos", pos: R(...t), moveBy(...r) {
        this.pos = this.pos.add(R(...r));
      }, move(...r) {
        this.moveBy(R(...r).scale(Ee()));
      }, moveTo(...r) {
        if (typeof r[0] == "number" && typeof r[1] == "number")
          return this.moveTo(R(r[0], r[1]), r[2]);
        let i = r[0], s = r[1];
        if (s === void 0) {
          this.pos = R(i);
          return;
        }
        let h = i.sub(this.pos);
        if (h.len() <= s * Ee()) {
          this.pos = R(i);
          return;
        }
        this.move(h.unit().scale(s));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        return this.fixed ? this.pos : rr(this.pos);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        We({ color: X(255, 0, 0), radius: 4 / br() });
      } };
    }
    a(Kt, "Nt"), o(Kt, "pos");
    function Yt(...t) {
      return t.length === 0 ? Yt(1) : { id: "scale", scale: R(...t), scaleTo(...r) {
        this.scale = R(...r);
      }, scaleBy(...r) {
        this.scale.scale(R(...r));
      }, inspect() {
        return `(${mt(this.scale.x, 2)}, ${mt(this.scale.y, 2)})`;
      } };
    }
    a(Yt, "kt"), o(Yt, "scale");
    function Fn(t) {
      return { id: "rotate", angle: t ?? 0, rotateBy(r) {
        this.angle += r;
      }, rotateTo(r) {
        this.angle = r;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      } };
    }
    a(Fn, "bs"), o(Fn, "rotate");
    function Bn(...t) {
      return { id: "color", color: X(...t), inspect() {
        return this.color.toString();
      } };
    }
    a(Bn, "vs"), o(Bn, "color");
    function mt(t, r) {
      return Number(t.toFixed(r));
    }
    a(mt, "wt"), o(mt, "toFixed");
    function Cn(t) {
      return { id: "opacity", opacity: t ?? 1, inspect() {
        return `${mt(this.opacity, 1)}`;
      }, fadeOut(r = 1, i = Jt.linear) {
        return hr(this.opacity, 0, r, (s) => this.opacity = s, i);
      } };
    }
    a(Cn, "ys"), o(Cn, "opacity");
    function ir(t) {
      if (!t)
        throw new Error("Please define an anchor");
      return { id: "anchor", anchor: t, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      } };
    }
    a(ir, "xn"), o(ir, "anchor");
    function kn(t) {
      return { id: "z", z: t, inspect() {
        return `${this.z}`;
      } };
    }
    a(kn, "xs"), o(kn, "z");
    function Dn(t, r) {
      return { id: "follow", require: ["pos"], follow: { obj: t, offset: r ?? R(0) }, add() {
        t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      } };
    }
    a(Dn, "Us"), o(Dn, "follow");
    function In(t, r) {
      let i = typeof t == "number" ? x.fromAngle(t) : t.unit();
      return { id: "move", require: ["pos"], update() {
        this.move(i.scale(r));
      } };
    }
    a(In, "Es"), o(In, "move");
    let ps = 200;
    function Un(t = {}) {
      let r = t.distance ?? ps, i = false;
      return { id: "offscreen", require: ["pos"], isOffScreen() {
        let s = rr(this.pos), h = new de(R(0), ge(), we());
        return !Xt(h, s) && h.sdistToPoint(s) > r * r;
      }, onExitScreen(s) {
        return this.on("exitView", s);
      }, onEnterScreen(s) {
        return this.on("enterView", s);
      }, update() {
        this.isOffScreen() ? (i || (this.trigger("exitView"), i = true), t.hide && (this.hidden = true), t.pause && (this.paused = true), t.destroy && this.destroy()) : (i && (this.trigger("enterView"), i = false), t.hide && (this.hidden = false), t.pause && (this.paused = false));
      } };
    }
    a(Un, "Cs"), o(Un, "offscreen");
    function Nn(t = {}) {
      let r = {}, i = /* @__PURE__ */ new Set();
      return { id: "area", collisionIgnore: t.collisionIgnore ?? [], add() {
        this.area.cursor && this.onHover(() => E.setCursor(this.area.cursor)), this.onCollideUpdate((s, h) => {
          r[s.id] || this.trigger("collide", s, h), r[s.id] = h, i.add(s.id);
        });
      }, update() {
        for (let s in r)
          i.has(Number(s)) || (this.trigger("collideEnd", r[s].target), delete r[s]);
        i.clear();
      }, drawInspect() {
        let s = this.localArea();
        q(), b(this.area.scale), V(this.area.offset);
        let h = { outline: { width: 4 / br(), color: X(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: this.fixed };
        s instanceof de ? ye({ ...h, pos: s.pos, width: s.width, height: s.height }) : s instanceof et ? qe({ ...h, pts: s.pts }) : s instanceof mr && We({ ...h, pos: s.center, radius: s.radius }), ie();
      }, area: { shape: t.shape ?? null, scale: t.scale ? R(t.scale) : R(1), offset: t.offset ?? R(0), cursor: t.cursor ?? null }, isClicked() {
        return E.isMousePressed() && this.isHovering();
      }, isHovering() {
        let s = this.fixed ? Ot() : Tr(Ot());
        return this.hasPoint(s);
      }, checkCollision(s) {
        return r[s.id] ?? null;
      }, getCollisions() {
        return Object.values(r);
      }, isColliding(s) {
        return !!r[s.id];
      }, isOverlapping(s) {
        let h = r[s.id];
        return h && h.hasOverlap();
      }, onClick(s) {
        let h = E.onMousePress("left", () => {
          this.isHovering() && s();
        });
        return this.onDestroy(() => h.cancel()), h;
      }, onHover(s) {
        let h = false;
        return this.onUpdate(() => {
          h ? h = this.isHovering() : this.isHovering() && (h = true, s());
        });
      }, onHoverUpdate(s) {
        return this.onUpdate(() => {
          this.isHovering() && s();
        });
      }, onHoverEnd(s) {
        let h = false;
        return this.onUpdate(() => {
          h ? this.isHovering() || (h = false, s()) : h = this.isHovering();
        });
      }, onCollide(s, h) {
        if (typeof s == "function" && h === void 0)
          return this.on("collide", s);
        if (typeof s == "string")
          return this.onCollide((l, u) => {
            l.is(s) && h(l, u);
          });
      }, onCollideUpdate(s, h) {
        if (typeof s == "function" && h === void 0)
          return this.on("collideUpdate", s);
        if (typeof s == "string")
          return this.on("collideUpdate", (l, u) => l.is(s) && h(l, u));
      }, onCollideEnd(s, h) {
        if (typeof s == "function" && h === void 0)
          return this.on("collideEnd", s);
        if (typeof s == "string")
          return this.on("collideEnd", (l) => l.is(s) && h(l));
      }, hasPoint(s) {
        return rn(this.worldArea(), s);
      }, resolveCollision(s) {
        let h = this.checkCollision(s);
        h && !h.resolved && (this.pos = this.pos.add(h.displacement), h.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        let s = this.localArea();
        if (!(s instanceof et || s instanceof de))
          throw new Error("Only support polygon and rect shapes for now");
        let h = this.transform.clone().scale(R(this.area.scale ?? 1)).translate(this.area.offset);
        if (s instanceof de) {
          let l = $e(this.anchor || dr).add(1, 1).scale(-0.5).scale(s.width, s.height);
          h.translate(l);
        }
        return s.transform(h);
      }, screenArea() {
        let s = this.worldArea();
        return this.fixed ? s : s.transform(M.cam.transform);
      } };
    }
    a(Nn, "Ts"), o(Nn, "area");
    function Xe(t) {
      return { color: t.color, opacity: t.opacity, anchor: t.anchor, outline: t.outline, fixed: t.fixed, shader: t.shader, uniform: t.uniform };
    }
    a(Xe, "et"), o(Xe, "getRenderProps");
    function sr(t, r = {}) {
      let i = null, s = null, h = new Se();
      if (!t)
        throw new Error("Please pass the resource name or data to sprite()");
      let l = o((u, g, p, m2) => {
        let y = R(1, 1);
        return p && m2 ? (y.x = p / (u.width * g.w), y.y = m2 / (u.height * g.h)) : p ? (y.x = p / (u.width * g.w), y.y = y.x) : m2 && (y.y = m2 / (u.height * g.h), y.x = y.y), y;
      }, "calcTexScale");
      return { id: "sprite", width: 0, height: 0, frame: r.frame || 0, quad: r.quad || new se(0, 0, 1, 1), animSpeed: r.animSpeed ?? 1, flipX: r.flipX ?? false, flipY: r.flipY ?? false, draw() {
        if (!i)
          return;
        let u = i.frames[this.frame ?? 0];
        if (!u)
          throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (i.slice9) {
          let { left: g, right: p, top: m2, bottom: y } = i.slice9, D = i.tex.width * u.w, j = i.tex.height * u.h, K = this.width - g - p, Z = this.height - m2 - y, F = g / D, N = p / D, Ae = 1 - F - N, L = m2 / j, W = y / j, I = 1 - L - W, be = [re(0, 0, F, L), re(F, 0, Ae, L), re(F + Ae, 0, N, L), re(0, L, F, I), re(F, L, Ae, I), re(F + Ae, L, N, I), re(0, L + I, F, W), re(F, L + I, Ae, W), re(F + Ae, L + I, N, W), re(0, 0, g, m2), re(g, 0, K, m2), re(g + K, 0, p, m2), re(0, m2, g, Z), re(g, m2, K, Z), re(g + K, m2, p, Z), re(0, m2 + Z, g, y), re(g, m2 + Z, K, y), re(g + K, m2 + Z, p, y)];
          for (let v = 0; v < 9; v++) {
            let P = be[v], T = be[v + 9];
            Lt(Object.assign(Xe(this), { pos: T.pos(), tex: i.tex, quad: u.scale(P), flipX: this.flipX, flipY: this.flipY, tiled: r.tiled, width: T.w, height: T.h }));
          }
        } else
          Lt(Object.assign(Xe(this), { tex: i.tex, quad: u, flipX: this.flipX, flipY: this.flipY, tiled: r.tiled, width: this.width, height: this.height }));
      }, add() {
        let u = o((p) => {
          let m2 = p.frames[0].clone();
          r.quad && (m2 = m2.scale(r.quad));
          let y = l(p.tex, m2, r.width, r.height);
          this.width = p.tex.width * m2.w * y.x, this.height = p.tex.height * m2.h * y.y, r.anim && this.play(r.anim), i = p, h.trigger(i);
        }, "setSpriteData"), g = ze(t);
        g ? g.onLoad(u) : or(() => u(ze(t).data));
      }, update() {
        if (!s)
          return;
        let u = i.anims[s.name];
        if (typeof u == "number") {
          this.frame = u;
          return;
        }
        if (u.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        s.timer += Ee() * this.animSpeed, s.timer >= 1 / s.speed && (s.timer = 0, u.from > u.to ? (this.frame--, this.frame < u.to && (s.loop ? this.frame = u.from : (this.frame++, s.onEnd(), this.stop()))) : (this.frame++, this.frame > u.to && (s.loop ? this.frame = u.from : (this.frame--, s.onEnd(), this.stop()))));
      }, play(u, g = {}) {
        if (!i) {
          h.add(() => this.play(u, g));
          return;
        }
        let p = i.anims[u];
        if (p === void 0)
          throw new Error(`Anim not found: ${u}`);
        s && this.stop(), s = typeof p == "number" ? { name: u, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        } } : { name: u, timer: 0, loop: g.loop ?? p.loop ?? false, pingpong: g.pingpong ?? p.pingpong ?? false, speed: g.speed ?? p.speed ?? 10, onEnd: g.onEnd ?? (() => {
        }) }, this.frame = typeof p == "number" ? p : p.from, this.trigger("animStart", u);
      }, stop() {
        if (!s)
          return;
        let u = s.name;
        s = null, this.trigger("animEnd", u);
      }, numFrames() {
        return i?.frames.length ?? 0;
      }, curAnim() {
        return s?.name;
      }, onAnimEnd(u) {
        return this.on("animEnd", u);
      }, onAnimStart(u) {
        return this.on("animStart", u);
      }, renderArea() {
        return new de(R(0), this.width, this.height);
      }, inspect() {
        if (typeof t == "string")
          return `"${t}"`;
      } };
    }
    a(sr, "Un"), o(sr, "sprite");
    function Ln(t, r = {}) {
      function i(s) {
        let h = Ke(Object.assign(Xe(s), { text: s.text + "", size: s.textSize, font: s.font, width: r.width && s.width, align: s.align, letterSpacing: s.letterSpacing, lineSpacing: s.lineSpacing, transform: s.textTransform, styles: s.textStyles }));
        return r.width || (s.width = h.width / (s.scale?.x || 1)), s.height = h.height / (s.scale?.y || 1), h;
      }
      return a(i, "r"), o(i, "update"), { id: "text", text: t, textSize: r.size ?? Os, font: r.font, width: r.width, height: 0, align: r.align, lineSpacing: r.lineSpacing, letterSpacing: r.letterSpacing, textTransform: r.transform, textStyles: r.styles, add() {
        or(() => i(this));
      }, draw() {
        Ye(i(this));
      }, renderArea() {
        return new de(R(0), this.width, this.height);
      } };
    }
    a(Ln, "As"), o(Ln, "text");
    function On(t, r, i = {}) {
      return { id: "rect", width: t, height: r, radius: i.radius || 0, draw() {
        ye(Object.assign(Xe(this), { width: this.width, height: this.height, radius: this.radius }));
      }, renderArea() {
        return new de(R(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    a(On, "Os"), o(On, "rect");
    function Gn(t, r) {
      return { id: "rect", width: t, height: r, draw() {
        xe(Object.assign(Xe(this), { width: this.width, height: this.height }));
      }, renderArea() {
        return new de(R(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    a(Gn, "Ps"), o(Gn, "uvquad");
    function qn(t) {
      return { id: "circle", radius: t, draw() {
        We(Object.assign(Xe(this), { radius: this.radius }));
      }, renderArea() {
        return new de(new x(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      } };
    }
    a(qn, "Rs"), o(qn, "circle");
    function Kn(t = 1, r = X(0, 0, 0)) {
      return { id: "outline", outline: { width: t, color: r } };
    }
    a(Kn, "Ms"), o(Kn, "outline");
    function Dr() {
      return { id: "timer", wait(t, r) {
        let i = [r], s = 0, h = this.onUpdate(() => {
          s += Ee(), s >= t && (i.forEach((l) => l()), h.cancel());
        });
        return { get paused() {
          return h.paused;
        }, set paused(l) {
          h.paused = l;
        }, cancel: h.cancel, onEnd(l) {
          i.push(l);
        }, then(l) {
          return this.onEnd(l), this;
        } };
      }, loop(t, r) {
        let i = null, s = o(() => {
          i = this.wait(t, s), r();
        }, "newAction");
        return i = gt(0, s), { get paused() {
          return i.paused;
        }, set paused(h) {
          i.paused = h;
        }, cancel: () => i.cancel() };
      }, tween(t, r, i, s, h = Jt.linear) {
        let l = 0, u = [], g = this.onUpdate(() => {
          l += Ee();
          let p = Math.min(l / i, 1);
          s(Be(t, r, h(p))), p === 1 && (g.cancel(), s(r), u.forEach((m2) => m2()));
        });
        return { get paused() {
          return g.paused;
        }, set paused(p) {
          g.paused = p;
        }, onEnd(p) {
          u.push(p);
        }, then(p) {
          return this.onEnd(p), this;
        }, cancel() {
          g.cancel();
        }, finish() {
          g.cancel(), s(r), u.forEach((p) => p());
        } };
      } };
    }
    a(Dr, "nr"), o(Dr, "timer");
    let gs = 640, ms = 65536;
    function Yn(t = {}) {
      let r = R(0), i = null, s = null, h = false;
      return { id: "body", require: ["pos", "area"], jumpForce: t.jumpForce ?? gs, gravityScale: t.gravityScale ?? 1, isStatic: t.isStatic ?? false, mass: t.mass ?? 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        this.onCollideUpdate((l, u) => {
          if (l.is("body") && !u.resolved && (this.trigger("beforePhysicsResolve", u), l.trigger("beforePhysicsResolve", u.reverse()), !u.resolved && !(this.isStatic && l.isStatic))) {
            if (!this.isStatic && !l.isStatic) {
              let g = this.mass + l.mass;
              this.pos = this.pos.add(u.displacement.scale(l.mass / g)), l.pos = l.pos.add(u.displacement.scale(-this.mass / g)), this.transform = Gt(this), l.transform = Gt(l);
            } else {
              let g = !this.isStatic && l.isStatic ? u : u.reverse();
              g.source.pos = g.source.pos.add(g.displacement), g.source.transform = Gt(g.source);
            }
            u.resolved = true, this.trigger("physicsResolve", u), l.trigger("physicsResolve", u.reverse());
          }
        }), this.onPhysicsResolve((l) => {
          M.gravity && (l.isBottom() && this.isFalling() ? (r.y = 0, i = l.target, s = l.target.pos, h ? h = false : this.trigger("ground", i)) : l.isTop() && this.isJumping() && (r.y = 0, this.trigger("headbutt", l.target)));
        });
      }, update() {
        if (!M.gravity || this.isStatic)
          return;
        if (h && (i = null, s = null, this.trigger("fallOff"), h = false), i)
          if (!this.isOverlapping(i) || !i.exists() || !i.is("body"))
            h = true;
          else {
            !i.pos.eq(s) && t.stickToPlatform !== false && this.moveBy(i.pos.sub(s)), s = i.pos;
            return;
          }
        let l = r.y;
        r.y += M.gravity * this.gravityScale * Ee(), r.y = Math.min(r.y, t.maxVelocity ?? ms), l < 0 && r.y >= 0 && this.trigger("fall"), this.move(r);
      }, onPhysicsResolve(l) {
        return this.on("physicsResolve", l);
      }, onBeforePhysicsResolve(l) {
        return this.on("beforePhysicsResolve", l);
      }, curPlatform() {
        return i;
      }, isGrounded() {
        return i !== null;
      }, isFalling() {
        return r.y > 0;
      }, isJumping() {
        return r.y < 0;
      }, jump(l) {
        i = null, s = null, r.y = -l || -this.jumpForce;
      }, onGround(l) {
        return this.on("ground", l);
      }, onFall(l) {
        return this.on("fall", l);
      }, onFallOff(l) {
        return this.on("fallOff", l);
      }, onHeadbutt(l) {
        return this.on("headbutt", l);
      } };
    }
    a(Yn, "Fs"), o(Yn, "body");
    function Hn(t = 2) {
      let r = t;
      return { id: "doubleJump", require: ["body"], numJumps: t, add() {
        this.onGround(() => {
          r = this.numJumps;
        });
      }, doubleJump(i) {
        r <= 0 || (r < this.numJumps && this.trigger("doubleJump"), r--, this.jump(i));
      }, onDoubleJump(i) {
        return this.on("doubleJump", i);
      }, inspect() {
        return `${r}`;
      } };
    }
    a(Hn, "Bs"), o(Hn, "doubleJump");
    function jn(t, r) {
      return { id: "shader", shader: t, ...typeof r == "function" ? { uniform: r(), update() {
        this.uniform = r();
      } } : { uniform: r } };
    }
    a(jn, "Ls"), o(jn, "shader");
    function Qn() {
      return { id: "fixed", fixed: true };
    }
    a(Qn, "Is"), o(Qn, "fixed");
    function Ir(t) {
      return { id: "stay", stay: true, scenesToStay: t };
    }
    a(Ir, "rr"), o(Ir, "stay");
    function zn(t) {
      if (t == null)
        throw new Error("health() requires the initial amount of hp");
      return { id: "health", hurt(r = 1) {
        this.setHP(t - r), this.trigger("hurt", r);
      }, heal(r = 1) {
        this.setHP(t + r), this.trigger("heal", r);
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
    a(zn, "Vs"), o(zn, "health");
    function Jn(t, r = {}) {
      if (t == null)
        throw new Error("lifespan() requires time");
      let i = r.fade ?? 0;
      return { id: "lifespan", async add() {
        await gt(t), i > 0 && this.opacity && await hr(this.opacity, 0, i, (s) => this.opacity = s, Jt.linear), this.destroy();
      } };
    }
    a(Jn, "js"), o(Jn, "lifespan");
    function Zn(t, r, i) {
      if (!t)
        throw new Error("state() requires an initial state");
      let s = {};
      function h(p) {
        s[p] || (s[p] = { enter: new Se(), end: new Se(), update: new Se(), draw: new Se() });
      }
      a(h, "u"), o(h, "initStateEvents");
      function l(p, m2, y) {
        return h(m2), s[m2][p].add(y);
      }
      a(l, "l"), o(l, "on");
      function u(p, m2, ...y) {
        h(m2), s[m2][p].trigger(...y);
      }
      a(u, "a"), o(u, "trigger");
      let g = false;
      return { id: "state", state: t, enterState(p, ...m2) {
        if (g = true, r && !r.includes(p))
          throw new Error(`State not found: ${p}`);
        let y = this.state;
        if (i) {
          if (!i?.[y])
            return;
          let D = typeof i[y] == "string" ? [i[y]] : i[y];
          if (!D.includes(p))
            throw new Error(`Cannot transition state from "${y}" to "${p}". Available transitions: ${D.map((j) => `"${j}"`).join(", ")}`);
        }
        u("end", y, ...m2), this.state = p, u("enter", p, ...m2), u("enter", `${y} -> ${p}`, ...m2);
      }, onStateTransition(p, m2, y) {
        return l("enter", `${p} -> ${m2}`, y);
      }, onStateEnter(p, m2) {
        return l("enter", p, m2);
      }, onStateUpdate(p, m2) {
        return l("update", p, m2);
      }, onStateDraw(p, m2) {
        return l("draw", p, m2);
      }, onStateEnd(p, m2) {
        return l("end", p, m2);
      }, update() {
        g || (u("enter", t), g = true), u("update", this.state);
      }, draw() {
        u("draw", this.state);
      }, inspect() {
        return this.state;
      } };
    }
    a(Zn, "Ns"), o(Zn, "state");
    function Wn(t = 1) {
      let r = 0, i = false;
      return { require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        i || (r += Ee(), this.opacity = gr(r, 0, t, 0, 1), r >= t && (this.opacity = 1, i = true));
      } };
    }
    a(Wn, "ks"), o(Wn, "fadeIn");
    function or(t) {
      U.loaded ? t() : M.events.on("load", t);
    }
    a(or, "En"), o(or, "onLoad");
    function Xn(t, r) {
      M.scenes[t] = r;
    }
    a(Xn, "_s"), o(Xn, "scene");
    function _n(t, ...r) {
      if (!M.scenes[t])
        throw new Error(`Scene not found: ${t}`);
      M.events.onOnce("frameEnd", () => {
        M.events.trigger("sceneLeave", t), E.events.clear(), M.events.clear(), M.objEvents.clear(), [...M.root.children].forEach((i) => {
          (!i.stay || i.scenesToStay && !i.scenesToStay.includes(t)) && M.root.remove(i);
        }), M.root.clearEvents(), M.cam = { pos: null, scale: R(1), angle: 0, shake: 0, transform: new ae() }, M.scenes[t](...r), e.debug !== false && Cr(), e.burp && kr();
      });
    }
    a(_n, "Hs"), o(_n, "go");
    function $n(t) {
      return M.events.on("sceneLeave", t);
    }
    a($n, "qs"), o($n, "onSceneLeave");
    function ei(t, r) {
      try {
        return JSON.parse(window.localStorage[t]);
      } catch {
        return r ? (Ur(t, r), r) : null;
      }
    }
    a(ei, "$s"), o(ei, "getData");
    function Ur(t, r) {
      window.localStorage[t] = JSON.stringify(r);
    }
    a(Ur, "sr"), o(Ur, "setData");
    function Nr(t) {
      let r = t(wt);
      for (let i in r)
        wt[i] = r[i], e.global !== false && (window[i] = r[i]);
      return wt;
    }
    a(Nr, "ir"), o(Nr, "plug");
    function Ht() {
      return R(ge() / 2, we() / 2);
    }
    a(Ht, "_t"), o(Ht, "center");
    let ws;
    ((t) => (t[t.None = 0] = "None", t[t.Left = 1] = "Left", t[t.Top = 2] = "Top", t[t.LeftTop = 3] = "LeftTop", t[t.Right = 4] = "Right", t[t.Horizontal = 5] = "Horizontal", t[t.RightTop = 6] = "RightTop", t[t.HorizontalTop = 7] = "HorizontalTop", t[t.Bottom = 8] = "Bottom", t[t.LeftBottom = 9] = "LeftBottom", t[t.Vertical = 10] = "Vertical", t[t.LeftVertical = 11] = "LeftVertical", t[t.RightBottom = 12] = "RightBottom", t[t.HorizontalBottom = 13] = "HorizontalBottom", t[t.RightVertical = 14] = "RightVertical", t[t.All = 15] = "All"))(ws ||= {});
    function Lr(t = {}) {
      let r = R(0), i = t.isObstacle ?? false, s = t.cost ?? 0, h = t.edges ?? [], l = o(() => {
        let g = { left: 1, top: 2, right: 4, bottom: 8 };
        return h.map((p) => g[p] || 0).reduce((p, m2) => p | m2, 0);
      }, "getEdgeMask"), u = l();
      return { id: "tile", tilePosOffset: t.offset ?? R(0), set tilePos(g) {
        let p = this.getLevel();
        r = g.clone(), this.pos = R(this.tilePos.x * p.tileWidth(), this.tilePos.y * p.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return r;
      }, set isObstacle(g) {
        i !== g && (i = g, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return i;
      }, set cost(g) {
        s !== g && (s = g, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return s;
      }, set edges(g) {
        h = g, u = l(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return h;
      }, get edgeMask() {
        return u;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(R(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(R(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(R(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(R(0, 1));
      } };
    }
    a(Lr, "or"), o(Lr, "tile");
    function ti(t, r) {
      if (!r.tileWidth || !r.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let i = jt([Kt(r.pos ?? R(0))]), s = t.length, h = 0, l = null, u = null, g = null, p = null, m2 = o((v) => v.x + v.y * h, "tile2Hash"), y = o((v) => R(Math.floor(v % h), Math.floor(v / h)), "hash2Tile"), D = o(() => {
        l = [];
        for (let v of i.children)
          j(v);
      }, "createSpatialMap"), j = o((v) => {
        let P = m2(v.tilePos);
        l[P] ? l[P].push(v) : l[P] = [v];
      }, "insertIntoSpatialMap"), K = o((v) => {
        let P = m2(v.tilePos);
        if (l[P]) {
          let T = l[P].indexOf(v);
          T >= 0 && l[P].splice(T, 1);
        }
      }, "removeFromSpatialMap"), Z = o(() => {
        let v = false;
        for (let P of i.children) {
          let T = i.pos2Tile(P.pos);
          (P.tilePos.x != T.x || P.tilePos.y != T.y) && (v = true, K(P), P.tilePos.x = T.x, P.tilePos.y = T.y, j(P));
        }
        v && i.trigger("spatial_map_changed");
      }, "updateSpatialMap"), F = o(() => {
        let v = i.getSpatialMap(), P = i.numRows() * i.numColumns();
        u ? u.length = P : u = new Array(P), u.fill(1, 0, P);
        for (let T = 0; T < v.length; T++) {
          let C = v[T];
          if (C) {
            let Y = 0;
            for (let J of C)
              if (J.isObstacle) {
                Y = 1 / 0;
                break;
              } else
                Y += J.cost;
            u[T] = Y || 1;
          }
        }
      }, "createCostMap"), N = o(() => {
        let v = i.getSpatialMap(), P = i.numRows() * i.numColumns();
        g ? g.length = P : g = new Array(P), g.fill(15, 0, P);
        for (let T = 0; T < v.length; T++) {
          let C = v[T];
          if (C) {
            let Y = C.length, J = 15;
            for (let te = 0; te < Y; te++)
              J |= C[te].edgeMask;
            g[T] = J;
          }
        }
      }, "createEdgeMap"), Ae = o(() => {
        let v = i.numRows() * i.numColumns(), P = o((C, Y) => {
          let J = [];
          for (J.push(C); J.length > 0; ) {
            let te = J.pop();
            I(te).forEach((pe) => {
              p[pe] < 0 && (p[pe] = Y, J.push(pe));
            });
          }
        }, "traverse");
        p ? p.length = v : p = new Array(v), p.fill(-1, 0, v);
        let T = 0;
        for (let C = 0; C < u.length; C++) {
          if (p[C] >= 0) {
            T++;
            continue;
          }
          P(C, T), T++;
        }
      }, "createConnectivityMap"), L = o((v, P) => u[P], "getCost"), W = o((v, P) => {
        let T = y(v), C = y(P);
        return T.dist(C);
      }, "getHeuristic"), I = o((v, P) => {
        let T = [], C = Math.floor(v % h), Y = C > 0 && g[v] & 1 && u[v - 1] !== 1 / 0, J = v >= h && g[v] & 2 && u[v - h] !== 1 / 0, te = C < h - 1 && g[v] & 4 && u[v + 1] !== 1 / 0, pe = v < h * s - h - 1 && g[v] & 8 && u[v + h] !== 1 / 0;
        return P ? (Y && (J && T.push(v - h - 1), T.push(v - 1), pe && T.push(v + h - 1)), J && T.push(v - h), te && (J && T.push(v - h + 1), T.push(v + 1), pe && T.push(v + h + 1)), pe && T.push(v + h)) : (Y && T.push(v - 1), J && T.push(v - h), te && T.push(v + 1), pe && T.push(v + h)), T;
      }, "getNeighbours"), be = { id: "level", tileWidth() {
        return r.tileWidth;
      }, tileHeight() {
        return r.tileHeight;
      }, spawn(v, ...P) {
        let T = R(...P), C = (() => {
          if (typeof v == "string") {
            if (r.tiles[v]) {
              if (typeof r.tiles[v] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return r.tiles[v](T);
            } else if (r.wildcardTile)
              return r.wildcardTile(v, T);
          } else {
            if (Array.isArray(v))
              return v;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!C)
          return null;
        let Y = false, J = false;
        for (let pe of C)
          pe.id === "tile" && (J = true), pe.id === "pos" && (Y = true);
        Y || C.push(Kt()), J || C.push(Lr());
        let te = i.add(C);
        return Y && (te.tilePosOffset = te.pos.clone()), te.tilePos = T, l && (j(te), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), te;
      }, numColumns() {
        return h;
      }, numRows() {
        return s;
      }, levelWidth() {
        return h * this.tileWidth();
      }, levelHeight() {
        return s * this.tileHeight();
      }, tile2Pos(...v) {
        return R(...v).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...v) {
        let P = R(...v);
        return R(Math.floor(P.x / this.tileWidth()), Math.floor(P.y / this.tileHeight()));
      }, getSpatialMap() {
        return l || D(), l;
      }, onSpatialMapChanged(v) {
        return this.on("spatial_map_changed", v);
      }, onNavigationMapInvalid(v) {
        return this.on("navigation_map_invalid", v);
      }, getAt(v) {
        l || D();
        let P = m2(v);
        return l[P] || [];
      }, update() {
        l && Z();
      }, invalidateNavigationMap() {
        u = null, g = null, p = null;
      }, onNavigationMapChanged(v) {
        return this.on("navigation_map_changed", v);
      }, getTilePath(v, P, T = {}) {
        if (u || F(), g || N(), p || Ae(), v.x < 0 || v.x >= h || v.y < 0 || v.y >= s || P.x < 0 || P.x >= h || P.y < 0 || P.y >= s)
          return null;
        let C = m2(v), Y = m2(P);
        if (u[Y] === 1 / 0)
          return null;
        if (C === Y)
          return [];
        if (p[C] != -1 && p[C] !== p[Y])
          return null;
        let J = new Ji((Ue, Hr) => Ue.cost < Hr.cost);
        J.insert({ cost: 0, node: C });
        let te = /* @__PURE__ */ new Map();
        te.set(C, C);
        let pe = /* @__PURE__ */ new Map();
        for (pe.set(C, 0); J.length !== 0; ) {
          let Ue = J.remove()?.node;
          if (Ue === Y)
            break;
          let Hr = I(Ue, T.allowDiagonals);
          for (let _e of Hr) {
            let jr = (pe.get(Ue) || 0) + L(Ue, _e) + W(_e, Y);
            (!pe.has(_e) || jr < pe.get(_e)) && (pe.set(_e, jr), J.insert({ cost: jr, node: _e }), te.set(_e, Ue));
          }
        }
        let Yr = [], zt = Y, ys = y(zt);
        for (Yr.push(ys); zt !== C; ) {
          zt = te.get(zt);
          let Ue = y(zt);
          Yr.push(Ue);
        }
        return Yr.reverse();
      }, getPath(v, P, T = {}) {
        let C = this.tileWidth(), Y = this.tileHeight(), J = this.getTilePath(this.pos2Tile(v), this.pos2Tile(P), T);
        return J ? [v, ...J.slice(1, -1).map((te) => te.scale(C, Y).add(C / 2, Y / 2)), P] : null;
      } };
      return i.use(be), i.onNavigationMapInvalid(() => {
        i.invalidateNavigationMap(), i.trigger("navigation_map_changed");
      }), t.forEach((v, P) => {
        let T = v.split("");
        h = Math.max(T.length, h), T.forEach((C, Y) => {
          i.spawn(C, R(Y, P));
        });
      }), i;
    }
    a(ti, "Ks"), o(ti, "addLevel");
    function ri(t = {}) {
      let r = null, i = null, s = null, h = null;
      return { id: "agent", require: ["pos", "tile"], agentSpeed: t.speed ?? 100, allowDiagonals: t.allowDiagonals ?? true, getDistanceToTarget() {
        return r ? this.pos.dist(r) : 0;
      }, getNextLocation() {
        return i && s ? i[s] : null;
      }, getPath() {
        return i ? i.slice() : null;
      }, getTarget() {
        return r;
      }, isNavigationFinished() {
        return i ? s === null : true;
      }, isTargetReachable() {
        return i !== null;
      }, isTargetReached() {
        return r ? this.pos.eq(r) : true;
      }, setTarget(l) {
        r = l, i = this.getLevel().getPath(this.pos, r, { allowDiagonals: this.allowDiagonals }), s = i ? 0 : null, i ? (h || (h = this.getLevel().onNavigationMapChanged(() => {
          i && s !== null && (i = this.getLevel().getPath(this.pos, r, { allowDiagonals: this.allowDiagonals }), s = i ? 0 : null, i ? this.trigger("navigation-next", this, i[s]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => h.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, i[s])) : this.trigger("navigation-ended", this);
      }, update() {
        if (i && s !== null) {
          if (this.pos.sdist(i[s]) < 2)
            if (s === i.length - 1) {
              this.pos = r.clone(), s = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              s++, this.trigger("navigation-next", this, i[s]);
          this.moveTo(i[s], this.agentSpeed);
        }
      }, onNavigationStarted(l) {
        return this.on("navigation-started", l);
      }, onNavigationNext(l) {
        return this.on("navigation-next", l);
      }, onNavigationEnded(l) {
        return this.on("navigation-ended", l);
      }, onTargetReached(l) {
        return this.on("target-reached", l);
      }, inspect() {
        return JSON.stringify({ target: JSON.stringify(r), path: JSON.stringify(i) });
      } };
    }
    a(ri, "Ys"), o(ri, "agent");
    function ni(t) {
      let r = E.canvas().captureStream(t), i = ne.ctx.createMediaStreamDestination();
      ne.masterNode.connect(i);
      let s = new MediaRecorder(r), h = [];
      return s.ondataavailable = (l) => {
        l.data.size > 0 && h.push(l.data);
      }, s.onerror = () => {
        ne.masterNode.disconnect(i), r.getTracks().forEach((l) => l.stop());
      }, s.start(), { resume() {
        s.resume();
      }, pause() {
        s.pause();
      }, stop() {
        return s.stop(), ne.masterNode.disconnect(i), r.getTracks().forEach((l) => l.stop()), new Promise((l) => {
          s.onstop = () => {
            l(new Blob(h, { type: "video/mp4" }));
          };
        });
      }, download(l = "kaboom.mp4") {
        this.stop().then((u) => Wr(l, u));
      } };
    }
    a(ni, "Xs"), o(ni, "record");
    function ii() {
      return document.activeElement === E.canvas();
    }
    a(ii, "Ws"), o(ii, "isFocused");
    function si(t) {
      t.destroy();
    }
    a(si, "Js"), o(si, "destroy");
    let jt = M.root.add.bind(M.root), As = M.root.readd.bind(M.root), Vs = M.root.removeAll.bind(M.root), oi = M.root.get.bind(M.root);
    function Or(t = 2, r = 1) {
      let i = 0;
      return { id: "boom", require: ["scale"], update() {
        let s = Math.sin(i * t) * r;
        s < 0 && this.destroy(), this.scale = R(s), i += Ee();
      } };
    }
    a(Or, "ur"), o(Or, "boom");
    let vs = ke(null, Is), xs = ke(null, Us);
    function ai(t, r = {}) {
      let i = jt([Kt(t), Ir()]), s = (r.speed || 1) * 5, h = r.scale || 1;
      i.add([sr(xs), Yt(0), ir("center"), Or(s, h), ...r.comps ?? []]);
      let l = i.add([sr(vs), Yt(0), ir("center"), Dr(), ...r.comps ?? []]);
      return l.wait(0.4 / s, () => l.use(Or(s, h))), l.onDestroy(() => i.destroy()), i;
    }
    a(ai, "ni"), o(ai, "addKaboom");
    function Gr() {
      M.root.update();
    }
    a(Gr, "cr"), o(Gr, "updateFrame");
    class Qt {
      source;
      target;
      displacement;
      resolved = false;
      constructor(r, i, s, h = false) {
        this.source = r, this.target = i, this.displacement = s, this.resolved = h;
      }
      reverse() {
        return new Qt(this.target, this.source, this.displacement.scale(-1), this.resolved);
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
    a(Qt, "Ht"), o(Qt, "Collision");
    function hi() {
      let t = {}, r = e.hashGridSize || Gs, i = new ae(), s = [];
      function h(l) {
        if (s.push(i.clone()), l.pos && i.translate(l.pos), l.scale && i.scale(l.scale), l.angle && i.rotate(l.angle), l.transform = i.clone(), l.c("area") && !l.paused) {
          let u = l, g = u.worldArea().bbox(), p = Math.floor(g.pos.x / r), m2 = Math.floor(g.pos.y / r), y = Math.ceil((g.pos.x + g.width) / r), D = Math.ceil((g.pos.y + g.height) / r), j = /* @__PURE__ */ new Set();
          for (let K = p; K <= y; K++)
            for (let Z = m2; Z <= D; Z++)
              if (!t[K])
                t[K] = {}, t[K][Z] = [u];
              else if (!t[K][Z])
                t[K][Z] = [u];
              else {
                let F = t[K][Z];
                e:
                  for (let N of F) {
                    if (!N.exists() || j.has(N.id))
                      continue;
                    for (let L of u.collisionIgnore)
                      if (N.is(L))
                        continue e;
                    for (let L of N.collisionIgnore)
                      if (u.is(L))
                        continue e;
                    let Ae = Hi(u.worldArea(), N.worldArea());
                    if (Ae) {
                      let L = new Qt(u, N, Ae);
                      u.trigger("collideUpdate", N, L);
                      let W = L.reverse();
                      W.resolved = L.resolved, N.trigger("collideUpdate", u, W);
                    }
                    j.add(N.id);
                  }
                F.push(u);
              }
        }
        l.children.forEach(h), i = s.pop();
      }
      a(h, "u"), o(h, "checkObj"), h(M.root);
    }
    a(hi, "ri"), o(hi, "checkFrame");
    function ui() {
      let t = M.cam, r = x.fromAngle(Wt(0, 360)).scale(t.shake);
      t.shake = Be(t.shake, 0, 5 * Ee()), t.transform = new ae().translate(Ht()).scale(t.scale).rotate(t.angle).translate((t.pos ?? Ht()).scale(-1).add(r)), M.root.draw(), le();
    }
    a(ui, "si"), o(ui, "drawFrame");
    function li() {
      let t = Te();
      M.events.numListeners("loading") > 0 ? M.events.trigger("loading", t) : De(() => {
        let r = ge() / 2, i = 24, s = R(ge() / 2, we() / 2).sub(R(r / 2, i / 2));
        ye({ pos: R(0), width: ge(), height: we(), color: X(0, 0, 0) }), ye({ pos: s, width: r, height: i, fill: false, outline: { width: 4 } }), ye({ pos: s, width: r * t, height: i });
      });
    }
    a(li, "ii"), o(li, "drawLoadScreen");
    function qr(t, r) {
      De(() => {
        let i = R(8);
        q(), V(t);
        let s = Ke({ text: r, font: cr, size: 16, pos: i, color: X(255, 255, 255), fixed: true }), h = s.width + i.x * 2, l = s.height + i.x * 2;
        t.x + h >= ge() && V(R(-h, 0)), t.y + l >= we() && V(R(0, -l)), ye({ width: h, height: l, color: X(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ye(s), ie();
      });
    }
    a(qr, "lr"), o(qr, "drawInspectText");
    function di() {
      if (ee.inspect) {
        let t = null;
        for (let r of M.root.get("*", { recursive: true }))
          if (r.c("area") && r.isHovering()) {
            t = r;
            break;
          }
        if (M.root.drawInspect(), t) {
          let r = [], i = t.inspect();
          for (let s in i)
            i[s] ? r.push(`${s}: ${i[s]}`) : r.push(`${s}`);
          qr(fn(Ot()), r.join(`
`));
        }
        qr(R(8), `FPS: ${ee.fps()}`);
      }
      ee.paused && De(() => {
        q(), V(ge(), 0), V(-8, 8);
        let t = 32;
        ye({ width: t, height: t, anchor: "topright", color: X(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let r = 1; r <= 2; r++)
          ye({ width: 4, height: t * 0.6, anchor: "center", pos: R(-t / 3 * r, t * 0.5), color: X(255, 255, 255), radius: 2, fixed: true });
        ie();
      }), ee.timeScale !== 1 && De(() => {
        q(), V(ge(), we()), V(-8, -8);
        let t = 8, r = Ke({ text: ee.timeScale.toFixed(1), font: cr, size: 16, color: X(255, 255, 255), pos: R(-t), anchor: "botright", fixed: true });
        ye({ width: r.width + t * 2 + t * 4, height: r.height + t * 2, anchor: "botright", color: X(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let i = 0; i < 2; i++) {
          let s = ee.timeScale < 1;
          xr({ p1: R(-r.width - t * (s ? 2 : 3.5), -t), p2: R(-r.width - t * (s ? 2 : 3.5), -t - r.height), p3: R(-r.width - t * (s ? 3.5 : 2), -t - r.height / 2), pos: R(-i * t * 1 + (s ? -t * 0.5 : 0), 0), color: X(255, 255, 255), fixed: true });
        }
        Ye(r), ie();
      }), ee.curRecording && De(() => {
        q(), V(0, we()), V(24, -24), We({ radius: 12, color: X(255, 0, 0), opacity: Jr(0, 1, E.time() * 4), fixed: true }), ie();
      }), ee.showLog && M.logs.length > 0 && De(() => {
        q(), V(0, we()), V(8, -8);
        let t = 8, r = Ke({ text: M.logs.join(`
`), font: cr, pos: R(t, -t), anchor: "botleft", size: 16, width: ge() * 0.6, lineSpacing: t / 2, fixed: true, styles: { time: { color: X(127, 127, 127) }, info: { color: X(255, 255, 255) }, error: { color: X(255, 0, 127) } } });
        ye({ width: r.width + t * 2, height: r.height + t * 2, anchor: "botleft", color: X(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ye(r), ie();
      });
    }
    a(di, "oi"), o(di, "drawDebug"), e.debug !== false && Cr(), e.burp && kr();
    function ci(t) {
      M.events.on("loading", t);
    }
    a(ci, "ai"), o(ci, "onLoading");
    function fi(t) {
      E.onResize(t);
    }
    a(fi, "ui"), o(fi, "onResize");
    function pi(t) {
      M.events.on("error", t);
    }
    a(pi, "ci"), o(pi, "onError");
    function ar(t) {
      E.run(() => {
        De(() => {
          let r = ge(), i = we(), s = { size: 36, width: r - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: cr, fixed: true };
          ye({ width: r, height: i, color: X(0, 0, 255), fixed: true });
          let h = Ke({ ...s, text: t.name, pos: R(32), color: X(255, 128, 0), fixed: true });
          Ye(h), Mr({ ...s, text: t.message, pos: R(32, 32 + h.height + 16), fixed: true }), ie(), M.events.trigger("error", t);
        });
      });
    }
    a(ar, "Sn"), o(ar, "handleErr");
    function gi(t) {
      ve.push(t);
    }
    a(gi, "li"), o(gi, "onCleanup");
    function mi() {
      M.events.onOnce("frameEnd", () => {
        E.quit();
        for (let r in pt)
          window.removeEventListener(r, pt[r]);
        c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT | c.STENCIL_BUFFER_BIT);
        let t = c.getParameter(c.MAX_TEXTURE_IMAGE_UNITS);
        for (let r = 0; r < t; r++)
          c.activeTexture(c.TEXTURE0 + r), c.bindTexture(c.TEXTURE_2D, null), c.bindTexture(c.TEXTURE_CUBE_MAP, null);
        c.bindBuffer(c.ARRAY_BUFFER, null), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null), c.bindRenderbuffer(c.RENDERBUFFER, null), c.bindFramebuffer(c.FRAMEBUFFER, null), ve.forEach((r) => r()), c.deleteBuffer(A.vbuf), c.deleteBuffer(A.ibuf);
      });
    }
    a(mi, "hi"), o(mi, "quit");
    function hr(t, r, i, s, h = Jt.linear) {
      let l = 0, u = [], g = Fr(() => {
        l += Ee();
        let p = Math.min(l / i, 1);
        s(Be(t, r, h(p))), p === 1 && (g.cancel(), s(r), u.forEach((m2) => m2()));
      });
      return { get paused() {
        return g.paused;
      }, set paused(p) {
        g.paused = p;
      }, onEnd(p) {
        u.push(p);
      }, then(p) {
        return this.onEnd(p), this;
      }, cancel() {
        g.cancel();
      }, finish() {
        g.cancel(), s(r), u.forEach((p) => p());
      } };
    }
    a(hr, "Cn"), o(hr, "tween");
    let ur = true;
    E.run(() => {
      It(), U.loaded || Te() === 1 && !ur && (U.loaded = true, M.events.trigger("load")), !U.loaded && e.loadingScreen !== false || ur ? li() : (ee.paused || Gr(), hi(), ui(), e.debug !== false && di()), ur && (ur = false), Ut(), M.events.trigger("frameEnd");
    });
    function Kr() {
      let t = k, r = c.drawingBufferWidth / t, i = c.drawingBufferHeight / t;
      if (E.isFullscreen()) {
        let s = window.innerWidth, h = window.innerHeight, l = s / h, u = r / i;
        if (l > u) {
          let g = window.innerHeight * u;
          A.viewport = { x: (s - g) / 2, y: 0, width: g, height: h };
        } else {
          let g = window.innerWidth / u;
          A.viewport = { x: 0, y: (h - g) / 2, width: s, height: g };
        }
        return;
      }
      if (e.letterbox) {
        if (!e.width || !e.height)
          throw new Error("Letterboxing requires width and height defined.");
        let s = r / i, h = e.width / e.height;
        if (s > h) {
          let l = i * h, u = (r - l) / 2;
          A.viewport = { x: u, y: 0, width: l, height: i };
        } else {
          let l = r / h, u = (i - l) / 2;
          A.viewport = { x: 0, y: u, width: r, height: l };
        }
        return;
      }
      if (e.stretch && (!e.width || !e.height))
        throw new Error("Stretching requires width and height defined.");
      A.viewport = { x: 0, y: 0, width: r, height: i };
    }
    a(Kr, "hr"), o(Kr, "updateViewport"), E.onResize(() => {
      if (E.isFullscreen())
        return;
      let t = e.width && e.height;
      t && !e.stretch && !e.letterbox || (d.width = d.offsetWidth * k, d.height = d.offsetHeight * k, Kr(), t || (A.frameBuffer.free(), A.frameBuffer = new Me(c.drawingBufferWidth, c.drawingBufferHeight), A.width = c.drawingBufferWidth / k, A.height = c.drawingBufferHeight / k));
    }), Kr();
    let wt = { VERSION: Ns, loadRoot: xt, loadProgress: Te, loadSprite: ke, loadSpriteAtlas: rt, loadSound: Ft, loadBitmapFont: er, loadFont: $t, loadShader: Tt, loadShaderURL: Pt, loadAseprite: Mt, loadPedit: Rt, loadBean: Bt, loadJSON: bt, load: tt, getSprite: it, getSound: st, getFont: ot, getBitmapFont: at, getShader: ht, getAsset: Ct, Asset: _, SpriteData: $, SoundData: ce, width: ge, height: we, center: Ht, dt: Ee, time: E.time, screenshot: E.screenshot, record: ni, isFocused: ii, setCursor: E.setCursor, getCursor: E.getCursor, setCursorLocked: E.setCursorLocked, isCursorLocked: E.isCursorLocked, setFullscreen: E.setFullscreen, isFullscreen: E.isFullscreen, isTouchscreen: E.isTouchscreen, onLoad: or, onLoading: ci, onResize: fi, onGamepadConnect: E.onGamepadConnect, onGamepadDisconnect: E.onGamepadDisconnect, onError: pi, onCleanup: gi, camPos: pn, camScale: gn, camRot: mn, shake: wn, toScreen: rr, toWorld: Tr, setGravity: Rn, getGravity: Mn, setBackground: Tn, getBackground: Pn, getGamepads: E.getGamepads, add: jt, destroy: si, destroyAll: Vs, get: oi, readd: As, pos: Kt, scale: Yt, rotate: Fn, color: Bn, opacity: Cn, anchor: ir, area: Nn, sprite: sr, text: Ln, rect: On, circle: qn, uvquad: Gn, outline: Kn, body: Yn, doubleJump: Hn, shader: jn, timer: Dr, fixed: Qn, stay: Ir, health: zn, lifespan: Jn, z: kn, move: In, offscreen: Un, follow: Dn, state: Zn, fadeIn: Wn, tile: Lr, agent: ri, on: Ie, onUpdate: Fr, onDraw: fs, onAdd: nr, onDestroy: Br, onClick: xn, onCollide: An, onCollideUpdate: Vn, onCollideEnd: vn, onHover: yn, onHoverUpdate: En, onHoverEnd: bn, onKeyDown: E.onKeyDown, onKeyPress: E.onKeyPress, onKeyPressRepeat: E.onKeyPressRepeat, onKeyRelease: E.onKeyRelease, onMouseDown: E.onMouseDown, onMousePress: E.onMousePress, onMouseRelease: E.onMouseRelease, onMouseMove: E.onMouseMove, onCharInput: E.onCharInput, onTouchStart: E.onTouchStart, onTouchMove: E.onTouchMove, onTouchEnd: E.onTouchEnd, onScroll: E.onScroll, onGamepadButtonDown: E.onGamepadButtonDown, onGamepadButtonPress: E.onGamepadButtonPress, onGamepadButtonRelease: E.onGamepadButtonRelease, onGamepadStick: E.onGamepadStick, mousePos: Ot, mouseDeltaPos: E.mouseDeltaPos, isKeyDown: E.isKeyDown, isKeyPressed: E.isKeyPressed, isKeyPressedRepeat: E.isKeyPressedRepeat, isKeyReleased: E.isKeyReleased, isMouseDown: E.isMouseDown, isMousePressed: E.isMousePressed, isMouseReleased: E.isMouseReleased, isMouseMoved: E.isMouseMoved, isGamepadButtonPressed: E.isGamepadButtonPressed, isGamepadButtonDown: E.isGamepadButtonDown, isGamepadButtonReleased: E.isGamepadButtonReleased, charInputted: E.charInputted, loop: Sn, wait: gt, play: Je, volume: Dt, burp: dt, audioCtx: ne.ctx, Timer: Xi, Line: Ne, Rect: de, Circle: mr, Polygon: et, Vec2: x, Color: O, Mat4: ae, Quad: se, RNG: _r, rand: Wt, randi: $r, randSeed: Ui, vec2: R, rgb: X, hsl2rgb: Ms, quad: re, choose: Li, chance: Ni, lerp: Be, tween: hr, easings: Jt, map: gr, mapc: Ii, wave: Jr, deg2rad: Fe, rad2deg: vt, testLineLine: At, testRectRect: Oi, testRectLine: qi, testRectPoint: Xt, testCirclePolygon: Yi, testLinePoint: Ki, testLineCircle: en, drawSprite: an, drawText: Mr, formatText: Ke, drawRect: ye, drawLine: ft, drawLines: vr, drawTriangle: xr, drawCircle: We, drawEllipse: yr, drawUVQuad: xe, drawPolygon: qe, drawFormattedText: Ye, drawMasked: hn, drawSubtracted: un, pushTransform: q, popTransform: ie, pushTranslate: V, pushScale: b, pushRotate: fe, pushMatrix: f, usePostEffect: tr, debug: ee, scene: Xn, go: _n, onSceneLeave: $n, addLevel: ti, getData: ei, setData: Ur, download: Ar, downloadJSON: zi, downloadText: on, downloadBlob: Wr, plug: Nr, ASCII_CHARS: Ei, canvas: E.canvas(), addKaboom: ai, LEFT: x.LEFT, RIGHT: x.RIGHT, UP: x.UP, DOWN: x.DOWN, RED: O.RED, GREEN: O.GREEN, BLUE: O.BLUE, YELLOW: O.YELLOW, MAGENTA: O.MAGENTA, CYAN: O.CYAN, WHITE: O.WHITE, BLACK: O.BLACK, quit: mi, Event: Se, EventHandler: Vt, EventController: He };
    if (e.plugins && e.plugins.forEach(Nr), e.global !== false)
      for (let t in wt)
        window[t] = wt[t];
    return E.canvas().focus(), wt;
  }, "default");
  function Qs(e) {
    let n, d;
    return { id: "mandarina_textbox", require: [], skipped: false, curChar: 0, setup() {
      n = this.text, d = this.name;
    }, write(w) {
      return new Promise((S) => {
        n.text = "", this.curChar = 0;
        let B = a(async () => {
          if (this.skipped) {
            this.skipped = false, n.text = w, this.curChar = 0, S();
            return;
          }
          if (n.text += w[this.curChar], w[this.curChar] == "," && await e.wait(0.5), this.curChar++, this.curChar == w.length) {
            this.curChar = 0, S();
            return;
          }
          await e.wait(0.05), B();
        }, "write");
        B();
      });
    }, clear() {
      n.text = "";
    }, skip() {
      this.skipped || (this.skipped = true);
    }, show() {
      this.opacity = 1;
    }, hide() {
      this.opacity = 0;
    }, changeName(w) {
      d.text = w;
    } };
  }
  a(Qs, "textboxComp");
  function is(e, n) {
    let d = e.k, w = { width: n?.width ?? d.width() - d.width() / 16, height: n?.height ?? 200, pos: n?.pos ?? d.vec2(0), sprite: n?.sprite ?? void 0, textAlign: n?.textAlign ?? "left", textSize: n?.textSize ?? 16, textFont: n?.textFont ?? "sans-serif", textColor: n?.textColor ?? "#000000" }, S = null;
    if (w.sprite) {
      let G = d.add([d.pos(d.vec2(d.width(), d.height()).scale(100)), d.sprite(w.sprite)]);
      S = d.vec2(G.width, G.height);
    }
    let B = w.sprite ? S?.x : w.width, H = w.sprite ? S?.y : w.height, k = d.add([d.pos(d.center().x, d.height()), d.layer("textbox"), d.anchor("bot"), d.opacity(1), Qs(d)]);
    return k.add([d.layer("textbox"), d.anchor("bot"), w.sprite ? d.sprite(w.sprite) : d.rect(w.width, w.height)]), k.text = k.add([d.pos(-B / 2, -H), d.layer("textbox"), d.text("", { width: B, font: w.textFont, align: w.textAlign }), d.color(d.Color.fromHex(w.textColor))]), k.name = k.add([d.pos(-B / 2, -H), d.layer("textbox_name"), d.anchor("botleft"), d.text(""), d.color(d.Color.fromHex(w.textColor))]), k.setup(), k;
  }
  a(is, "addTextbox");
  function ss(e, n) {
    this.data.chapters.set(e, n());
  }
  a(ss, "addChapter");
  function _t(e) {
    return { id: e.id, autoskip: e.autoskip, exec: e.exec, skip: e.skip };
  }
  a(_t, "createAction");
  async function Vr(e) {
    let n = e.data.chapters.get(e.data.current.chapter);
    if (!n)
      return;
    let d = n[e.data.current.action];
    if (d) {
      if (e.data.current.runningAction && d.skip)
        return d.skip();
      e.data.current.runningAction = true, await d.exec(), e.data.current.runningAction = false, e.data.current.action++, d.autoskip && Vr(e);
    }
  }
  a(Vr, "processAction");
  function os(e, n) {
    let d = e.k;
    return d.scene("mandarina", () => {
      d.layers(["backgrounds", "characters", "textbox", "textbox_name"], "textbox"), e.textbox = is(e, n.textbox ?? {}), Vr(e), d.onUpdate(() => {
        (d.isKeyPressed("space") || d.isKeyPressed("right") || d.isMousePressed()) && Vr(e);
      }), d.onKeyDown("up", () => {
        d.camScale(d.camScale().add(d.vec2(d.dt())));
      }), d.onKeyDown("down", () => {
        d.camScale(d.camScale().sub(d.vec2(d.dt())));
      });
    });
  }
  a(os, "startNovel");
  function as(e, n, d) {
    if (this.data.characters.has(e))
      throw new Error(`Character with id "${e}" already exists.`);
    this.data.characters.set(e, { id: e, name: n, opt: d });
  }
  a(as, "addCharacter");
  function hs(...e) {
    return _t({ id: "say", exec: async () => {
      if (!this.textbox)
        throw new Error("Textbox not found.");
      if (e.length > 1) {
        let n = this.data.characters.get(e[0]);
        if (!n)
          throw new Error(`Character with the ${e[0]} id's not found.`);
        this.textbox.changeName(n.name), await this.textbox.write(e[1]);
      } else
        this.textbox.changeName(""), await this.textbox.write(e[0]);
    }, skip: () => {
      this.textbox?.skip();
    } });
  }
  a(hs, "say");
  function us(e, n = "default", d = "center") {
    let w = this.k;
    return _t({ id: "show_character", autoskip: true, exec: () => {
      let S = this.data.characters.get(e);
      if (!S)
        throw new Error(`Character with id "${e}" does not exist.`);
      let B = S.opt?.expressions?.[n];
      if (!B)
        throw Error(`Expression "${n}" does not exist.`);
      let H = { left: [w.pos(0, w.height()), w.anchor("botleft")], center: [w.pos(w.center().x, w.height()), w.anchor("bot")], right: [w.pos(w.width(), w.height()), w.anchor("botright")] };
      w.add([...H[d], w.layer("characters"), w.sprite(B), w.opacity(1), "character_" + e]);
    } });
  }
  a(us, "showCharacter");
  function ls(e) {
    let n = this.k;
    return _t({ id: "hide_character", exec: () => {
      n.get("character_" + e, { recursive: true })[0].destroy();
    } });
  }
  a(ls, "hideCharacter");
  function ds(e) {
    let n = [], d = "";
    return { layers(w, S) {
      n = w, d = S ?? w[0], e.onAdd((B) => {
        B.is("layer") || B.use(this.layer(d));
      });
    }, layer(w) {
      return { id: "layer", add() {
        if (n.indexOf(w) == -1)
          throw new Error(`no layer "${w}"`);
        let S = n.indexOf(w);
        this.z = S * 1e3 + (this.userZ ?? 0);
      }, inspect() {
        return w;
      } };
    }, z(w) {
      return { id: "z", userZ: w };
    } };
  }
  a(ds, "layerPlugin");
  function cs(e) {
    return { k: e, data: { chapters: /* @__PURE__ */ new Map(), characters: /* @__PURE__ */ new Map(), current: { chapter: "start", action: 0, runningAction: false } }, loadSprite: e.loadSprite, loadSound: e.loadSound, character: as, chapter: ss, say: hs, show: us, hide: ls };
  }
  a(cs, "mandarinaPlugin");
  function zs(e) {
    let n = ns({ ...e, plugins: [cs, ds] }), d = { ...cs(n) };
    return os(d, e), d;
  }
  a(zs, "mandarina");

  // example/main.ts
  var m = zs({
    width: 960,
    height: 540,
    canvas: document.querySelector("#myGame"),
    textbox: {
      sprite: "dsimui_textbox",
      textFont: "sans-serif",
      textSize: 16
    }
  });
  m.loadSprite("testguy", "sprites/testguy.png");
  m.loadSprite("dsimui_textbox", "sprites/textbox.png");
  m.character("t", "Test Guy!", {
    expressions: {
      "normal": "testguy"
    }
  });
  m.chapter("start", () => [
    // Show our character.
    m.show("t", "normal"),
    // Say something.
    m.say("t", "Hi human, object, or whatever you are!"),
    m.say("t", "Welcome to this Mandarina test!"),
    m.say("t", "This engine are in development, so it's not ready yet.")
  ]);
  m.k.onLoad(() => {
    m.k.go("mandarina");
  });
})();
