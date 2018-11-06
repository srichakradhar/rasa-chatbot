module.exports = Reply;
const MongoClient = require('mongodb').MongoClient;
const deasync = require('deasync');
// default replies
const REPLY_ERROR = "An error has occured. Please try again.";
const REPLY_DID_NOT_UNDERSTAND = "I didn't understand that. Can you rephrase?";
const REPLY_SUCCESSFUL = "I understood your message. You can tailor my responses to your messages by analysing the metadata attached with this message.";
db_url = "mongodb://localhost:27017/botdb";


function Reply(message, intent, entities) {
    this.message = message;
    this.reply = this.getReply(intent, entities);
    this.intent = intent;
    this.entities = entities;
    this.context = "global";
}

Reply.prototype.toJson = function () {
    var json = {};
    json['intent'] = this.intent;
    json['entities'] = this.entities;
    json['reply'] = this.reply;
    json['message'] = this.message;
    return json;
};

Reply.prototype.getReply = function (intent, entities) {
    
    if (intent.name == null) {

        
        let response;
        MongoClient.connect(db_url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("botdb");
            console.log("connected inside unclassified block");
            feedback_obj = {
               // "feedback": feedback,
                "input": this.message,
                "intent": "None",
              //  "answer": reply
            };

          
                dbo.collection("unclassifieds").insertOne(feedback_obj, function (err, inserted) {
                    if (err) throw err;
                    console.log("==####****###== inserted into Unclassified", inserted.ops);
                    response = inserted;
                });
           
        });
        deasync.loopWhile(() => { process.stdout.write('.'); return !response });

        return REPLY_DID_NOT_UNDERSTAND;
    }
    else {
        switch (intent.name) {
            case "init1": return "Hello there!";
            case "init2": return " Hi i am the HR chatbot! how may i help you?";
            case "VMV": return "The Vision, Mission and Values statements describe who we are as a company and how we operate.  Bookmark them in your browser by clicking here:" + "link".link("http://insideapplied/vmv/Pages/Home.aspx");
            case "thank you note": return "You can send thank you notes to coworkers via A3. See link below." + "link".link("https://appliedapps.amat.com/sites/A3/SitePages/Default.aspx");
            case "internal posting": return "You can view job postings in our Jobs@Applied page. See link below." + "link".link("http://atm/workingatapplied/staffing/apply/Pages/default.aspx");
            case "shuttle service": return "Multiple campuses and buildings in Santa Clara and tight parking – here's the solution:" + "link".link("http://spapp/sites/usa/SCLAFacilities/SitePages/Transportation.aspx");
            case "Templates": return "You can locate all company templates using the link below." + "Template".link("http://insideapplied/sites/brandcenter/Pages/Templates.aspx");
            case "social network": return "AMAT uses Yammer as one of our internal communication tools.  Create your account now by clicking this link:" + "link".link("https://www.yammer.com/amat.com/#/home");
            case "Workday": return 'You can access Workday by typing "Workday / " into your browser or by using the link below.' + "link".link("https://www.myworkday.com/amat/d/home.htmld");
            case "commuter": return "Yes!  Find out more about the available options here:" + "link".link("http://spapp/sites/usa/SCLAFacilities/SitePages/Transportation.aspx");
            case "map": return "You can access campus maps using the link below." + "link".link("http://spapp/sites/usa/SCLAFacilities/SitePages/drawing.aspx");
            case "Employee referral": return "Here’s a country-by-country process:" + "link".link("http://atm/workingatapplied/staffing/referral/Pages/default.aspx");
            case "calendar": return "Archived, current and future calendars can be found here:" + "link".link("http://acn/sites/gis/ccc/appsupportweb/FiscalCalendarResources/Forms/AllItems.aspx");
            //case "Benefits": return "For benefits related issues or questions please contact Mercer Benefits Service Center (800-921-0205). If needed, please follow-up with your HR Business Partner.";
            case "Employee Appraisal": return "";
            case "HIS Plan": return "";
            case "Number of leaves": return "";
            case "Variable Pay": return "";
            case "Leave Encashment": return "Under progress";
            case "Business Cards": return "";
            case "Greeting": return "Hi";
            case "Help": return "I'm Hiro. I can help you with HR queries.";
            case "Cancel": return "";
            case "Leave of absence": return "LOA requests need to be submitted thru Sedgwick (800-495-2311). Please review all resources relating to LOAs using the link below." + "link".link(" https://microsite.ehr.com/usa-amp-wellness/time-off-and-perks/time-away/leave-of-absence");
            case "AMP Wellness Center": return "In order to get access to the AMP Wellness Centers, you will need to complete the application form (link below) and submit it to the wellness center." + "link".link(" https://microsite.ehr.com/Portals/110/Documents/AMP-Fitness-Application-SCLA.pdf");
            case "conference": return "You can locate conference rooms, offices and people using the IBM Tririga Find Space web-app." + "link".link(" https://amatfc.dcacloud.com/prod/html/en/default/platform/mainpage/mainpage.jsp");
            case "elections": return "You can view your benefit elections via your Mercer Portal. Just type “benefits/” into your browser to be redirected to your portal or use the link below." + "link".link(" https://amat.mercerbenefitscentral.com/dashboard");
            case "assignments": return "You can view your training assignments using the help aid below." + "link".link(" https://amat.sabacloud.com/Saba/Web_spf/NA3P1PRD0037/pages/pagedetailview/spage000000000003480/help/view-my-training-summary");
            case "personal information": return "Please refer to the help aid using the link below." + "link".link(" http://atm/help/Workday/_layouts/15/WopiFrame.aspx?sourcedoc=/help/Workday/Documents/ViewMyAccount.pdf&action=default");
            case "time card": return "You can find your time card on the " + "KRONOS".link("https://amatus.kronos.net/wfc/applications/navigator/Navigator.do") + "application.  Non-exempt employees track their time here and exempt employees manage their PTO requests here.";
            case "AMEX": return "To request a corporate card, please use the link below and complete the from." + "link".link("http://spportal/sites/GlobalTravel/ConcurTravel/Pages/Amex-Regions.aspx");
            case "PTO": return "KRONOS!".link("https://amatus.kronos.net/wfc/applications/navigator/Navigator.do");
            case "facilities request": return "If you need A/V support or need to change the layout of a conference room" + "conference room".link("http://spapp/sites/usa/SCLAFacilities/SitePages/rooms.aspx") + "contact the Action Line at x35600";
            case "Tuition Assistance Program": return "All resources available regarding TAP are available in the TAP SharePoint." + "link".link(" https://appliedapps.amat.com/sites/tap/SitePages/TapHome.aspx");
            case "HR Policies": return "Use the link below to access HR policies." + "link".link(" http://atm/workingatapplied/HR_Policy/Pages/default.aspx");
            case "payday": return "US based employees get paid on a bi-weekly basis.";
            case "Assistance": return "HR Direct is available to provide immediate HR assistance. You can contact HR Direct via phone, chat or by submitting an HR ticket. Use the link below to contact HR Direct." + "link".link(" http://atm/help/HRDirect/Pages/default.aspx");
            case "acronym": return "The corporate dictionary is the best outlet available to get familiar with Applied's language and acronyms. See link below to be routed to the corporate dictionary." + "link".link(" http://spportal/sites/atoz/Lists/LinkDirectory/AllItems.aspx");
            case "GIS": return "If you have a GIS related issue or question, please contact the GIS helpdesk using the link listed below." + "link".link(" https://amat.service-now.com/AMAT3/submit_ticket.do");
            case "VoE": return "To request a VOE, please submit an HR ticket to HR Direct." + "link".link("http://atm/help/HRDirect/Pages/default.aspx");
            case "Thank You": return "Pleasure talking to you. Goodbye!";
            
            default:
                try {
                    //var db = await MongoClient.connect(db_url, { useNewUrlParser: true });
                    //var dbo = db.db("botdb");
                    //var response = await dbo.collection("faq").find({ "Intent": intent.name }, { 'answer': 2, '_id': 0 });
                    //response.toArray(function (err, result) {
                    //    console.log("connected: " + intent.name);
                    //    if (err) throw err;
                    //    response = result[0].answer;
                    //    console.log("result" + result[0].answer);
                    //    db.close;
                    //});
                    let response;
                    MongoClient.connect(db_url, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("botdb");
                        console.log("connected in default");
                        dbo.collection("faq").find({ "Intent": intent.name }, { 'answer': 2, '_id': 0 }).toArray(function (err, result) {
                            console.log("connected: " + intent.name);
                            if (err) throw err;
                            response = result[0].answer;
                            console.log("result" + result[0].answer);
                            db.close;

                        });
                    });
                    deasync.loopWhile(() => { console.log('.'); return !response });

                } catch (err) {

                    response = "Sorry, I did not understand your input. Please try again.";

                }
                return response;
        }
    }
};
