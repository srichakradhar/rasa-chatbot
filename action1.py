from rasa_core_sdk import Action 
from rasa_core_sdk.events import SlotSet
import requests

class ActionEnabled(Action):
    
    def name(self):
        return 'action_isenabled'

    def run(self,dispatcher,tracker,domain):
      return_slots = []
      details = ['userid']
      for detail in details:
        if tracker.get_slot(detail) == 'abel.tuter':
          return_slots.append(SlotSet('enabled','NULL'))
          print('nonenabled staus',return_slots[0])  
          break
        else:
          return_slots.append(SlotSet('enabled','EXIST'))
          print('enabled staus',return_slots[0]) 
          break

      return return_slots

#from rasa_core.interpreter import RasaNLUInterpreter
#from rasa_core.agent import Agent
#rasaNLU= RasaNLUInterpreter("model/current/nlu/")
#agent=Agent.load("model/dialogue",RasaNLUInterpreter=rasaNLU)