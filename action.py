from rasa_core_sdk import Action 
from rasa_core_sdk.events import SlotSet
import requests
import json



class ActionEnabled(Action):
    
    def name(self):
        return 'action_isenabled'

    def run(self,dispatcher,tracker,domain):
      return_slots = []
      details = ['userid']
      for detail in details:
        if tracker.get_slot(detail) == 'abel.tuter':
          return_slots.append(SlotSet('enabled','NULL'))
          print('enabled staus',return_slots[0]) 
        else:
          return_slots.append(SlotSet('enabled','EXIST'))  
      return return_slots




#class ActionDescription(Action):

#    def name(self):
#        return 'action_description'

#    def run(self,dispatcher,tracker,domain):
        
#        description=tracker.get_slot('description')
#        id=tracker.get_slot('id')
#        dispatcher.utter_message("{} with id:{} was created".format(description,id))
#        return []
#class userprofile(Action):

#    def name(self):
#        return 'action_isenabled'

#    def run(self,dispatcher,tracker,domain):
#        url=""
#        data=requests.get(url).json
#        return [SlotSet("enabled", data["account_type"])]

#url="http://01HW1160889:8181/ws/ServiceNow"
#login_data=HTTPBasicAuth("parth","Parth")
#data=requests.post(url,login_data,headers)


#headers = {'content-type': 'text/xml','Authorization':'Basic cGFydGg6UGFydGg='}
#body = 
##response = requests.post(url,data=body,headers=headers,auth=('parth', 'Parth'))
#response = requests.post(url,data=body,headers=headers)