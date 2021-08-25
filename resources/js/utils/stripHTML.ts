/**
 * Gets a string with html tags, and strips those tags. Returning just the 
 * text content of it. 
 * @param html 
 * @returns 
 */

export default function stripHTML(html: string): string {

    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";

    return text;
}