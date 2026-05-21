window.Webflow ||= [];
window.Webflow.push(() => {
  // MULTIPLE INSTANCES (WITH WRAPPER)

  if ($('[sp-readtime-instance="wrap"]').length) {
    $('[sp-readtime-instance="wrap"]').each(function () {
      const $wrap = $(this);

      const $text = $wrap.find('[sp-readtime-element="content"]');
      const $output = $wrap.find('[sp-readtime-element="time"]');

      const wordsPerMinute = parseInt($wrap.attr("sp-readtime-wpm")) || 270;

      calculateReadTime($text, $output, wordsPerMinute);
    });
  }

  // SINGLE INSTANCE (NO WRAPPER)
  else {
    const $text = $('[sp-readtime-element="content"]');
    const $output = $('[sp-readtime-element="time"]');

    const wordsPerMinute = parseInt($text.attr("sp-readtime-wpm")) || 270;

    calculateReadTime($text, $output, wordsPerMinute);
  }

  // FUNCTION

  function calculateReadTime($text, $output, wordsPerMinute) {
    const text = $text.text().trim();

    const words = text.split(/\s+/).filter((word) => word.length > 0);

    const wordCount = words.length;

    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    $output.text(`${readTime}`);
  }
});
