function get_test_result() {
    let matrix = []
    // let matrix = {}
    let els = form_view.querySelectorAll('[data-a="test-result"]')
    if (els.length === 0)
      return matrix

    for (const el of els) {
        const row = el.parentNode.parentNode
        const qs = row.querySelectorAll('[data-a="test-qualifier"]')
        const row_values = {}
        for (const q of qs) {
            row_values[q.dataset.type] = q.value
        }
        matrix.push({id:el.dataset.id,result:el.value,...row_values})
        collected_data[el.dataset.id] = {type:"test",result:el.value,values:{...row_values}}
    }
    return matrix
}
function get_form_multi_result() {
    let matrix = []
    // let matrix = {}
    let els = form_view.querySelectorAll('[data-a="multi-response-result"]')
    if (els.length === 0)
      return matrix

    let keys = new Set()
    for (const el of els) { keys.add(el.dataset.id) }
    let checked = {}
    for (const key of keys) { checked[key] = [] }

    // Get checked items
    for (const el of els) {
        if (el.checked === true) {
            checked[el.dataset.id].push(el.value)
        }
    }

    // Get checked items
    for (const [k,v] of Object.entries(checked)) {
        matrix.push({id:k,result:v})
        collected_data[k] = {type:"multi-response-result",result:v}
    }
    return matrix
}

function save_form_to_localstorage() {
    const tests = get_test_result()
    const multi = get_form_multi_result()
    tests.push(...multi)
    const table = o_matrix_to_table(tests)
    removeAllChildNodes(example_data)
    example_data.appendChild(table)
}

function set_test_result(template, value) {
    template.result.collected = value
}

function resolve_form_references() {
    // Add references
    const terms = current_terms.terms
    let matrix = []
    let resolved_data =  structuredClone(collected_data)
    template_data = {}
    for (const [test,map] of Object.entries(resolved_data)) {
        // console.log(test)
        current_data_template = structuredClone(data_templates[test])
        let fixed_terms = resolved_data[test]
        // Assign collected result to template
        set_test_result(current_data_template, map.result)
        // Assign collected values to template
        if ("values" in map) {
            for (const [k,v] of Object.entries(map.values)) {
                current_data_template[k] = v
            }
        }
        template_data[test] = current_data_template
    }
    template_data_view.value = JSON.stringify(template_data,null,2)
}

function load_forms() {
    removeAllChildNodes(select_form)
    for (const form of Object.keys(current_forms)) {
        const option = document.createElement("option")
        option.value = form
        option.textContent = form
        select_form.appendChild(option)
    }
}