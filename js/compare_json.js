// -------------------------------------------------------------------
// Adopted from https://dirask.com/posts/JavaScript-json-difference-visualization-MDg4dp
// difference calculator

function getType(object) {
  return Object.prototype.toString.call(object);
}

function getDescription(type) {
  if (type == '[object Array]') {
    return 'array';
  }
  if (type == '[object Object]') {
    return 'object';
  }
  return 'simple';
}

function createOldItem(name, status, type, value) {
  return {
    name: name || null,
    status: status,
    oldType: getDescription(type),
    newType: null,
    oldValue: value,
    newValue: null,
  };
}

function createNewItem(name, status, type, value) {
  return {
    name: name || null,
    status: status,
    oldType: null,
    newType: getDescription(type),
    oldValue: null,
    newValue: value,
  };
}

var createDeletedItem = function(key, type, value) {
  return createOldItem(key, 'deleted', type, value);
};

var createCreatedItem = function(key, type, value) {
  return createNewItem(key, 'created', type, value);
};

function coverContent(entity, createItem) {
  var items = [ ];

  for (const key in entity) {
    if (entity.hasOwnProperty(key)) {
      items.push(coverEntity(key, entity[key], createItem));
    }
  }

  return items;
}

function coverEntity(name, entity, createItem) {
  var type = getType(entity);

  if (type === '[object Array]' || type === '[object Object]') {
    var content = coverContent(entity, createItem);

    return createItem(name, type, content);
  } else {
    return createItem(name, type, entity);
  }
}

function compareContent(a, b) {
  var items = [ ];

  for (const key in a) {
    if (a.hasOwnProperty(key)) {
      if (b.hasOwnProperty(key)) {
        items.push(compareEntries(a[key], b[key], key));
      } else {
        items.push(coverEntity(key, a[key], createDeletedItem));
      }
    }
  }

  for (const key in b) {
    if (b.hasOwnProperty(key)) {
      if(a.hasOwnProperty(key)){
        continue;
      }

      items.push(coverEntity(key, b[key], createCreatedItem));
    }
  }

  return items;
}

function compareEntries(a, b, name) {
  var oldType = getType(a);
  var newType = getType(b);

  if (a === b) {
    return createOldItem(name, 'unchanged', oldType, a);
  }

  if (oldType == newType) {
    // both have array or object type:
    if (oldType === '[object Array]' || oldType === '[object Object]') {
      var oldValue = compareContent(a, b);

      return createOldItem(name, 'unchanged', oldType, oldValue);
    }
    // both have simple type: boolean, number, string, etc.:
    var description = getDescription(oldType);

    return {
      name: name || null,
      status: 'updated',
      oldType: description,
      newType: description,
      oldValue: a,
      newValue: b,
    };
  } else {
    // both have different types:
    var oldDescription = getDescription(oldType);
    var newDescription = getDescription(newType);

    return {
      name: name || null,
      status: 'updated',
      oldType: oldDescription,
      newType: newDescription,
      oldValue: (oldDescription == 'simple' ? a : coverContent(a, createDeletedItem)),
      newValue: (newDescription == 'simple' ? b : coverContent(b, createCreatedItem)),
    };
  }
}

// -------------------------------------------------------------------
// difference visualization

var rules = [
  { expression: /&/g, replacement: '&amp;'  }, // keep this rule at first position
  { expression: /</g, replacement: '&lt;'   },
  { expression: />/g, replacement: '&gt;'   },
  { expression: /"/g, replacement: '&quot;' },
  { expression: /'/g, replacement: '&#039;' }
];

function escapeValue(value) {
  if(value == null) {
    return null;
  }

  var result = String(value);

  for (var i = 0; i < rules.length; ++i) {
    var rule = rules[i];

    result = result.replace(rule.expression, rule.replacement);
  }

  return result;
};

function createRow(type, name, value) {
  var html = '<tr class="' + type + '">';

  if (name) {
    html += '  <td style="width: 40px;" class="label ' + type + '">' + name + '</td>';
  }

  html += '  <td style="min-width: 50px;" class="value ' + type + '">' + value + '</td>';
  html += '</tr>';

  return html;
}

function createNode(node) {
  var html = '';
  var name = escapeValue(node.name);

  if (node.oldType) {
    var oldValue = (node.oldType == 'simple' ? escapeValue(node.oldValue) : createTable(node.oldValue));

    if (node.status == 'unchanged') {
      return createRow('unchanged', name, oldValue);
    }

    html += createRow('old', name, oldValue);
  }
  if (node.newType) {
    var newValue = node.newType == 'simple' ? escapeValue(node.newValue) : createTable(node.newValue);

    html += createRow('new', name, newValue);
  }

  return html;
}

function createRows(nodes) {
  var html = '';

  for (var i = 0; i < nodes.length; ++i) {
    html += createNode(nodes[i]);
  }

  return html;
}

function createTable(nodes) {
  var html = '' + 
      '<table style="border-collapse: collapse; font-size: 13px;">' +
      '  <tbody>' +
           createRows(nodes) +
      '  </tbody>' +
      '</table>';

  return html;
}

function createReport(difference) {
  var html = '' +
      '<table>' +
      '  <tbody>' +
           createNode(difference) +
      '  </tbody>' +
      '</table>';

  return html;
}

function showDifference(difference) {
  const html = createReport(difference)
  removeAllChildNodes(json_compare)
  json_compare.innerHTML = html
}

const jsons = {
  "items":[data_templates,default_items_json],
  "templates":[current_templates,default_templates_json],
  "terms":[current_terms,default_terms_json],
  "crf":[current_crfs,default_crf_json],
  "protocol":[current_protocol,default_protocol_json]
}

// function compareJsons(a, b) {
function compareJsons() {
  const compare = jsons[select_json_compare.value]
  let aObject = compare[0]
  let bObject = JSON.parse(compare[1])

  let difference = compareEntries(aObject,  bObject);
  showDifference(difference);
}
