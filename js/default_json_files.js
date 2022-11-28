const default_protocol_json = `
{
	"id":"PILOT01",
	"name":"Study1"
}

`
const default_items_json = `
{
    "EXAMPLE-TEMPLATE":
    {
        "type": "test",
        "identifier":
        {
            "name": "SYSBP",
            "domain": "VS",
            "display": "Example template Systolic Blood Pressure, Supine",
            "label": "Systolic Blood Pressure",
            "submission_value": "SYSBP",
            "cat": "VITAL SIGNS"
        },
        "result":
        {
            "collected": null,
            "validation":
            [
                80,
                140
            ],
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49670": "mmHg"
            },
            "standard": "mmHg"
        },
        "location":
        [
            "C32141",
            "C32974",
            "SPONSOR-LOC1"
        ],
        "position":
        [
            "C62167"
        ],
        "protocol_text": "This is an example protocol text for SBP in Supine position."
    },
    "PULSE-SUPINE":
    {
        "type": "test",
        "identifier":
        {
            "name": "PULSE-SUPINE",
            "domain": "VS",
            "display": "Pulse, supine",
            "label": "Pulse Rate",
            "submission_value": "PULSE",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49673": "beats/min"
            },
            "standard": "beats/min"
        },
        "locations": null,
        "position":
        {
            "C62167": "Supine"
        },
        "protocol_text": "Pulse Rate in Supine position"
    },
    "PULSE":
    {
        "type": "test",
        "identifier":
        {
            "name": "PULSE",
            "display": "Pulse",
            "domain": "VS",
            "label": "Pulse Rate",
            "submission_value": "PULSE",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49673": "beats/min"
            },
            "standard": "beats/min"
        },
        "location":
        [
            "SPONSOR-LOC1",
            "SPONSOR-LOC2",
            "C32141",
            "C32974",
            "C33894",
            "C32078",
            "C32608"
        ],
        "position":
        [
            "C62166",
            "C62167"
        ],
        "protocol_text": "Pulse Rate"
    },
    "SYSBP_SUP":
    {
        "type": "test",
        "identifier":
        {
            "name": "SYSBP",
            "display": "Systolic Blood Pressure, Supine",
            "domain": "VS",
            "label": "Systolic Blood Pressure",
            "submission_value": "SYSBP",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "var_label": "Systolic Blood Pressure, Supine",
            "var_name": "SBPSUP",
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49670": "mmHg"
            },
            "standard": "mmHg"
        },
        "location":
        [
            "SPONSOR-LOC1",
            "SPONSOR-LOC2",
            "C32141",
            "C32974",
            "C33894",
            "C32078",
            "C32608"
        ],
        "position":
        {
            "C62167": "Supine"
        },
        "method":
        [
            "METHOD1",
            "METHOD2"
        ],
        "protocol_text": "Systolic Blood Pressure in Supine position"
    },
    "Race":
    {
        "type": "multi-response",
        "identifier":
        {
            "name": "RACE",
            "display": "Race",
            "domain": "DM",
            "label": "Collected race",
            "instruction": "Subject self reports one or many"
        },
        "result":
        {
            "var_name": "RACE",
            "collected":
            [
                "C41259",
                "C41260",
                "C16352",
                "C41261",
                "C41219"
            ],
            "specification": "C17649"
        },
        "protocol_text": "Self reported Race of Subjects"
    },
    "Race2":
    {
        "type": "multi-response",
        "identifier":
        {
            "name": "RACE",
            "display": "Race",
            "domain": "DM",
            "label": "Collected race",
            "instruction": "Subject self reports one or many"
        },
        "result":
        {
            "var_name": "RACE",
            "collected":
            [
                "C41259",
                "C41260",
                "C16352",
                "C41261",
                "C41219",
                "C17649"
            ]
       },
        "protocol_text": "Self reported Race of Subjects"
    }
}
`
const default_forms_json = `
{
  "Form 1": {
    "group1":[
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"PULSE"},
      {"item":"Race"}
    ]
  },
  "Form 2": {
    "group1":[
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"PULSE-SUPINE"},
      {"item":"SYSBP_SUP"}
    ]
 },
 "Form 3: pulse 2 variants": {
    "group1":[
      {"item":"PULSE"},
      {"item":"PULSE-SUPINE"}
    ]
 },
 "Form 4:race and vs": {
    "group1":[
      {"item":"Race"},
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"SYSBP_SUP"},
      {"item":"PULSE"},
      {"item":"PULSE-SUPINE"}
    ]
  },
 "Protocol": {
    "group1":[
    ]
  }
}
`
const default_templates_json = `
{
    "templates":{
        "test": {
            "id": {
                "sdtm_target": "--TESTCD"
                ,"display_order": 2
            },
            "label": {
                "sdtm_target": "--TEST"
                ,"display_order": 3
            },
            "cat": {
                "sdtm_target": "--CAT"
                ,"display_order": 1
            },
            "result": {
                "sdtm_target": "--ORRES"
                ,"display_order": 4
            },
            "unit": {
                "sdtm_target": "--ORRESU"
                ,"display_order": 5
            },
            "method": {
                "sdtm_target": "--METHOD"
                ,"display_order": 8
            },
            "position": {
                "sdtm_target": "--POS"
                ,"display_order": 6
            },
            "laterality": {
                "sdtm_target": "--LAT"
                ,"display_order": 9
            },
            "directionality": {
                "sdtm_target": "--DIR"
                ,"display_order": 10
            },
            "location": {
                "sdtm_target": "--LOC"
                ,"display_order": 7
            }
        }
    }
}`
const default_terms_json = `
{
   "terms":{
        "SPONSOR-LOC1":    { "display":"Left Arm",        "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"}},             "definition":"Sponsor specific"},
        "SPONSOR-LOC2":    { "display":"Right Arm",       "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25228"}},      "definition":"Sponsor specific"},
        "SPONSOR-LOC3":    { "display":"Left Leg",        "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"}},       "definition":"Sponsor specific"},
        "SPONSOR-LOC4":    { "display":"Right Leg",       "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25228"}},      "definition":"Sponsor specific"},
        "SPONSOR-LOC5":    { "display":"Upper Left Arm",  "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"},"directionality":"UPPER"},   "definition":"Sponsor specific"},
        "C25229":   { "display":"Left",                   "submission_value":{"laterality":"LEFT"},  "definition":"Being or located on or directed toward the side of the body to the west when facing north."},
        "C25228":   { "display":"Right",                  "submission_value":{"laterality":"RIGHT"},  "definition":"Being or located on or directed toward the side of the body to the east when facing north."},
        "C32141":   { "display":"Arm",                    "submission_value":{"location":"ARM"},                  "definition":"The portion of the upper extremity between the shoulder and the elbow."},
        "C32974":   { "display":"Leg",                    "submission_value":{"location":"LEG"},                  "definition":"The portion of the lower extremity between the knee and the ankle."},
        "C33894":   { "display":"Wrist Joint",            "submission_value":{"location":"WRIST JOINT"},          "definition":"A joint between the distal end of the radius and the proximal row of carpal bones.", "source":"(NCI)"},
        "C32078":   { "display":"Ankle Joint",            "submission_value":{"location":"ANKLE JOINT"},          "definition":"A gliding joint between the distal ends of the tibia and fibula and the proximal end of the talus.", "source":"(NCI)"},
        "C32608":   { "display":"Finger",                 "submission_value":{"location":"FINGER"},               "definition":"Any of the digits of the hand.", "source":"(NCI)"},
        "C26166":   { "display":"Standing",               "submission_value":{"position":"STANDING"},             "definition":"Sponsor specific"},
        "C49670":   { "display":"mmHg",                   "submission_value":{"unit":"mmHg"},                     "definition":"A unit of pressure equal to 0.001316 atmosphere and equal to the pressure indicated by one millimeter rise of mercury in a barometer at the Earth's surface.", "source":"(NCI)"},
        "C49673":   { "display":"beats/min",              "submission_value":{"unit":"beats/min"},           "definition":"The number of heartbeats measured per minute time.", "source":"(NCI)"},
        "C62166":   { "display":"Standing",               "submission_value":{"position":"STANDING"},             "definition":"Sponsor specific"},
        "C62167":   { "display":"Supine",                 "submission_value":{"position":"SUPINE"},               "definition":"Sponsor specific"},
        "METHOD1":  { "display":"Cuff",                   "submission_value":{"method":"CUFF"},                 "definition":"Sponsor specific"},
        "METHOD2":  { "display":"Arterial Blood Line",    "submission_value":{"method":"ARTERIAL BLOOD LINE"},  "definition":"Sponsor specific"},
        "C17459":   { "display":"Hispanic or Latino", "submission_value":"HISPANIC OR LATINO",  "definition":"Yada yada yada"},
        "C41222":   { "display":"Not Hispanic or Latino", "submission_value":"NOT HISPANIC OR LATINO",  "definition":"Yada yada yada"},
        "C41259":  { "display":"American Indian or Alaska Native","submission_value":{"RACE":"AMERICAN INDIAN OR ALASKA NATIVE"}, "definition":"A person having origins in any of the original peoples of North and South America (including Central America), and who maintains tribal affiliation or community attachment. (FDA)"},
        "C41260":  { "display":"Asian","submission_value":{"RACE":"ASIAN"}, "definition":"A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam. (FDA)" },
        "C16352":  { "display":"Black or African American","submission_value":{"RACE":"BLACK OR AFRICAN AMERICAN"}, "definition":"A person having origins in any of the black racial groups of Africa. Terms such as 'Haitian' or 'Negro' can be used in addition to 'Black or African American.' (FDA)"},
        "C41219":  { "display":"Native Hawaiian or Other Pacific Islander","submission_value":{"RACE":"NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER"}, "definition":"Denotes a person having origins in any of the original peoples of Hawaii, Guam, Samoa, or other Pacific Islands. The term covers particularly people who identify themselves as part-Hawaiian, Native Hawaiian, Guamanian or Chamorro, Carolinian, Samoan, Chuu. (FDA)"},
        "C41261":  { "display":"White", "submission_value":{"RACE":"WHITE"}, "definition":"Denotes a person with European, Middle Eastern, or North African ancestral origin who identifies, or is identified, as White. (FDA)" },
        "C43234":  { "display":"Not Reported","submission_value":{"RACE":"NOT REPORTED"}, "definition":"Not provided or available."},
        "C17998":  { "display":"Unknown","submission_value":{"RACE":"UNKNOWN"}, "definition":"Not known, not observed, not recorded, or refused.", "source":"(NCI)"},
        "C17649":  { "display":"Other","submission_value":{"RACE":"OTHER"}, "definition":"Different than the one(s) previously specified or mentioned.", "source":"(NCI)"}
    }
}
`
const default_onefile_json = `
{
"items":{
    "EXAMPLE-TEMPLATE":
    {
        "type": "test",
        "identifier":
        {
            "name": "SYSBP",
            "domain": "VS",
            "display": "Example template Systolic Blood Pressure, Supine",
            "label": "Systolic Blood Pressure",
            "submission_value": "SYSBP",
            "cat": "VITAL SIGNS"
        },
        "result":
        {
            "collected": null,
            "validation":
            [
                80,
                140
            ],
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49670": "mmHg"
            },
            "standard": "mmHg"
        },
        "location":
        [
            "C32141",
            "C32974",
            "SPONSOR-LOC1"
        ],
        "position":
        [
            "C62167"
        ],
        "protocol_text": "This is an example protocol text for SBP in Supine position."
    },
    "PULSE-SUPINE":
    {
        "type": "test",
        "identifier":
        {
            "name": "PULSE-SUPINE",
            "domain": "VS",
            "display": "Pulse, supine",
            "label": "Pulse Rate",
            "submission_value": "PULSE",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49673": "beats/min"
            },
            "standard": "beats/min"
        },
        "locations": null,
        "position":
        {
            "C62167": "Supine"
        },
        "protocol_text": "Pulse Rate in Supine position"
    },
    "PULSE":
    {
        "type": "test",
        "identifier":
        {
            "name": "PULSE",
            "display": "Pulse",
            "domain": "VS",
            "label": "Pulse Rate",
            "submission_value": "PULSE",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49673": "beats/min"
            },
            "standard": "beats/min"
        },
        "location":
        [
            "SPONSOR-LOC1",
            "SPONSOR-LOC2",
            "C32141",
            "C32974",
            "C33894",
            "C32078",
            "C32608"
        ],
        "position":
        [
            "C62166",
            "C62167"
        ],
        "protocol_text": "Pulse Rate"
    },
    "SYSBP_SUP":
    {
        "type": "test",
        "identifier":
        {
            "name": "SYSBP",
            "display": "Systolic Blood Pressure, Supine",
            "domain": "VS",
            "label": "Systolic Blood Pressure",
            "submission_value": "SYSBP",
            "cat": "PULSE AND BLOOD PRESSURE"
        },
        "result":
        {
            "var_label": "Systolic Blood Pressure, Supine",
            "var_name": "SBPSUP",
            "collected": null,
            "standard": null
        },
        "units":
        {
            "collected":
            {
                "C49670": "mmHg"
            },
            "standard": "mmHg"
        },
        "location":
        [
            "SPONSOR-LOC1",
            "SPONSOR-LOC2",
            "C32141",
            "C32974",
            "C33894",
            "C32078",
            "C32608"
        ],
        "position":
        {
            "C62167": "Supine"
        },
        "method":
        [
            "METHOD1",
            "METHOD2"
        ],
        "protocol_text": "Systolic Blood Pressure in Supine position"
    },
    "Race":
    {
        "type": "multi-response",
        "identifier":
        {
            "name": "RACE",
            "display": "Race",
            "domain": "DM",
            "label": "Collected race",
            "instruction": "Subject self reports one or many"
        },
        "result":
        {
            "var_name": "RACE",
            "collected":
            [
                "C41259",
                "C41260",
                "C16352",
                "C41261",
                "C41219"
            ],
            "specification": "C17649"
        },
        "protocol_text": "Self reported Race of Subjects"
    },
    "Race2":
    {
        "type": "multi-response",
        "identifier":
        {
            "name": "RACE",
            "display": "Race",
            "domain": "DM",
            "label": "Collected race",
            "instruction": "Subject self reports one or many"
        },
        "result":
        {
            "var_name": "RACE",
            "collected":
            [
                "C41259",
                "C41260",
                "C16352",
                "C41261",
                "C41219",
                "C17649"
            ]
       },
        "protocol_text": "Self reported Race of Subjects"
    }
},
"forms":{
  "Form 1": {
    "group1":[
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"PULSE"},
      {"item":"Race"}
    ]
  },
  "Form 2": {
    "group1":[
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"PULSE-SUPINE"},
      {"item":"SYSBP_SUP"}
    ]
 },
 "Form 3: pulse 2 variants": {
    "group1":[
      {"item":"PULSE"},
      {"item":"PULSE-SUPINE"}
    ]
 },
 "Form 4:race and vs": {
    "group1":[
      {"item":"Race"},
      {"item":"EXAMPLE-TEMPLATE"},
      {"item":"SYSBP_SUP"},
      {"item":"PULSE"},
      {"item":"PULSE-SUPINE"}
    ]
  },
 "Protocol": {
    "group1":[
    ]
  }
}
,
"templates":{
    "templates":{
        "test": {
            "id": {
                "sdtm_target": "--TESTCD"
                ,"display_order": 2
            },
            "label": {
                "sdtm_target": "--TEST"
                ,"display_order": 3
            },
            "cat": {
                "sdtm_target": "--CAT"
                ,"display_order": 1
            },
            "result": {
                "sdtm_target": "--ORRES"
                ,"display_order": 4
            },
            "unit": {
                "sdtm_target": "--ORRESU"
                ,"display_order": 5
            },
            "method": {
                "sdtm_target": "--METHOD"
                ,"display_order": 8
            },
            "position": {
                "sdtm_target": "--POS"
                ,"display_order": 6
            },
            "laterality": {
                "sdtm_target": "--LAT"
                ,"display_order": 9
            },
            "directionality": {
                "sdtm_target": "--DIR"
                ,"display_order": 10
            },
            "location": {
                "sdtm_target": "--LOC"
                ,"display_order": 7
            }
        }
    }
},
"terms":{
   "terms":{
        "SPONSOR-LOC1":    { "display":"Left Arm",        "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"}},             "definition":"Sponsor specific"},
        "SPONSOR-LOC2":    { "display":"Right Arm",       "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25228"}},      "definition":"Sponsor specific"},
        "SPONSOR-LOC3":    { "display":"Left Leg",        "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"}},       "definition":"Sponsor specific"},
        "SPONSOR-LOC4":    { "display":"Right Leg",       "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25228"}},      "definition":"Sponsor specific"},
        "SPONSOR-LOC5":    { "display":"Upper Left Arm",  "submission_value":{"location":{"term":"C32141"},"laterality":{"term":"C25229"},"directionality":"UPPER"},   "definition":"Sponsor specific"},
        "C25229":   { "display":"Left",                   "submission_value":{"laterality":"LEFT"},  "definition":"Being or located on or directed toward the side of the body to the west when facing north."},
        "C25228":   { "display":"Right",                  "submission_value":{"laterality":"RIGHT"},  "definition":"Being or located on or directed toward the side of the body to the east when facing north."},
        "C32141":   { "display":"Arm",                    "submission_value":{"location":"ARM"},                  "definition":"The portion of the upper extremity between the shoulder and the elbow."},
        "C32974":   { "display":"Leg",                    "submission_value":{"location":"LEG"},                  "definition":"The portion of the lower extremity between the knee and the ankle."},
        "C33894":   { "display":"Wrist Joint",            "submission_value":{"location":"WRIST JOINT"},          "definition":"A joint between the distal end of the radius and the proximal row of carpal bones.", "source":"(NCI)"},
        "C32078":   { "display":"Ankle Joint",            "submission_value":{"location":"ANKLE JOINT"},          "definition":"A gliding joint between the distal ends of the tibia and fibula and the proximal end of the talus.", "source":"(NCI)"},
        "C32608":   { "display":"Finger",                 "submission_value":{"location":"FINGER"},               "definition":"Any of the digits of the hand.", "source":"(NCI)"},
        "C26166":   { "display":"Standing",               "submission_value":{"position":"STANDING"},             "definition":"Sponsor specific"},
        "C49670":   { "display":"mmHg",                   "submission_value":{"unit":"mmHg"},                     "definition":"A unit of pressure equal to 0.001316 atmosphere and equal to the pressure indicated by one millimeter rise of mercury in a barometer at the Earth's surface.", "source":"(NCI)"},
        "C49673":   { "display":"beats/min",              "submission_value":{"unit":"beats/min"},           "definition":"The number of heartbeats measured per minute time.", "source":"(NCI)"},
        "C62166":   { "display":"Standing",               "submission_value":{"position":"STANDING"},             "definition":"Sponsor specific"},
        "C62167":   { "display":"Supine",                 "submission_value":{"position":"SUPINE"},               "definition":"Sponsor specific"},
        "METHOD1":  { "display":"Cuff",                   "submission_value":{"method":"CUFF"},                 "definition":"Sponsor specific"},
        "METHOD2":  { "display":"Arterial Blood Line",    "submission_value":{"method":"ARTERIAL BLOOD LINE"},  "definition":"Sponsor specific"},
        "C17459":   { "display":"Hispanic or Latino", "submission_value":"HISPANIC OR LATINO",  "definition":"Yada yada yada"},
        "C41222":   { "display":"Not Hispanic or Latino", "submission_value":"NOT HISPANIC OR LATINO",  "definition":"Yada yada yada"},
        "C41259":  { "display":"American Indian or Alaska Native","submission_value":{"RACE":"AMERICAN INDIAN OR ALASKA NATIVE"}, "definition":"A person having origins in any of the original peoples of North and South America (including Central America), and who maintains tribal affiliation or community attachment. (FDA)"},
        "C41260":  { "display":"Asian","submission_value":{"RACE":"ASIAN"}, "definition":"A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam. (FDA)" },
        "C16352":  { "display":"Black or African American","submission_value":{"RACE":"BLACK OR AFRICAN AMERICAN"}, "definition":"A person having origins in any of the black racial groups of Africa. Terms such as 'Haitian' or 'Negro' can be used in addition to 'Black or African American.' (FDA)"},
        "C41219":  { "display":"Native Hawaiian or Other Pacific Islander","submission_value":{"RACE":"NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER"}, "definition":"Denotes a person having origins in any of the original peoples of Hawaii, Guam, Samoa, or other Pacific Islands. The term covers particularly people who identify themselves as part-Hawaiian, Native Hawaiian, Guamanian or Chamorro, Carolinian, Samoan, Chuu. (FDA)"},
        "C41261":  { "display":"White", "submission_value":{"RACE":"WHITE"}, "definition":"Denotes a person with European, Middle Eastern, or North African ancestral origin who identifies, or is identified, as White. (FDA)" },
        "C43234":  { "display":"Not Reported","submission_value":{"RACE":"NOT REPORTED"}, "definition":"Not provided or available."},
        "C17998":  { "display":"Unknown","submission_value":{"RACE":"UNKNOWN"}, "definition":"Not known, not observed, not recorded, or refused.", "source":"(NCI)"},
        "C17649":  { "display":"Other","submission_value":{"RACE":"OTHER"}, "definition":"Different than the one(s) previously specified or mentioned.", "source":"(NCI)"}
    }
}
}
`
