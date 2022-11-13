"use strict"

function init() {
  // Check if browser has been used (i.e. localStorage should have the terms defined)
  if (localStorage.terms === undefined) {
    console.log("Initialising browser usage for the first run")
    reset_to_default_json_if_first_time()
  }

  let last_tab = localStorage.last_tab
  hide_tabs()
  if (last_tab) {
    document.getElementById(last_tab).style.display = "block";
    document.getElementById(last_tab+"_tab").className += " active";
  }
  display_json()
  load_items()
  load_forms()
  get_json_keys_localstorage()
}


async function set_localStorage(name) {
  const jsondata = await fetch(`./data_template/default_${name}.json`)
  .then(response => {
     return response.json()
  })
  localStorage.setItem(name,JSON.stringify(jsondata,null,2))
}

function set_localstorage_items(json) {
  localStorage.setItem("items",json)
}

function reset_to_default_json_if_first_time() {
  localStorage.setItem("onefile",default_onefile_json)
  set_localstorage_items(default_items_json)
  localStorage.setItem("terms",default_terms_json)
  localStorage.setItem("templates",default_templates_json)
  localStorage.setItem("form",default_form_json)
  localStorage.setItem("protocol",default_protocol_json)
}


async function reset_to_default_json() {
  if (confirm("This will overwrite any changes made to the json files")) {
    localStorage.setItem("onefile",default_onefile_json)
    set_localstorage_items(default_items_json)
    localStorage.setItem("terms",default_terms_json)
    localStorage.setItem("templates",default_templates_json)
    localStorage.setItem("form",default_form_json)
    localStorage.setItem("protocol",default_protocol_json)
  }
}

function get_json_keys_localstorage() {
  const keys = Object.keys(localStorage)
}

function save_json_to_localstorage(name) {
  localStorage.setItem(select_json_file.value,json_txt.value) 
}

function display_json() {
  json_txt.value = localStorage.getItem(select_json_file.value)
}

function load_current_json(name) {
  json_txt.value = localStorage.getItem(name)
}
function get_json_from_localstorage() {
  current_json = JSON.parse(json_txt.value)
  return current_json
}
function get_dt_from_localstorage() {
  data_templates = JSON.parse(localStorage.getItem("items"))
  return data_templates
}

function get_form_from_localstorage(name) {
  let current_form = current_forms[name]
  return current_form
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function toggle_annotation(button) {
  let els = document.getElementsByClassName("annotation")
  if (els.length == 0) { return }

  if (els[0].style.display == "none") {
    for (let i = 0; i < els.length; i++) { els[i].style.display = "block"; }
    button.dataset.displayed = "block"
  } else {
    for (let i = 0; i < els.length; i++) { els[i].style.display = "none"; }
    button.dataset.displayed = "none"
  }
}
