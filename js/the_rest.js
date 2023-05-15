"use strict"

let stuff = {
  current_counter : 0
}
let graph = {}
graph.stuff = 2

document.addEventListener("DOMContentLoaded", function() { init(); }, false)

//////////////////////////
// Tab
//////////////////////////
function hide_tabs() {
  let tabcontent = document.getElementsByClassName("tabcontent")
  for (let i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
}
function show_tab(evt, tab_name, el) {
  // Declare all variables
  let i, tabcontent, tablinks

  // Get all elements with class="tabcontent" and hide them
  hide_tabs()

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks")
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active")
  }
  el.classList.add("active")

  localStorage.last_tab = tab_name
  // Show the current tab, and add an "active" class to the button that opened the tab
  let current_tab = document.getElementById(tab_name)
  document.getElementById(tab_name).style.display = "block"
  evt.currentTarget.classList.add("active")
}

function toggle_view(el) {
  if (["","block"].includes(el.style.display) ) {
    el.style.display = "none"
  } else {
    el.style.display = "block"
  }
}

function add_template_to_protocol(el,update_div) {
  // let the_template = Object.entries(data_templates).find(item=> item[1].identifier.display === el.dataset.display)
  let the_template = Object.entries(data_templates).find(item=> item[0] === el.dataset.id)
  let tr = document.createElement("tr")
  const cell = make_cell({txt:"No protocol text for:"+the_template[0]})
  if (the_template[1].protocol_text) {
    cell.innerHTML = the_template[1].protocol_text
  }
  tr.append(cell)
  current_forms['Protocol']['group1'].push({item:the_template[0]})
  localStorage.setItem('form',JSON.stringify(current_forms,null,2))
  document.getElementById(update_div).append(tr)
}

async function show_modal_with_action(el,update_div,action) {
  let element = document.getElementById(el)

  removeAllChildNodes(modal_content)
  let modal = document.getElementById("myModal")
  // const matrix = Object.entries(data_templates).map(item=>[item[1].identifier.display])
  const matrix = Object.entries(data_templates).map(item=>[item[1].protocol_text])
  let header = ["assessment"]
  let table = matrix_to_table(header,matrix)
  let tbody = table.childNodes[1]
  let rows = Array.from(tbody.childNodes)
  for (let row of rows) {
    let cell = row.childNodes[0]
    let div = cell.childNodes[0]
    cell.classList.add("hl")
    // let the_template = Object.values(data_templates).find(item=>item.identifier.display === div.innerHTML)
    // cell.dataset.id = the_template.id
    let the_template = Object.entries(data_templates).find(item=>item[1].protocol_text === div.innerHTML)
    cell.dataset.id = the_template[0]
    cell.dataset.display = div.innerHTML
    cell.onclick = function () { add_template_to_protocol(this,update_div);modal.style.display = "none"; }
  }
  modal_content.appendChild(table)

  let span = document.getElementsByClassName("close")[0]

  // When the user clicks on the button, open the modal
  modal.style.display = "block"

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none"
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
}