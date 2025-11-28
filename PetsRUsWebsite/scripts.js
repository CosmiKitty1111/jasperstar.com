void (async function () {
  // -- Add section templates to the page --
  // Determine templates.html path based on current location
  let templatesPath = "templates.html";
  let currentPath = window.location.pathname;
  // If we're in a subfolder (adopt/, food/, cart/), use ../templates.html
  if (currentPath.split("/").filter(Boolean).length > 2) {
    templatesPath = "../templates.html";
  }
  
  // Get the imported document in templates:
  let templates = document.createElement("template");
  templates.innerHTML = await (await fetch(templatesPath)).text();

  // Fetch header and footer templates:
  let header = templates.content.querySelector("#header");
  let footer = templates.content.querySelector("#footer");
  let headerClone = header.content.cloneNode(true);
  let footerClone = footer.content.cloneNode(true);

  // Fix template links based on current page location
  // Determine if we're in a subfolder (adopt/, food/, cart/)
  let isInSubfolder = currentPath.split("/").filter(Boolean).length > 2;
  let basePath = isInSubfolder ? "../" : "";
  
  // Update all links in header (relative to PetsRUsWebsite root)
  headerClone.querySelectorAll("a").forEach((link) => {
    let href = link.getAttribute("href");
    // Skip external links, anchors, mailto, tel
    if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto") && !href.startsWith("tel")) {
      // If in subfolder, prepend ../ to make paths relative to PetsRUsWebsite root
      if (isInSubfolder) {
        if (href === "./" || href === "") {
          link.setAttribute("href", "../");
        } else {
          link.setAttribute("href", "../" + href.replace("./", ""));
        }
      } else {
        // From root, ensure paths are correct (remove ./ if present)
        link.setAttribute("href", href.replace("./", ""));
      }
    }
  });
  
  // Update image src in header
  let logoImg = headerClone.querySelector("img");
  if (logoImg) {
    let src = logoImg.getAttribute("src");
    if (src && !src.startsWith("http")) {
      if (isInSubfolder) {
        logoImg.setAttribute("src", "../" + src);
      }
      // If at root, src is already correct
    }
  }

  // Append the templates onto the page:
  try {
    document.getElementById("pageHeader").appendChild(headerClone);
  } catch (e) {
    console.error("Cannot append header template.\n" + e.message);
  }
  try {
    document.getElementById("pageFooter").appendChild(footerClone);
  } catch (e) {
    console.error("Cannot append footer template.\n" + e.message);
  }

  // -- Highlight relevant navbar item dynamically --

  // Get current page URL
  let url = window.location.pathname;
  // Remove trailing slash and get the last segment
  let pathSegments = url.replace(/\/$/, "").split("/").filter(Boolean);
  let currentPage = pathSegments[pathSegments.length - 1] || "";
  
  // If we're at root or index, set to empty string for home
  if (currentPage === "" || currentPage === "index.html" || currentPage === "PetsRUsWebsite") {
    currentPage = "";
  }
  
  // Get all nav links
  const navItems = document.querySelectorAll(".flexNav li a, .cartNav li a");

  // Loop through all links
  navItems.forEach((navItem) => {
    let linkPath = navItem.pathname;
    // Remove trailing slash and get the last segment
    let linkSegments = linkPath.replace(/\/$/, "").split("/").filter(Boolean);
    let linkPage = linkSegments[linkSegments.length - 1] || "";
    
    // Check if link is active (match folder name or both are empty for home)
    if (currentPage === linkPage || (currentPage === "" && linkPage === "")) {
      // Add 'active' class
      navItem.classList.add("active");
    }
  });
})();
