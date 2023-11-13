# ecg-reader
Takes an ECG in image mode and convert it to comparable data

The goal is to create a platform which takes Electrocardiograms as inputs and compare it to a set of definitve diagnosed ECGs and show the similarity rate as a result.

 #Step 1 : The task is to determine whether the input file is an ECG or not?
   A normal and conventional ECG is consisted of 12 leads and each lead needs at least 3 beats to have a good view on the case.

 #Step 2 : Removing Noises on input image so there would be only the background grid (as will be needed for measures) and the beat itself.

 #Step 3 : Converting the beat into a number string. It's a 2d diagram so any point on the diagram (we will call it the beat), will be a (x,Y). 

 #Step 4 : Comparing the result from Step 3 to a set of data which are set as our benchmark diagnoses. The result is reported as a percent and sorted by highest relativity.


