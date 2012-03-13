 /*
 * iconDock jQuery plugin 
 * http://icon.cat/software/iconDock
 *
 * Version: 0.8 beta
 * Date: 2/05/2007
 *
 * Copyright (c) 2007 Isaac Roca & icon.cat (iroca@icon.cat)
 * Dual licensed under the MIT-LICENSE.txt and GPL-LICENSE.txt
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 */

eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function(e) {
                return d[e]
            }];
        e = function() {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}
('b.1s=0;b.1W=0;b(1z).1E(9(e){8 F=0;8 H=0;f(b.2w.2g){F=1P.2h+1z.1M.2i;H=1P.2j+1z.1M.2l}u{F=e.2m;H=e.2n}f(F<0){F=0}f(H<0){H=0}b.1s=F;b.1W=H;18 W});b.2o=9(d){8 13=0;f(d.w){1Z(d.w){13+=d.2p;d=d.w}}u f(d.y)13+=d.y;18 13};b.1T=9(d){8 11=0;f(d.w){1Z(d.w){11+=d.2q;d=d.w}}u f(d.x)11+=d.x;18 11};8 23={j:2r,o:2s,1S:1q,1w:2,19:2t,1j:\'1k\'};8 4=n 15();8 14=n 15();8 1L=9(7){5.e=n 15();5.p=1B;5.2u=1B;5.1a=V;f(7==2v){5.7=23}u{5.7=7}};8 1R=9(){5.1h=1B;5.Z=\'\';5.z=\'\';5.1c=\'\';5.17=\'\';5.K=\'#\';5.g=0;5.v=0};8 1H=9(3){8 E,h,l,m,T,2b;4[3].J.G("2a","25");E="";T=0;b(4[3].e).q(9(i){h=4[3].7.o-5.g;1I(4[3].7.1j){A\'1J\':l=h;m=0;B;A\'1k\':l=h/2;m=h/2;B;A\'1K\':l=0;m=h;B}E+=\'<a 1b="1d: 0; 1e:0;" K="\'+5.K+\'" 1O="\'+5.17+\'"><t 22="\'+5.1c+\'" 1b="1l: \'+l+\'C 0 \'+m+\'C 0; 1d:0; 1e:0;" L="\'+5.g+\'" 1n="\'+5.g+\'" I="\'+((5.g>4[3].7.j)?5.z:5.Z)+\'" /></a>\';T+=5.g});E="<1C 26=\\"1D\\" 1b=\\"1d:0; 1l:0; 1e:0; L: "+T+"C; 1n:"+4[3].7.o+"C; \\">"+E+"</1C>";4[3].J.27(E);R=n 15();R.Q(n 1G());R[R.10-1].I=5.z;4[3].p=b("1C.1D",4[3].J);b("t",4[3].p).q(9(i){4[3].e[i].1h=5});4[3].p.1E(9(){X(3);f(4[3].1a)1y(3,s)});4[3].p.28(9(){a=n 20();s=a.21();X(3);1g(3,s)},9(){b(4[3].e).q(9(i){5.v=4[3].7.j});1p(3);4[3].1a=V})};8 1r=9(3){b(4[3].e).q(9(i){5.g=4[3].7.j;5.v=4[3].7.j});1H(3)};8 1g=9(3,s){8 D=V;b("a",4[3].p).q(9(i){f(4[3].e[i].g<4[3].e[i].v)D=W});f(D){X(3);1y(3,s);1Q("1g("+3+","+s+");",1F)}u{4[3].1a=W}};8 1t=9(3,i,c){8 t=4[3].e[i].1h;8 h,l,m,1m;c=U.29(c);h=4[3].7.o-c;1I(4[3].7.1j){A\'1J\':l=h;m=0;B;A\'1k\':l=h/2;m=h/2;B;A\'1K\':l=0;m=h;B}t.I=(c>4[3].7.j)?4[3].e[i].z:4[3].e[i].Z;1m=1i(4[3].p.1f("L"))+c-4[3].e[i].g;b(t).1f("1l",l+"C 1N "+m+"C 1N");4[3].p.1f("L",1m);t.L=c;t.1n=c;4[3].e[i].g=c};8 1p=9(3){8 1o=1i((4[3].7.o-4[3].7.j)*1q/4[3].7.19);8 D=V;b(4[3].e).q(9(i){8 c;f((5.g-1o)>4[3].7.j){D=W;c=5.g-1o}u{c=4[3].7.j}1t(3,i,c)});f(D){1Q("1p("+3+")",1q)}u{1r(3)}};8 X=9(3){8 N,k;N=4[3].7.o-4[3].7.j;k=U.1V(4[3].7.1S,4[3].7.1w);b("a",4[3].p).q(9(i){8 1X=U.2f(b.1s-b.1T(5)-1i(4[3].e[i].g/2));8 1x=-(N*U.1V(1X,4[3].7.1w))/k;8 c=(1x<-N)?4[3].7.o-N:4[3].7.o+1x;4[3].e[i].v=c})};8 1y=9(3,s){8 O,P,a;a=n 20();O=a.21()-s;P=(O/4[3].7.19<1)?O/4[3].7.19:1;b(4[3].e).q(9(i){8 24,c;f(P<1){c=4[3].7.j+(5.v-4[3].7.j)*P}u{c=5.v}f(O>1F)1t(3,i,c)})};b.2c.2d({2e:9(7){8 3=4.10;4.Q(n 1L(7));4[3].J=5;b("a",4[3].J).q(9(i){8 S,M,r,1A,1u,12,Y,l,m;4[3].e.Q(n 1R());S=b("t",5);M=b(5);r=S.G("I");1A=r.1U(".");1u=r.1U("1Y");4[3].e[i].Z=r;4[3].e[i].z=r.1v(0,1u)+\'1Y\'+4[3].7.o+r.1v(1A,r.10-1);14.Q(n 1G());14[14.10-1].I=4[3].e[i].z;4[3].e[i].17=M.G("1O");4[3].e[i].K=M.G("K");12=M.G("2k");Y=S.G("22");4[3].e[i].1c=(12)?12:(Y)?Y:4[3].e[i].17.1v(6,16)+"..."});1r(3);18 5}});', 62, 157, '|||id|docks|this||conf|var|function||jQuery|costat|obj||if|costatActual|resta||iconMinSide||ptop|pbottom|new|iconMaxSide|divDock|each|imgsrc|lastOver|img|else|costatFinal|offsetParent|||srcBig|case|break|px|recrida|strHTML|tempX|attr|tempY|src|dockPare|href|width|aInt|diferencia|difOver|factorOv|push|bigimg|imgInt|divWidth|Math|false|true|inDock|imgalt|srcSmall|length|curleft|aname|curtop|preloadImgs|Array||descripcio|return|veloOutDock|isMoving|style|titol|margin|border|css|overDock|imgDock|parseInt|valign|middle|padding|ampladaFinal|height|tamanyPas|outDock|100|startDock|mouseX|actDock|liobarra|substr|coefAttDock|calc|moveDock|document|liopunt|null|div|docking|mousemove|60|Image|resetDock|switch|bottom|top|dock|body|0px|title|event|setTimeout|dockElement|distAttDock|getPosX|lastIndexOf|pow|mouseY|distancia|_|while|Date|getTime|alt|defaultConf|factor|center|class|html|hover|round|align|lastover|fn|extend|addDockEffect|abs|msie|clientX|scrollLeft|clientY|name|scrollTop|pageX|pageY|getPosY|offsetTop|offsetLeft|35|70|1000|pareDock|undefined|browser'.split('|'), 0, {}))
