from rasa_core_sdk import Action 
from rasa_core_sdk.events import SlotSet
import requests
import json
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

class ActionEnabled(Action):

    def name(self):
        return 'action_isenabled'

    def run(self,dispatcher,tracker,domain):
        userid=tracker.get_slot('userid')
        if userid == 'abraham.lincoln':
             description='EXIST'
             print("hbhb",description)
             return [SlotSet('enabled',description)]

#url="http://www.google.com"
#data=requests.get(url).json()


#print (data)