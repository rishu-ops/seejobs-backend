!(function (i) {
  i.fn.smoothScroll = function (t) {
    var a = i.extend({ duration: 800, addHash: !1 }, t);
    return this.each(function () {
      var t = i(this).data("target"),
        n = i(this);
      i(t).on("click", "a", function () {
        if ("" !== this.hash) {
          event.preventDefault();
          var t = this.hash,
            o = i(t).offset().top;
          n.is("body")
            ? (n = i("body, html"))
            : (o = n.scrollTop() + i(t).position().top),
            n.animate({ scrollTop: o }, a.duration, function () {
              a.addHash && (window.location.hash = t);
            });
        }
      });
    });
  };
})(jQuery);
