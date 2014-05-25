define(function() {

  return function() {
    var gui = window.requireNode('nw.gui');

    var win = gui.Window.get();

    win.on('close', function() {
      this.hide();
      this.close(true);
    });

    // var tray = new gui.Tray({ title: 'Tray', icon: 'img/icon.png' });
    // var menu = new gui.Menu();
    // menu.append(new gui.MenuItem({ 
      // type: 'normal', label: 'Quit Swatch',
      // click: function() {
        // win.close();
      // }
    // }));
    // tray.menu = menu;

    $('.window-controls .close').on('click', function(e) {
      e.preventDefault();
      win.close();
    });

    $('.window-controls .minimize').on('click', function(e) {
      e.preventDefault();
      win.minimize();
    });


    var clipboard = gui.Clipboard.get(); 
    Swatch.clipboard = clipboard;
  };

});
