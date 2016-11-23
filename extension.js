const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const Clutter = imports.gi.Clutter;
const Mainloop = imports.mainloop;


let coord;

const CoordManager = new Lang.Class({
    Name: 'CoordManager',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(0.0, "Coordinates");

        this.label = new St.Label({
            text: "XY",
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });

        this.actor.add_actor(this.label);

        Mainloop.timeout_add(100, Lang.bind(this, this.update_label));
    },

    update_label: function() {
        let [mouse_x, mouse_y, mask] = global.get_pointer();
        let newLabel = "X: " + mouse_x + " Y: " + mouse_y;
        this.label.set_text(newLabel);

        return true;
    },

    destroy: function() {
        this.parent();
    },
});

function init() {

}

function enable() {
    coord = new CoordManager();

    Main.panel.addToStatusArea('coord-menu', coord, 1, 'right');
}

function disable() {
    coord.destroy();
}

