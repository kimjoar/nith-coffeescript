!function(context) {

  var compileAndEval = function(el) {
    var source = prepare(el)
      , compiledJS = ''
      ;

      try {
        compiledJS = CoffeeScript.compile(source, { bare: true });
        evalJS(compiledJS);
      } catch (error) {
        alert(error);
      }
  };

  var prepare = function(el) {
    var element = $(el)
      , html
      ;

    element.children(".run").remove();
    html = element.html().replace(/<\/?[^>]+>/gi, '');
    html = html.replace(/&gt;/gi, '>');
    addRunButton(el, false);

    return html;
  };

  var evalJS = function(code) {
    try {
      console.log(code);
      eval(code);
    } catch(error) {
      alert(error);
    }
  };

  var addRunButton = function(parent, bindEvent) {
    if ($(parent).children('.run').length > 0) {
      return;
    }

    var el = $(parent).append('<a class="run coffeescript">Run code</a>');

    if (typeof bindEvent == "undefined" || bindEvent) {
      $(el).click(function(e) {
        e.preventDefault();
        compileAndEval(el);
      });
    }
  };

  window.loadConsolesOn = function(selector) {
    $(selector).each(function(index, element) {
      addRunButton(element);
    });
  };

}(this);
