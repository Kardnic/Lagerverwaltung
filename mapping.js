const AREAS=["Regal und Feld 1","Regal und Feld 2","Regal und Feld 3","Regal und Feld 4"];
function makeSlot(sheet,cell,label,block,row,col){return{id:`${sheet}!${cell}`,label,sheet,cell,area:sheet,block,row,col};}
function colName(colNumber){let name="",n=colNumber;while(n>0){const r=(n-1)%26;name=String.fromCharCode(65+r)+name;n=Math.floor((n-1)/26);}return name;}
function generateMapping(){const mapping=[];
function addTop(sheet,prefix,startCol,startRow){[{row:startRow,start:13},{row:startRow+1,start:7},{row:startRow+2,start:1}].forEach(r=>{for(let i=0;i<6;i++){const col=startCol+i;mapping.push(makeSlot(sheet,`${colName(col)}${r.row}`,`${prefix}.2.${r.start+i}`,"top",r.row,col));}});}
function addSide(sheet,prefix,side,cols,rows){rows.forEach((row,rowIndex)=>{cols.forEach((col,colIndex)=>{const number=[4,8,12][colIndex]-rowIndex;mapping.push(makeSlot(sheet,`${colName(col)}${row}`,`${prefix}.${side}.${number}`,side===1?"left":"right",row,col));});});}
function addMiddle(sheet,prefix,cols,rows){cols.forEach((col,colIndex)=>{rows.forEach((row,rowIndex)=>{const number=colIndex*4+rowIndex+1;mapping.push(makeSlot(sheet,`${colName(col)}${row}`,`F${prefix}.${number}`,"middle",row,col));});});}
addTop("Regal und Feld 1","R1",5,5);addMiddle("Regal und Feld 1","1",[2,4,6,8,10],[8,10,12,14]);addSide("Regal und Feld 1","R1",3,[12,13,14],[8,10,12,14]);
addTop("Regal und Feld 2","R2",9,6);addSide("Regal und Feld 2","R2",1,[3,4,5],[9,11,13,15]);addMiddle("Regal und Feld 2","2",[6,8,10,12,14],[9,11,13,15]);addSide("Regal und Feld 2","R2",3,[16,17,18],[9,11,13,15]);
addTop("Regal und Feld 3","R2",7,5);addSide("Regal und Feld 3","R2",1,[1,2,3],[8,10,12,14]);addMiddle("Regal und Feld 3","2",[4,6,8,10,12],[8,10,12,14]);addSide("Regal und Feld 3","R2",3,[14,15,16],[8,10,12,14]);
const sheet4="Regal und Feld 4";for(let i=0;i<12;i++){const col=5+i;mapping.push(makeSlot(sheet4,`${colName(col)}5`,`R3.2.${24+i}`,"top",5,col));}for(let i=0;i<12;i++){const col=5+i;mapping.push(makeSlot(sheet4,`${colName(col)}6`,`R3.2.${13+i}`,"top",6,col));}for(let i=0;i<12;i++){const col=5+i;mapping.push(makeSlot(sheet4,`${colName(col)}7`,`R3.2.${1+i}`,"top",7,col));}return mapping;}
const MAPPING=generateMapping();
