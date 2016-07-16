##Author: Carl Flint
##Script to reproject data into web mercator
import arcpy, os
import time

start = time.time()

arcpy.env.workspace = "C:/Data/shp/shp"

features = arcpy.ListFeatureClasses()
webMer = arcpy.SpatialReference(3857)


for fc in features:
	arcpy.Project_management(fc,'C:/Data/shp/prj/' + fc,webMer)



end = time.time()

print end - start
