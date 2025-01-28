(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    850: function (e, t, i) {
      Promise.resolve().then(i.bind(i, 380));
    },
    380: function (e, t, i) {
      'use strict';
      i.r(t),
        i.d(t, {
          Framer: function () {
            return x;
          },
        });
      var r = i(7437),
        n = i(2265),
        a = i(6673),
        s = i(8613);
      let l = {
          'insta-story': [1080, 1920],
          'insta-portrait': [1080, 1350],
          'insta-square': [1080, 1080],
        },
        h = { jpeg: 'JPEG', png: 'PNG', webp: 'WEBP' },
        c = (e, t) => Math.ceil(e * t),
        o = (e, t) => Math.floor(e / t),
        u = (e, t, i, r) => Math.min(i / e, r / t),
        d = (e, t, i, r) => ({ x: (e - i) / 2, y: (t - r) / 2 }),
        g = (e) => {
          let { image: t, aspectRatio: i, canvasRef: r } = e,
            [a, s] = (0, n.useState)({ width: 0, height: 0 }),
            [h, g] = (0, n.useState)(!0),
            [p, f] = (0, n.useState)('#000'),
            [x, m] = (0, n.useState)(1),
            v = (e) => {
              s({ width: e, height: h ? o(e, x) : a.height });
            };
          return (
            (0, n.useEffect)(() => {
              t.onload = () => {
                if (
                  (s({ width: t.width, height: t.height }),
                  m(t.width / t.height),
                  r.current)
                ) {
                  var e, i;
                  (r.current.width = t.width),
                    (r.current.height = t.height),
                    null === (i = r.current) ||
                      void 0 === i ||
                      null === (e = i.getContext('2d')) ||
                      void 0 === e ||
                      e.drawImage(t, 0, 0);
                }
              };
            }, []),
            (0, n.useEffect)(() => {
              let [e, r] = i
                ? l[i]
                : [null == t ? void 0 : t.width, null == t ? void 0 : t.height];
              m(e / r);
            }, [i]),
            (0, n.useEffect)(() => {
              h && v(a.width);
            }, [h]),
            (0, n.useEffect)(() => {
              v(a.width);
            }, [x]),
            (0, n.useEffect)(() => {
              var e;
              let i =
                null === (e = r.current) || void 0 === e
                  ? void 0
                  : e.getContext('2d');
              if (!r.current || !i || !t) return;
              let n = (null == t ? void 0 : t.width) || 0,
                s = (null == t ? void 0 : t.height) || 0,
                l = a.width || t.width,
                h = a.height || t.height;
              (r.current.width = l), (r.current.height = h);
              let c = u(n, s, l, h),
                o = n * c,
                g = s * c,
                f = d(l, h, o, g);
              (i.fillStyle = p),
                i.fillRect(0, 0, l, h),
                i.drawImage(t, f.x, f.y, o, g);
            }, [t, a, p]),
            {
              image: t,
              canvasRef: r,
              imageDimensions: a,
              lockProportions: h,
              setLockProportions: g,
              setWidth: v,
              setHeight: (e) => {
                s({ height: e, width: h ? c(e, x) : a.width });
              },
            }
          );
        },
        p = (0, n.forwardRef)((e, t) => {
          let i = (0, n.useRef)(null),
            {
              imageDimensions: a,
              lockProportions: s,
              setLockProportions: l,
              setWidth: h,
              setHeight: c,
            } = g({ ...e, canvasRef: i });
          return (0, r.jsxs)('div', {
            'data-testid': 'image-editor',
            className: 'w-screen',
            children: [
              (0, r.jsxs)('div', {
                children: [
                  (0, r.jsx)('input', {
                    type: 'number',
                    value: a.width,
                    onChange: (e) => h(Number(e.target.value)),
                  }),
                  (0, r.jsx)('input', {
                    type: 'number',
                    value: a.height,
                    onChange: (e) => c(Number(e.target.value)),
                  }),
                  (0, r.jsx)('input', {
                    type: 'checkbox',
                    checked: s,
                    onChange: () => l(!s),
                  }),
                ],
              }),
              (0, r.jsx)('canvas', {
                ref: (e) => {
                  (i.current = e),
                    t && ('function' == typeof t ? t(e) : t && (t.current = e));
                },
                width: 0,
                height: 0,
                className: 'w-1/3',
              }),
            ],
          });
        });
      p.displayName = 'Editor';
      let f = {
          width: '100%',
          height: '100px',
          border: '2px dashed #ccc',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        },
        x = () => {
          let [e, t] = (0, n.useState)(),
            [i, l] = (0, n.useState)(''),
            [c, o] = (0, n.useState)('jpeg'),
            u = (0, n.useRef)([]);
          return (
            (0, n.useEffect)(() => {
              u.current = u.current.slice(
                0,
                (null == e ? void 0 : e.length) || 0
              );
            }, [e]),
            (0, r.jsx)(r.Fragment, {
              children: (0, r.jsxs)('div', {
                children: [
                  (0, r.jsx)(a.ZP, {
                    onDrop: (e) => {
                      let i = e.map((e) => {
                        let t = new Image();
                        return (t.src = URL.createObjectURL(e)), t;
                      });
                      t(i);
                    },
                    children: (e) => {
                      let { getRootProps: t, getInputProps: i } = e;
                      return (0, r.jsxs)('div', {
                        ...t(),
                        style: f,
                        'data-testid': 'dropzone',
                        children: [
                          (0, r.jsx)('input', { ...i() }),
                          (0, r.jsx)('p', {
                            children:
                              'Drag n drop an image here, or click to select one',
                          }),
                        ],
                      });
                    },
                  }),
                  (0, r.jsx)('h1', { children: 'Image Editor' }),
                  (0, r.jsx)('label', {
                    htmlFor: 'aspect-ratio',
                    children: 'Aspect Ratio',
                  }),
                  (0, r.jsxs)('select', {
                    id: 'aspect-ratio',
                    onChange: (e) => l(e.target.value),
                    children: [
                      (0, r.jsx)('option', { value: '', children: 'Original' }),
                      (0, r.jsx)('option', {
                        value: 'insta-story',
                        children: 'Story',
                      }),
                      (0, r.jsx)('option', {
                        value: 'insta-portrait',
                        children: 'Portrait',
                      }),
                      (0, r.jsx)('option', {
                        value: 'insta-square',
                        children: 'Square',
                      }),
                    ],
                  }),
                  (0, r.jsx)('label', {
                    htmlFor: 'format',
                    children: 'Export Format',
                  }),
                  (0, r.jsx)('select', {
                    id: 'format',
                    onChange: (e) => o(e.target.value),
                    children: Object.keys(h).map((e) =>
                      (0, r.jsx)('option', { value: e, children: h[e] }, e)
                    ),
                  }),
                  (0, r.jsx)('button', {
                    onClick: () => {
                      u.current.forEach((e) => {
                        e.toBlob((e) => {
                          e && (0, s.saveAs)(e, 'image.'.concat(c, '}'));
                        }, 'image/'.concat(c));
                      });
                    },
                    children: 'Download Edited Images',
                  }),
                  null == e
                    ? void 0
                    : e.map((e, t) =>
                        (0, r.jsx)(
                          p,
                          {
                            image: e,
                            aspectRatio: i,
                            ref: (e) => (u.current[t] = e),
                          },
                          e.src
                        )
                      ),
                ],
              }),
            })
          );
        };
    },
  },
  function (e) {
    e.O(0, [38, 971, 472, 744], function () {
      return e((e.s = 850));
    }),
      (_N_E = e.O());
  },
]);
