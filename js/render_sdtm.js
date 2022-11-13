function sdtm_cell(item) {
    let domain = "--"
    if (item.identifier && item.identifier.domain)
        domain = item.identifier.domain
    let cell = document.createElement("td")
    let text = document.createElement("div")
    if (item.sub)
        text.innerHTML = `${item.txt} (${item.sub})`
    else
        text.innerHTML = `${item.txt}`
    if (item.bold)
        text.style.fontWeight = 'bold'
    text.innerHTML = text.innerHTML.replace("--",domain)
    cell.appendChild(text)
    return cell
}

function make_sdtm_template(domain) {
    return structuredClone(sdtm[domain])
}

function get_submission_terms_mapping(terms) {
    result = []
    // console.log("----- 0 entering")
    if (Array.isArray(terms)) {
        // console.log("here 1",structuredClone(result))
        // for (const term of terms) { result[term] = current_json.terms[term].display }
        for (const term of terms) {
            if (current_terms.terms.hasOwnProperty(term)) {
                // Get submission value from current terms
                current_var = term
                current_term = current_terms.terms[term].submission_value
                // Split submission value into target variable and submission value if needed
                if (typeof current_term === 'object' && !Array.isArray(current_term) && current_term !== null) {
                    for (const [k,v] of Object.entries(current_term)) {
                        current_var = k
                        current_term = v
                    }
                }
                result.push([current_var,current_term])
            } else {
                result.push(["check:",term])
                console.log("Term does not exists",'"'+term+'"')
            }
        }
    } else {
        // console.log("here 4",result)
        if (typeof terms === 'object' && !Array.isArray(terms) && terms !== null) {
            for (const [k,v] of Object.entries(terms)) {
                terms = k
            }
        }
        // console.log("here 5 terms",terms)
        if (current_terms.terms.hasOwnProperty(terms)) {
            submission_values = current_terms.terms[terms].submission_value
            for (const [k,v] of Object.entries(submission_values)){
                result.push([k,v])
            }
            // console.log("here 6",result)
            // result[terms] = current_terms.terms[terms].submission_value
        } else {
            // result[terms] = "Check:"+terms
            result.push(["check:",term])
            // console.log("here 7",result)
            console.log("Term does not exists",'"'+terms+'"')
        }
    }
    return result
}

function get_submission_terms(variable,terms) {
    const mappings = get_submission_terms_mapping(terms)
    let submission_values = []
    if (mappings.length === 0) {
    } else if (mappings.length === 1) {
        submission_values.push([variable,mappings[0][1]])
    } else {
        submission_values.push([variable,"MULTLIPLE"]) 
        i=1
        for (mapping of mappings) {
            submission_values.push([variable+i,mapping[1]])
            i=i+1
        }
    }
    return submission_values
}

function ref(domain,txt) {
    const sdtm_var = txt.replace("--",domain)
    return sdtm_var
}

function get_domain(item) {
    return item.identifier.domain
}
function get_result(item) {
    return item.result.collected
}
function get_result_submission_identifier(item) {
    return item.identifier.submission_value
}
function get_result_submission_label(item) {
    return item.identifier.label
}

function set_sdtm_var_from_term(terms,map,annotations) {
    for (term of terms) {
        // If it is an object, get the linked term
        if (typeof term[1] === 'object' && !Array.isArray(term[1]) && term[1] !== null) {
            let correct_term = get_submission_terms_mapping(term[1].term)
            let target_var = ref(domain,annotations[correct_term[0][0]].sdtm_target)
            map[target_var] = correct_term[0][1]
        } else if (annotations[term[0]]) {
            let target_var = ref(domain,annotations[term[0]].sdtm_target)
            map[target_var] = term[1]
        } else {
            console.log("Couldn't find term:",term)
        }
    }
}

function make_test_row(domain,test) {
    let annotations = current_templates.templates.test
    let sdtm_map = make_sdtm_template(domain)
    // console.log("-----------------\nsdtm_map",sdtm_map)

    sdtm_map["STUDYID"] = current_protocol.id
    sdtm_map["DOMAIN"] = get_domain(test)
    let target_var = ref(domain,annotations.result.sdtm_target)
    sdtm_map[target_var] = get_result(test)
    target_var = ref(domain,annotations.id.sdtm_target)
    sdtm_map[target_var] = get_result_submission_identifier(test)
    target_var = ref(domain,annotations.label.sdtm_target)
    sdtm_map[target_var] = get_result_submission_label(test)
    if (test.position) {
        // console.log("----------------- position",test.position)
        target_var = ref(domain,annotations.position.sdtm_target)
        terms = get_submission_terms_mapping(test.position)
        set_sdtm_var_from_term(terms,sdtm_map,annotations)
    }
    if (test.location) {
        // console.log("----------------- location",test.location)
        terms = get_submission_terms_mapping(test.location)
        set_sdtm_var_from_term(terms,sdtm_map,annotations)
    }
    if (test.identifier.cat) {
        target_var = ref(domain,annotations.cat.sdtm_target)
        sdtm_map[target_var] = test.identifier.cat
    }
    if (test.method) {
        terms = get_submission_terms_mapping(test.method)
        set_sdtm_var_from_term(terms,sdtm_map,annotations)
    }
    if (test.units && test.units.collected) {
        terms = get_submission_terms_mapping(test.units.collected)
        set_sdtm_var_from_term(terms,sdtm_map,annotations)
    }
    return sdtm_map
}

function make_dm(domain,items) {
    let annotations = current_templates.templates.test
    let sdtm_map = make_sdtm_template(domain)
    sdtm_map["STUDYID"] = current_protocol.id
    sdtm_map["DOMAIN"] = items[0].identifier.domain
    for (item of items) {
        target_var = item.identifier.name
        const results = get_result(item)
        const var_terms = get_submission_terms(target_var,results)
        for (var_term of var_terms) {
            sdtm_map[var_term[0]] = var_term[1]
        }
    }
    return [sdtm_map]
}

function make_domain(domain,items,view) {
    let rows = []
    let i = 1
    if (items[0].type === "test") {
        for (item of items) {
            if (item.type === "test") {
                let row = make_test_row(domain,item)
                row[domain+'SEQ']=i
                rows.push(structuredClone(row))
                i=i+1
            }
        }
    }
    if (items[0].identifier.domain === "DM") {
        rows = make_dm(domain,items)
    }
    return rows
}

function render_sdtm() {
    console.clear()
    removeAllChildNodes(sdtm_data_view)
    let row = ""
    let table = ""
    let template_array = Object.values(template_data)
    // Get the domains used
    let domains = template_array.map(item => item.identifier.domain)
    domains = [...new Set(domains)]
    for (domain of domains) {
        const items = template_array.filter(item => item.identifier.domain === domain)
        let data = make_domain(domain,items,sdtm_data_view)
        const table = o_matrix_to_table(data)
        sdtm_data_view.appendChild(table)
    }
}
