function set_annotation(item) {
    let annotation = document.createElement("div")
    const domain = (item.identifier.domain == undefined) || (item.identifier.domain == "") ? "--" : item.identifier.domain
    if (item.where != undefined) {
        annotation.innerHTML = `${item.annotation.replace("--",domain)}=${item.where}`
    } else {
        annotation.innerHTML = item.annotation.replace("--",domain)
    }
    annotation.classList.add("annotation")
    annotation.style.display = annotation_button.dataset.displayed
    annotation.style.backgroundColor = "LightGrey"
    return annotation
}
function add_validation(item) {
    let validation = document.createElement("div")
    validation.classList.add("validation")
    // validation.style.display = validation_button.dataset.displayed
    validation.style.backgroundColor = "Red"
    // validation.style.display = "block"
    return validation
}

function make_cell(item) {
    // let cell = (item.td) ? document.createElement("td") : document.createElement("div")
    let cell = document.createElement("td")
    let text = document.createElement("div")
    if (item.sub)
        text.innerHTML = `${item.txt} (${item.sub})`
    else
        text.innerHTML = `${item.txt}`
    if (item.bold)
        text.style.fontWeight = 'bold'
    cell.appendChild(text)
    if (item.annotation != undefined) {
        let annotation = set_annotation(item)
        cell.appendChild(annotation)
        cell.title = item.annotation
    }
    return cell
}

function validate(el,item) {
    if (el.value === "") {
        console.log("Element has '' value")        
        el.style.backgroundColor = null
        return
    }
    if (!el.value) {
        console.log("Element has NO value")        
        el.style.backgroundColor = null
        return
    }
    if (el.value < item.result.validation[0] || el.value > item.result.validation[1]) {
        el.dataset.error = "Range error"
        // const validation = el.parentNode.getElementsByClassName("validation")
        // validation[0].innerHTML = "Value outside normal range:"+item.result.validation
        el.style.backgroundColor = "Yellow"
    } else {
        const validation = el.parentNode.getElementsByClassName("validation")
        validation[0].innerHTML = null
        el.style.backgroundColor = "White"
    }
    return
}

function make_input(item) {
    let cell = document.createElement("td")
    let input = document.createElement("input")
    if (item.id) {
        input.classList.add(item.id)
        input.dataset.a = "test-result"
        input.dataset.id = item.id
        input.dataset.test = item.identifier.submission_value
        input.dataset.type = item.type
        input.value = 0
        input.dataset.previous_value = null
        if (item.result.validation) {
            // alert("adding validation")
            input.onchange = function () { validate(this,item) };
        }
    }
    cell.appendChild(input)
    if (item.annotation != undefined) {
        let annotation = set_annotation(item)
        cell.appendChild(annotation)
    }
    if (item.result.validation != undefined) {
        let validation = add_validation(item)
        cell.appendChild(validation)
    }
    return cell
}

function make_multi_response(item) {
    let row = document.createElement("tr")
    row.dataset.id = item.id
    row.dataset.a = "multi-response"
    let cell = document.createElement("td")
    let span = document.createElement("span")
    span.innerHTML = `<strong>${item.identifier.display}</strong> ${item.identifier.instruction}`
    if (item.annotation != undefined) {
            let annotation = set_annotation(item)
            span.appendChild(annotation)
    }
    cell.append(span)
    let list = document.createElement("ul")
    for (const term of item.result.collected) {
        current_term = current_terms.terms[term]
        let list_item = document.createElement("il")
        div = document.createElement("div")
        let input = document.createElement("input")
        let label = document.createElement("label")
        input.type="checkbox"
        input.value=term
        if (item.id) {
            // input.classList.add(item.id)
            input.dataset.a = "multi-response-result"
            // input.dataset.id = item.id
            // input.dataset.test = item.identifier.submission_value
            // input.dataset.type = item.type
            label.for = item.id
            label.innerHTML = current_term.display
        }
        div.append(input)
        div.append(label)
        list_item.append(div)
        list.append(list_item)
    }
    if (item.specification) {
        current_term = current_terms.terms[item.specification]
        let list_item = document.createElement("il")
        div = document.createElement("div")
        let input = document.createElement("input")
        let label = document.createElement("label")
        input.type="checkbox"
        input.value=item.specification
        input.dataset.a = "specification-text"
        label.for = item.id
        label.innerHTML = current_term ? current_term.display : "not set"
        div.append(input)
        div.append(label)

        let spec = document.createElement("input")
        spec.dataset.a = "specification"
        spec.dataset.rid = item.id
        div.append(spec)
        list_item.append(div)
        list.append(list_item)
    }
    cell.appendChild(list)
    row.appendChild(cell)
    return row
}

function make_single_response(item) {
    let row = document.createElement("tr")
    let cell = document.createElement("td")
    let span = document.createElement("span")
    span.innerHTML = `<strong>${item.identifier.display}</strong> ${item.identifier.instruction}`
    if (item.annotation != undefined) {
            let annotation = set_annotation(item)
            span.appendChild(annotation)
    }
    cell.append(span)
    cell = make_select({id:item.identifier.id,qualifier:map.qualifier,options:item.result.collected,...item})
    row.appendChild(cell)
    return row
}

