(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riotGridTiles = {})));
}(this, (function (exports) { 'use strict';
    var grid = null;
    var cols = 12;
    var tiles = [];
    var resizeHandle = null;
    var moveHandle = null;
    var mount = mount$1;
    var test = test$1;

    var core = Object.freeze({
        mount: mount$1,
        test: test$1,
    });

    function mount$1(selector, className) {
        if(selector) {
            if(selector[0]==='#') selector = selector.slice(1);
            document.getElementById(selector).style.height = '100px';
            grid = document.getElementById(selector);
            
            return riotGridTiles;
        }
    }

    function test$1() {
        grid ? createGrid() : console.error("no grid mounted, riotGridTiles.mount('elementName')");
    }

    var riotGridTypes = {
        flexWrap : {   
            padding: '0',
            margin: '0',
            width: '100%',
            height: 'auto',
            overflow: 'hidden',
        },
    };
    var riotGridTileTypes = {
        default : {   
            display: 'inline-block',
            border : function(){ return '2px solid ' + randomColor(180);},
            backgroundColor : 'white',
            borderRadius : '10%',
            margin: '5px',
        },        
    };
    
    function createGrid(gridType, tileType, newCols) {
        var gType = gridType ? (typeof gridType === 'object' ? gridType : riotGridTypes[gridType]) : riotGridTypes.flexWrap;
        var tType = tileType ? (typeof tileType === 'object' ? tileType : riotGridTileTypes[tileType]) : riotGridTileTypes.default;
        cols = newCols ? newCols : cols;
        // three rows with number of cols specified, identified by row and col
        grid.removeAttribute('style');
        grid.style.boxSizing = 'border-box';
        for (var s in gType) {
            grid.style[s] = (typeof gType[s] === 'string') ? gType[s] : gType[s]();
        }
        var gridWidth = measure(grid, function(el){return el.offsetWidth;});

        for(var i=0; i<3; i++) {
            for(var j=0; j<cols; j++) {
                var tile = document.createElement("div");
                tile.style.boxSizing = 'border-box';
                var size = Math.floor(gridWidth / cols);
                tile.style.height = size.toString() + 'px';
                tile.style.width = size.toString() + 'px';                
                for (var s in tType) {
                    tile.style[s] = (typeof tType[s] === 'string') ? tType[s] : tType[s]();
                    tile.innerHTML = 'block row ' + i + ' col ' + j + ' size ' + size + ' cols ' + cols + ' of ' + gridWidth;
                }
                grid.appendChild(tile);
            }
        }
    }    

    function randomColor(brightness){
        function randomChannel(brightness){
          var r = 255-brightness;
          var n = 0|((Math.random() * r) + brightness);
          var s = n.toString(16);
          return (s.length==1) ? '0'+s : s;
        }
        return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
    }

    function measure(el, fn) {
      var pV = el.style.visibility, 
          pP = el.style.position;
          
      el.style.visibility = 'hidden';
      el.style.position = 'absolute';
      
      document.body.appendChild(el);
      var result = fn(el);
      el.parentNode.removeChild(el);
      
      el.style.visibility = pV;
      el.style.position = pP;
      return result;
  }

    exports.mount = mount;
    exports.test = test;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
