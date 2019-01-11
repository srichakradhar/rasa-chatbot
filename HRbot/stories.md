## RemoteVPNAcess 1
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
  - utter_connectvpn
* inform{"choice": "yes"}
  - utter_goodbye

## RemoteVPNAcess 2
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "no"}
  - utter_goodbye

## RemoteVPNAcess 3
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
    - utter_connectvpn
* inform{"choice": "no"}
    - utter_raise_servicenow_ticket
* inform{"choice": "yes"}
    - utter_description
    - utter_goodbye  

## RemoteVPNAcess 4
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
    - utter_connectvpn
* inform{"choice": "no"}
    - utter_raise_servicenow_ticket
* inform{"choice": "no"}
    - utter_goodbye

## RemoteVPNAcess 5
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "not active"}
  - utter_raise_servicenow_ticket
* inform{"choice": "no"}
  - utter_goodbye

## RemoteVPNAcess 6
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "not active"}
  - utter_raise_servicenow_ticket
* inform{"choice": "yes"}
   - utter_description
   - action_description 
   - utter_goodbye 

## RemoteVPNAcess 1
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
  - utter_connectvpn
* inform{"choice": "yes"}
  - utter_goodbye

## RemoteVPNAcess 1
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
  - utter_connectvpn
* inform{"choice": "yes"}
  - utter_goodbye

## RemoteVPNAcess 1
* greet
  - utter_greet
* RemoteVPNAcess
  - utter_vpnstatus
* inform{"status": "active"}
  - utter_relaunch
* inform{"choice": "yes"}
  - utter_connectvpn
* inform{"choice": "yes"}
  - utter_goodbye



## Generated Story 542309000610180361
* greet
    - utter_greet
* changepassword
    - utter_userid
* userid{"userid": "abel.tuter"}
    - slot{"userid": "abel.tuter"}
    - action_isenabled
	- slot{"enabled": "NULL"}
	- utter_response   
* goodbye
    - utter_goodbye

## story_rpa_positive
* greet
    - utter_greet
* changepassword
    - utter_userid
* userid{"userid": "abraham.lincoln"}
    - slot{"userid": "abraham.lincoln"}
    - action_isenabled
	- slot{"enabled": "EXIST"}
    - utter_resetpassword
* thanks:
    - utter_help
* goodbye
    - utter_goodbye

## story_rpa_positive
* greet
    - utter_greet
* changepassword
    - utter_userid
* userid{"userid": "suneel"}
    - slot{"userid": "suneel"}
    - action_isenabled
	- slot{"enabled": "EXIST"}
    - utter_suneel
* thanks:
    - utter_help
* goodbye
    - utter_goodbye

## story_CTL
* greet
    - utter_greet
* mistakenlyapproved
    - utter_taskmistaken
* thanks
    - utter_thanks
* goodbye
    - utter_goodbye

##  story_CTL_2
* greet
    - utter_greet
* requeststatus
    - utter_usage
* inform{"choice": "yes"}
    - slot{"choice": "yes"}
    - utter_requests
* thanks
    - utter_thanks
* goodbye
    - utter_goodbye

## story_CTL_3
* greet
    - utter_greet
* deletePO
    - utter_deletePO
* inform{"choice": "yes"}
    - slot{"choice": "yes"}
    - utter_contact
* goodbye
    - utter_goodbye

## Generated Story 6840421216679812964
* greet
    - utter_greet
* changepassword
    - utter_userid
* userid{"userid": "suneel"}
    - slot{"userid": "suneel"}
    - action_isenabled
    - slot{"enabled": "EXIST"}
    - utter_suneel
* thanks
    - utter_help
* goodbye
    - utter_goodbye

