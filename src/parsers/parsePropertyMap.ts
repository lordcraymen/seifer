const parsePropertyMap = (propertyMapString: string): Object =>
    JSON.parse(propertyMapString.trim()
      // Step 1: Normalize object keys (ensure correct quoting)
      .replace(
        /([{,])\s*(?:'([^']+)'|`([^`]+)`|([\w\u00C0-\uFFFF\-@#$%&*()]+))\s*:/g,
        '$1"$2$3$4":'
      )
      // Step 2: Convert numeric and boolean keys to strings
      .replace(/([{,])\s*(\d+|true|false)\s*:/g, '$1"$2":')
      // Step 3: Convert single-quoted and ticked values to double-quoted values in objects
      .replace(/:\s*(?:'([^']*)'|`([^`]*)`)/g, ': "$1$2"')
      // Step 4: Convert single-quoted and ticked values to double-quoted values inside arrays
      .replace(/(\[|,)\s*(?:'([^']*)'|`([^`]*)`)\s*(?=,|\])/g, '$1 "$2$3"')
      // Step 5: Convert property references that include a dot (e.g. a.age)
      .replace(
        /(:\s*)([a-zA-Z_][a-zA-Z0-9_]*)\.([a-zA-Z_][a-zA-Z0-9_]*)(\s*(?=,|\]|\}))/g,
        '$1{ "reference": { "object": "$2", "property": "$3" } }$4'
      )
      // Step 6: Wrap simple unquoted identifiers (that are not true, false, or null) into reference objects.
      // We capture the preceding colon and whitespace and the trailing whitespace (if any) before a comma, ] or }.
      .replace(
        /(:\s*)(?!true|false|null)([a-zA-Z_][a-zA-Z0-9_]*)(\s*(?=,|\]|\}))/g,
        '$1{ "reference": "$2" }$3'
      )
      // Step 7: Remove any trailing commas before closing braces or brackets
      .replace(/,\s*([}\]])/g, '$1'));

export { parsePropertyMap };