function show_item(el) {
    removeAllChildNodes(item_view)
    let table = document.createElement("table")
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")

    const id = el.dataset.id
    const row = render_item_row(id)
    tbody.appendChild(row)

    table.appendChild(thead)
    table.appendChild(tbody)
    item_view.appendChild(table)

    const items = get_dt_from_localstorage()
    const data_template = items[id]
    document.getElementById("item_name").innerHTML = `<span><strong>id</strong>:${id}</span><br/><span><strong>Name:</strong>:${data_template.identifier.name}</span>`

    item_json_view.value = JSON.stringify(data_template,null,2)
    item_json_view.dataset.data_template = id
}

function make_show_item_button(item) {
    let button = document.createElement('button');
    button.classList.add(("btn-sm"))
    button.dataset.id = item.id;
    button.innerHTML = "Show";
    button.onclick = function () { show_item(this); };
    return button
}

function load_items() {
    removeAllChildNodes(item_list)
    let data_templates = get_dt_from_localstorage()

    let table = document.createElement("table")
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")

    for (const [id,data_template] of Object.entries(data_templates)) {
        let row = document.createElement("tr")
        // const cell = make_cell({txt:data_template.identifier.name})
        const cell = make_cell({txt:id})
        cell.title = data_template.identifier.name
        row.appendChild(cell)
        button = make_show_item_button({id:id})
        row.appendChild(button)
        // console.log(id,data_template)
        tbody.appendChild(row)
    }
    table.appendChild(thead)
    table.appendChild(tbody)
    item_list.appendChild(table)
}
function change_data_template(data_template,item) {
    console.log("a",data_template[item].identifier,data_template[item])
    const new_data_template = structuredClone(data_template)
    new_data_template[item] = JSON.parse(item_json_view.value)
    console.log("b",new_data_template[item].identifier,new_data_template[item])
    return new_data_template
}

function save_dt_to_localstorage() {
    if (item_json_view.dataset.data_template === undefined)
        return
    console.log("saving data template",item_json_view.dataset.data_template)
    let org_data_template = get_dt_from_localstorage()
    let new_data_template = change_data_template(org_data_template,item_json_view.dataset.data_template)
    set_localstorage_items(JSON.stringify(new_data_template,null,2))
    load_items()
}
