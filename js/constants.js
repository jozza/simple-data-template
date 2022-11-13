
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

let current_json = {}
let collected_data = {}
let collected_matrix = {}
let template_data = {}
let data_templates = JSON.parse(localStorage.getItem("items"))
let current_templates = JSON.parse(localStorage.getItem("templates"))
let current_terms = JSON.parse(localStorage.getItem("terms"))
let current_crfs = JSON.parse(localStorage.getItem("crf"))
current_crfs['Protocol']['group1'] = []
localStorage.setItem("crf",JSON.stringify(current_crfs,null,2))
let current_protocol = JSON.parse(localStorage.getItem("protocol"))
let test_template = current_templates.templates.test
let test_vars_array = Object.keys(test_template)
const test_vars_template = test_vars_array.reduce((a, v) => ({ ...a, [v]: "not set"}), {})
