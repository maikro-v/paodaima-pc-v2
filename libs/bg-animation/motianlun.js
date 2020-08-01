export default (el) => {
  window.addEventListener('load', function() {
    const b = document.getElementById(el)
    if (!b || !b.getContext) {
      return false
    }

    function r(i, f) {
      return Math.floor(Math.random() * (f - i + 1) + i)
    }

    const c = b.getContext('2d')
    let w = b.width = window.innerWidth
    let x = b.height = window.innerHeight
    let k = null
    let l = null
    let h = []
    const g = 1
    const u = 16
    const t = 360 / u
    let v = 200
    let a = 100
    if (w < 768) {
      v = 100
      a = 50
    }
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
      setTimeout(f, 17)
    }

    function e(f, i, z) {
      this.ctx = f
      this.init(i, z)
    }

    e.prototype.init = function(f, i) {
      this.x = f
      this.y = i
      this.r = v
      this.lw = 8
      this.a = 45
      this.rad = this.a * Math.PI / 180
      this.v = { x: 0, y: 0 }
      this.c = { r: r(1, 1), g: r(1, 1), b: r(1, 1) }
    }
    e.prototype.draw = function() {
      const f = this.ctx
      f.save()
      f.lineWidth = this.lw
      f.strokeStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')'
      f.beginPath()
      f.moveTo(this.x, this.y)
      f.lineTo(this.x + this.r, x)
      f.stroke()
      f.beginPath()
      f.moveTo(this.x, this.y)
      f.lineTo(this.x - this.r, x)
      f.stroke()
      f.restore()
      f.save()
      f.lineWidth = this.lw
      f.strokeStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')'
      for (var y = 1; y < 3; y++) {
        f.beginPath()
        f.arc(this.x, this.y, this.r * y, 0, Math.PI * 2, false)
        f.stroke()
      }
      f.restore()
      f.save()
      f.lineWidth = this.lw
      f.strokeStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')'
      f.translate(this.x, this.y)
      f.rotate(this.rad)
      f.translate(-this.x, -this.y)
      for (var y = 0; y < u; y++) {
        f.beginPath()
        f.moveTo(this.x, this.y)
        f.lineTo(Math.cos(t * Math.PI / 180 * y) * this.r * 3 + this.x, Math.sin(t * Math.PI / 180 * y) * this.r * 3 + this.y)
        f.stroke()
      }
      f.restore()
      f.save()
      f.translate(this.x, this.y)
      f.rotate(this.rad)
      f.translate(-this.x, -this.y)
      for (var y = 0; y < u; y++) {
        f.fillStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')'
        f.beginPath()
        f.arc(Math.cos(t * Math.PI / 180 * y) * this.r * 3 + this.x, Math.sin(t * Math.PI / 180 * y) * this.r * 3 + this.y, this.r / 3, 0, Math.PI * 2, false)
        f.fill()
        f.fillStyle = 'rgb(' + this.c.r * 50 + ', ' + this.c.g * 50 + ', ' + this.c.b * 50 + ')'
        f.beginPath()
        f.arc(Math.cos(t * Math.PI / 180 * y) * this.r * 3 + this.x, Math.sin(t * Math.PI / 180 * y) * this.r * 3 + this.y, this.r / 4, Math.PI - this.rad, 0 - this.rad, false)
        f.fill()
      }
      f.restore()
    }
    e.prototype.updateParams = function() {
      this.a += 0.1
      this.rad = this.a * Math.PI / 180
    }
    e.prototype.render = function() {
      this.updateParams()
      this.draw()
    }
    for (var j = 0; j < g; j++) {
      const d = new e(c, w - w / 4, x / 2)
      h.push(d)
    }
    let p = 6
    let q = []
    if (w < 768) {
      p = 3
    }

    function o(f, i, z) {
      this.ctx = f
      this.init(i, z)
    }

    o.prototype.init = function(f, i) {
      this.x = f
      this.y = i
      this.r = r(30, a)
      this.a = r(0, 360)
      this.rad = this.a * Math.PI / 180
      this.v = { x: 0, y: Math.random() * 2 + 0.2 }
      this.c = { r: r(0, 50), g: r(0, 50), b: r(0, 50) }
      this.l = this.r * 1.5
    }
    o.prototype.draw = function() {
      const f = this.ctx
      f.save()
      f.globalAlpha = 0.9
      f.fillStyle = 'black'
      f.strokeStyle = 'black'
      f.lineWidth = this.r / 30
      f.beginPath()
      f.translate(this.x, this.y)
      f.scale(1, 1.3)
      f.translate(-this.x, -this.y)
      f.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
      f.fill()
      f.beginPath()
      f.rect(this.x - this.r / 5 / 2, this.y + this.r - this.r / 20, this.r / 5, this.r / 10)
      f.fill()
      f.beginPath()
      f.moveTo(this.x, this.y + this.r)
      f.quadraticCurveTo(Math.cos(this.rad) * 10 + this.x, Math.sin(this.rad) * 10 + this.y + this.r + this.l / 3, Math.cos(this.rad) * 10 + this.x, Math.sin(this.rad) * 10 + this.y + this.r + this.l)
      f.stroke()
      f.restore()
    }
    o.prototype.updateParams = function() {
      this.a += 0.5
      this.rad = this.a * Math.PI / 180
    }
    o.prototype.updatePosition = function() {
      this.y -= this.v.y
    }
    o.prototype.wrapPosition = function() {
      if ((this.y + this.r + this.r + this.l) < 0) {
        this.init(r(0, w / 2), x + this.r + this.r)
      }
    }
    o.prototype.render = function(f) {
      this.updatePosition()
      this.wrapPosition()
      this.updateParams()
      this.draw()
    }
    for (var j = 0; j < p; j++) {
      const n = new o(c, r(0, w / 2), r(0, x))
      q.push(n)
    }

    function s() {
      c.clearRect(0, 0, w, x)
      for (var f = 0; f < h.length; f++) {
        h[f].render()
      }
      for (var f = 0; f < q.length; f++) {
        q[f].render()
      }
      requestAnimationFrame(s)
    }

    s()

    function m() {
      w = b.width = window.innerWidth
      x = b.height = window.innerHeight
      if (w < 768) {
        v = 100
        a = 50
        p = 3
      } else {
        v = 200
        a = 100
        p = 6
      }
      h = []
      for (var z = 0; z < g; z++) {
        const y = new e(c, w - w / 4, x / 2, z)
        h.push(y)
      }
      q = []
      for (var z = 0; z < p; z++) {
        const A = new o(c, r(0, w / 2), r(0, x))
        q.push(A)
      }
    }

    window.addEventListener('resize', function() {
      m()
    })
    b.addEventListener('mousemove', function(f) {
      k = f.clientX
      l = f.clientY
    })
    b.addEventListener('wheel', function(f) {
      for (var y = 0; y < h.length; y++) {
        if (h[y].r > 100) {
          h[y].r += f.deltaY / 100
          h[y].lw += f.deltaY / 1000
        }
        if (h[y].r < 100) {
          h[y].r -= f.deltaY / 100
          h[y].lw -= f.deltaY / 1000
        }
      }
      for (var y = 0; y < q.length; y++) {
        if (q[y].r > 30) {
          q[y].r += f.deltaY / 100
          q[y].l += f.deltaY / 100
        }
        if (q[y].r < 30) {
          q[y].r -= f.deltaY / 100
          q[y].l -= f.deltaY / 100
        }
      }
    })
    b.addEventListener('click', function(f) {
      k = f.clientX
      l = f.clientY
      const i = new o(c, k, l)
      q.push(i)
    }, false)
  })
  console.log('File Name / farewell.js\nCreated Date / Jun 04, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo')
}
