import os
import datetime
import sys
#import shutil

#modified_time=datetime.datetime.fromtimestamp(os.path.getmtime('C:/Users/ramad/Downloads/chatbot-node-rasa-master/HRbot/HR_Bot.json'))
#print(modified_time)
directory = 'C:/Users/ramad/Downloads/chatbot-node-rasa-master/models/default/'

def all_subdirs_of(b=directory):
  result = []
  for d in os.listdir(b):
    bd = os.path.join(b, d)
    if os.path.isdir(bd): result.append(bd)
  return result

latest_subdir = max(all_subdirs_of(directory), key=os.path.getmtime)
print(latest_subdir )
sys.stdout.flush()

#import os
#import time
#import operator
#alist={}
#directory= 'C:/Users/ramad/Downloads/chatbot-node-rasa-master/models/default/'
#os.chdir(directory)
#for file in os.listdir("."):
#    if os.path.isdir(file):
#        timestamp = os.path.getmtime( file )
#        # get timestamp and directory name and store to dictionary
#        alist[os.path.join(os.getcwd(),file)]=timestamp

## sort the timestamp 
#for i in sorted(alist.items(), key=operator.itemgetter(1)):
#    latest="%s" % ( i[0])
#print ("newest directory is ", latest)


### JMP license installation 1
#* greet
#  - utter_greet
#  -utter_servicenowrequest
#* JMP_License_Path
#  - utter_servicenowrequest
# * inform{"choice":no}
#  -  utter_goodbye

### JMP license installation 2
#* JMP_License_Path
#  - utter_servicenowrequest
#* inform{"choice": yes}
#  - utter_operatingsystem
#* inform{"os":["windows 10","windows 7"]}
#  - utter_windows
#* goodbye
#  - utter_goodbye

### JMP license installation 3
#* JMP_License_Path
#  - utter_servicenowrequest
#* inform{"choice": yes}
#  - utter_operatingsystem
#* inform{"os": "mac os"}
#  - utter_macos
#* goodbye
#  - utter_goodbye