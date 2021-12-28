

/**
 * Since it's a bit difficult to get the root path of the project,
 * this module contains the paths to the different folders (currently needed 
 * in the frontend)
 * 
 * This module followes a BIG CASE naming convention.
 * 
 * Why use this module if .env exists?
 * 
 * - To prevent mixing environment variables and frontend side variables.
 * 
 */

const PATHS = {
    "ROOT": `${process.env.APP_URL}:8000`,
    "DEFAULT_PROFILE_IMAGE": "assets/avatar.svg"
};


export default PATHS;