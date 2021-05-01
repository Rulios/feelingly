import $ from "jquery";
import bootstrap from "bootstrap";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);