"use strict"

function init() {
  // Check if browser has been used (i.e. localStorage should have the terms defined)
  if (localStorage.terms === undefined
  || localStorage.items === undefined
  || localStorage.templates === undefined
  || localStorage.forms === undefined
  || localStorage.protocol === undefined
  ) {
    console.log("Initialising browser usage for the first run")
    reset_to_default_json()
  }

  let last_tab = localStorage.last_tab
  hide_tabs()
  if (last_tab) {
    document.getElementById(last_tab).style.display = "block";
    document.getElementById(last_tab+"_tab").classList.add("active");
  }
  display_json()
  load_items()
  load_forms()
  get_json_keys_localstorage()
}

function set_localstorage_items(json) {
  localStorage.setItem("items",json)
}

function remove_local_storage() {
  if (confirm("This will reset localStorage")) {
    localStorage.removeItem("onefile")
    localStorage.removeItem("items")
    localStorage.removeItem("terms")
    localStorage.removeItem("templates")
    localStorage.removeItem("forms")
    localStorage.removeItem("protocol")
  }
}

function reset_to_default_json() {
    localStorage.setItem("onefile",default_onefile_json)
    set_localstorage_items(default_items_json)
    localStorage.setItem("terms",default_terms_json)
    localStorage.setItem("templates",default_templates_json)
    localStorage.setItem("forms",default_forms_json)
    localStorage.setItem("protocol",default_protocol_json)
}

function ask_reset_to_default_json() {
  if (confirm("This will overwrite any changes made to the json files")) {
    reset_to_default_json()
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

  button.classList.toggle("btn-success")

  if (els[0].style.display == "none") {
    for (let i = 0; i < els.length; i++) { els[i].style.display = "block"; }
    button.dataset.displayed = "block"
  } else {
    for (let i = 0; i < els.length; i++) { els[i].style.display = "none"; }
    button.dataset.displayed = "none"
  }
}
