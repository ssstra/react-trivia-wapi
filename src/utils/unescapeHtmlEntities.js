export default function unescapeHtmlEntities(escapedString) {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = escapedString;

  return textarea.childNodes.length > 0 ? textarea.childNodes[0].nodeValue : "";
}
