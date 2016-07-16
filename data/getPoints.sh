#!/bin/bash

##Auhtor: John Talbot
## Seperate point classes

##PROJCS["WGS 84 / Pseudo-Mercator",

mkdir points
for i in *.shp;
do
    ##Get length of string
    len=${#i}
    ##get length of srting - 4 ( get rid of last 4 ".shp" )
    sub=$(( $len - 4 ))

    ##Extract that substring ( position 0 to $sub )
    noShp=${i:0:sub}
    ##Pipe ogrinfo to grep looking for string "(Point)" 
    if ogrinfo $i | grep --quiet "(Point)" ;
    then
	##Move all globed matches for filename (.shp,.prj...)
	mv $noShp* ./points/
    fi
	
done
