#!/bin/bash

##Auhtor: John Talbot
## Seperate point classes

##PROJCS["WGS 84 / Pseudo-Mercator",
for i in *.shp;
do
    if[ ogrinfo $i | grep --quiet "(Point)" ]; then
	echo $i
    fi
	
done
