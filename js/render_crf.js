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

function make_cell(item) {
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
    }
    cell.appendChild(input)
    if (item.annotation != undefined) {
        let annotation = set_annotation(item)
        cell.appendChild(annotation)
    }
    return cell
}

function make_multi_response(item) {
    // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    // console.log(item.result.collected)
    let row = document.createElement("tr")
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
            input.classList.add(item.id)
            input.dataset.a = "multi-response-result"
            input.dataset.id = item.id
            input.dataset.test = item.identifier.submission_value
            input.dataset.type = item.type
            label.for = item.id
            label.innerHTML = current_term.display
        }
        div.append(input)
        div.append(label)
        list_item.append(div)
        list.append(list_item)
    }
    cell.appendChild(list)
    row.appendChild(cell)
    return row
}
function make_single_response(item) {
    // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    // console.log(item.result.collected)
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

    // let list = document.createElement("ul")
    // for (const term of item.result.collected) {
    //     current_term = current_terms.terms[term]
    //     let list_item = document.createElement("il")
    //     div = document.createElement("div")
    //     let input = document.createElement("input")
    //     let label = document.createElement("label")
    //     input.type="checkbox"
    //     input.value=term
    //     if (item.id) {
    //         input.classList.add(item.id)
    //         input.dataset.a = "single-response-result"
    //         input.dataset.id = item.id
    //         input.dataset.test = item.identifier.submission_value
    //         input.dataset.type = item.type
    //         label.for = item.id
    //         label.innerHTML = current_term.display
    //     }
    //     div.append(input)
    //     div.append(label)
    //     list_item.append(div)
    //     list.append(list_item)
    // }
    // cell.appendChild(list)
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

function test_to_html(test) {
    // let annotations = current_json.templates.test
    let annotations = current_templates.templates.test
    let row = document.createElement("tr")
    // let cell = make_cell({txt:test.name,bold:"y",annotation:get_annotation("id"),where:test.submission_value,...test})
    // console.log("test_to_html test",test.identifier.name)

    let cell = make_cell({txt:test.identifier.display,bold:"y",annotation:get_annotation("id"),where:test.identifier.submission_value,...test})
    row.appendChild(cell)
    cell = make_input({id:test.id,qualifier:`result`,txt:test.identifier.display,annotation:get_annotation("result"),...test})
    row.appendChild(cell)
    // if ("unit" in test && test.units.collected) {
    if (test.units && test.units.collected) {
        // cell = make_cell({txt:"Unit",bold:"y",annotation:get_annotation("unit"),...test})
        cell = make_cell({txt:"Unit",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`unit`,options:get_terms(test.units.collected),annotation:get_annotation("unit"),...test})
        row.appendChild(cell)
    }
    if (test.position) {
        // cell = make_cell({txt:"Position",bold:"y",annotation:get_annotation("position"),...test})
        cell = make_cell({txt:"Position",bold:"y",...test})
        row.appendChild(cell)
        cell = single_or_double({id:test.id,qualifier:`position`,options:get_terms(test.position),annotation:get_annotation("position"),...test})
        row.appendChild(cell)
    }
    if (test.location) {
        // cell = make_cell({txt:"Location",bold:"y",annotation:get_annotation("location"),...test})
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
            row = make_multi_response({id:id,annotation:get_annotation(data_template),...data_template})
        } else if (data_template.type === "single-response") {
            row = make_single_response({id:id,annotation:get_annotation(data_template),...data_template})
        }
    }
    return row
}

function render_crf() {
    removeAllChildNodes(crf_view)
    collected_data = {}
    removeAllChildNodes(example_data)
    let crf = get_crf_from_localstorage(select_form.value)
    for (const [grp,items] of Object.entries(crf)) {
        let table = document.createElement("table")
        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        for (const item of items) {
            const row = render_item_row(item.item)
            tbody.appendChild(row)
        }
        table.appendChild(thead)
        table.appendChild(tbody)
        crf_view.appendChild(table)
    }
}