function make_select(item) {
    let cell = document.createElement("td")
    let select = document.createElement("select")
    if (item.id) {
        select.classList.add(item.id)
        select.dataset.a = "test-qualifier"
        select.dataset.test = item.identifier.name
        select.dataset.type = item.qualifier
    }
    for (const [k,v] of Object.entries(item.options)) {
        const opt = document.createElement("option")
        opt.value = k
        // opt.value = "a"
        opt.innerHTML = v
        select.appendChild(opt)
    }
    cell.appendChild(select)
    if (item.annotation != undefined) {
        let annotation = set_annotation(item)
        cell.appendChild(annotation)
    }
    return cell
}
function single_or_double(map) {
    if (Object.keys(map.options).length > 1) {
        cell = make_select({id:map.id,qualifier:map.qualifier,options:map.options,...map})        
    } else {
        cell = make_cell({txt:map.options[Object.keys(map.options)[0]],...map})
    }
    return cell
}
function get_terms(terms) {
    result = {}
    if (Array.isArray(terms)) {
        // for (const term of terms) { result[term] = current_json.terms[term].display }
        for (const term of terms) { 
            if (current_terms.terms.hasOwnProperty(term)) {
                result[term] = current_terms.terms[term].display
            } else {
                result[term] = "Check:"+term
                console.log("Term does not exists",'"'+term+'"')
            }
        }
    } else {
        result = terms
    }
    return result
}
function get_annotation(item) {
    if (item in current_templates.templates.test) {
        return current_templates.templates.test[item].sdtm_target
    } else if (sdtm[item.identifier.name] !== undefined)  {
        return item.identifier.domain+"."+item.identifier.name
    } else {
        console.log("Error (get_annotation) ",item,"is undefined")
        return "undefined:"+item
    }
}
function get_order(item) {
    console.log("item",item)
    console.log("test",current_templates.templates.test)
    if (item in current_templates.templates.test) {
        return current_templates.templates.test[item].display_order
    } else {
        console.log("Display order not defined ",item)
        return null
    }
}

function test_to_html(test) {
    // let annotations = current_json.templates.test
    let annotations = current_templates.templates.test
    let row = document.createElement("tr")

    let cell = make_cell({txt:test.identifier.display,bold:"y",annotation:get_annotation("id"),where:test.identifier.submission_value,...test})
    row.appendChild(cell)
    cell = make_input({id:test.id,qualifier:`result`,txt:test.identifier.display,annotation:get_annotation("result"),...test})
    row.appendChild(cell)
    // if ("unit" in test && test.units.collected) {
    if (test.units && test.units.collected) {
        cell = make_cell({txt:"Unit",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`unit`,options:get_terms(test.units.collected),annotation:get_annotation("unit"),...test})
        row.appendChild(cell)
    }
    if (test.position) {
        cell = make_cell({txt:"Position",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`position`,options:get_terms(test.position),annotation:get_annotation("position"),...test})
        row.appendChild(cell)
    }
    if (test.location) {
        cell = make_cell({txt:"Location",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`location`,options:get_terms(test.location),annotation:get_annotation("location"),...test})
        row.appendChild(cell)
    }
    if (test.method) {
        cell = make_cell({txt:"Method",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`method`,options:get_terms(test.method),annotation:get_annotation("method"),...test})
        row.appendChild(cell)
    }
    row.appendChild(cell)
    console.log(row)
    return row
}

function render_item_row(id) {
    const items = get_dt_from_localstorage()
    const data_template = items[id]
    let row = document.createElement("tr")
    if (data_template === undefined) {
        console.log("Couldn't find data template:",id)
    } else {
        if (data_template.type === "test") {
            // const test = data_template.test
            row = test_to_html({id:id,...data_template})
        } else if (data_template.type === "multi-response") {
            // console.log("render multi-response",data_template.identifier.name)
            if (data_template.result.hasOwnProperty("specification")) {
                row = make_multi_response({id:id
                                          ,annotation:get_annotation(data_template)
                                          ,specification:data_template.result.specification
                                          ,...data_template})
            } else {
                row = make_multi_response({id:id
                                          ,annotation:get_annotation(data_template)
                                          ,...data_template})
            }
        } else if (data_template.type === "single-response") {
            row = make_single_response({id:id,annotation:get_annotation(data_template),...data_template})
        }
    }
    return row
}

function render_form() {
    removeAllChildNodes(form_view)
    collected_data = {}
    removeAllChildNodes(example_data)
    let form = get_form_from_localstorage(select_form.value)
    const k = {}
    k[select_form.value] = form
    form_json_view.value = JSON.stringify(k,null,2)
    for (const [grp,items] of Object.entries(form)) {
        let table = document.createElement("table")
        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        for (const item of items) {
            const row = render_item_row(item.item)
            tbody.appendChild(row)
        }
        table.appendChild(thead)
        table.appendChild(tbody)
        form_view.appendChild(table)
    }
}
