/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Incite
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

 /**
 * @fileOverview
 * @name glge_obj.js
 * @author me@geraldkaszuba.com
 */

if (!GLGE) {
    var GLGE = {};
}

(function(GLGE) {

GLGE.ObjFile = function(url, scene, obj) {

    this.verts = [];
    this.faces = [];
    this.scene = scene;
    this.object = obj;
    this.mesh = new GLGE.Mesh();
    this.load(url);

};

GLGE.ObjFile.prototype.load = function(url) {

    var instance = this;

    $.get(url, function(data) {

        lines = data.split('\n');

        $.each(lines, function(idx, line) {

            prefix = line.charAt(0);
            switch(prefix) {
                case 'g': break;
                case 'v':
                    instance.verts += instance.splitBits(line);
                    break;
                case 'f':
                    instance.faces += instance.splitBits(line);
                    break;
                default: break;
            }

        });

        instance.mesh.setPositions(instance.verts);
        instance.mesh.setFaces(instance.faces);
        instance.object.setMesh(instance.mesh);
        instance.scene.addObject(instance.object);

    });

}

GLGE.ObjFile.prototype.splitBits = function(line) {

    bits = line.split(' ');
    bits.shift();
    bits = bits.map(function(x) { return parseFloat(x) });
    return bits;

}

})(GLGE);

