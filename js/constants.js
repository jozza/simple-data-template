
let json_txt            = document.getElementById('json_txt')
let item_list           = document.getElementById('item_list');
let item_view           = document.getElementById('item_view');
let example_data        = document.getElementById('example_data');
let template_data_view  = document.getElementById('template_data_view');
let item_json_view      = document.getElementById('item_json_view');
let sdtm_data_view      = document.getElementById('sdtm_data_view');
let annotation_button   = document.getElementById('annotation-button');
let select_json_file    = document.getElementById('select_json_file')
let select_json_compare = document.getElementById('select_json_compare')
let json_compare        = document.getElementById('json_compare')

select_json_file.onchange = function() { display_json() }
let select_form  = document.getElementById('select_form')

let save_dt = document.getElementById('save_dt')

// Initialise data
let current_json = {}
let collected_data = {}
let collected_matrix = {}
let template_data = {}
let data_templates = JSON.parse(localStorage.getItem("items"))
let current_templates = JSON.parse(localStorage.getItem("templates"))
let current_terms = JSON.parse(localStorage.getItem("terms"))
let current_forms = JSON.parse(localStorage.getItem("forms"))
if (current_forms) {
    current_forms['Protocol']['group1'] = []
    localStorage.setItem("forms",JSON.stringify(current_forms,null,2))
} else {
    console.log("current_forms does NOT exist",current_forms)
    current_forms = {}
    current_forms['Protocol'] = {}
    current_forms['Protocol']['group1'] = []
}
let current_protocol = JSON.parse(localStorage.getItem("protocol"))
